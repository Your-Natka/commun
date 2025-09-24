export function createSocket(userId: number, token: string) {
  const url = `ws://localhost:8000/ws/${userId}?token=${token}`;
  const ws = new WebSocket(url);

  ws.onopen = () => console.log("✅ WS connected");
  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log("📩 Incoming:", data);
  };
  ws.onclose = () => console.log("❌ WS disconnected");

  return ws;
}