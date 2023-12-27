"use client";
import React from "react";

import { Navbar } from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <>
      <Navbar/>
      <div>{children}</div>

    </>
  );
}
