import MomoduWhite from "@/assets/icons/MomoduWhite";

export default function Loading() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-10 bg-black text-white'>
      <MomoduWhite />
      <p>Loading...</p>
    </div>
  );
}
