import { io } from "socket.io-client";

// export const socket = io("http://localhost:5000", {
//   auth: {
//     token: localStorage.getItem("token")
//   },
//   transports: ["websocket"]
// });

export const socket = io("http://localhost:5000", {
  autoConnect: false,
  transports: ["websocket"],
});
