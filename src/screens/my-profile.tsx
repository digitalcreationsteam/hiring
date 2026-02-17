// import React, { useState, useEffect } from "react";
// import {
//   Edit2,
//   Mail,
//   MapPin,
//   Briefcase,
//   Phone,
//   Save,
//   Calendar,
//   BookOpen,
// } from "lucide-react";
// import { uniTalentColors } from "src/common/Colors";
// import API from "src/common/API";
// import { URL_PATH } from "src/common/API";

// interface UserProfile {
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   country: string;
//   state: string;
//   city: string;
//   headline: string;
//   bio: string;
//   avatar: string;
//   joinDate: string;
// }

// interface WorkExperience {
//   _id?: string;
//   jobTitle?: string;
//   companyName?: string;
//   startMonth?: number;
//   startYear?: number;
//   endMonth?: number;
//   endYear?: number;
//   currentlyWorking?: boolean;
//   description?: string;
//   typeOfRole?: string;
//   duration?: number;
// }

// interface Education {
//   _id?: string;
//   degree?: string;
//   fieldOfStudy?: string;
//   schoolName?: string;
//   startYear?: number;
//   endYear?: number;
//   currentlyStudying?: boolean;
//   gpa?: string;
//   duration?: number;
// }

// const DEFAULT_PROFILE: UserProfile = {
//   fullName: "",
//   email: "",
//   phoneNumber: "",
//   country: "",
//   state: "",
//   city: "",
//   headline: "Professional",
//   bio: "",
//   avatar: "",
//   joinDate: "",
// };

// const MyProfile: React.FC = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
//   const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
//   const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
//   const [educations, setEducations] = useState<Education[]>([]);
//   const [imageFailed, setImageFailed] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [saveLoading, setSaveLoading] = useState(false);
//   const [saveError, setSaveError] = useState<string | null>(null);
//   const [saveSuccess, setSaveSuccess] = useState(false);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const extractProfileData = (responseData: any): UserProfile => {
//     console.log("=== EXTRACTING PROFILE ===");
//     console.log("Response Data:", responseData);

//     // The API structure is:
//     // { userId, data: { demographics, education, workExperience, ... }, documents, ... }
//     // response?.data gives us: { demographics, education, workExperience, ... }

//     const demographicsArray = responseData?.demographics || [];
//     console.log("Demographics Array:", demographicsArray);

//     const demographics = demographicsArray[0] || {};
//     console.log("First Demographics:", demographics);

//     const documents = responseData?.documents || {};
//     console.log("Documents:", documents);

//     const profileData = {
//       fullName: demographics?.fullName || "",
//       email: demographics?.email || "",
//       phoneNumber: demographics?.phoneNumber || "",
//       country: demographics?.country || "",
//       state: demographics?.state || "",
//       city: demographics?.city || "",
//       headline: demographics?.headline || "Professional",
//       bio: demographics?.bio || "",
//       avatar: documents?.profileUrl || "",
//       joinDate: demographics?.createdAt
//         ? new Date(demographics.createdAt).toLocaleDateString()
//         : "",
//     };

//     console.log("Final Profile:", profileData);
//     return profileData;
//   };

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Use your existing API function
//       const response = await API("GET", URL_PATH.getUserProfile);

//       console.log("=== API RESPONSE ===");
//       console.log("Full response:", response);

//       // The API returns: { userId, data: {...}, documents: {...}, ... }
//       // response.data contains: { demographics, education, workExperience, ... }
//       const dashboardData = response?.data || response;

//       console.log("Dashboard Data (to extract from):", dashboardData);

//       // Extract profile - dashboardData has demographics array directly
//       const profileData = extractProfileData(dashboardData);
//       setProfile(profileData);

//       // Extract work experiences - dashboardData.workExperience is the array
//       const experiences = dashboardData?.workExperience || [];
//       console.log("Work Experiences:", experiences);
//       setWorkExperiences(experiences);

//       // Extract educations - dashboardData.education is the array
//       const edus = dashboardData?.education || [];
//       console.log("Educations:", edus);
//       setEducations(edus);

//       setImageFailed(false);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Failed to load profile";
//       setError(errorMessage);
//       console.error("Error fetching profile:", err);
//       setProfile(DEFAULT_PROFILE);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditClick = () => {
//     setEditedProfile(profile);
//     setIsEditing(true);
//   };

//   const handleSave = async () => {
//     if (!editedProfile) return;

//     try {
//       setSaveLoading(true);
//       setSaveError(null);

//       const dataToUpdate = {
//         fullName: editedProfile.fullName,
//         email: editedProfile.email,
//         phoneNumber: editedProfile.phoneNumber,
//         country: editedProfile.country,
//         state: editedProfile.state,
//         city: editedProfile.city,
//         headline: editedProfile.headline,
//         bio: editedProfile.bio,
//       };

//       await API("POST", URL_PATH.demographics, dataToUpdate);

//       setProfile(editedProfile);
//       setIsEditing(false);
//       setSaveSuccess(true);

//       setTimeout(() => setSaveSuccess(false), 3000);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Failed to save profile";
//       setSaveError(errorMessage);
//     } finally {
//       setSaveLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditedProfile(null);
//     setSaveError(null);
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;
//     if (editedProfile) {
//       setEditedProfile((prev) => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           [name]: value,
//         } as UserProfile;
//       });
//     }
//   };

//   const handleImageError = () => {
//     setImageFailed(true);
//   };

//   const getFullAddress = () => {
//     const parts = [profile.city, profile.state, profile.country].filter(
//       Boolean,
//     );
//     return parts.length > 0 ? parts.join(", ") : "Address not set";
//   };

//   const getInitials = () => {
//     const names = profile.fullName.split(" ");
//     return names
//       .map((name) => name[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   const formatWorkDate = (month?: number, year?: number) => {
//     if (!year) return "";
//     const monthNames = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     const monthName = month ? monthNames[month - 1] : "";
//     return month ? `${monthName} ${year}` : `${year}`;
//   };

//   const formatEducationDate = (year?: number) => {
//     return year ? year.toString() : "";
//   };

//   const formatDuration = (duration?: number) => {
//     if (!duration) return "";
//     const years = Math.floor(duration / 12);
//     const months = duration % 12;

//     if (years > 0 && months > 0) {
//       return `${years} yr${years > 1 ? "s" : ""} ${months} mo${months > 1 ? "s" : ""}`;
//     } else if (years > 0) {
//       return `${years} yr${years > 1 ? "s" : ""}`;
//     } else {
//       return `${months} mo${months > 1 ? "s" : ""}`;
//     }
//   };

//   if (loading) {
//     return (
//       <div
//         className="min-h-screen flex items-center justify-center"
//         style={{ backgroundColor: uniTalentColors.background }}
//       >
//         <div className="text-center">
//           <div className="mb-6 inline-block">
//             <div
//               className="w-16 h-16 border-4 rounded-full animate-spin"
//               style={{
//                 borderColor: uniTalentColors.lightGray,
//                 borderTopColor: uniTalentColors.primary,
//               }}
//             ></div>
//           </div>
//           <p
//             className="text-lg font-medium"
//             style={{ color: uniTalentColors.text }}
//           >
//             Loading your profile...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error && !profile.fullName) {
//     return (
//       <div
//         className="min-h-screen flex items-center justify-center p-4"
//         style={{ backgroundColor: uniTalentColors.background }}
//       >
//         <div
//           className="rounded-2xl shadow-lg p-8 max-w-md w-full text-center"
//           style={{ backgroundColor: uniTalentColors.white }}
//         >
//           <div className="mb-4 text-5xl">⚠️</div>
//           <h2
//             className="text-2xl font-bold mb-2"
//             style={{ color: uniTalentColors.primary }}
//           >
//             Error
//           </h2>
//           <p className="mb-6" style={{ color: uniTalentColors.secondary }}>
//             {error}
//           </p>
//           <button
//             onClick={fetchProfile}
//             className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg"
//             style={{ backgroundColor: uniTalentColors.primary }}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ backgroundColor: uniTalentColors.background }}>
//       {/* Success Toast */}
//       {saveSuccess && (
//         <div
//           className="fixed top-6 right-6 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-pulse z-50 text-white font-medium"
//           style={{ backgroundColor: uniTalentColors.primary }}
//         >
//           ✓ Profile updated successfully!
//         </div>
//       )}

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Profile Header Card */}
//         <div className="relative mb-12">
//           <div
//             className="rounded-3xl shadow-lg overflow-hidden border-2"
//             style={{
//               backgroundColor: uniTalentColors.white,
//               borderColor: uniTalentColors.lightGray,
//             }}
//           >
//             {/* Header Background */}
//             <div
//               className="h-40"
//               style={{ backgroundColor: uniTalentColors.white }}
//             ></div>

//             {/* Profile Content */}
//             <div className="px-8 sm:px-10 pb-10">
//               <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-end -mt-20 relative z-10">
//                 {/* Avatar */}
//                 <div className="flex-shrink-0">
//                   {profile.avatar && !imageFailed ? (
//                     <div className="relative group">
//                       <img
//                         src={profile.avatar}
//                         alt={profile.fullName}
//                         className="w-40 h-40 rounded-2xl object-cover ring-4 ring-white shadow-xl"
//                         onError={handleImageError}
//                       />
//                       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-2xl transition-all duration-300"></div>
//                     </div>
//                   ) : (
//                     <div
//                       className="w-40 h-40 rounded-2xl ring-4 ring-white flex items-center justify-center text-5xl font-bold text-white shadow-xl"
//                       style={{ backgroundColor: uniTalentColors.primary }}
//                     >
//                       {profile.fullName ? getInitials() : "U"}
//                     </div>
//                   )}
//                 </div>

