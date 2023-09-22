"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdClose } from "react-icons/md";

export default function CloseModalButton() {
  const router = useRouter();
  const handleBack = () => {
    if (history.length > 10) {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <button className="close-btn" onClick={handleBack}>
      <MdClose size={20} />
    </button>
  );
}
