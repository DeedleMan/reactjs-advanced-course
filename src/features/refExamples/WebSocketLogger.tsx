import { useEffect, useRef, useState } from "react";

const SOCKET_ADDRESS = "wss://echo.websocket.org";

export const WebSocketLogger = () => {
  const socketRef = useRef<WebSocket | null>(null);

  const [logs, setLogs] = useState<string[]>([
    "Connecting to echo.websocket.org...",
  ]);

  const addLog = (text: string) => setLogs((prev) => [...prev, text]);

  useEffect(() => {
    const socket = new WebSocket(SOCKET_ADDRESS);

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("[WebSocket] Connected");
      addLog("Connected to server");

      const message = "Hello from WebSocketLogger";
      console.log(`[WebSocket] Sending: ${message}`);
      addLog(message);
      socket.send(message);
    };

    socket.onmessage = (event) => {
      console.log("[WebSocket] Received:", event.data);
      addLog(event.data);
      socket.close();
    };

    socket.onerror = () => {
      console.error("[WebSocket] Error occurred");
      addLog("Connection error (проверьте, отключен ли сбер VPN)");
    };

    socket.onclose = () => {
      console.log("[WebSocket] Disconnected");
      addLog("Disconnected from server");
    };

    return () => {
      socketRef.current?.close();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Logger</h1>
      <div>
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
};