//                 {/* Profile Info */}
//                 <div className="flex-1 pt-4">
//                   <h1
//                     className="text-4xl font-bold mb-1"
//                     style={{ color: uniTalentColors.primary }}
//                   >
//                     {profile.fullName || "Your Name"}
//                   </h1>
//                   <p
//                     className="text-xl font-semibold mb-4"
//                     style={{ color: uniTalentColors.secondary }}
//                   >
//                     {profile.headline}
//                   </p>
//                   <div
//                     className="space-y-2"
//                     style={{ color: uniTalentColors.secondary }}
//                   >
//                     <div className="flex items-center gap-3">
//                       <Mail
//                         size={18}
//                         style={{ color: uniTalentColors.primary }}
//                       />
//                       <span className="font-medium">
//                         {profile.email || "email@example.com"}
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <MapPin
//                         size={18}
//                         style={{ color: uniTalentColors.primary }}
//                       />
//                       <span className="font-medium">{getFullAddress()}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Phone
//                         size={18}
//                         style={{ color: uniTalentColors.primary }}
//                       />
//                       <span className="font-medium">
//                         {profile.phoneNumber || "Not provided"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Edit Button */}
//                 {!isEditing && (
//                   <button
//                     onClick={handleEditClick}
//                     className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 whitespace-nowrap"
//                     style={{ backgroundColor: uniTalentColors.primary }}
//                   >
//                     <Edit2 size={20} />
//                     Edit Profile
//                   </button>
//                 )}
//               </div>

//               {/* Bio Section */}
//               {!isEditing && (
//                 <div
//                   className="mt-8 pt-8"
//                   style={{
//                     borderTopColor: uniTalentColors.lightGray,
//                     borderTopWidth: "2px",
//                   }}
//                 >
//                   <h3
//                     className="text-lg font-semibold mb-3"
//                     style={{ color: uniTalentColors.text }}
//                   >
//                     About
//                   </h3>
//                   <p
//                     className="leading-relaxed text-base"
//                     style={{ color: uniTalentColors.secondary }}
//                   >
//                     {profile.bio || "No bio added yet"}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Edit Form */}
//         {isEditing && editedProfile && (
//           <div
//             className="rounded-3xl shadow-lg p-10 border-2 mb-12"
//             style={{
//               backgroundColor: uniTalentColors.white,
//               borderColor: uniTalentColors.lightGray,
//             }}
//           >
//             <h2
//               className="text-3xl font-bold mb-8"
//               style={{ color: uniTalentColors.text }}
//             >
//               Edit Profile
//             </h2>

//             {saveError && (
//               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
//                 {saveError}
//               </div>
//             )}

//             <div className="space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                   <label
//                     className="block text-sm font-semibold mb-3"
//                     style={{ color: uniTalentColors.text }}
//                   >
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     value={editedProfile.fullName}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all"
//                     style={{ borderColor: uniTalentColors.lightGray }}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     className="block text-sm font-semibold mb-3"
//                     style={{ color: uniTalentColors.text }}
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={editedProfile.email}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all"
//                     style={{ borderColor: uniTalentColors.lightGray }}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     className="block text-sm font-semibold mb-3"
//                     style={{ color: uniTalentColors.text }}
//                   >
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     value={editedProfile.phoneNumber}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all"
//                     style={{ borderColor: uniTalentColors.lightGray }}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     className="block text-sm font-semibold mb-3"
//                     style={{ color: uniTalentColors.text }}
//                   >
//                     Headline
//                   </label>
//                   <input
//                     type="text"
//                     name="headline"
//                     value={editedProfile.headline}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all"
//                     style={{ borderColor: uniTalentColors.lightGray }}
//                     placeholder="e.g., Full Stack Developer"
//                   />
//                 </div>
//               </div>

//               <div
//                 className="pt-6"
//                 style={{
//                   borderTopColor: uniTalentColors.lightGray,
//                   borderTopWidth: "2px",
//                 }}
//               >
//                 <h3
//                   className="text-lg font-semibold mb-6"
//                   style={{ color: uniTalentColors.text }}
//                 >
//                   Address
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                   <div>
//                     <label
//                       className="block text-sm font-semibold mb-3"
//                       style={{ color: uniTalentColors.text }}
//                     >
//                       Country
//                     </label>
//                     <input
//                       type="text"
//                       name="country"
//                       value={editedProfile.country}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all"
//                       style={{ borderColor: uniTalentColors.lightGray }}
//                       placeholder="India"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       className="block text-sm font-semibold mb-3"
//                       style={{ color: uniTalentColors.text }}
//                     >
//                       State
//                     </label>
//                     <input
//                       type="text"
//                       name="state"
//                       value={editedProfile.state}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all"
//                       style={{ borderColor: uniTalentColors.lightGray }}
//                       placeholder="Maharashtra"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       className="block text-sm font-semibold mb-3"
//                       style={{ color: uniTalentColors.text }}
//                     >
//                       City
//                     </label>
//                     <input
//                       type="text"
//                       name="city"
//                       value={editedProfile.city}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all"
//                       style={{ borderColor: uniTalentColors.lightGray }}
//                       placeholder="Nashik"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label
//                   className="block text-sm font-semibold mb-3"
//                   style={{ color: uniTalentColors.text }}
//                 >
//                   About
//                 </label>
//                 <textarea
//                   name="bio"
//                   value={editedProfile.bio}
//                   onChange={handleInputChange}
//                   rows={5}
//                   className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all resize-none"
//                   style={{ borderColor: uniTalentColors.lightGray }}
//                   placeholder="Tell us about yourself..."
//                 />
//               </div>

//               <div className="flex gap-4 pt-6">
//                 <button
//                   onClick={handleSave}
//                   disabled={saveLoading}
//                   className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg disabled:opacity-50"
//                   style={{ backgroundColor: uniTalentColors.primary }}
//                 >
//                   <Save size={20} />
//                   {saveLoading ? "Saving..." : "Save Changes"}
//                 </button>
//                 <button
//                   onClick={handleCancel}
//                   disabled={saveLoading}
//                   className="flex-1 px-6 py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
//                   style={{
//                     backgroundColor: uniTalentColors.background,
//                     color: uniTalentColors.text,
//                     border: `2px solid ${uniTalentColors.lightGray}`,
//                   }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Experience Section */}
//         {!isEditing && workExperiences && workExperiences.length > 0 && (
//           <div className="mb-12">
//             <div className="flex items-center gap-3 mb-6">
//               <Briefcase size={28} style={{ color: uniTalentColors.primary }} />
//               <h2
//                 className="text-3xl font-bold"
//                 style={{ color: uniTalentColors.text }}
//               >
//                 Experience
//               </h2>
//             </div>

//             <div className="space-y-6">
//               {workExperiences.map((exp, index) => (
//                 <div
//                   key={exp._id || index}
//                   className="rounded-2xl shadow-lg p-8 border-2"
//                   style={{
//                     backgroundColor: uniTalentColors.white,
//                     borderColor: uniTalentColors.lightGray,
//                   }}
//                 >
//                   <div className="flex items-start justify-between mb-4">
//                     <div>
//                       <h3
//                         className="text-2xl font-bold mb-2"
//                         style={{ color: uniTalentColors.text }}
//                       >
//                         {exp.jobTitle}
//                       </h3>
//                       <p
//                         className="text-lg font-semibold"
//                         style={{ color: uniTalentColors.primary }}
//                       >
//                         {exp.companyName}
//                       </p>
//                       {exp.typeOfRole && (
//                         <p
//                           className="text-sm"
//                           style={{ color: uniTalentColors.secondary }}
//                         >
//                           {exp.typeOfRole}
//                         </p>
//                       )}
//                     </div>
//                     {exp.currentlyWorking && (
//                       <span
//                         className="px-4 py-2 rounded-lg font-semibold text-white text-sm whitespace-nowrap"
//                         style={{ backgroundColor: uniTalentColors.primary }}
//                       >
//                         Currently Working
//                       </span>
//                     )}
//                   </div>

//                   <div
//                     className="flex items-center gap-2 mb-4"
//                     style={{ color: uniTalentColors.secondary }}
//                   >
//                     <Calendar size={16} />
//                     <span>
//                       {formatWorkDate(exp.startMonth, exp.startYear)} -{" "}
//                       {exp.currentlyWorking
//                         ? "Present"
//                         : formatWorkDate(exp.endMonth, exp.endYear)}
//                     </span>
//                     {exp.duration && (
//                       <span
//                         className="ml-2 px-3 py-1 rounded-full text-xs font-semibold"
//                         style={{
//                           backgroundColor: `${uniTalentColors.primary}20`,
//                           color: uniTalentColors.primary,
//                         }}
//                       >
//                         {formatDuration(exp.duration)}
//                       </span>
//                     )}
//                   </div>

//                   {exp.description && (
//                     <p
//                       className="leading-relaxed"
//                       style={{ color: uniTalentColors.secondary }}
//                     >
//                       {exp.description}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Education Section */}
//         {!isEditing && educations && educations.length > 0 && (
//           <div className="mb-12">
//             <div className="flex items-center gap-3 mb-6">
//               <BookOpen size={28} style={{ color: uniTalentColors.primary }} />
//               <h2
//                 className="text-3xl font-bold"
//                 style={{ color: uniTalentColors.text }}
//               >
//                 Education
//               </h2>
//             </div>

