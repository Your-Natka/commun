import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

interface Message {
  id: number;
  sender_email: string;
  content: string;
  files?: { id: number; filename: string; url: string }[];
  isRead?: boolean;
}

interface MessageListProps {
  messages: Message[];
  currentUserEmail: string;
  onDelete?: (id: number) => void;
  onEdit?: (id: number, newContent: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserEmail,
  onDelete,
  onEdit,
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          {...msg}
          isOwnMessage={msg.sender_email === currentUserEmail}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
      {/* 👇 "якір" для автоскролу */}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
