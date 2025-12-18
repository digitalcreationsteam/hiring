import axios from "axios";

// Environment-based base URL
export const BASE_URL =
  process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/api";

const isDev = process.env.NODE_ENV === "development";

export const log = (str) => {
  if (!isDev) return;
  console.log("====================================");
  console.log(str);
  console.log("====================================");
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

// ✅ CORRECT URL PATHS (RELATIVE)
export const URL_PATH = {
  signup: "/auth/signup",
  login: "/auth/login",
  getUser: "/user",

  verifyEmail:"/auth/verify/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzZhNTY3Y2YxOTlkZWM3NzgxY2E4ZSIsImlhdCI6MTc2NTE4ODk2NywiZXhwIjoxNzY1NzkzNzY3fQ.OkuphrcwOBFyOuAjV3HyNMd-IaeiJa5lR_y7whS3PAc",

  demographics:"/user/demographics",
  getDemographics:"/user/demographics",

  education:"/user/education",
  getEducation:"/user/education",

  experience:"/user/work",
  getExperience:"/user/work",

  certification:"/user/certification",
  getCertification:"/user/certification", 

  awards:"/user/awards", 
  getAwards:"/user/awards",

  projects:"/user/projects",
  getProjects:"/user/projects", 

};

// 🔥 API WRAPPER
export default async function API(
  method,
  url,
  data = {},
  token = null,
  headers = {},
  showLoader = true
) {
  try {
    const config = {
      method: method.toLowerCase(),
      url, // 👈 relative path
      headers: {
        ...headers,
      },
    };

    if (config.method === "get") {
      config.params = data;
    } else {
      config.data = data;
      if (data instanceof FormData) {
        delete config.headers["Content-Type"];
      }
    }

    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      throw { ...data, status };
    } else if (error.request) {
      throw {
        success: false,
        message: "No response from server. Check your internet.",
      };
    } else {
      throw {
        success: false,
        message: error.message || "Unknown error occurred.",
      };
    }
  }
}
