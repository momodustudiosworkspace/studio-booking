"use client";

import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import { useState } from "react";

export default function Page(): React.JSX.Element {
  const [signin, setSignin] = useState<boolean>(true);

  return (
    <section className='h-full w-full'>
      {signin ? (
        <SignIn signin={signin} setSignin={setSignin} />
      ) : (
        <SignUp signin={signin} setSignin={setSignin} />
      )}
    </section>
  );
}
