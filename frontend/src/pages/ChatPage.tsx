import React, { useEffect, useState } from "react";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import axios from "axios";

interface Message {
  id: number;
  sender_email: string;
  content: string;
  files?: { id: number; filename: string; url: string }[];
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const currentUserEmail = "current_user@example.com"; // отримати з токена після логіну
  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    const res = await axios.get("/api/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(res.data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSend = async (content: string, files: File[]) => {
    const formData = new FormData();
    formData.append("content", content);
    files.forEach((file) => formData.append("files", file));

    const res = await axios.post("/api/messages", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages([...messages, res.data]);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/messages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <MessageList
        messages={messages}
        currentUserEmail={currentUserEmail}
        onDelete={handleDelete}
      />
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatPage;
