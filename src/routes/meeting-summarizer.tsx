import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { FileText } from "lucide-react";
import { ToolWorkbench } from "@/components/tool-workbench";
import { summarizeMeeting } from "@/lib/tools.functions";

export const Route = createFileRoute("/meeting-summarizer")({
  head: () => ({
    meta: [
      { title: "Meeting Summarizer — KasiFlow" },
      {
        name: "description",
        content:
          "Turn meeting notes into clear summaries, decisions, and action items with AI.",
      },
      { property: "og:title", content: "Meeting Summarizer — KasiFlow" },
      {
        property: "og:description",
        content: "AI-powered meeting summarizer for South African hustlers.",
      },
    ],
  }),
  component: MeetingSummarizerPage,
});

function MeetingSummarizerPage() {
  const generate = useServerFn(summarizeMeeting);

  return (
    <ToolWorkbench
      title="Meeting Summarizer"
      description="Paste your meeting notes or transcript — get a clean summary with action items."
      inputLabel="Meeting notes or transcript"
      inputPlaceholder="e.g. Met with the team at 10am. Sipho said the new stock arrives Monday. We agreed to push the launch to the 20th. Nomsa will handle social media posts. Need to follow up with the supplier about bulk pricing. Next meeting Friday 2pm."
      outputLabel="Summary & Action Items"
      buttonText="Summarize Meeting"
      buttonIcon={<FileText className="h-4 w-4" />}
      generate={(input) => generate({ data: { input } })}
      tips={[
        "Include attendee names",
        "Note any deadlines",
        "Raw notes are fine",
      ]}
    />
  );
}
