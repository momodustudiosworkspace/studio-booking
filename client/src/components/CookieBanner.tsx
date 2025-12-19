"use client";

import { useEffect, useState } from "react";

const COOKIE_KEY = "cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className='fixed right-4 bottom-4 left-4 z-50 rounded-lg bg-black p-4 text-white shadow-lg sm:right-4 sm:left-auto sm:max-w-md'>
      <p className='mb-3 text-sm'>
        We use cookies to improve your experience. By continuing, you agree to
        our{" "}
        <a href='/web/cookie-policy' className='underline'>
          Cookie Policy
        </a>
        .
      </p>

      <button
        onClick={acceptCookies}
        className='rounded bg-white px-4 py-2 text-sm font-semibold text-black'
      >
        Accept cookies
      </button>
    </div>
  );
}
