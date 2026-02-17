// src/common/Colors.js

// export const colors = {
//   // The vibrant yellow used for the 'Hired' bar and active highlights
//   primary: "#1A2C42", 
//   secondary: "#2E4056", 

//   // The soft, buttery yellow used for the background 'glow' effect
//   primaryGlow: "#D5D6DB",

//   // Replaced #F8F8F8 with the soft atmospheric grey from the image
//   background: "#E9EAE9", 

//   // Pure white for the 'glass' base (usually used with opacity: white/30)
//   white: "#FFFFFF",

//   // Deep charcoal for high-readability text (instead of pure black)
//   accent: "#1F2937", 

//   // Borders should be semi-transparent white, but for solid fallbacks:


//   neutral: {
//     50: "#FAFAFA",
//     100: "#F2F2F2", // Very light grey for subtle backgrounds
//     200: "#E5E5E5", // Border/Divider color
//     400: "#9CA3AF", // Placeholder text / Secondary text
//     600: "#4B5563", // Muted text
//     800: "#1F2937", // Primary heading text
//   },

//   // Semantic colors for the status badges seen in your UI
//   status: {
//     invited: "#DCFCE7", // Light green background
//     invitedText: "#15803D", 
//     absent: "#F3F4F6",  // Light grey background
//     absentText: "#4B5563",
//   },

//   aqua: "#97D3CD",       // Light Aqua
//   cream: "#FFFAE6",      // Main Background
//   mint: "#E4F2EA",
// };

// export const colors = {
//   primary: "#1A2C42",
//   secondary: "#2E4056",
//   slate: "#AAB5B7",
//   primaryGlow: "#BFC7CA",
//   background: "#f8f8f8",
//   accent: "#1F2937",
//   white: "#FFFFFF",
//   background2: "#f8f8f8",
//   red: "#F54927",

//   neutral: {
//     50: "#FAFAFA",
//     100: "#F2F2F2", // Very light grey for subtle backgrounds
//     200: "#E5E5E5", // Border/Divider color
//     400: "#9CA3AF", // Placeholder text / Secondary text
//     600: "#4B5563", // Muted text
//     800: "#1F2937", // Primary heading text
//   },

//   status: {
//     invited: "#DCFCE7", // Light green background
//     invitedText: "#15803D",
//     absent: "#F3F4F6",  // Light grey background
//     absentText: "#4B5563",

//   },

//   aqua: "#C5E1B8",       // Light Aqua
//   cream: "#FFFAE6",      // Main Background
//   mint: "#E4F2EA",


// };

export const colors = {
  primary: "#1A2C42",
  secondary: "#2E4056",
  slate: "#AAB5B7",
  primaryGlow: "#BFC7CA",
  background: "#f8f8f8",
  accent: "#1F2937",
  white: "#FFFFFF",
  background2: "#f8f8f8",
  red: "#F54927",

  neutral: {
    50: "#FAFAFA",
    100: "#F2F2F2", // Very light grey for subtle backgrounds
    200: "#E5E5E5", // Border/Divider color
    300: "#D1D5DB", // Input borders (default state)
    400: "#9CA3AF", // Placeholder text / Secondary text
    500: "#6B7280", // Divider text, secondary labels
    600: "#4B5563",
    700: '#374151', // Muted text, benefit descriptions
    800: "#1F2937",
    900: '#111827' // Primary heading text, OAuth button text
  },

  status: {
    invited: "#DCFCE7", // Light green background
    invitedText: "#15803D",
    absent: "#F3F4F6",  // Light grey background
    absentText: "#4B5563",
  },

  aqua: "#C5E1B8",       // Light Aqua
  cream: "#FFFAE6",      // Main Background
  mint: "#E4F2EA",

  // ✅ NEW COLORS ADDED FOR LOGIN DESIGN
  // Error/Alert
  error: "#DC2626",      // Error message text color
  errorBg: "rgba(220, 38, 38, 0.1)", // Error message background

  // Input & Focus States
  inputBorder: "#D1D5DB", // Same as neutral[300]
  inputFocus: "rgba(26, 44, 66, 0.08)", // Primary with 8% opacity for focus glow

  // Illustrations & Decorative
  illustrationGradient1: "rgba(26, 44, 66, 0.3)", // Primary with 30% opacity
  illustrationGradient2: "rgba(31, 41, 55, 0.1)", // Accent with 10% opacity
  decorativeBg: "rgba(255, 255, 255, 0.5)", // Semi-transparent white for OAuth buttons

  // Background & Overlays
  loginBg: "rgba(255, 255, 255, 0.95)", // Near-white background
  dividerBg: "#E5E5E5", // Divider line (same as neutral[200])
};


// NEW UNITALENT COLOR PALETTE - Added separately without modifying existing colors
export const uniTalentColors = {
  // Client's specific color palette for UniTalent landing page
  primary: "#1A2C42",      // Yellow accent
  lightGray: "#D9D9D9",    // Borders and dividers
  background: "#F8F8F8",   // Main background
  text: "#060606",         // All text content
  secondary: "#2E4056",
  // Extended palette
  red: "#EF4444",
  primaryLight: "#FFEDB2", // Light yellow for gradients

  // Status colors for UniTalent
  status: {
    success: "#FFD85F",    // Using primary for success
    successText: "#060606",
    inactive: "#F3F4F6",
    inactiveText: "#4B5563",
  },

  // Utility colors
  white: "#FFFFFF",
  black: "#060606",
  gray: "#D9D9D9",
  lightGray: "#F8F8F8",
};