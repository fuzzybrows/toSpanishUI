import React, {useState} from "react";
import axios from "axios";
import {API_BASE_URL} from "../constants";
import {toast} from "react-hot-toast";

import {useDispatch, useSelector} from "react-redux";
import {addConvertedSong, removeConvertedSong} from "../store/convertedSongsSlice";
import {X} from "lucide-react";

function TextSubmitApp() {
    const [inputText, setInputText] = useState("");
    const [responseText, setResponseText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const convertedSongs = useSelector((state) => state.convertedSongs);

    const handleSubmit = async () => {
        if (!inputText.trim()) {
            toast.error("Please enter some text first.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/propresenter/include_spanish`,
                {text: inputText}
            );

            const convertedText = response.data.text_data;
            setResponseText(convertedText);

            const title = extractTitle(inputText);
            dispatch(addConvertedSong({title, content: convertedText}));
            toast.success("Successfully converted song lyrics!");
        } catch (err) {
            setError("Failed to fetch response.");
            toast.error("Failed to fetch response.");
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

    const downloadAsText = (filename, text) => {
        const element = document.createElement("a");
        const file = new Blob([text], {type: "text/plain"});
        element.href = URL.createObjectURL(file);
        element.download = `${filename}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const extractTitle = (text) => {
        const firstLine = text.trim().split("\n")[0];
        return firstLine.length > 0 ? firstLine : `untitled-${Date.now()}`;
    };

    const downloadAllAsOneFile = () => {
        if (convertedSongs.length === 0) {
            toast.error("No converted songs to combine.");
            return;
        }
        const combinedText = convertedSongs
            .map(song => song.content.trim())
            .join("\n\n"); // two line breaks to separate songs clearly

        const combinedTitle = "combined_songs_" + Date.now();

        const element = document.createElement("a");
        const file = new Blob([combinedText], {type: "text/plain"});
        element.href = URL.createObjectURL(file);
        element.download = `${combinedTitle}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        toast.success("Combined file downloaded!");
    };

    return (
        <div className="grid grid-cols-3 md:grid-cols-3 gap-6 max-w-5xl mx-auto p-6">
            <div className="space-y-4 col-span-2 md:col-span-2">
                <h1 className="text-xl font-bold">Song Lyrics Translation App</h1>
                <textarea
                    className="w-full p-2 border rounded"
                    rows={8}
                    placeholder="Enter/Paste your song lyrics here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
                {error && <div className="text-red-500">{error}</div>}
                <textarea
                    className="w-full p-2 border rounded bg-gray-100"
                    rows={8}
                    value={responseText}
                    readOnly
                    placeholder="Propresenter-ready text with Spanish translations will appear here..."
                />
                <button
                    onClick={handleCopy}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Copy Response
                </button>
            </div>
            <div className="border-l pl-8 col-span-1 md:col-span-1">
                <h2 className="text-lg font-semibold mb-4">Converted Songs</h2>
                {convertedSongs.length === 0 ? (
                    <p className="text-gray-500">No converted songs yet.</p>
                ) : (
                    <>
                        <ul className="space-y-2">
                            {convertedSongs.map((song, idx) => (
                                <li key={idx} className="flex items-center ">
                                    <button
                                        onClick={() => dispatch(removeConvertedSong(idx))}
                                        className="text-red-500 hover:text-red-700 mr-1"
                                        aria-label="Delete song"
                                    >
                                        <X size={16}/>
                                    </button>
                                    <button
                                        onClick={() => downloadAsText(song.title, song.content)}
                                        className="text-blue-600 hover:underline ml-2"
                                    >
                                        {song.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={downloadAllAsOneFile}
                            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                        >
                            Download All as One File
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export {TextSubmitApp};