//             <div className="space-y-6">
//               {educations.map((edu, index) => (
//                 <div
//                   key={edu._id || index}
//                   className="rounded-2xl shadow-lg p-8 border-2"
//                   style={{
//                     backgroundColor: uniTalentColors.white,
//                     borderColor: uniTalentColors.lightGray,
//                   }}
//                 >
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex-1">
//                       <h3
//                         className="text-2xl font-bold mb-2"
//                         style={{ color: uniTalentColors.text }}
//                       >
//                         {edu.degree}
//                       </h3>
//                       <p
//                         className="text-lg font-semibold"
//                         style={{ color: uniTalentColors.primary }}
//                       >
//                         {edu.schoolName}
//                       </p>
//                       {edu.fieldOfStudy && (
//                         <p
//                           className="text-base font-medium"
//                           style={{ color: uniTalentColors.secondary }}
//                         >
//                           {edu.fieldOfStudy}
//                         </p>
//                       )}
//                     </div>
//                     {edu.gpa && (
//                       <span
//                         className="px-4 py-2 rounded-lg font-semibold text-white whitespace-nowrap"
//                         style={{ backgroundColor: uniTalentColors.primary }}
//                       >
//                         GPA: {edu.gpa}
//                       </span>
//                     )}
//                   </div>

//                   <div
//                     className="flex items-center gap-2 mb-4"
//                     style={{ color: uniTalentColors.secondary }}
//                   >
//                     <Calendar size={16} />
//                     <span>
//                       {formatEducationDate(edu.startYear)} -{" "}
//                       {edu.currentlyStudying
//                         ? "Present"
//                         : formatEducationDate(edu.endYear)}
//                     </span>
//                     {edu.duration && (
//                       <span
//                         className="ml-2 px-3 py-1 rounded-full text-xs font-semibold"
//                         style={{
//                           backgroundColor: `${uniTalentColors.primary}20`,
//                           color: uniTalentColors.primary,
//                         }}
//                       >
//                         {formatDuration(edu.duration)}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Empty States */}
//         {!isEditing && (!workExperiences || workExperiences.length === 0) && (
//           <div className="mb-12">
//             <div className="flex items-center gap-3 mb-6">
//               <Briefcase size={28} style={{ color: uniTalentColors.primary }} />
//               <h2
//                 className="text-3xl font-bold"
//                 style={{ color: uniTalentColors.text }}
//               >
//                 Experience
//               </h2>
//             </div>
//             <div
//               className="rounded-2xl shadow-lg p-12 border-2 text-center"
//               style={{
//                 backgroundColor: uniTalentColors.white,
//                 borderColor: uniTalentColors.lightGray,
//               }}
//             >
//               <p
//                 className="text-lg"
//                 style={{ color: uniTalentColors.secondary }}
//               >
//                 No work experience added yet
//               </p>
//             </div>
//           </div>
//         )}

//         {!isEditing && (!educations || educations.length === 0) && (
//           <div>
//             <div className="flex items-center gap-3 mb-6">
//               <BookOpen size={28} style={{ color: uniTalentColors.primary }} />
//               <h2
//                 className="text-3xl font-bold"
//                 style={{ color: uniTalentColors.text }}
//               >
//                 Education
//               </h2>
//             </div>
//             <div
//               className="rounded-2xl shadow-lg p-12 border-2 text-center"
//               style={{
//                 backgroundColor: uniTalentColors.white,
//                 borderColor: uniTalentColors.lightGray,
//               }}
//             >
//               <p
//                 className="text-lg"
//                 style={{ color: uniTalentColors.secondary }}
//               >
//                 No education added yet
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyProfile;
// import React, { useState, useEffect } from "react";
// import {
//   Edit2,
//   Mail,
//   MapPin,
//   Briefcase,
//   Phone,
//   Save,
//   Calendar,
//   BookOpen,
//   User,
//   Award,
//   Clock,
//   ChevronRight,
// } from "lucide-react";
// import { uniTalentColors } from "src/common/Colors";
// import API from "src/common/API";
// import { URL_PATH } from "src/common/API";
// import Navbar from "src/ui/components/Navbar";
// import Footer from "../ui/components/Footer";

// interface UserProfile {
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   country: string;
//   state: string;
//   city: string;
//   headline: string;
//   bio: string;
//   avatar: string;
//   joinDate: string;
// }

// interface WorkExperience {
//   _id?: string;
//   jobTitle?: string;
//   companyName?: string;
//   startMonth?: number;
//   startYear?: number;
//   endMonth?: number;
//   endYear?: number;
//   currentlyWorking?: boolean;
//   description?: string;
//   typeOfRole?: string;
//   duration?: number;
// }

// interface Education {
//   _id?: string;
//   degree?: string;
//   fieldOfStudy?: string;
//   schoolName?: string;
//   startYear?: number;
//   endYear?: number;
//   currentlyStudying?: boolean;
//   gpa?: string;
//   duration?: number;
// }

// const DEFAULT_PROFILE: UserProfile = {
//   fullName: "",
//   email: "",
//   phoneNumber: "",
//   country: "",
//   state: "",
//   city: "",
//   headline: "Professional",
//   bio: "",
//   avatar: "",
//   joinDate: "",
// };

// const MyProfile: React.FC = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
//   const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
//   const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
//   const [educations, setEducations] = useState<Education[]>([]);
//   const [imageFailed, setImageFailed] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [saveLoading, setSaveLoading] = useState(false);
//   const [saveError, setSaveError] = useState<string | null>(null);
//   const [saveSuccess, setSaveSuccess] = useState(false);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const extractProfileData = (responseData: any): UserProfile => {
//     const demographicsArray = responseData?.demographics || [];
//     const demographics = demographicsArray[0] || {};
//     const documents = responseData?.documents || {};

//     return {
//       fullName: demographics?.fullName || "",
//       email: demographics?.email || "",
//       phoneNumber: demographics?.phoneNumber || "",
//       country: demographics?.country || "",
//       state: demographics?.state || "",
//       city: demographics?.city || "",
//       headline: demographics?.headline || "Professional",
//       bio: demographics?.bio || "",
//       avatar: documents?.profileUrl || "",
//       joinDate: demographics?.createdAt
//         ? new Date(demographics.createdAt).toLocaleDateString()
//         : "",
//     };
//   };

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await API("GET", URL_PATH.getUserProfile);
//       const dashboardData = response?.data || response;

//       const profileData = extractProfileData(dashboardData);
//       setProfile(profileData);

//       const experiences = dashboardData?.workExperience || [];
//       setWorkExperiences(experiences);

//       const edus = dashboardData?.education || [];
//       setEducations(edus);

//       setImageFailed(false);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Failed to load profile";
//       setError(errorMessage);
//       console.error("Error fetching profile:", err);
//       setProfile(DEFAULT_PROFILE);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditClick = () => {
//     setEditedProfile(profile);
//     setIsEditing(true);
//   };

//   const handleSave = async () => {
//     if (!editedProfile) return;

//     try {
//       setSaveLoading(true);
//       setSaveError(null);

//       const dataToUpdate = {
//         fullName: editedProfile.fullName,
//         email: editedProfile.email,
//         phoneNumber: editedProfile.phoneNumber,
//         country: editedProfile.country,
//         state: editedProfile.state,
//         city: editedProfile.city,
//         headline: editedProfile.headline,
//         bio: editedProfile.bio,
//       };

//       await API("POST", URL_PATH.demographics, dataToUpdate);

//       setProfile(editedProfile);
//       setIsEditing(false);
//       setSaveSuccess(true);

//       setTimeout(() => setSaveSuccess(false), 3000);
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error ? err.message : "Failed to save profile";
//       setSaveError(errorMessage);
//     } finally {
//       setSaveLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditedProfile(null);
//     setSaveError(null);
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;
//     if (editedProfile) {
//       setEditedProfile((prev) => {
//         if (!prev) return null;
//         return {
//           ...prev,
//           [name]: value,
//         } as UserProfile;
//       });
//     }
//   };

//   const handleImageError = () => {
//     setImageFailed(true);
//   };

//   const getFullAddress = () => {
//     const parts = [profile.city, profile.state, profile.country].filter(
//       Boolean,
//     );
//     return parts.length > 0 ? parts.join(", ") : "Address not set";
//   };

//   const getInitials = () => {
//     const names = profile.fullName.split(" ");
//     return names
//       .map((name) => name[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   const formatWorkDate = (month?: number, year?: number) => {
//     if (!year) return "";
//     const monthNames = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     const monthName = month ? monthNames[month - 1] : "";
//     return month ? `${monthName} ${year}` : `${year}`;
//   };

//   const formatEducationDate = (year?: number) => {
//     return year ? year.toString() : "";
//   };

//   const formatDuration = (duration?: number) => {
//     if (!duration) return "";
//     const years = Math.floor(duration / 12);
//     const months = duration % 12;

//     if (years > 0 && months > 0) {
//       return `${years} yr${years > 1 ? "s" : ""} ${months} mo${months > 1 ? "s" : ""}`;
//     } else if (years > 0) {
//       return `${years} yr${years > 1 ? "s" : ""}`;
//     } else {
//       return `${months} mo${months > 1 ? "s" : ""}`;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-neutral-50 relative overflow-hidden flex flex-col">
//         {/* Background Gradient Effects */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div
//             className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20"
//             style={{ backgroundColor: uniTalentColors.primary }}
//           />
//           <div
//             className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20"
//             style={{ backgroundColor: uniTalentColors.secondary }}
//           />
//         </div>
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center">
//           <div className="text-center">
//             <div
//               className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
//               style={{ borderColor: uniTalentColors.primary }}
//             ></div>
//             <p
//               className="mt-4 text-sm"
//               style={{ color: uniTalentColors.secondary }}
//             >
//               Loading your profile...
//             </p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (error && !profile.fullName) {
//     return (
//       <div className="min-h-screen bg-neutral-50 relative overflow-hidden flex flex-col">
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div
//             className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20"
//             style={{ backgroundColor: uniTalentColors.primary }}
//           />
//         </div>
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-4">
//           <div
//             className="backdrop-blur-xl rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
//             style={{
//               backgroundColor: `${uniTalentColors.white}CC`,
//               border: `1px solid ${uniTalentColors.white}`,
//             }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />
//             <div className="relative z-10">
//               <div className="mb-4 text-6xl">⚠️</div>
//               <h2
//                 className="text-2xl font-light mb-2"
//                 style={{ color: uniTalentColors.text }}
//               >
//                 Error
//               </h2>
//               <p
//                 className="mb-6 text-sm"
//                 style={{ color: uniTalentColors.secondary }}
//               >
//                 {error}
//               </p>
//               <button
//                 onClick={fetchProfile}
//                 className="group relative w-full h-12 rounded-2xl font-medium overflow-hidden"
//               >
//                 <div
//                   className="absolute inset-0 transition-all duration-300 group-hover:scale-105"
//                   style={{
//                     background: `linear-gradient(135deg, ${uniTalentColors.primary}, ${uniTalentColors.secondary})`,
//                   }}
//                 />
//                 <span className="relative z-10 text-white">Try Again</span>
//               </button>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-neutral-50 relative overflow-hidden flex flex-col">
//       {/* Background Gradient Effects */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div
//           className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20"
//           style={{ backgroundColor: uniTalentColors.primary }}
//         />
//         <div
//           className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20"
//           style={{ backgroundColor: uniTalentColors.secondary }}
//         />

