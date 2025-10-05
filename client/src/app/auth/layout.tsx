
import type { Metadata } from "next";
import Image from "next/image";


export const metadata: Metadata = {
  title: {
    default: "Sign In | Momodu Studios",
    template: "%s | Momodu Studios",
  },
  description: "Sign in or create an account to book your next photo session at Momodu Studios.",
  openGraph: {
    title: "Sign In | Momodu Studios",
    description: "Sign in or create an account to book your next session.",
    url: "https://bookings.momodustudios.com/auth",
    siteName: "Momodu Studios",
    type: "website",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex relative flex-col min-h-screen overflow-y-hidden justify-center bg-no-repeat px-5 w-full">
      {/* <ThemeToggle /> */}
      <Image src="/auth/auth-image.jpg" alt="" fill className="object-cover object-left" priority />


      <div className="absolute w-full bg-black/30 z-10 top-0 bottom-0 h-full"></div>

      <div className="relative z-20">
        {children}
      </div>
      </section>

  );
}
