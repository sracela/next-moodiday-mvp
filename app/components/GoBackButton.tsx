"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { MdArrowBack } from "react-icons/md";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button className="goback-btn" onClick={router.back}>
      <MdArrowBack size={20} /> Go back
    </button>
  );
}
