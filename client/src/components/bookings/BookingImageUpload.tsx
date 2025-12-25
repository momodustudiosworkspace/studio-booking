import { useUploadBookingImagesMutation } from '@/redux/services/admin/booking/adminBooking.api';
import React, { useState } from 'react'

const BookingImageUpload = ({ bookingId }: { bookingId: string }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [uploadImages, { isLoading }] = useUploadBookingImagesMutation();

    const handleUpload = async () => {
        if (!files.length) return;
        await uploadImages({ bookingId, files }).unwrap();
        setFiles([]);
    };
    return (
        <div>
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />

            {files.length > 0 && (
                <div>
                    <h4>Selected Files:</h4>
                    <ul>
                        {files.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}

            <button onClick={handleUpload} disabled={isLoading}>
                {isLoading ? "Uploading..." : "Upload Images"}
            </button>
        </div>
    );
}

export default BookingImageUpload