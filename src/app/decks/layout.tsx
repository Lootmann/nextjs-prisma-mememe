"use client";

import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full flex flex-col gap-4 text-xl">
      <div className="p-2 border rounded-md flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}
