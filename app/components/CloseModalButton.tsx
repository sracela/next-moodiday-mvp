"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdClose } from "react-icons/md";

export default function CloseModalButton() {
  const router = useRouter();
  return (
    <button className="close-btn" onClick={router.back}>
      <MdClose size={20} />
    </button>
  );
}
