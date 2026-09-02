import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ideias Simples — Caderno de anotações de estudo" },
      {
        name: "description",
        content:
          "Um caderno pessoal e simples para registrar o que você aprendeu, escrevendo com suas próprias palavras e organizando por categoria, tags e imagem.",
      },
      { property: "og:title", content: "Ideias Simples — Caderno de anotações de estudo" },
      {
        property: "og:description",
        content:
          "Um caderno pessoal e simples para registrar o que você aprendeu, escrevendo com suas próprias palavras e organizando por categoria, tags e imagem.",
      },
    ],
  }),
  component: PaginaInicial,
});

function PaginaInicial() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="flex max-w-full px-8 items-center justify-between px-5 py-6">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 3h10l4 4v14H5z" strokeLinejoin="round" />
                <path d="M15 3v4h4" strokeLinejoin="round" />
                <path d="M8 12h8M8 16h5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-base font-semibold tracking-tight">Ideias Simples</span>
          </div>

          <Link
            to="/ideias"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Minhas ideias
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Caderno pessoal de estudos
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Registrar o que eu aprendi,{" "}
              <span className="text-primary">com minhas PRÓPRIAS palavras.</span>
            </h1>

            <p className="mt-4 text-base text-muted-foreground">
              Este é o meu espaço para fixar conceitos de <strong className="text-foreground">programação</strong> e estudos diários.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/ideias"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Começar a anotar
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-5xl px-5 py-16 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Pronto para registrar a primeira ideia?
            </h2>
            <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted-foreground">
              Não precisa de conta. Abra o caderno, escreva com suas palavras e
              guarde o que aprendeu.
            </p>
            <Link
              to="/ideias"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Abrir o caderno
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-5 py-8 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            Ideias Simples — um caderno pessoal de estudos
          </p>
        </div>
      </footer>
    </div>
  );
}
