"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from "./socket";
import { colors } from "src/common/Colors";
import { Avatar } from "../Avatar";
import { Badge } from "../Badge";
import {
  FeatherArrowLeft,
  FeatherEdit3,
  FeatherMoreVertical,
  FeatherSearch,
  FeatherSend,
  FeatherCheck,
  FeatherChevronRight,
  FeatherMessageSquare,
} from "@subframe/core";
import API, { URL_PATH, BASE_URL } from "src/common/API";
import Navbar from "src/ui/components/Navbar";
import Footer from "./../Footer";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400";

type Student = {
  name: string;
  domain: string;
  avatar: string;
};

type Recruiter = {
  userId: string;
  name: string;
  company?: string;
  title?: string;
  avatar?: string;
  lastMessage?: string;
  time?: string;
  unread?: number;
  lastMessageTime?: Date;
};

type Msg = {
  _id?: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp?: Date | string;
  time?: string;
  read?: boolean;
};

export default function Chat() {
  const navigate = useNavigate();
  const { otherUserId } = useParams();
  const currentUserId = localStorage.getItem("userId") || "";
  const currentUserRole = localStorage.getItem("role") || "student";
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [otherIsTyping, setOtherIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingRecruiters, setLoadingRecruiters] = useState(true);
  const [sending, setSending] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [student, setStudent] = useState<Student>({
    name: "",
    domain: "",
    avatar: DEFAULT_AVATAR,
  });

  // Helper function to format time
  const formatMessageTime = useCallback((date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const formatTimeAgo = useCallback((date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }, []);

  // Fetch recruiters list
  const fetchRecruiters = useCallback(async () => {
    if (!currentUserId) return;

    setLoadingRecruiters(true);
    try {
      const response = await API("GET", "/chat/participants");

      if (response?.data) {
        const formattedRecruiters = response.data
          .map((r: any) => {
            const otherUser = r.participants.find(
              (p: any) => p._id !== currentUserId,
            );
            const lastMessage = r.messages?.[r.messages.length - 1];

            return {
              userId: otherUser._id,
              name: otherUser.name || "Unknown User",
              company: otherUser.company,
              title: otherUser.title,
              avatar: otherUser.avatar || DEFAULT_AVATAR,
              lastMessage: lastMessage?.text,
              time: lastMessage?.timestamp
                ? formatTimeAgo(new Date(lastMessage.timestamp))
                : "",
              unread:
                r.messages?.filter(
                  (m: any) => m.senderId === otherUser._id && !m.read,
                ).length || 0,
              lastMessageTime: lastMessage?.timestamp
                ? new Date(lastMessage.timestamp)
                : new Date(),
            };
          })
          .sort(
            (a: Recruiter, b: Recruiter) =>
              (b.lastMessageTime?.getTime() || 0) -
              (a.lastMessageTime?.getTime() || 0),
          );

        setRecruiters(formattedRecruiters);
      }
    } catch (err) {
      console.error("Failed to fetch recruiters:", err);
      // Fallback to demo data
      setRecruiters([
        {
          userId: "RECRUITER_ID_1",
          name: "Sarah Kim",
          company: "TechWave Inc",
          title: "Senior Recruiter",
          avatar:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
          lastMessage: "Perfect! I'll send over the JD in a moment...",
          time: "2m ago",
          unread: 2,
        },
        {
          userId: "RECRUITER_ID_2",
          name: "Michael Chen",
          company: "DesignHub",
          title: "Talent Acquisition",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
          lastMessage: "Your portfolio looks great! When are you available?",
          time: "1h ago",
          unread: 0,
        },
        {
          userId: "RECRUITER_ID_3",
          name: "Jessica Williams",
          company: "Startup Labs",
          title: "HR Manager",
          avatar:
            "https://images.unsplash.com/photo-1494790108777-2f3bdbce8d9d?w=200",
          lastMessage: "Thanks for your interest in the position",
          time: "1d ago",
          unread: 0,
        },
      ]);
    } finally {
      setLoadingRecruiters(false);
    }
  }, [currentUserId, formatTimeAgo]);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    if (!otherUserId || !currentUserId) return;

    setLoading(true);
    try {
      const response = await API("GET", URL_PATH.getChatHistory(otherUserId));

      if (response?.data) {
        const formattedMessages = response.data.map((msg: any) => ({
          ...msg,
          time: formatMessageTime(msg.timestamp || new Date()),
          timestamp: new Date(msg.timestamp),
        }));

        setMessages(formattedMessages);
        markMessagesAsRead();
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  }, [otherUserId, currentUserId, formatMessageTime]);

  // Mark messages as read
  const markMessagesAsRead = useCallback(async () => {
    if (!otherUserId || !currentUserId) return;

    try {
      await API("POST", URL_PATH.markMessagesRead, {
        senderId: otherUserId,
        receiverId: currentUserId,
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.senderId === otherUserId ? { ...msg, read: true } : msg,
        ),
      );

      setRecruiters((prev) =>
        prev.map((r) => (r.userId === otherUserId ? { ...r, unread: 0 } : r)),
      );
    } catch (err) {
      console.error("Failed to mark messages as read:", err);
    }
  }, [otherUserId, currentUserId]);

  // Socket setup
  useEffect(() => {
    if (!currentUserId) return;

    socket.emit("join", currentUserId);

    const onReceiveMessage = async (msg: Msg) => {
      if (msg.senderId === otherUserId || msg.receiverId === otherUserId) {
        const formattedMsg = {
          ...msg,
          time: formatMessageTime(msg.timestamp || new Date()),
          timestamp: new Date(msg.timestamp || new Date()),
        };

        setMessages((prev) => [...prev, formattedMsg]);

        if (msg.senderId === otherUserId) {
          await markMessagesAsRead();
        }
      }

      const senderId =
        msg.senderId === currentUserId ? msg.receiverId : msg.senderId;
      const isFromOtherUser = msg.senderId !== currentUserId;

      setRecruiters((prev) =>
        prev
          .map((r) => {
            if (r.userId === senderId) {
              return {
                ...r,
                lastMessage: msg.text,
                time: formatTimeAgo(new Date()),
                unread: isFromOtherUser ? (r.unread || 0) + 1 : 0,
                lastMessageTime: new Date(),
              };
            }
            return r;
          })
          .sort(
            (a, b) =>
              (b.lastMessageTime?.getTime() || 0) -
              (a.lastMessageTime?.getTime() || 0),
          ),
      );
    };

    const onMessageSent = (msg: Msg) => {
      setMessages((prev) =>
        prev.map((m) =>
          m.text === msg.text && m.senderId === currentUserId && !m._id
            ? {
                ...m,
                ...msg,
                time: formatMessageTime(msg.timestamp || new Date()),
              }
            : m,
        ),
      );
      setSending(false);
    };

    const onTyping = (data: { senderId: string; isTyping: boolean }) => {
      if (data.senderId === otherUserId) {
        setOtherIsTyping(data.isTyping);
      }
    };

    socket.on("receive-message", onReceiveMessage);
    socket.on("message-sent", onMessageSent);
    socket.on("user-typing", onTyping);

    return () => {
      socket.off("receive-message", onReceiveMessage);
      socket.off("message-sent", onMessageSent);
      socket.off("user-typing", onTyping);
    };
  }, [
    currentUserId,
    otherUserId,
    formatMessageTime,
    formatTimeAgo,
    markMessagesAsRead,
  ]);

  // Fetch data on mount
  useEffect(() => {
    fetchRecruiters();
  }, [fetchRecruiters]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current && chatContainerRef.current) {
      const isNearBottom =
        chatContainerRef.current.scrollHeight -
          chatContainerRef.current.scrollTop -
          chatContainerRef.current.clientHeight <
        100;

      if (isNearBottom) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages, otherIsTyping]);

  // Typing indicator
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    if (!isTyping && otherUserId) {
      setIsTyping(true);
      socket.emit("typing", {
        senderId: currentUserId,
        receiverId: otherUserId,
        isTyping: true,
      });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }

      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        socket.emit("typing", {
          senderId: currentUserId,
          receiverId: otherUserId,
          isTyping: false,
        });
      }, 2000);
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || !otherUserId || !currentUserId || sending) return;

    const text = input.trim();
    const tempId = `temp_${Date.now()}`;

    const tempMessage: Msg = {
      _id: tempId,
      senderId: currentUserId,
      receiverId: otherUserId,
      text,
      timestamp: new Date(),
      time: formatMessageTime(new Date()),
      read: false,
    };

    setMessages((prev) => [...prev, tempMessage]);
    setInput("");
    setSending(true);

    setIsTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    socket.emit("typing", {
      senderId: currentUserId,
      receiverId: otherUserId,
      isTyping: false,
    });

    try {
      socket.emit("send-message", {
        senderId: currentUserId,
        receiverId: otherUserId,
        text,
        timestamp: new Date().toISOString(),
      });

      setRecruiters((prev) =>
        prev
          .map((r) => {
            if (r.userId === otherUserId) {
              return {
                ...r,
                lastMessage: text,
                time: "Just now",
                lastMessageTime: new Date(),
              };
            }
            return r;
          })
          .sort(
            (a, b) =>
              (b.lastMessageTime?.getTime() || 0) -
              (a.lastMessageTime?.getTime() || 0),
          ),
      );
    } catch (err) {
      console.error("Failed to send message:", err);
      setSending(false);
      setMessages((prev) => prev.filter((m) => m._id !== tempId));
      alert("Failed to send message. Please try again.");
    }
  };

  // Filter recruiters
  const filteredRecruiters = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return recruiters;
    return recruiters.filter(
      (r) =>
        r.name.toLowerCase().includes(s) ||
        (r.company || "").toLowerCase().includes(s) ||
        (r.title || "").toLowerCase().includes(s) ||
        (r.lastMessage || "").toLowerCase().includes(s),
    );
  }, [search, recruiters]);

  const activeRecruiter = useMemo(() => {
    return recruiters.find((r) => r.userId === otherUserId) || null;
  }, [recruiters, otherUserId]);

  // Fetch student profile
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await API("GET", URL_PATH.calculateExperienceIndex);
        const demo = res?.data?.demographics?.[0];
        const domain =
          typeof res?.jobdomain === "string"
            ? res.jobdomain
            : res?.jobdomain?.domain || "";

        const profileFromServer = res?.documents?.profileUrl;
        let avatar = DEFAULT_AVATAR;

        if (profileFromServer) {
          const origin = BASE_URL.replace(/\/api\/?$/, "");
          if (/^https?:\/\//.test(profileFromServer)) {
            avatar = profileFromServer;
          } else if (profileFromServer.startsWith("/")) {
            avatar = origin + profileFromServer;
          } else {
            avatar = origin + "/" + profileFromServer;
          }
        }

        setStudent({
          name: demo?.fullName || "Student",
          domain,
          avatar,
        });
      } catch (err) {
        console.error("fetchStudent failed", err);
        setStudent((prev) => ({ ...prev, avatar: DEFAULT_AVATAR }));
      }
    };

    fetchStudent();
  }, []);

  // Handle enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Steps for progress (matching Awards page)
  const steps = [
    { label: "Dashboard", icon: <FeatherMessageSquare />, completed: true },
    { label: "Messages", icon: <FeatherMessageSquare />, active: true },
  ];

  if (!currentUserId) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-neutral-500">Please log in to use chat</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simple header with progress - matching Awards page */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <FeatherArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 flex items-center gap-1">
            <div className="h-1 flex-1 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: "50%", backgroundColor: colors.primary }}
              />
            </div>
            <span className="text-xs text-neutral-500 ml-2">1/2</span>
          </div>
        </div>

        {/* Main content - Two column layout matching Awards page */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Recruiters List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-medium text-neutral-500">
                  RECRUITERS
                </h2>
                <button
                  className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors"
                  title="New message"
                >
                  <FeatherEdit3 className="w-4 h-4" />
                </button>
              </div>

              {/* Search */}
              <div className="mb-4">
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-200 bg-white"
                  style={{
                    borderColor:
                      focusedField === "search" ? colors.primary : undefined,
                  }}
                >
                  <FeatherSearch className="w-4 h-4 text-neutral-400" />
                  <input
                    className="w-full bg-transparent outline-none text-sm text-neutral-700 placeholder:text-neutral-400"
                    placeholder="Search recruiters..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setFocusedField("search")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>

              {/* Recruiters List */}
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {loadingRecruiters ? (
                  <div className="text-center py-8">
                    <div
                      className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto"
                      style={{ borderColor: colors.primary }}
                    ></div>
                    <p className="text-sm text-neutral-400 mt-2">Loading...</p>
                  </div>
                ) : filteredRecruiters.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-neutral-400">
                      No recruiters found
                    </p>
                  </div>
                ) : (
                  filteredRecruiters.map((r) => {
                    const active = r.userId === otherUserId;
                    return (
                      <button
                        key={r.userId}
                        onClick={() => navigate(`/chat/${r.userId}`)}
                        className="w-full text-left p-3 rounded-xl transition-all duration-200"
                        style={{
                          backgroundColor: active
                            ? `${colors.primary}08`
                            : "transparent",
                          border: `1px solid ${active ? colors.primary : colors.neutral[200]}`,
                        }}
                      >
                        <div className="flex gap-3">
                          <Avatar size="small" image={r.avatar} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className="text-sm font-medium truncate"
                                style={{
                                  color: active
                                    ? colors.primary
                                    : colors.neutral[900],
                                }}
                              >
                                {r.name}
                              </span>
                              <span className="text-[10px] text-neutral-400 whitespace-nowrap">
                                {r.time}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-500 truncate">
                              {r.company} • {r.title}
                            </p>
                            <p className="text-xs text-neutral-400 truncate mt-1">
                              {r.lastMessage || "Start a conversation"}
                            </p>
                            {r.unread ? (
                              <div className="mt-2">
                                <Badge
                                  className="text-[10px] font-medium px-2 py-0.5"
                                  style={{
                                    backgroundColor: colors.primary,
                                    color: "white",
                                  }}
                                >
                                  {r.unread} new
                                </Badge>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right column - Chat */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden flex flex-col h-[700px]">
              {/* Chat Header */}
              {activeRecruiter ? (
                <>
                  <div className="p-6 border-b border-neutral-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar
                          size="medium"
                          image={activeRecruiter.avatar || DEFAULT_AVATAR}
                        />
                        <div>
                          <h3 className="font-medium text-neutral-900">
                            {activeRecruiter.name}
                          </h3>
                          <p className="text-xs text-neutral-500">
                            {activeRecruiter.company} • {activeRecruiter.title}
                          </p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors">
                        <FeatherMoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-6 space-y-4"
                  >
                    {loading ? (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <div
                            className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto"
                            style={{ borderColor: colors.primary }}
                          ></div>
                          <p className="text-sm text-neutral-400 mt-2">
                            Loading messages...
                          </p>
                        </div>
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <div
                            className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                            style={{ backgroundColor: `${colors.primary}10` }}
                          >
                            <FeatherMessageSquare
                              className="w-6 h-6"
                              style={{ color: colors.primary }}
                            />
                          </div>
                          <p className="text-sm text-neutral-500">
                            No messages yet
                          </p>
                          <p className="text-xs text-neutral-400 mt-1">
                            Start the conversation!
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {messages.map((m, i) => {
                          const isMe = m.senderId === currentUserId;
                          return (
                            <div
                              key={m._id || i}
                              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                            >
                              <div className="max-w-[70%]">
                                <div
                                  className={`px-4 py-2 rounded-2xl text-sm ${
                                    m._id?.startsWith("temp_")
                                      ? "opacity-70"
                                      : ""
                                  }`}
                                  style={
                                    isMe
                                      ? {
                                          backgroundColor: colors.primary,
                                          color: "white",
                                        }
                                      : {
                                          backgroundColor: colors.neutral[100],
                                          color: colors.neutral[900],
                                        }
                                  }
                                >
                                  {m.text}
                                </div>
                                <div
                                  className={`mt-1 text-[10px] text-neutral-400 flex items-center gap-1 ${
                                    isMe ? "justify-end" : "justify-start"
                                  }`}
                                >
                                  {m.time}
                                  {isMe && (
                                    <FeatherCheck
                                      className={`w-3 h-3 ${
                                        m.read
                                          ? "text-blue-400"
                                          : "text-neutral-300"
                                      }`}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {/* Typing indicator */}
                        {otherIsTyping && (
                          <div className="flex justify-start">
                            <div className="max-w-[70%]">
                              <div
                                className="px-4 py-3 rounded-2xl text-sm"
                                style={{ backgroundColor: colors.neutral[100] }}
                              >
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                                  <div
                                    className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  ></div>
                                  <div
                                    className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.4s" }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-neutral-100">
                    <div className="flex gap-2">
                      <input
                        className="flex-1 px-4 py-2 text-sm border border-neutral-200 rounded-xl focus:outline-none transition-all duration-200"
                        style={{
                          borderColor:
                            focusedField === "message"
                              ? colors.primary
                              : undefined,
                        }}
                        placeholder="Write a message..."
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        disabled={sending}
                      />
                      <button
                        onClick={sendMessage}
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
                        style={{
                          backgroundColor: colors.primary,
                          color: "white",
                        }}
                        disabled={!input.trim() || sending}
                      >
                        {sending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span className="hidden sm:inline">Sending</span>
                          </>
                        ) : (
                          <>
                            <FeatherSend className="w-4 h-4" />
                            <span className="hidden sm:inline">Send</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                // No recruiter selected state
                <div className="h-full flex items-center justify-center p-6">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${colors.primary}10` }}
                    >
                      <FeatherMessageSquare
                        className="w-8 h-8"
                        style={{ color: colors.primary }}
                      />
                    </div>
                    <h3 className="text-lg font-light text-neutral-900 mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-sm text-neutral-500 max-w-xs">
                      Choose a recruiter from the list to start chatting
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
