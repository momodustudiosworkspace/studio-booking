import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: " Sign In | Admin Momodu Studios",
    template: "%s | Momodu Studios",
  },
  description:
    "Sign in or create an account to book your next photo session at Momodu Studios.",
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
    <section className='relative flex min-h-screen w-full flex-col justify-center overflow-y-hidden bg-no-repeat px-5 sm:h-full sm:justify-start sm:px-0'>
      {/* <ThemeToggle /> */}

      <div className='absolute top-0 bottom-0 z-10 flex h-full w-full bg-black/30 sm:hidden'></div>

      <div className='relative z-20 h-full'>{children}</div>
    </section>
  );
}
