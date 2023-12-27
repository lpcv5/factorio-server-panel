"use client";
import React, { useState } from "react";

import Navbar from "@/components/navbar";

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
