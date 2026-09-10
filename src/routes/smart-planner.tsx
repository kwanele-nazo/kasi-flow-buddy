import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CalendarClock } from "lucide-react";
import { ToolWorkbench } from "@/components/tool-workbench";
import { planSchedule } from "@/lib/tools.functions";

export const Route = createFileRoute("/smart-planner")({
  head: () => ({
    meta: [
      { title: "Smart Planner — KasiFlow" },
      {
        name: "description",
        content:
          "Plan your day or week with AI-prioritized tasks and realistic time blocks.",
      },
      { property: "og:title", content: "Smart Planner — KasiFlow" },
      {
        property: "og:description",
        content: "AI-powered smart planner for South African hustlers.",
      },
    ],
  }),
  component: SmartPlannerPage,
});

function SmartPlannerPage() {
  const generate = useServerFn(planSchedule);

  return (
    <ToolWorkbench
      title="Smart Planner"
      description="Tell us your tasks and available time — get a prioritized schedule with time blocks."
      inputLabel="Your tasks, goals & available time"
      inputPlaceholder="e.g. I have from 8am to 5pm today. Need to: finish client proposal (2h), call supplier about stock (30min), update Instagram page (45min), review team's work (1h), and I have a meeting at 2pm for 1 hour. I want to fit in a gym session too."
      outputLabel="Your AI Plan"
      buttonText="Create Plan"
      buttonIcon={<CalendarClock className="h-4 w-4" />}
      generate={(input) => generate({ data: { input } })}
      tips={[
        "List all tasks",
        "Mention time constraints",
        "Include breaks & personal time",
      ]}
    />
  );
}
