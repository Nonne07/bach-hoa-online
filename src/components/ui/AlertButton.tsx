"use client";

import React from "react";
import { Button } from "./Button";
import { ExternalLink } from "lucide-react";

export function AlertButton({ message, className, children }: { message: string, className?: string, children: React.ReactNode }) {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className={className}
      onClick={() => alert(message)}
    >
      {children}
    </Button>
  );
}
