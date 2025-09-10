import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body className="bg-black overflow-x-hidden">
    {/* EPIC STORM BACKGROUND */}
    <div className="fixed inset-0 z-0">
      {/* Animated storm background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black animate-thunder-pulse"></div>
      
      {/* Multiple lightning bolts scattered around */}
      <div className="absolute top-10 left-10 text-6xl animate-crazy-spin opacity-30">⚡</div>
      <div className="absolute top-20 right-20 text-8xl animate-mega-bounce opacity-40">⚡</div>
      <div className="absolute bottom-20 left-20 text-7xl animate-zoom-intense opacity-35">⚡</div>
      <div className="absolute bottom-10 right-10 text-5xl animate-lightning-flash opacity-50">⚡</div>
      <div className="absolute top-1/2 left-10 text-9xl animate-thunder-pulse opacity-25">🌩️</div>
      <div className="absolute top-1/3 right-10 text-9xl animate-epic-glow opacity-30">🌩️</div>
    </div>

    {/* Fixed background element with full viewport height */}
    <div className="fixed inset-0 flex items-center justify-between z-10 px-4">
      {/* Left Logo with epic effects */}
      <div className="logo rounded-3xl overflow-hidden animate-mega-bounce">
        <img
          src="https://app.bedriftsligaen.no/api/Image/6f62cbd1-1e73-4bf0-b181-9ef0e1231a12"
          alt="Logo Left"
          className="w-48 animate-epic-glow"
        />
      </div>
      
      {/* MEGA EPIC Glowing Lightning */}
      <div className="lightning relative">
        <img
          src="https://png.pngtree.com/png-vector/20230808/ourmid/pngtree-transparent-lightning-bolt-vector-png-image_6881009.png"
          alt="Glowing Lightning"
          className="w-80 animate-thunder-pulse filter drop-shadow-[0_0_20px_#00f]"
        />
        {/* Additional spinning lightning around the main one */}
        <div className="absolute -top-10 -left-10 text-6xl animate-crazy-spin">⚡</div>
        <div className="absolute -top-10 -right-10 text-6xl animate-crazy-spin">⚡</div>
        <div className="absolute -bottom-10 -left-10 text-6xl animate-crazy-spin">⚡</div>
        <div className="absolute -bottom-10 -right-10 text-6xl animate-crazy-spin">⚡</div>
      </div>
      
      {/* Right Logo with epic effects */}
      <div className="logo rounded-3xl overflow-hidden animate-mega-bounce">
        <img
          src="https://app.bedriftsligaen.no/api/Image/870fd70e-a406-4423-ae5c-7bb63e0da119"
          alt="Logo Right"
          className="w-48 animate-epic-glow"
        />
      </div>
    </div>
    
    {/* Page content that appears above the fixed background */}
    <div className="relative z-20 p-10">
      {children}
    </div>
    <ScrollRestoration />
    <Scripts />
    </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}