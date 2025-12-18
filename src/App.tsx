import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignUp from "./screens/SignUp";
import LogIn from "./screens/Login";
import EmailVerification from "./screens/EmailVerification";
import Paywall from "./screens/Paywall";
import HowItWorks from "./screens/HowItWorks";
import ExperienceIndex from "./screens/ExperienceIndex";
import SkillIndex from "./screens/SkillIndex";
import HireabilityIndex from "./screens/HireabilityIndex";
import UploadResume from "./screens/UploadResume";
import Education from "./screens/Education";
import Experience from "./screens/Experience";
import Certifications from "./screens/Certifications";
import Awards from "./screens/Awards";
import Projects from "./screens/Projects";
import JobDomain from "./screens/JobDomain";
import Skills from "./screens/Skills";
import AssessmentIntro from "./screens/AssesmentIntro";
import AssessmentPage from "./screens/AssesmentPage";
import AssessmentResults from "./screens/AssesmentResults";
import Login from "./screens/Login";
import SkillAssessmentCard from "./screens/SkillsAssesment";
import TalentRankingPlatform from "./screens/TalentRankingPlatform";
import Demographics from "./screens/Demographics";
import SkillIndexIntro from "./screens/SkillIndexIntro";

const router = createBrowserRouter([
  { path: "/", element: <LogIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <LogIn /> },
  { path: "/verify-email", element: <EmailVerification /> },
  { path: "/paywall", element: <Paywall /> },
  { path: "/talent-ranking", element: <TalentRankingPlatform /> },
  { path: "/how-it-works", element: <HowItWorks /> },

  { path: "/experience-index", element: <ExperienceIndex /> },
  { path: "/skill-index", element: <SkillIndex /> },
  { path: "/hireability-index", element: <HireabilityIndex /> },

  { path: "/upload-resume", element: <UploadResume /> },
  { path: "/demographics", element: <Demographics /> },
  { path: "/education", element: <Education /> },
  { path: "/experience", element: <Experience /> },
  { path: "/certifications", element: <Certifications /> },
  { path: "/awards", element: <Awards /> },
  { path: "/projects", element: <Projects /> },

  { path: "/skill-index-intro", element: <SkillIndexIntro /> },
  { path: "/job-domain", element: <JobDomain /> },
  { path: "/skills", element: <Skills /> },
  { path: "/skills-assessment", element: <SkillAssessmentCard /> },

  { path: "/assessment-intro", element: <AssessmentIntro /> },
  { path: "/assessment", element: <AssessmentPage /> },
  { path: "/assessment-results", element: <AssessmentResults /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