//         {/* Decorative Shapes */}
//         <div className="absolute top-20 left-20 opacity-10">
//           <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
//             <circle
//               cx="60"
//               cy="60"
//               r="40"
//               stroke={uniTalentColors.primary}
//               strokeWidth="2"
//               strokeDasharray="4 4"
//             />
//             <circle
//               cx="60"
//               cy="60"
//               r="20"
//               fill={uniTalentColors.primary}
//               opacity="0.2"
//             />
//           </svg>
//         </div>

//         <div className="absolute bottom-20 right-20 opacity-10">
//           <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
//             <rect
//               x="25"
//               y="25"
//               width="100"
//               height="100"
//               rx="20"
//               stroke={uniTalentColors.primary}
//               strokeWidth="2"
//               strokeDasharray="6 6"
//             />
//             <rect
//               x="45"
//               y="45"
//               width="60"
//               height="60"
//               rx="12"
//               fill={uniTalentColors.primary}
//               opacity="0.2"
//             />
//           </svg>
//         </div>

//         <div className="absolute top-1/2 right-10 opacity-10">
//           <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
//             <path
//               d="M20 50L50 20L80 50L50 80L20 50Z"
//               stroke={uniTalentColors.primary}
//               strokeWidth="2"
//             />
//             <circle
//               cx="50"
//               cy="50"
//               r="15"
//               fill={uniTalentColors.primary}
//               opacity="0.2"
//             />
//           </svg>
//         </div>
//       </div>

//       <Navbar />

//       {/* Success Toast */}
//       {saveSuccess && (
//         <div className="fixed top-24 right-6 z-50 animate-slide-down">
//           <div
//             className="backdrop-blur-xl rounded-2xl px-6 py-3 shadow-2xl flex items-center gap-2"
//             style={{
//               backgroundColor: `${uniTalentColors.white}CC`,
//               border: `1px solid ${uniTalentColors.white}`,
//             }}
//           >
//             <div
//               className="w-6 h-6 rounded-full flex items-center justify-center"
//               style={{ backgroundColor: uniTalentColors.primary }}
//             >
//               <span className="text-white text-sm">✓</span>
//             </div>
//             <span style={{ color: uniTalentColors.text }}>
//               Profile updated successfully!
//             </span>
//           </div>
//         </div>
//       )}

//       <div className="flex-1 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 w-full">
//         <div className="flex justify-center">
//           <div className="w-full max-w-[1000px]">
//             {/* Profile Header Glass Card */}
//             <div
//               className="backdrop-blur-xl rounded-3xl shadow-2xl relative overflow-hidden mb-8"
//               style={{
//                 backgroundColor: `${uniTalentColors.white}CC`,
//                 border: `1px solid ${uniTalentColors.white}`,
//               }}
//             >
//               {/* Inner Glow Effect */}
//               <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

//               {/* Decorative Icon */}
//               <div className="absolute top-4 right-4 opacity-20 pointer-events-none">
//                 <User size={48} style={{ color: uniTalentColors.primary }} />
//               </div>

//               <div className="relative z-10 p-6 md:p-8">
//                 <div className="flex flex-col md:flex-row gap-8 items-start">
//                   {/* Avatar */}
//                   <div className="flex-shrink-0">
//                     {profile.avatar && !imageFailed ? (
//                       <div className="relative group">
//                         <img
//                           src={profile.avatar}
//                           alt={profile.fullName}
//                           className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-xl"
//                           style={{
//                             boxShadow: `0 0 0 4px ${uniTalentColors.white}`,
//                           }}
//                           onError={handleImageError}
//                         />
//                         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-2xl transition-all duration-300"></div>
//                       </div>
//                     ) : (
//                       <div
//                         className="w-32 h-32 md:w-40 md:h-40 rounded-2xl flex items-center justify-center text-4xl md:text-5xl font-bold text-white shadow-xl"
//                         style={{
//                           backgroundColor: uniTalentColors.primary,
//                           boxShadow: `0 0 0 4px ${uniTalentColors.white}`,
//                         }}
//                       >
//                         {profile.fullName ? getInitials() : "U"}
//                       </div>
//                     )}
//                   </div>

//                   {/* Profile Info */}
//                   <div className="flex-1">
//                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
//                       <div>
//                         <h1
//                           className="text-3xl md:text-4xl font-light mb-1"
//                           style={{ color: uniTalentColors.text }}
//                         >
//                           {profile.fullName || "Your Name"}
//                         </h1>
//                         <p
//                           className="text-lg md:text-xl font-light"
//                           style={{ color: uniTalentColors.secondary }}
//                         >
//                           {profile.headline}
//                         </p>
//                       </div>

//                       {!isEditing && (
//                         <button
//                           onClick={handleEditClick}
//                           className="group relative h-12 px-6 rounded-2xl font-medium overflow-hidden whitespace-nowrap"
//                         >
//                           <div
//                             className="absolute inset-0 transition-all duration-300 group-hover:scale-105"
//                             style={{
//                               background: `linear-gradient(135deg, ${uniTalentColors.primary}, ${uniTalentColors.secondary})`,
//                             }}
//                           />
//                           <span className="relative z-10 flex items-center gap-2 text-white">
//                             <Edit2 size={18} />
//                             Edit Profile
//                           </span>
//                         </button>
//                       )}
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                       <div
//                         className="flex items-center gap-3 p-3 rounded-xl"
//                         style={{
//                           backgroundColor: `${uniTalentColors.primary}08`,
//                         }}
//                       >
//                         <Mail
//                           size={18}
//                           style={{ color: uniTalentColors.primary }}
//                         />
//                         <span
//                           className="text-sm"
//                           style={{ color: uniTalentColors.secondary }}
//                         >
//                           {profile.email || "email@example.com"}
//                         </span>
//                       </div>
//                       <div
//                         className="flex items-center gap-3 p-3 rounded-xl"
//                         style={{
//                           backgroundColor: `${uniTalentColors.primary}08`,
//                         }}
//                       >
//                         <MapPin
//                           size={18}
//                           style={{ color: uniTalentColors.primary }}
//                         />
//                         <span
//                           className="text-sm"
//                           style={{ color: uniTalentColors.secondary }}
//                         >
//                           {getFullAddress()}
//                         </span>
//                       </div>
//                       <div
//                         className="flex items-center gap-3 p-3 rounded-xl"
//                         style={{
//                           backgroundColor: `${uniTalentColors.primary}08`,
//                         }}
//                       >
//                         <Phone
//                           size={18}
//                           style={{ color: uniTalentColors.primary }}
//                         />
//                         <span
//                           className="text-sm"
//                           style={{ color: uniTalentColors.secondary }}
//                         >
//                           {profile.phoneNumber || "Not provided"}
//                         </span>
//                       </div>
//                       <div
//                         className="flex items-center gap-3 p-3 rounded-xl"
//                         style={{
//                           backgroundColor: `${uniTalentColors.primary}08`,
//                         }}
//                       >
//                         <Calendar
//                           size={18}
//                           style={{ color: uniTalentColors.primary }}
//                         />
//                         <span
//                           className="text-sm"
//                           style={{ color: uniTalentColors.secondary }}
//                         >
//                           Joined {profile.joinDate || "Recently"}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Bio */}
//                     {!isEditing && profile.bio && (
//                       <div
//                         className="mt-6 p-4 rounded-xl"
//                         style={{
//                           backgroundColor: `${uniTalentColors.primary}08`,
//                         }}
//                       >
//                         <p
//                           className="text-sm leading-relaxed"
//                           style={{ color: uniTalentColors.secondary }}
//                         >
//                           {profile.bio}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Edit Form */}
//             {isEditing && editedProfile && (
//               <div
//                 className="backdrop-blur-xl rounded-3xl shadow-2xl relative overflow-hidden mb-8"
//                 style={{
//                   backgroundColor: `${uniTalentColors.white}CC`,
//                   border: `1px solid ${uniTalentColors.white}`,
//                 }}
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

//                 <div className="relative z-10 p-6 md:p-8">
//                   <h2
//                     className="text-2xl font-light mb-6"
//                     style={{ color: uniTalentColors.text }}
//                   >
//                     Edit Profile
//                   </h2>

//                   {saveError && (
//                     <div
//                       className="mb-6 p-4 rounded-xl"
//                       style={{
//                         backgroundColor: `${uniTalentColors.primary}15`,
//                       }}
//                     >
//                       <p style={{ color: uniTalentColors.primary }}>
//                         {saveError}
//                       </p>
//                     </div>
//                   )}

