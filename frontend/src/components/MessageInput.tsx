import React, { useState } from "react";
import FileUpload from "./FileUpload";

interface MessageInputProps {
  onSend: (content: string, files: File[]) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleSend = () => {
    if (!content && files.length === 0) return;
    onSend(content, files);
    setContent("");
    setFiles([]);
  };

  return (
    <div className="flex space-x-2 p-2 border-t bg-gray-100">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 p-2 border rounded"
        placeholder="Type a message..."
      />
      <FileUpload files={files} setFiles={setFiles} />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
