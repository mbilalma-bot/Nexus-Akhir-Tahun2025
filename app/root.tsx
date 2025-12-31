import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isTelepati = location.pathname.startsWith('/telepati');
  const isHome = location.pathname === '/';

  const navItems = isTelepati 
    ? [
        { to: "/telepati", label: "Games" },
        { to: "/telepati/rekap", label: "Rekap Poin" },
      ]
    : [
        { to: "/penyisihan", label: "Babak Penyisihan" },
        { to: "/final", label: "Babak Final" },
        { to: "/rekap", label: "Rekap Poin" },
      ];

  const themeClass = isTelepati ? "bg-green-900" : "bg-blue-900";
  const activeClass = isTelepati ? "text-green-900" : "text-blue-900";
  const hoverClass = isTelepati ? "hover:bg-green-800" : "hover:bg-blue-800";
  const borderClass = isTelepati ? "border-green-800" : "border-blue-800";
  const logoText = isTelepati ? "TG" : "PB";
  const gameTitle = isTelepati ? "TELEPATI GAMES" : "PUZZLE BATTLE";

  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{isTelepati ? 'Telepati Games' : 'Puzzle Battle'} - MM Desa Cicalengka</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-50 text-gray-900 font-['Plus_Jakarta_Sans']">
        {!isHome && (
          <nav className={`${themeClass} text-white shadow-lg sticky top-0 z-50 transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-8">
                  <NavLink to="/" className="flex items-center gap-2 group">
                    <div className="bg-white p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                      <span className={`${activeClass} text-xl font-black`}>{logoText}</span>
                    </div>
                    <span className="text-xl font-extrabold tracking-tight">{gameTitle}</span>
                  </NavLink>
                  
                  <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === "/telepati"}
                        className={({ isActive }) =>
                          `px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            isActive
                              ? `bg-white ${activeClass} shadow-md`
                              : `text-white/80 ${hoverClass}`
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Nav */}
            <div className={`md:hidden flex justify-around border-t ${borderClass} py-2`}>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/telepati"}
                  className={({ isActive }) =>
                    `text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded ${
                      isActive ? `bg-white ${activeClass}` : "text-white/60"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}

        <main className={`min-h-screen pb-20 ${isHome ? 'pt-0' : 'pt-4'}`}>
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
          <p>© 2025 MM Desa Cicalengka - Tournament Management System</p>
        </footer>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
