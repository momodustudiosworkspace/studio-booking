"use client";
import { useState, useEffect } from "react";

export default function Gallery() {
    const [media, setMedia] = useState<any[]>([]);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function fetchMedia(loadMore = false, folder = "weddings") {
        setLoading(true);
        const url = `/api/media?folder=${folder}${loadMore && nextCursor ? `&next_cursor=${nextCursor}` : ""
            }`;

        const res = await fetch(url);
        const data = await res.json();

        setMedia(loadMore ? [...media, ...data.resources] : data.resources);
        setNextCursor(data.next_cursor || null);
        setLoading(false);
    }

    useEffect(() => {
        fetchMedia();
    }, []);

    return (
        <div>
            {/* Filter buttons */}
            <div className="flex gap-4">
                <button onClick={() => fetchMedia(false, "weddings")}>Weddings</button>
                <button onClick={() => fetchMedia(false, "portraits")}>Portraits</button>
                <button onClick={() => fetchMedia(false, "videos")}>Videos</button>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-3 gap-4 mt-4">
                {media?.map((item) => (
                    <img
                        key={item.public_id}
                        src={item.secure_url}
                        alt={item.public_id}
                        className="rounded-lg"
                    />
                ))}
            </div>

            {/* Load More */}
            {nextCursor && (
                <button
                    disabled={loading}
                    onClick={() => fetchMedia(true)}
                    className="mt-4 px-4 py-2 bg-black text-white rounded"
                >
                    {loading ? "Loading..." : "Load More"}
                </button>
            )}
        </div>
    );
}
