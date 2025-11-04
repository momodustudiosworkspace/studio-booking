import { BaseIcons } from "@/assets/icons/BaseIcons";
import React from "react";
import LinkButton from "./ui/LinkButton";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";

interface PageMessageProps {
  status: "success" | "error";
  messageHeader: string;
  messageParagraph: string;
  btnText: string;
  href: string;
}

const PageMessage = ({
  status,
  messageHeader,
  messageParagraph,
  btnText,
  href,
}: PageMessageProps) => {
  const icon =
    status === "success" ? (
      <BaseIcons value='check-solid-green' />
    ) : (
      <BaseIcons value='cancel-solid-red' />
    );
  return (
    <div className='flex w-full text-center  flex-col items-center justify-center gap-4 sm:w-[550px]'>
      <div>{icon}</div>
      <h1 className='font-semibold sm:text-[42px]'>
        {messageHeader}
      </h1>
      <p>{messageParagraph}</p>
      {btnText && <LinkButton
        href={href}
        size='md'
        className='w-auto'
        text={btnText}
        icon={<RedirectArrowWhite />}
        iconPosition='right'
      />}
    </div>
  );
};

export default PageMessage;
