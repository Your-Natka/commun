export function createSocket(userId: number, token: string) {
  const ws = new WebSocket(`ws://localhost:8000/ws/${userId}?token=${token}`);

  ws.onopen = () => console.log("WebSocket open");
  ws.onmessage = (msg) => console.log("WS message:", msg.data);
  ws.onclose = () => console.log("WS closed");
  ws.onerror = (err) => console.error("WS error:", err);

  return ws;
}