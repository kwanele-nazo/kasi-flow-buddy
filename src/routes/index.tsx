import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Mail, FileText, CalendarClock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — KasiFlow" },
      {
        name: "description",
        content:
          "Your AI toolkit: generate professional emails, summarize meetings, and plan your day — built for South African hustlers.",
      },
      { property: "og:title", content: "Dashboard — KasiFlow" },
      {
        property: "og:description",
        content:
          "AI-powered email generator, meeting summarizer, and smart planner for SA hustlers.",
      },
    ],
  }),
  component: Dashboard,
});

const tools = [
  {
    to: "/email-generator",
    icon: Mail,
    title: "Email Generator",
    description:
      "Write professional emails that get responses from clients, suppliers, and partners.",
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    to: "/meeting-summarizer",
    icon: FileText,
    title: "Meeting Summarizer",
    description:
      "Turn messy meeting notes into clear summaries, decisions, and action items.",
    accent: "from-orange-500/20 to-red-500/10",
  },
  {
    to: "/smart-planner",
    icon: CalendarClock,
    title: "Smart Planner",
    description:
      "Plan your day or week with AI-prioritized tasks and realistic time blocks.",
    accent: "from-yellow-500/20 to-amber-500/10",
  },
] as const;

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Hero */}
      <header className="mb-8 lg:mb-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          AI-Powered Toolkit
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">
          Welcome to KasiFlow
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Your AI assistant for the hustle. Generate emails, summarize meetings,
          and plan your day — all in one place. Built for South African
          entrepreneurs.
        </p>
      </header>

      {/* Tool cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.to}
              to={tool.to}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:card-glow"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${tool.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  {tool.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Open tool
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom tip */}
      <div className="mt-8 rounded-xl border border-border bg-card p-5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Tip:</span> Use{" "}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs">
            Ctrl
          </kbd>{" "}
          +{" "}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs">
            Enter
          </kbd>{" "}
          to quickly generate output from any tool.
        </p>
      </div>
    </div>
  );
}