//                   <div className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <label
//                           className="block text-sm font-medium mb-2"
//                           style={{ color: uniTalentColors.text }}
//                         >
//                           Full Name
//                         </label>
//                         <input
//                           type="text"
//                           name="fullName"
//                           value={editedProfile.fullName}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:outline-none transition-all"
//                           style={{
//                             borderColor: uniTalentColors.lightGray,
//                             color: uniTalentColors.text,
//                           }}
//                         />
//                       </div>

//                       <div>
//                         <label
//                           className="block text-sm font-medium mb-2"
//                           style={{ color: uniTalentColors.text }}
//                         >
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={editedProfile.email}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:outline-none transition-all"
//                           style={{
//                             borderColor: uniTalentColors.lightGray,
//                             color: uniTalentColors.text,
//                           }}
//                         />
//                       </div>

//                       <div>
//                         <label
//                           className="block text-sm font-medium mb-2"
//                           style={{ color: uniTalentColors.text }}
//                         >
//                           Phone Number
//                         </label>
//                         <input
//                           type="tel"
//                           name="phoneNumber"
//                           value={editedProfile.phoneNumber}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:outline-none transition-all"
//                           style={{
//                             borderColor: uniTalentColors.lightGray,
//                             color: uniTalentColors.text,
//                           }}
//                         />
//                       </div>

//                       <div>
//                         <label
//                           className="block text-sm font-medium mb-2"
//                           style={{ color: uniTalentColors.text }}
//                         >
//                           Headline
//                         </label>
//                         <input
//                           type="text"
//                           name="headline"
//                           value={editedProfile.headline}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:outline-none transition-all"
//                           style={{
//                             borderColor: uniTalentColors.lightGray,
//                             color: uniTalentColors.text,
//                           }}
//                           placeholder="e.g., Full Stack Developer"
//                         />
//                       </div>
//                     </div>

//                     <div className="pt-4">
//                       <h3
//                         className="text-lg font-light mb-4"
//                         style={{ color: uniTalentColors.text }}
//                       >
//                         Address
//                       </h3>
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <div>
//                           <label
//                             className="block text-sm font-medium mb-2"
//                             style={{ color: uniTalentColors.text }}
//                           >
//                             Country
//                           </label>
//                           <input
//                             type="text"
//                             name="country"
//                             value={editedProfile.country}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:outline-none transition-all"
//                             style={{
//                               borderColor: uniTalentColors.lightGray,
//                               color: uniTalentColors.text,
//                             }}
//                           />
//                         </div>

//                         <div>
//                           <label
//                             className="block text-sm font-medium mb-2"
//                             style={{ color: uniTalentColors.text }}
//                           >
//                             State
//                           </label>
//                           <input
//                             type="text"
//                             name="state"
//                             value={editedProfile.state}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:outline-none transition-all"
//                             style={{
//                               borderColor: uniTalentColors.lightGray,
//                               color: uniTalentColors.text,
//                             }}
//                           />
//                         </div>

//                         <div>
//                           <label
//                             className="block text-sm font-medium mb-2"
//                             style={{ color: uniTalentColors.text }}
//                           >
//                             City
//                           </label>
//                           <input
//                             type="text"
//                             name="city"
//                             value={editedProfile.city}
//                             onChange={handleInputChange}
//                             className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:outline-none transition-all"
//                             style={{
//                               borderColor: uniTalentColors.lightGray,
//                               color: uniTalentColors.text,
//                             }}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <label
//                         className="block text-sm font-medium mb-2"
//                         style={{ color: uniTalentColors.text }}
//                       >
//                         About
//                       </label>
//                       <textarea
//                         name="bio"
//                         value={editedProfile.bio}
//                         onChange={handleInputChange}
//                         rows={4}
//                         className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:outline-none transition-all resize-none"
//                         style={{
//                           borderColor: uniTalentColors.lightGray,
//                           color: uniTalentColors.text,
//                         }}
//                         placeholder="Tell us about yourself..."
//                       />
//                     </div>

//                     <div className="flex gap-4 pt-4">
//                       <button
//                         onClick={handleSave}
//                         disabled={saveLoading}
//                         className="group relative flex-1 h-12 rounded-2xl font-medium overflow-hidden"
//                       >
//                         <div
//                           className="absolute inset-0 transition-all duration-300 group-hover:scale-105"
//                           style={{
//                             background: `linear-gradient(135deg, ${uniTalentColors.primary}, ${uniTalentColors.secondary})`,
//                           }}
//                         />
//                         <span className="relative z-10 flex items-center justify-center gap-2 text-white">
//                           <Save size={18} />
//                           {saveLoading ? "Saving..." : "Save Changes"}
//                         </span>
//                       </button>
//                       <button
//                         onClick={handleCancel}
//                         disabled={saveLoading}
//                         className="flex-1 px-6 py-3 rounded-2xl font-medium transition-all duration-300"
//                         style={{
//                           backgroundColor: "transparent",
//                           color: uniTalentColors.text,
//                           border: `2px solid ${uniTalentColors.lightGray}`,
//                         }}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Experience Section */}
//             {!isEditing && workExperiences && workExperiences.length > 0 && (
//               <div className="mb-8">
//                 <div className="flex items-center gap-3 mb-6">
//                   <Briefcase
//                     size={28}
//                     style={{ color: uniTalentColors.primary }}
//                   />
//                   <h2
//                     className="text-2xl font-light"
//                     style={{ color: uniTalentColors.text }}
//                   >
//                     Experience
//                   </h2>
//                 </div>

//                 <div className="space-y-4">
//                   {workExperiences.map((exp, index) => (
//                     <div
//                       key={exp._id || index}
//                       className="backdrop-blur-xl rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
//                       style={{
//                         backgroundColor: `${uniTalentColors.white}CC`,
//                         border: `1px solid ${uniTalentColors.white}`,
//                       }}
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

//                       <div className="relative z-10">
//                         <div className="flex items-start justify-between mb-3">
//                           <div>
//                             <h3
//                               className="text-xl font-medium"
//                               style={{ color: uniTalentColors.text }}
//                             >
//                               {exp.jobTitle}
//                             </h3>
//                             <p
//                               className="text-base"
//                               style={{ color: uniTalentColors.primary }}
//                             >
//                               {exp.companyName}
//                             </p>
//                           </div>
//                           {exp.currentlyWorking && (
//                             <span
//                               className="px-3 py-1 rounded-full text-xs font-medium text-white"
//                               style={{
//                                 backgroundColor: uniTalentColors.primary,
//                               }}
//                             >
//                               Current
//                             </span>
//                           )}
//                         </div>

//                         <div
//                           className="flex items-center gap-4 mb-3 text-sm"
//                           style={{ color: uniTalentColors.secondary }}
//                         >
//                           <div className="flex items-center gap-1">
//                             <Calendar size={14} />
//                             <span>
//                               {formatWorkDate(exp.startMonth, exp.startYear)} -{" "}
//                               {exp.currentlyWorking
//                                 ? "Present"
//                                 : formatWorkDate(exp.endMonth, exp.endYear)}
//                             </span>
//                           </div>
//                           {exp.duration && (
//                             <div
//                               className="flex items-center gap-1 px-2 py-1 rounded-full"
//                               style={{
//                                 backgroundColor: `${uniTalentColors.primary}15`,
//                               }}
//                             >
//                               <Clock
//                                 size={12}
//                                 style={{ color: uniTalentColors.primary }}
//                               />
//                               <span
//                                 className="text-xs"
//                                 style={{ color: uniTalentColors.primary }}
//                               >
//                                 {formatDuration(exp.duration)}
//                               </span>
//                             </div>
//                           )}
//                         </div>

//                         {exp.description && (
//                           <p
//                             className="text-sm leading-relaxed"
//                             style={{ color: uniTalentColors.secondary }}
//                           >
//                             {exp.description}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Education Section */}
//             {!isEditing && educations && educations.length > 0 && (
//               <div className="mb-8">
//                 <div className="flex items-center gap-3 mb-6">
//                   <BookOpen
//                     size={28}
//                     style={{ color: uniTalentColors.primary }}
//                   />
//                   <h2
//                     className="text-2xl font-light"
//                     style={{ color: uniTalentColors.text }}
//                   >
//                     Education
//                   </h2>
//                 </div>

//                 <div className="space-y-4">
//                   {educations.map((edu, index) => (
//                     <div
//                       key={edu._id || index}
//                       className="backdrop-blur-xl rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
//                       style={{
//                         backgroundColor: `${uniTalentColors.white}CC`,
//                         border: `1px solid ${uniTalentColors.white}`,
//                       }}
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

//                       <div className="relative z-10">
//                         <div className="flex items-start justify-between mb-3">
//                           <div>
//                             <h3
//                               className="text-xl font-medium"
//                               style={{ color: uniTalentColors.text }}
//                             >
//                               {edu.degree}
//                             </h3>
//                             <p
//                               className="text-base"
//                               style={{ color: uniTalentColors.primary }}
//                             >
//                               {edu.schoolName}
//                             </p>
//                           </div>
//                           {edu.gpa && (
//                             <span
//                               className="px-3 py-1 rounded-full text-xs font-medium text-white"
//                               style={{
//                                 backgroundColor: uniTalentColors.primary,
//                               }}
//                             >
//                               GPA: {edu.gpa}
//                             </span>
//                           )}
//                         </div>

//                         <div
//                           className="flex items-center gap-4 mb-3 text-sm"
//                           style={{ color: uniTalentColors.secondary }}
//                         >
//                           <div className="flex items-center gap-1">
//                             <Calendar size={14} />
//                             <span>
//                               {formatEducationDate(edu.startYear)} -{" "}
//                               {edu.currentlyStudying
//                                 ? "Present"
//                                 : formatEducationDate(edu.endYear)}
//                             </span>
//                           </div>
//                           {edu.duration && (
//                             <div
//                               className="flex items-center gap-1 px-2 py-1 rounded-full"
//                               style={{
//                                 backgroundColor: `${uniTalentColors.primary}15`,
//                               }}
//                             >
//                               <Clock
//                                 size={12}
//                                 style={{ color: uniTalentColors.primary }}
//                               />
//                               <span
//                                 className="text-xs"
//                                 style={{ color: uniTalentColors.primary }}
//                               >
//                                 {formatDuration(edu.duration)}
//                               </span>
//                             </div>
//                           )}
//                         </div>

