"use client";

import { useLoading } from "@/app/context/LoadingContext";
import AskScotty from "./AskScotty/page";

export default function AskScottyWrapper() {
  const { isPageLoading } = useLoading();

  return (
    <div
      className="transition-opacity duration-700 ease-out"
      style={{
        opacity: isPageLoading ? 0 : 1,
        pointerEvents: isPageLoading ? 'none' : 'auto',
      }}
    >
      <AskScotty question="" />
    </div>
  );
}