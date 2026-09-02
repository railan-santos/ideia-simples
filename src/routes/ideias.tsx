import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  carregarIdeias,
  formatarData,
  lerArquivoImagem,
  salvarIdeias,
  type Ideia,
} from "@/lib/ideias";

export const Route = createFileRoute("/ideias")({
  head: () => ({
    meta: [
      { title: "Minhas ideias — Ideias Simples" },

      {
        name: "description",
        content:
          "Cadastre, edite e consulte suas anotações de estudo com título, conteúdo, categoria, tags e imagem.",
      },
    ],
  }),
  component: PaginaIdeias,
});

const formularioVazio = {
  titulo: "",
  conteudo: "",
  categoria: "",
  autor: "",
  tags: "",
  imagem: null as string | null,
};

function PaginaIdeias() {
  const [ideias, setIdeias] = useState<Ideia[]>([]);
  const [pronto, setPronto] = useState(false);
  const [formulario, setFormulario] = useState(formularioVazio);
  const [idEmEdicao, setIdEmEdicao] = useState<string | null>(null);

  // Carrega as ideias salvas ao abrir a página
  useEffect(() => {
    setIdeias(carregarIdeias());
    setPronto(true);
  }, []);

  // Salva automaticamente sempre que a lista muda
  useEffect(() => {
    if (pronto) salvarIdeias(ideias);
  }, [ideias, pronto]);

  const ideiasOrdenadas = useMemo(
    () => [...ideias].sort((a, b) => b.atualizadaEm - a.atualizadaEm),
    [ideias],
  );

  function limparFormulario() {
    setFormulario(formularioVazio);
    setIdEmEdicao(null);
  }

  function aoEnviar(e: React.FormEvent) {
    e.preventDefault();
    if (!formulario.titulo.trim()) return;
    const tags = formulario.tags
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);
    const agora = Date.now();

    if (idEmEdicao) {
      // Atualiza a ideia existente
      setIdeias((anteriores) =>
        anteriores.map((ideia) =>
          ideia.id === idEmEdicao

            ? {
              ...ideia,
              titulo: formulario.titulo.trim(),
              conteudo: formulario.conteudo.trim(),
              categoria: formulario.categoria.trim(),
              autor: formulario.autor.trim(),
              tags,
              imagem: formulario.imagem,
              atualizadaEm: agora,
            }
            : ideia,
        ),
      );
    } else {
      // Cadastra uma nova ideia
      setIdeias((anteriores) => [
        {
          id: crypto.randomUUID(),
          titulo: formulario.titulo.trim(),
          conteudo: formulario.conteudo.trim(),
          categoria: formulario.categoria.trim(),
          autor: formulario.autor.trim(),
          tags,
          imagem: formulario.imagem,
          criadaEm: agora,
          atualizadaEm: agora,
        },
        ...anteriores,
      ]);
    }
    limparFormulario();
  }

  function iniciarEdicao(ideia: Ideia) {
    setIdEmEdicao(ideia.id);
    setFormulario({
      titulo: ideia.titulo,
      conteudo: ideia.conteudo,
      categoria: ideia.categoria,
      autor: ideia.autor || "",
      tags: ideia.tags.join(", "),
      imagem: ideia.imagem,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function excluir(id: string) {
    setIdeias((anteriores) => anteriores.filter((ideia) => ideia.id !== id));
    if (idEmEdicao === id) limparFormulario();
  }

  const classeCampo =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20";
  const classeRotulo =
    "mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6">
          <Link to="/" className="group flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 3h10l4 4v14H5z" strokeLinejoin="round" />
                <path d="M15 3v4h4" strokeLinejoin="round" />
                <path d="M8 12h8M8 16h5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-tight group-hover:underline underline-offset-4">
              Ideias Simples
            </span>
          </Link>
          <span className="font-mono text-xs text-muted-foreground">
            {ideias.length} {ideias.length === 1 ? "ideia" : "ideias"}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8">
        <form
          onSubmit={aoEnviar}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold">
              {idEmEdicao ? "Editar ideia" : "Nova ideia"}
            </h2>
            {idEmEdicao && (
              <button
                type="button"
                onClick={limparFormulario}
                className="text-xs font-medium text-muted-foreground underline-offset-4 hover:underline"
              >
                cancelar edição
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={classeRotulo} htmlFor="titulo">
                Título
              </label>
              <input
                id="titulo"
                className={classeCampo}
                value={formulario.titulo}
                onChange={(e) => setFormulario({ ...formulario, titulo: e.target.value })}
                placeholder="Ex.: Promises em JavaScript"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className={classeRotulo} htmlFor="conteudo">
                Conteúdo
              </label>
              <textarea
                id="conteudo"
                rows={4}
                className={`${classeCampo} resize-y`}
                value={formulario.conteudo}
                onChange={(e) => setFormulario({ ...formulario, conteudo: e.target.value })}
                placeholder="Escreva com suas próprias palavras…"
              />
            </div>

            <div>
              <label className={classeRotulo} htmlFor="categoria">
                Categoria
              </label>
              <input
                id="categoria"
                className={classeCampo}
                value={formulario.categoria}
                onChange={(e) => setFormulario({ ...formulario, categoria: e.target.value })}
                placeholder="Ex.: JavaScript"
              />
            </div>

            <div>
              <label className={classeRotulo} htmlFor="tags">
                Tags (separadas por vírgula)
              </label>
              <input
                id="tags"
                className={classeCampo}
                value={formulario.tags}
                onChange={(e) => setFormulario({ ...formulario, tags: e.target.value })}
                placeholder="assíncrono, revisão"
              />
            </div>

            <div>
              <label className={classeRotulo} htmlFor="autor">
                Autor (opcional)
              </label>
              <input
                id="autor"
                className={classeCampo}
                value={formulario.autor}
                onChange={(e) => setFormulario({ ...formulario, autor: e.target.value })}
                placeholder="Ex.: Seu nome"
              />
            </div>


            <div className="sm:col-span-2">
              <label className={classeRotulo} htmlFor="imagem">
                Imagem
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="imagem"
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const arquivo = e.target.files?.[0];
                    if (arquivo)
                      setFormulario({ ...formulario, imagem: await lerArquivoImagem(arquivo) });
                  }}
                  className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-sm file:font-medium file:text-secondary-foreground"
                />
                {formulario.imagem && (
                  <div className="flex shrink-0 items-center gap-2">
                    <img
                      src={formulario.imagem}
                      alt="Pré-visualização da imagem da ideia"
                      className="size-12 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormulario({ ...formulario, imagem: null })}
                      className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                    >
                      remover
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {idEmEdicao ? "Salvar alterações" : "Cadastrar ideia"}
            </button>
          </div>
        </form>

        <section className="mt-10">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Minhas ideias
          </h2>

          {ideiasOrdenadas.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border px-5 py-12 text-center text-sm text-muted-foreground">
              Nenhuma ideia cadastrada ainda. Comece registrando a primeira acima.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {ideiasOrdenadas.map((ideia) => (
                <article
                  key={ideia.id}
                  className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  {ideia.imagem && (
                    <img
                      src={ideia.imagem}
                      alt={`Imagem da ideia ${ideia.titulo}`}
                      className="mb-4 aspect-[16/9] w-full rounded-xl object-cover"
                    />
                  )}
                  {ideia.categoria && (
                    <span className="mb-2 w-fit rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                      {ideia.categoria}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold leading-snug">{ideia.titulo}</h3>
                  {ideia.conteudo && (
                    <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                      {ideia.conteudo}
                    </p>
                  )}
                  {ideia.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {ideia.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex items-end justify-between border-t border-border pt-3">
                    <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
                      criada em {formatarData(ideia.criadaEm)}
                      <br />
                      atualizada em {formatarData(ideia.atualizadaEm)}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => iniciarEdicao(ideia)}
                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => excluir(ideia.id)}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