//                         {edu.fieldOfStudy && (
//                           <p
//                             className="text-sm"
//                             style={{ color: uniTalentColors.secondary }}
//                           >
//                             Field: {edu.fieldOfStudy}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Empty States with Illustrations */}
//             {!isEditing &&
//               (!workExperiences || workExperiences.length === 0) && (
//                 <div className="mb-8">
//                   <div className="flex items-center gap-3 mb-6">
//                     <Briefcase
//                       size={28}
//                       style={{ color: uniTalentColors.primary }}
//                     />
//                     <h2
//                       className="text-2xl font-light"
//                       style={{ color: uniTalentColors.text }}
//                     >
//                       Experience
//                     </h2>
//                   </div>
//                   <div
//                     className="backdrop-blur-xl rounded-2xl p-12 text-center shadow-xl relative overflow-hidden"
//                     style={{
//                       backgroundColor: `${uniTalentColors.white}CC`,
//                       border: `1px solid ${uniTalentColors.white}`,
//                     }}
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

//                     <div className="relative z-10 flex flex-col items-center">
//                       <div
//                         className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
//                         style={{
//                           backgroundColor: `${uniTalentColors.primary}15`,
//                         }}
//                       >
//                         <Briefcase
//                           size={40}
//                           style={{ color: uniTalentColors.primary }}
//                         />
//                       </div>
//                       <p
//                         className="text-lg font-light mb-2"
//                         style={{ color: uniTalentColors.text }}
//                       >
//                         No experience added yet
//                       </p>
//                       <p
//                         className="text-sm"
//                         style={{ color: uniTalentColors.secondary }}
//                       >
//                         Your work history will appear here
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//             {!isEditing && (!educations || educations.length === 0) && (
//               <div className="mb-8">
//                 <div className="flex items-center gap-3 mb-6">
//                   <BookOpen
//                     size={28}
//                     style={{ color: uniTalentColors.primary }}
//                   />
//                   <h2
//                     className="text-2xl font-light"
//                     style={{ color: uniTalentColors.text }}
//                   >
//                     Education
//                   </h2>
//                 </div>
//                 <div
//                   className="backdrop-blur-xl rounded-2xl p-12 text-center shadow-xl relative overflow-hidden"
//                   style={{
//                     backgroundColor: `${uniTalentColors.white}CC`,
//                     border: `1px solid ${uniTalentColors.white}`,
//                   }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

//                   <div className="relative z-10 flex flex-col items-center">
//                     <div
//                       className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
//                       style={{
//                         backgroundColor: `${uniTalentColors.primary}15`,
//                       }}
//                     >
//                       <BookOpen
//                         size={40}
//                         style={{ color: uniTalentColors.primary }}
//                       />
//                     </div>
//                     <p
//                       className="text-lg font-light mb-2"
//                       style={{ color: uniTalentColors.text }}
//                     >
//                       No education added yet
//                     </p>
//                     <p
//                       className="text-sm"
//                       style={{ color: uniTalentColors.secondary }}
//                     >
//                       Your academic background will appear here
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default MyProfile;
import React, { useState, useEffect } from "react";
import {
  Edit2,
  Mail,
  MapPin,
  Briefcase,
  Phone,
  Save,
  Calendar,
  BookOpen,
  User,
  Award,
  Clock,
  ChevronRight,
  Plus,
  X,
  FileCheck,
  Package,
  Link as LinkIcon,
  LogOut,
} from "lucide-react";
import { uniTalentColors } from "src/common/Colors";
import API from "src/common/API";
import { URL_PATH } from "src/common/API";
import Navbar from "src/ui/components/Navbar";
import Footer from "../ui/components/Footer";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  headline: string;
  bio: string;
  avatar: string;
  joinDate: string;
  phoneVisibleToRecruiters?: boolean;
}

interface WorkExperience {
  _id?: string;
  jobTitle?: string;
  companyName?: string;
  startMonth?: number;
  startYear?: number;
  endMonth?: number;
  endYear?: number;
  currentlyWorking?: boolean;
  description?: string;
  typeOfRole?: string;
  duration?: number;
}

interface Education {
  _id?: string;
  degree?: string;
  fieldOfStudy?: string;
  schoolName?: string;
  startYear?: number;
  endYear?: number;
  currentlyStudying?: boolean;
  gpa?: string;
  cgpa?: string;
  duration?: number;
}

interface Certification {
  _id?: string;
  certificationName: string;
  issuer: string;
  issueDate: string;
  credentialLink?: string;
}

interface Award {
  _id?: string;
  awardName: string;
  description?: string;
  year: number;
}

interface Project {
  _id?: string;
  projectName: string;
  role: string;
  summary?: string;
  outcome?: string;
  link?: string;
}

const DEFAULT_PROFILE: UserProfile = {
  fullName: "",
  email: "",
  phoneNumber: "",
  country: "",
  state: "",
  city: "",
  headline: "Professional",
  bio: "",
  avatar: "",
  joinDate: "",
};

