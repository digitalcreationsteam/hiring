import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type InboxItem = {
  chatId: string;
  participants: Array<{ _id: string; name: string; role?: string }>;
  lastMessage: null | { text: string; senderId: string; createdAt: string };
  updatedAt: string;
};

export default function RecruiterChats() {
  const navigate = useNavigate();
  const [items, setItems] = useState<InboxItem[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = localStorage.getItem("userId");

  const isRecruiter = useMemo(() => {
    // if you store role in localStorage, use that:
    return localStorage.getItem("role") === "recruiter";
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/chat/inbox", { credentials: "include" });
        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (!currentUserId) return <div className="p-4">Please login again.</div>;
  if (!isRecruiter) return <div className="p-4">Only recruiters can access this page.</div>;
  if (loading) return <div className="p-4">Loading chats…</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Recruiter Inbox</h1>
      </div>

      <div className="space-y-3">
        {items.map((c) => {
          const other = c.participants.find((p) => p._id !== currentUserId);
          if (!other) return null;

          return (
            <button
              key={c.chatId}
              onClick={() => navigate(`/chat/${other._id}`)}
              className="w-full text-left border rounded-lg p-3 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{other.name}</div>
                <div className="text-xs text-gray-500">
                  {new Date(c.updatedAt).toLocaleString()}
                </div>
              </div>

              <div className="text-sm text-gray-700 mt-1 line-clamp-1">
                {c.lastMessage?.text ?? "No messages yet"}
              </div>
            </button>
          );
        })}

        {items.length === 0 && (
          <div className="text-gray-600 border rounded-lg p-4">
            No chats yet. Students will appear here once they message you.
          </div>
        )}
      </div>
    </div>
  );
}
