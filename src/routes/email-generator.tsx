import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Mail } from "lucide-react";
import { ToolWorkbench } from "@/components/tool-workbench";
import { generateEmail } from "@/lib/tools.functions";

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "Email Generator — KasiFlow" },
      {
        name: "description",
        content:
          "Generate professional emails in seconds. Built for South African entrepreneurs and hustlers.",
      },
      { property: "og:title", content: "Email Generator — KasiFlow" },
      {
        property: "og:description",
        content: "AI-powered email generator for South African hustlers.",
      },
    ],
  }),
  component: EmailGeneratorPage,
});

function EmailGeneratorPage() {
  const generate = useServerFn(generateEmail);

  return (
    <ToolWorkbench
      title="Email Generator"
      description="Write professional emails that get responses — just describe what you need."
      inputLabel="What email do you need?"
      inputPlaceholder="e.g. Write a follow-up email to Thabo from Cape Town Electrical about the quote I sent last Tuesday. Keep it friendly but professional, and ask for a response by Friday."
      outputLabel="Generated Email"
      buttonText="Generate Email"
      buttonIcon={<Mail className="h-4 w-4" />}
      generate={(input) => generate({ data: { input } })}
      tips={[
        "Mention the recipient",
        "Specify the tone",
        "Include key points",
      ]}
    />
  );
}
