// import { useEffect, useState } from "react";

import AnytimeCapture from "@/assets/AnytimeCapture";
import CopyRight from "@/assets/icons/CopyRight";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import SectionHeader from "@/components/SectionHeader";
import LinkButton from "@/components/ui/LinkButton";
import Image from "next/image";

export default function Home() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/hello")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message))
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <main className="flex min-h-screen justify-center pt-14 w-full">
      <section className="w-full">
        <div className="flex px-5 flex-col gap-6 mb-10">
          <div className="flex items-start gap-3">
            <h1 className="text-[36px] uppercase font-bold font-sans">
              Momodu studios
            </h1>
            <CopyRight />
          </div>
          <div>
            <p className="text-[18px] font-mono">
              From booking to final delivery — Momodu Studios brings the entire
              photography experience online.
            </p>
          </div>
          <div className="flex w-full justify-between">
            <LinkButton
              href="/book-session"
              size="lg"
              text="Book your session"
              icon={<RedirectArrowWhite />}
              iconPosition="right"
            />

            <LinkButton
              href="/book-session"
              variant="outline"
              size="lg"
              text="view portfolio"
            />
          </div>
        </div>
        <div className="relative flex items-center justify-between mb-30">
          <Image
            src={"/home/hero-section-one.png"}
            alt="momodu studios"
            width={218}
            height={100}
          />
          <Image
            src={"/home/hero-section-two.png"}
            alt="momodu studios"
            width={195}
            height={100}
          />
          <div className="absolute right-5 -bottom-20">
            <AnytimeCapture />
          </div>
        </div>

        <div>
          <SectionHeader
            badgeText="About us"
            badgeWidth="w-[35%]"
            headerText="More Than Photos — We Capture Your Story"
          />
          <p>
            At Momodu Studios, we believe photography isn’t just about pressing
            a shutter — it’s about preserving moments that matter.For over [X
            years], we’ve helped individuals, couples, and brands tell their
            stories through timeless, authentic, and breathtaking imagery.
          </p>
          {/* <video src=""></video> */}
          <p>
            Now, we’ve taken our craft fully online — making the entire process
            effortless for you. From booking your shoot to making payments,
            reviewing your pictures, and downloading your final images,
            everything happens in one secure, beautiful platform.
          </p>
        </div>
      </section>
      {/* <p className="mt-4 text-lg text-blue-500">{message}</p> */}
    </main>
  );
}
