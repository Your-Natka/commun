import React, { useRef, useEffect } from "react";
import MessageItem from "./MessageItem";

interface FileAttachment {
  id: number;
  filename: string;
  url: string;
}

interface Message {
  id: number;
  sender_email: string;
  content: string;
  files?: FileAttachment[];
}

interface MessageListProps {
  messages: Message[];
  currentUserEmail: string;
  onDelete?: (id: number) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserEmail,
  onDelete,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-2">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          {...msg}
          isOwnMessage={msg.sender_email === currentUserEmail}
          onDelete={onDelete}
        />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MessageList;
