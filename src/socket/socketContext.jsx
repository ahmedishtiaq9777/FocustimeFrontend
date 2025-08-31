// src/context/SocketContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // JWT from login
    if (!token) {
      console.log("🔒 No token found, socket not connected");
      return;
    }

    console.log("🔑 Connecting socket with token...");
    const newSocket = io("http://localhost:8090", {
      auth: { token },
      transports: ["websocket"],
    });

    setSocket(newSocket);

    // Cleanup on unmount or logout
    return () => {
      console.log("🚪 Disconnecting socket...");
      newSocket.disconnect();
    };
  }, []); // runs only on first mount

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
