import React from "react";

import Navbar from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <>
      <Navbar/>
      <div className="flex justify-center">{children}</div>
    </>
  );
}
