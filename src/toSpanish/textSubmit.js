import React, {useState} from "react";
import axios from "axios";
import {API_BASE_URL} from "../constants";
import {toast} from "react-hot-toast";

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
            <h1 className="text-xl font-bold">Song Lyrics Translation App</h1>
            <textarea
                className="w-full p-2 border rounded"
                rows={6}
                placeholder="Enter/Paste your song lyrics here..."
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
                placeholder="Propresenter-ready text with spanish translations will appear here..."
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

export {TextSubmitApp};