const MyProfile: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);

  // Section data
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Edit states for each section
  const [editingExperience, setEditingExperience] =
    useState<WorkExperience | null>(null);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null,
  );
  const [editingCertification, setEditingCertification] =
    useState<Certification | null>(null);
  const [editingAward, setEditingAward] = useState<Award | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Modal visibility
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [showAwardModal, setShowAwardModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  const [imageFailed, setImageFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchWorkExperiences(),
      fetchEducations(),
      fetchCertifications(),
      fetchAwards(),
      fetchProjects(),
    ]);
  };

  const fetchWorkExperiences = async () => {
    try {
      const res = await API("GET", URL_PATH.getExperience);
      setWorkExperiences(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch experiences:", err);
    }
  };

  const fetchEducations = async () => {
    try {
      const res = await API("GET", URL_PATH.getEducation);
      setEducations(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch educations:", err);
    }
  };

  const fetchCertifications = async () => {
    try {
      const res = await API("GET", URL_PATH.getCertification);
      setCertifications(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch certifications:", err);
    }
  };

  const fetchAwards = async () => {
    try {
      const res = await API("GET", URL_PATH.getAwards);
      setAwards(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch awards:", err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await API("GET", URL_PATH.getProjects);
      setProjects(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  // FIXED: Updated to match the actual API response structure
  const extractProfileData = (responseData: any): UserProfile => {
    console.log("📊 extractProfileData - Full response:", responseData);

    // The data is nested under responseData.data
    const data = responseData?.data || {};
    const demographics = data?.demographics || {};
    const documents = responseData?.documents || {};

    console.log("📊 demographics:", demographics);
    console.log("📊 documents:", documents);

    return {
      fullName: demographics?.fullName || "",
      email: demographics?.email || "",
      phoneNumber: demographics?.phoneNumber || "",
      country: demographics?.country || "",
      state: demographics?.state || "",
      city: demographics?.city || "",
      headline: demographics?.headline || "Professional",
      bio: demographics?.bio || "",
      avatar: documents?.profileUrl || "",
      joinDate: demographics?.createdAt
        ? new Date(demographics.createdAt).toLocaleDateString()
        : "",
      phoneVisibleToRecruiters: demographics?.phoneVisibleToRecruiters || false,
    };
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await API("GET", URL_PATH.getUserProfile);
      console.log("📊 API Response:", response);

      // The response already contains the data structure
      const profileData = extractProfileData(response);
      setProfile(profileData);

      // Also update other sections from the profile response
      if (response?.data) {
        setEducations(response.data.education || []);
        setWorkExperiences(response.data.workExperience || []);
        setCertifications(response.data.certifications || []);
        setAwards(response.data.awards || []);
        setProjects(response.data.projects || []);
      }

      setImageFailed(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load profile";
      setError(errorMessage);
      console.error("Error fetching profile:", err);
      setProfile(DEFAULT_PROFILE);
    } finally {
      setLoading(false);
    }
  };

  // Profile edit handlers
  const handleEditClick = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(null);
    setSaveError(null);
  };

  const handleSaveProfile = async () => {
    if (!editedProfile) return;

    try {
      setSaveLoading(true);
      setSaveError(null);

      const dataToUpdate = {
        fullName: editedProfile.fullName,
        email: editedProfile.email,
        phoneNumber: editedProfile.phoneNumber,
        country: editedProfile.country,
        state: editedProfile.state,
        city: editedProfile.city,
        headline: editedProfile.headline,
        bio: editedProfile.bio,
        phoneVisibleToRecruiters: editedProfile.phoneVisibleToRecruiters,
      };

      await API("POST", URL_PATH.demographics, dataToUpdate);

      setProfile(editedProfile);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save profile";
      setSaveError(errorMessage);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Experience CRUD
  const handleSaveExperience = async (experience: WorkExperience) => {
    try {
      setSaveLoading(true);
      if (experience._id) {
        await API(
          "PUT",
          `${URL_PATH.experience}/${experience._id}`,
          experience,
        );
      } else {
        await API("POST", URL_PATH.experience, {
          workExperiences: [experience],
        });
      }
      await fetchWorkExperiences();
      setShowExperienceModal(false);
      setEditingExperience(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save experience:", err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await API("DELETE", `${URL_PATH.deleteExperience}/${id}`);
        await fetchWorkExperiences();
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } catch (err) {
        console.error("Failed to delete experience:", err);
      }
    }
  };

  // Education CRUD
  const handleSaveEducation = async (education: Education) => {
    try {
      setSaveLoading(true);
      if (education._id) {
        await API("PUT", `${URL_PATH.education}/${education._id}`, education);
      } else {
        await API("POST", URL_PATH.education, { educations: [education] });
      }
      await fetchEducations();
      setShowEducationModal(false);
      setEditingEducation(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save education:", err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteEducation = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this education?")) {
      try {
        await API("DELETE", `${URL_PATH.deleteEducation}/${id}`);
        await fetchEducations();
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } catch (err) {
        console.error("Failed to delete education:", err);
      }
    }
  };

  // Certification CRUD
  const handleSaveCertification = async (certification: Certification) => {
    try {
      setSaveLoading(true);
      if (certification._id) {
        await API(
          "PUT",
          `${URL_PATH.certification}/${certification._id}`,
          certification,
        );
      } else {
        await API("POST", URL_PATH.certification, {
          certifications: [certification],
        });
      }
      await fetchCertifications();
      setShowCertificationModal(false);
      setEditingCertification(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save certification:", err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteCertification = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this certification?")) {
      try {
        await API("DELETE", `${URL_PATH.deleteCertification}/${id}`);
        await fetchCertifications();
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } catch (err) {
        console.error("Failed to delete certification:", err);
      }
    }
  };

  // Award CRUD
  const handleSaveAward = async (award: Award) => {
    try {
      setSaveLoading(true);
      if (award._id) {
        await API("PUT", `${URL_PATH.awards}/${award._id}`, award);
      } else {
        await API("POST", URL_PATH.awards, { awards: [award] });
      }
      await fetchAwards();
      setShowAwardModal(false);
      setEditingAward(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save award:", err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteAward = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this award?")) {
      try {
        await API("POST", `${URL_PATH.deleteAward}/${id}`);
        await fetchAwards();
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } catch (err) {
        console.error("Failed to delete award:", err);
      }
    }
  };

  // Project CRUD
  const handleSaveProject = async (project: Project) => {
    try {
      setSaveLoading(true);
      if (project._id) {
        await API("PUT", `${URL_PATH.projects}/${project._id}`, project);
      } else {
        await API("POST", URL_PATH.projects, { projects: [project] });
      }
      await fetchProjects();
      setShowProjectModal(false);
      setEditingProject(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save project:", err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await API("POST", `${URL_PATH.deleteProject}/${id}`);
        await fetchProjects();
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } catch (err) {
        console.error("Failed to delete project:", err);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (editedProfile) {
      setEditedProfile((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          [name]: value,
        } as UserProfile;
      });
    }
  };

  const handleImageError = () => {
    setImageFailed(true);
  };

  const getFullAddress = () => {
    const parts = [profile.city, profile.state, profile.country].filter(
      Boolean,
    );
    return parts.length > 0 ? parts.join(", ") : "Address not set";
  };

  const getInitials = () => {
    if (!profile.fullName) return "U";
    const names = profile.fullName.split(" ");
    return names
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatWorkDate = (month?: number, year?: number) => {
    if (!year) return "";
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = month ? monthNames[month - 1] : "";
    return month ? `${monthName} ${year}` : `${year}`;
  };

  const formatEducationDate = (year?: number) => {
    return year ? year.toString() : "";
  };

  const formatDuration = (duration?: number) => {
    if (!duration) return "";
    const years = Math.floor(duration / 12);
    const months = duration % 12;

    if (years > 0 && months > 0) {
      return `${years} yr${years > 1 ? "s" : ""} ${months} mo${months > 1 ? "s" : ""}`;
    } else if (years > 0) {
      return `${years} yr${years > 1 ? "s" : ""}`;
    } else {
      return `${months} mo${months > 1 ? "s" : ""}`;
    }
  };

  // Modal Components (keep your existing modal components here)
  // ... (I'll keep them as they are)

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: uniTalentColors.primary }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: uniTalentColors.secondary }}
          />
        </div>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div
              className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
              style={{ borderColor: uniTalentColors.primary }}
            ></div>
            <p
              className="mt-4 text-sm"
              style={{ color: uniTalentColors.secondary }}
            >
              Loading your profile...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: uniTalentColors.primary }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: uniTalentColors.secondary }}
        />
      </div>

      <Navbar />

      {/* Success Toast */}
      {saveSuccess && (
        <div className="fixed top-24 right-6 z-50 animate-slide-down">
          <div
            className="backdrop-blur-xl rounded-2xl px-6 py-3 shadow-2xl flex items-center gap-2"
            style={{
              backgroundColor: `${uniTalentColors.white}CC`,
              border: `1px solid ${uniTalentColors.white}`,
            }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: uniTalentColors.primary }}
            >
              <span className="text-white text-sm">✓</span>
            </div>
            <span style={{ color: uniTalentColors.text }}>
              Changes saved successfully!
            </span>
          </div>
        </div>
      )}

      <div className="flex-1 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 w-full">
        <div className="flex justify-center">
          <div className="w-full max-w-[1000px]">
            {/* Profile Header */}
            <div
              className="backdrop-blur-xl rounded-3xl shadow-2xl relative overflow-hidden mb-8"
              style={{
                backgroundColor: `${uniTalentColors.white}CC`,
                border: `1px solid ${uniTalentColors.white}`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

              <div className="relative z-10 p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {profile.avatar && !imageFailed ? (
                      <div className="relative group">
                        <img
                          src={profile.avatar}
                          alt={profile.fullName}
                          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-xl"
                          style={{
                            boxShadow: `0 0 0 4px ${uniTalentColors.white}`,
                          }}
                          onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-2xl transition-all duration-300"></div>
                      </div>
                    ) : (
                      <div
                        className="w-32 h-32 md:w-40 md:h-40 rounded-2xl flex items-center justify-center text-4xl md:text-5xl font-bold text-white shadow-xl"
                        style={{
                          backgroundColor: uniTalentColors.primary,
                          boxShadow: `0 0 0 4px ${uniTalentColors.white}`,
                        }}
                      >
                        {profile.fullName ? getInitials() : "U"}
                      </div>
                    )}
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h1
                          className="text-3xl md:text-4xl font-light mb-1"
                          style={{ color: uniTalentColors.text }}
                        >
                          {profile.fullName || "Your Name"}
                        </h1>
                        <p
                          className="text-lg md:text-xl font-light"
                          style={{ color: uniTalentColors.secondary }}
                        >
                          {profile.headline}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {!isEditing && (
                          <button
                            onClick={handleEditClick}
                            className="group relative h-12 px-6 rounded-2xl font-medium overflow-hidden whitespace-nowrap"
                          >
                            <div
                              className="absolute inset-0 transition-all duration-300 group-hover:scale-105"
                              style={{
                                background: `linear-gradient(135deg, ${uniTalentColors.primary}, ${uniTalentColors.secondary})`,
                              }}
                            />
                            <span className="relative z-10 flex items-center gap-2 text-white">
                              <Edit2 size={18} /> Edit Profile
                            </span>
                          </button>
                        )}
                        <button
                          onClick={handleLogout}
                          className="group relative h-12 px-6 rounded-2xl font-medium overflow-hidden whitespace-nowrap"
                          style={{
                            background: `linear-gradient(135deg, ${uniTalentColors.red}, #dc2626)`,
                          }}
                        >
                          <span className="relative z-10 flex items-center gap-2 text-white">
                            <LogOut size={18} /> Logout
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{
                          backgroundColor: `${uniTalentColors.primary}08`,
                        }}
                      >
                        <Mail
                          size={18}
                          style={{ color: uniTalentColors.primary }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: uniTalentColors.secondary }}
                        >
                          {profile.email || "email@example.com"}
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{
                          backgroundColor: `${uniTalentColors.primary}08`,
                        }}
                      >
                        <MapPin
                          size={18}
                          style={{ color: uniTalentColors.primary }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: uniTalentColors.secondary }}
                        >
                          {getFullAddress()}
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{
                          backgroundColor: `${uniTalentColors.primary}08`,
                        }}
                      >
                        <Phone
                          size={18}
                          style={{ color: uniTalentColors.primary }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: uniTalentColors.secondary }}
                        >
                          {profile.phoneNumber || "Not provided"}
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{
                          backgroundColor: `${uniTalentColors.primary}08`,
                        }}
                      >
                        <Calendar
                          size={18}
                          style={{ color: uniTalentColors.primary }}
                        />
                        <span
                          className="text-sm"
                          style={{ color: uniTalentColors.secondary }}
                        >
                          Joined {profile.joinDate || "Recently"}
                        </span>
                      </div>
                    </div>

                    {!isEditing && profile.bio && (
                      <div
                        className="mt-6 p-4 rounded-xl"
                        style={{
                          backgroundColor: `${uniTalentColors.primary}08`,
                        }}
                      >
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: uniTalentColors.secondary }}
                        >
                          {profile.bio}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Profile Form */}
            {isEditing && editedProfile && (
              <div
                className="backdrop-blur-xl rounded-3xl shadow-2xl relative overflow-hidden mb-8"
                style={{
                  backgroundColor: `${uniTalentColors.white}CC`,
                  border: `1px solid ${uniTalentColors.white}`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />
                <div className="relative z-10 p-6 md:p-8">
                  <h2
                    className="text-2xl font-light mb-6"
                    style={{ color: uniTalentColors.text }}
                  >
                    Edit Profile
                  </h2>

                  {saveError && (
                    <div
                      className="mb-6 p-4 rounded-xl"
                      style={{
                        backgroundColor: `${uniTalentColors.primary}15`,
                      }}
                    >
                      <p style={{ color: uniTalentColors.primary }}>
                        {saveError}
                      </p>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: uniTalentColors.text }}
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={editedProfile.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:outline-none"
                          style={{
                            borderColor: uniTalentColors.lightGray,
                            color: uniTalentColors.text,
                          }}
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: uniTalentColors.text }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={editedProfile.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:outline-none"
                          style={{
                            borderColor: uniTalentColors.lightGray,
                            color: uniTalentColors.text,
                          }}
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: uniTalentColors.text }}
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={editedProfile.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:outline-none"
                          style={{
                            borderColor: uniTalentColors.lightGray,
                            color: uniTalentColors.text,
                          }}
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: uniTalentColors.text }}
                        >
                          Headline
                        </label>
                        <input
                          type="text"
                          name="headline"
                          value={editedProfile.headline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:outline-none"
                          style={{
                            borderColor: uniTalentColors.lightGray,
                            color: uniTalentColors.text,
                          }}
                          placeholder="e.g., Full Stack Developer"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <h3
                        className="text-lg font-light mb-4"
                        style={{ color: uniTalentColors.text }}
                      >
                        Address
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: uniTalentColors.text }}
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            name="country"
                            value={editedProfile.country}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:outline-none"
                            style={{
                              borderColor: uniTalentColors.lightGray,
                              color: uniTalentColors.text,
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: uniTalentColors.text }}
                          >
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={editedProfile.state}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:outline-none"
                            style={{
                              borderColor: uniTalentColors.lightGray,
                              color: uniTalentColors.text,
                            }}
                          />
                        </div>
                        <div>
                          <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: uniTalentColors.text }}
                          >
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={editedProfile.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:outline-none"
                            style={{
                              borderColor: uniTalentColors.lightGray,
                              color: uniTalentColors.text,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: uniTalentColors.text }}
                      >
                        About
                      </label>
                      <textarea
                        name="bio"
                        value={editedProfile.bio}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border-2 bg-transparent focus:outline-none resize-none"
                        style={{
                          borderColor: uniTalentColors.lightGray,
                          color: uniTalentColors.text,
                        }}
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={handleSaveProfile}
                        disabled={saveLoading}
                        className="group relative flex-1 h-12 rounded-2xl font-medium overflow-hidden"
                      >
                        <div
                          className="absolute inset-0 transition-all duration-300 group-hover:scale-105"
                          style={{
                            background: `linear-gradient(135deg, ${uniTalentColors.primary}, ${uniTalentColors.secondary})`,
                          }}
                        />
                        <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                          <Save size={18} />{" "}
                          {saveLoading ? "Saving..." : "Save Changes"}
                        </span>
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={saveLoading}
                        className="flex-1 px-6 py-3 rounded-2xl font-medium transition-all duration-300"
                        style={{
                          backgroundColor: "transparent",
                          color: uniTalentColors.text,
                          border: `2px solid ${uniTalentColors.lightGray}`,
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sections with Add/Edit/Delete */}
            <Section
              title="Experience"
              icon={Briefcase}
              items={workExperiences}
              onAdd={() => {
                setEditingExperience(null);
                setShowExperienceModal(true);
              }}
              onEdit={(item: WorkExperience) => {
                setEditingExperience(item);
                setShowExperienceModal(true);
              }}
              onDelete={(id: string) => handleDeleteExperience(id)}
              renderItem={(exp: WorkExperience) => (
                <>
                  <h3
                    className="text-xl font-medium"
                    style={{ color: uniTalentColors.text }}
                  >
                    {exp.jobTitle}
                  </h3>
                  <p
                    className="text-base"
                    style={{ color: uniTalentColors.primary }}
                  >
                    {exp.companyName}
                  </p>
                  <div
                    className="flex items-center gap-4 mt-2 text-sm"
                    style={{ color: uniTalentColors.secondary }}
                  >
                    <span>
                      {formatWorkDate(exp.startMonth, exp.startYear)} -{" "}
                      {exp.currentlyWorking
                        ? "Present"
                        : formatWorkDate(exp.endMonth, exp.endYear)}
                    </span>
                    {exp.duration && exp.duration > 0 && (
                      <span
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: `${uniTalentColors.primary}15`,
                          color: uniTalentColors.primary,
                        }}
                      >
                        {formatDuration(exp.duration)}
                      </span>
                    )}
                  </div>
                </>
              )}
            />

            <Section
              title="Education"
              icon={BookOpen}
              items={educations}
              onAdd={() => {
                setEditingEducation(null);
                setShowEducationModal(true);
              }}
              onEdit={(item: Education) => {
                setEditingEducation(item);
                setShowEducationModal(true);
              }}
              onDelete={(id: string) => handleDeleteEducation(id)}
              renderItem={(edu: Education) => (
                <>
                  <h3
                    className="text-xl font-medium"
                    style={{ color: uniTalentColors.text }}
                  >
                    {edu.degree}
                  </h3>
                  <p
                    className="text-base"
                    style={{ color: uniTalentColors.primary }}
                  >
                    {edu.schoolName}
                  </p>
                  <div
                    className="flex items-center gap-4 mt-2 text-sm"
                    style={{ color: uniTalentColors.secondary }}
                  >
                    <span>
                      {edu.startYear} -{" "}
                      {edu.currentlyStudying ? "Present" : edu.endYear}
                    </span>
                    {edu.gpa && (
                      <span
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: `${uniTalentColors.primary}15`,
                          color: uniTalentColors.primary,
                        }}
                      >
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                </>
              )}
            />

            <Section
              title="Certifications"
              icon={FileCheck}
              items={certifications}
              onAdd={() => {
                setEditingCertification(null);
                setShowCertificationModal(true);
              }}
              onEdit={(item: Certification) => {
                setEditingCertification(item);
                setShowCertificationModal(true);
              }}
              onDelete={(id: string) => handleDeleteCertification(id)}
              renderItem={(cert: Certification) => (
                <>
                  <h3
                    className="text-xl font-medium"
                    style={{ color: uniTalentColors.text }}
                  >
                    {cert.certificationName}
                  </h3>
                  <p
                    className="text-base"
                    style={{ color: uniTalentColors.primary }}
                  >
                    {cert.issuer}
                  </p>
                  <p
                    className="text-sm mt-2"
                    style={{ color: uniTalentColors.secondary }}
                  >
                    Issued: {cert.issueDate}
                  </p>
                </>
              )}
            />

            <Section
              title="Awards"
              icon={Award}
              items={awards}
              onAdd={() => {
                setEditingAward(null);
                setShowAwardModal(true);
              }}
              onEdit={(item: Award) => {
                setEditingAward(item);
                setShowAwardModal(true);
              }}
              onDelete={(id: string) => handleDeleteAward(id)}
              renderItem={(award: Award) => (
                <>
                  <h3
                    className="text-xl font-medium"
                    style={{ color: uniTalentColors.text }}
                  >
                    {award.awardName}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: uniTalentColors.secondary }}
                  >
                    Year: {award.year}
                  </p>
                  {award.description && (
                    <p
                      className="text-sm mt-2"
                      style={{ color: uniTalentColors.secondary }}
                    >
                      {award.description}
                    </p>
                  )}
                </>
              )}
            />

            <Section
              title="Projects"
              icon={Package}
              items={projects}
              onAdd={() => {
                setEditingProject(null);
                setShowProjectModal(true);
              }}
              onEdit={(item: Project) => {
                setEditingProject(item);
                setShowProjectModal(true);
              }}
              onDelete={(id: string) => handleDeleteProject(id)}
              renderItem={(project: Project) => (
                <>
                  <h3
                    className="text-xl font-medium"
                    style={{ color: uniTalentColors.text }}
                  >
                    {project.projectName}
                  </h3>
                  <p
                    className="text-base"
                    style={{ color: uniTalentColors.primary }}
                  >
                    {project.role}
                  </p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm mt-2"
                      style={{ color: uniTalentColors.primary }}
                    >
                      <LinkIcon size={14} /> View Project
                    </a>
                  )}
                </>
              )}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Reusable Section Component with proper types
