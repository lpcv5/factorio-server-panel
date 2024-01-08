import React from "react";

import Navbar from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-[800px] shadow-2xl mt-3 pt-3 rounded-xl h-max bg-slate-200">
          {children}
        </div>
      </div>
    </>
  );
}
