import Gallery from "@/components/portfolio/Gallery";


export default function Page() {

    return (
        <section className="flex min-h-screen justify-center w-full">
            <section className="w-full px-5">
                {/* hero  */}
                <h1 className="font-extrabold text-[34px] text-left w-full mb-6">Wedding & Engagements</h1>

                {/* Portfolio  */}

                <Gallery />
            </section>
        </section>
    )
}

