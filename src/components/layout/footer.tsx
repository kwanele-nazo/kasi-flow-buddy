import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="flex items-center gap-2 border-t border-border bg-card px-4 py-3 lg:px-8">
      <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
      <p className="text-xs font-medium text-muted-foreground sm:text-sm">
        Responsible AI — Review outputs before use.
      </p>
    </footer>
  );
}
