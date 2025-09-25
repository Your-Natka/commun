import React, { useState } from "react";

interface FileAttachment {
  id: number;
  filename: string;
  url: string;
}

interface MessageItemProps {
  id: number;
  sender_email: string;
  content: string;
  files?: FileAttachment[];
  isOwnMessage?: boolean;
  isRead?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (id: number, newContent: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  id,
  sender_email,
  content,
  files,
  isOwnMessage,
  isRead,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const handleSave = () => {
    if (onEdit) {
      onEdit(id, editContent);
    }
    setIsEditing(false);
  };

  return (
    <div
      className={`p-2 my-1 rounded max-w-md ${
        isOwnMessage ? "bg-blue-200 self-end" : "bg-white self-start"
      }`}
    >
      <div className="text-sm font-semibold">{sender_email}</div>

      {isEditing ? (
        <div className="flex space-x-2">
          <input
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="flex-1 p-1 border rounded"
          />
          <button
            onClick={handleSave}
            className="text-green-600 px-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="text-red-600 px-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>{content}</div>
      )}

      {files &&
        files.map((f) => (
          <a
            key={f.id}
            href={f.url}
            target="_blank"
            className="block text-blue-600 underline text-sm"
          >
            {f.filename}
          </a>
        ))}

      {isOwnMessage && !isEditing && (
        <div className="flex flex-col text-xs mt-1">
          <div className="flex space-x-2">
            {onDelete && (
              <button onClick={() => onDelete(id)} className="text-red-500">
                Delete
              </button>
            )}
            {onEdit && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-green-500"
              >
                Edit
              </button>
            )}
          </div>

          {/* 👇 Статус прочитання */}
          <div className="text-gray-500 mt-1">
            {isRead ? "✓✓ Read" : "✓ Sent"}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageItem;

