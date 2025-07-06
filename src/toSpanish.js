import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_BASE_URL = process.env.REACT_APP_TO_SPANISH_API_BASE_URL

function TextSubmitApp() {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/propresenter/include_spanish`, {
        text: inputText,
      });
      setResponseText(response.data.text_data);
    } catch (err) {
      setError("Failed to fetch response.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(responseText);
      toast.success("Response copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy text.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Text Submission App</h1>
      <textarea
        className="w-full p-2 border rounded"
        rows={6}
        placeholder="Enter your text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
      <textarea
        className="w-full p-2 border rounded bg-gray-100"
        rows={6}
        value={responseText}
        readOnly
        placeholder="Response will appear here..."
      />
      <button
        onClick={handleCopy}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Copy Response
      </button>
    </div>
  );
}

function UploadFilesPage() {
  const [files, setFiles] = useState([]);
  const [fileLink, setFileLink] = useState(null);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post(`${API_BASE_URL}/propresenter/upload_exported_files`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const fileId = response.data.file_id;
      if (fileId) {
        setFileLink(`${API_BASE_URL}/propresenter/download_importable_file/${fileId}`);
        toast.success("File uploaded successfully!");
      } else {
        toast.error("No file ID returned from server.");
      }
    } catch (err) {
      toast.error("File upload failed.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Upload Files</h1>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload Files
      </button>
      {fileLink && (
        <div>
          <a href={fileLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            Download Uploaded File
          </a>
        </div>
      )}
    </div>
  );
}

export {TextSubmitApp, UploadFilesPage}
