import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  FileText,
  CalendarClock,
  X,
} from "lucide-react";
import kasiLogo from "@/assets/kasiflow-logo.png";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email-generator", label: "Email Generator", icon: Mail },
  { to: "/meeting-summarizer", label: "Meeting Summarizer", icon: FileText },
  { to: "/smart-planner", label: "Smart Planner", icon: CalendarClock },
] as const;

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const NavLinks = () => (
    <nav className="flex flex-1 flex-col gap-1.5 px-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              active
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
            }`}
          >
            <Icon
              className={`h-5 w-5 shrink-0 transition-colors ${
                active
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-sidebar-foreground"
              }`}
            />
            <span>{item.label}</span>
            {active && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </Link>
        );
      })}
    </nav>
  );

  const Brand = () => (
    <Link
      to="/"
      onClick={onClose}
      className="flex items-center gap-2.5 px-5 py-5"
    >
      <img
        src={kasiLogo}
        alt="KasiFlow"
        width={36}
        height={36}
        className="h-9 w-9 rounded-lg"
        loading="lazy"
      />
      <div className="flex flex-col">
        <span className="font-display text-lg font-bold leading-tight text-foreground">
          KasiFlow
        </span>
        <span className="text-[11px] font-medium text-muted-foreground">
          AI for SA Hustlers
        </span>
      </div>
    </Link>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <Brand />
        <NavLinks />
        <div className="border-t border-sidebar-border px-5 py-4">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Responsible AI — Review outputs before use.
          </p>
        </div>
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          open ? "" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />
        <aside
          className={`absolute left-0 top-0 flex h-full w-72 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Brand />
            <button
              onClick={onClose}
              className="mr-3 rounded-md p-2 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <NavLinks />
          <div className="border-t border-sidebar-border px-5 py-4">
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Responsible AI — Review outputs before use.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
