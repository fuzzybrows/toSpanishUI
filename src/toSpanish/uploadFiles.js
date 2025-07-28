import React, {useState} from "react";
import axios from "axios";
import {API_BASE_URL} from "../constants";
import {toast} from "react-hot-toast";

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
                headers: {"Content-Type": "multipart/form-data"},
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

export {UploadFilesPage};