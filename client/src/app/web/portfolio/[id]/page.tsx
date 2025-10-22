import Gallery from "@/components/portfolio/Gallery";

export default function Page() {
  return (
    <section className='flex min-h-screen w-full justify-center'>
      <section className='w-full px-5'>
        {/* hero  */}
        <h1 className='mb-6 w-full text-left text-[34px] font-extrabold'>
          Wedding & Engagements
        </h1>

        {/* Portfolio  */}

        <Gallery />
      </section>
    </section>
  );
}
