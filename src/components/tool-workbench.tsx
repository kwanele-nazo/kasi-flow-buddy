import { useState, type ReactNode } from "react";
import { Copy, Check, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ToolWorkbenchProps {
  /** Page title shown above the workbench */
  title: string;
  /** Short description below the title */
  description: string;
  /** Label for the input panel */
  inputLabel: string;
  /** Placeholder for the textarea */
  inputPlaceholder: string;
  /** Label for the output panel */
  outputLabel: string;
  /** Text on the generate button */
  buttonText: string;
  /** Function that calls the server and returns { output } */
  generate: (input: string) => Promise<{ output: string }>;
  /** Icon shown in the generate button */
  buttonIcon: ReactNode;
  /** Optional quick-tip chips shown under the textarea */
  tips?: string[];
}

export function ToolWorkbench({
  title,
  description,
  inputLabel,
  inputPlaceholder,
  outputLabel,
  buttonText,
  generate,
  buttonIcon,
  tips,
}: ToolWorkbenchProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const result = await generate(input.trim());
      setOutput(result.output);
    } catch (e) {
      const msg =
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      </header>

      {/* Input / Output grid */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Input panel */}
        <section className="flex flex-col gap-3">
          <label
            htmlFor="tool-input"
            className="text-sm font-semibold text-foreground"
          >
            {inputLabel}
          </label>
          <textarea
            id="tool-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={inputPlaceholder}
            disabled={loading}
            className="min-h-[220px] flex-1 resize-y rounded-xl border border-input bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50"
          />
          {tips && tips.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tips.map((tip, i) => (
                <span
                  key={i}
                  className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  {tip}
                </span>
              ))}
            </div>
          )}
          <button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              buttonIcon
            )}
            {loading ? "Generating…" : buttonText}
          </button>
        </section>

        {/* Output panel */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              {outputLabel}
            </span>
            {output && !loading && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <div className="min-h-[220px] flex-1 rounded-xl border border-input bg-card p-4">
            {loading ? (
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3">
                <div className="shimmer-bg h-4 w-3/4 rounded" />
                <div className="shimmer-bg h-4 w-2/3 rounded" />
                <div className="shimmer-bg h-4 w-4/5 rounded" />
                <p className="mt-2 text-xs text-muted-foreground">
                  AI is working on it…
                </p>
              </div>
            ) : error ? (
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 text-center">
                <AlertCircle className="h-8 w-8 text-destructive" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            ) : output ? (
              <div className="prose-output text-sm leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="mb-2 mt-3 font-display text-lg font-bold text-foreground first:mt-0">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mb-2 mt-4 font-display text-base font-semibold text-primary first:mt-0">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mb-1 mt-3 text-sm font-semibold text-foreground">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-2 text-sm leading-relaxed text-card-foreground">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-2 list-disc space-y-1 pl-5 text-sm text-card-foreground">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-2 list-decimal space-y-1 pl-5 text-sm text-card-foreground">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-sm text-card-foreground">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-foreground">
                        {children}
                      </strong>
                    ),
                    code: ({ children }) => (
                      <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-primary">
                        {children}
                      </code>
                    ),
                    hr: () => (
                      <hr className="my-3 border-border" />
                    ),
                  }}
                >
                  {output}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary/60" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Your output will appear here.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
