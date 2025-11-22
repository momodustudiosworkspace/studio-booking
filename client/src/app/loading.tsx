import MomoduWhite from "@/assets/icons/MomoduWhite";

export default function Loading() {
    return (
        <div className="flex flex-col gap-10 text-white items-center bg-black justify-center h-screen">
            <MomoduWhite />
            <p>Loading...</p>
        </div>
    );
}