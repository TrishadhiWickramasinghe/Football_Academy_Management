import React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { MobileNav } from "./mobile-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Header - includes Mobile Nav trigger */}
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mx-auto max-w-7xl h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNav />
    </div>
  );
}
