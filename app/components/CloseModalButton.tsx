"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdClose } from "react-icons/md";

export default function CloseModalButton() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <button className="close-btn" onClick={handleBack}>
      <MdClose size={20} />
    </button>
  );
}
