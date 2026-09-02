// Representa uma anotação de estudo salva no navegador
export interface Ideia {
  id: string;
  titulo: string;
  conteudo: string;
  categoria: string;
  autor?: string; // ? PARA DEIXAR OPCIONAL
  tags: string[];
  imagem: string | null; // imagem em formato data URL
  criadaEm: number;
  atualizadaEm: number;
}

const CHAVE_ARMAZENAMENTO = "ideias-simples:v1";

export function carregarIdeias(): Ideia[] {
  try {
    const bruto = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (!bruto) return [];
    const dados = JSON.parse(bruto);
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

export function salvarIdeias(ideias: Ideia[]) {
  localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(ideias));
}

export function formatarData(data: number) {
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function lerArquivoImagem(arquivo: File): Promise<string> {
  return new Promise((resolver, rejeitar) => {
    const leitor = new FileReader();
    leitor.onload = () => resolver(leitor.result as string);
    leitor.onerror = rejeitar;
    leitor.readAsDataURL(arquivo);
  });
}