interface SectionProps<T> {
  title: string;
  icon: React.ElementType;
  items: T[];
  onAdd: () => void;
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  renderItem: (item: T) => React.ReactNode;
}

function Section<T extends { _id?: string }>({
  title,
  icon: Icon,
  items,
  onAdd,
  onEdit,
  onDelete,
  renderItem,
}: SectionProps<T>) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon size={28} style={{ color: uniTalentColors.primary }} />
          <h2
            className="text-2xl font-light"
            style={{ color: uniTalentColors.text }}
          >
            {title}
          </h2>
        </div>
        <button
          onClick={onAdd}
          className="p-2 rounded-xl hover:bg-white/20 transition-all"
          style={{ color: uniTalentColors.primary }}
        >
          <Plus size={20} />
        </button>
      </div>

      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="backdrop-blur-xl rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300"
              style={{
                backgroundColor: `${uniTalentColors.white}CC`,
                border: `1px solid ${uniTalentColors.white}`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <div className="flex justify-between">
                  <div className="flex-1">{renderItem(item)}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 rounded-xl hover:bg-white/20 transition-all"
                      style={{ color: uniTalentColors.primary }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => item._id && onDelete(item._id)}
                      className="p-2 rounded-xl hover:bg-white/20 transition-all"
                      style={{ color: uniTalentColors.primary }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="backdrop-blur-xl rounded-2xl p-12 text-center shadow-xl relative overflow-hidden"
          style={{
            backgroundColor: `${uniTalentColors.white}CC`,
            border: `1px solid ${uniTalentColors.white}`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: `${uniTalentColors.primary}15` }}
            >
              <Icon size={40} style={{ color: uniTalentColors.primary }} />
            </div>
            <p
              className="text-lg font-light mb-2"
              style={{ color: uniTalentColors.text }}
            >
              No {title.toLowerCase()} added yet
            </p>
            <p className="text-sm" style={{ color: uniTalentColors.secondary }}>
              Your {title.toLowerCase()} will appear here
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
