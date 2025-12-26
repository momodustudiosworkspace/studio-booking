import { useUploadBookingImagesMutation } from "@/redux/services/admin/booking/adminBooking.api";
import Image from "next/image";
import React, { useState } from "react";

const MAX_FILES = 10;

const BookingImageUpload = ({ bookingId }: { bookingId: string }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const [uploadImages, { isLoading }] = useUploadBookingImagesMutation();

    const handleFiles = (selected: File[]) => {
        if (selected.length + files.length > MAX_FILES) {
            alert(`You can only upload up to ${MAX_FILES} images.`);
            return;
        }

        setFiles((prev) => [...prev, ...selected]);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        handleFiles(Array.from(e.target.files));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFiles(droppedFiles);
    };

    const handleUpload = async () => {
        if (!files.length) return;

        try {
            await uploadImages({ bookingId, files }).unwrap();
            setFiles([]);
        } catch (err) {
            console.log(err);
        }
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="border rounded-xl p-6 bg-white space-y-4">
            <h3 className="text-lg font-semibold">Upload Session Images</h3>

            {/* Drop Zone */}
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${isDragging ? "border-black bg-gray-100" : "border-gray-300"
                    }`}
            >
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="imageUpload"
                    onChange={handleFileInput}
                />

                <label htmlFor="imageUpload" className="cursor-pointer">
                    <p className="text-sm text-gray-600">
                        Drag & drop images here or{" "}
                        <span className="text-black font-medium">browse</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Max {MAX_FILES} images
                    </p>
                </label>
            </div>

            {/* Preview Grid */}
            {files.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="relative rounded overflow-hidden border"
                        >
                            <Image
                                width={100}
                                height={100}
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="h-28 w-full object-cover"
                            />

                            <button
                                onClick={() => removeFile(index)}
                                className="absolute top-1 right-1 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Button */}
            <button
                onClick={handleUpload}
                disabled={isLoading || files.length === 0}
                className="bg-black text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
                {isLoading ? "Uploading..." : "Upload Images"}
            </button>
        </div>
    );
};

export default BookingImageUpload;
