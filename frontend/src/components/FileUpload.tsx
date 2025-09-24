import React from "react";

interface FileUploadProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, setFiles }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleChange} className="hidden" id="file-upload" />
      <label
        htmlFor="file-upload"
        className="bg-gray-300 px-3 py-2 rounded cursor-pointer"
      >
        Attach
      </label>
    </div>
  );
};

export default FileUpload;
