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
    <html lang="en" className="bg-gray-100">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body className="bg-gray-100">
    {/* Fixed background element with full viewport height */}
    <div className="fixed inset-0 flex items-center justify-between z-0 px-4">
      {/* Left Logo */}
      <div className="logo rounded-3xl overflow-hidden">
        <img
          src="https://app.bedriftsligaen.no/api/Image/6f62cbd1-1e73-4bf0-b181-9ef0e1231a12"
          alt="Logo Left"
          className="w-48"
        />
      </div>
      {/* Glowing Blue Lightning */}
      <div className="lightning">
        <img
          src="https://png.pngtree.com/png-vector/20230808/ourmid/pngtree-transparent-lightning-bolt-vector-png-image_6881009.png"
          alt="Glowing Lightning"
          className="w-80 animate-pulse filter drop-shadow-[0_0_10px_#00f]"
        />
      </div>
      {/* Right Logo */}
      <div className="logo rounded-3xl overflow-hidden">
        <img
          src="https://app.bedriftsligaen.no/api/Image/870fd70e-a406-4423-ae5c-7bb63e0da119"
          alt="Logo Right"
          className="w-48"
        />
      </div>
    </div>
    {/* Page content that appears above the fixed background */}
    <div className="relative z-10 p-10">
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
