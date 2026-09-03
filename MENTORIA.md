# 🎓 Diário de Aprendizado & Mentoria — Ideias Simples

Este documento serve como a **memória contínua** da nossa mentoria de programação. Ele registra as regras de ensino, todo o progresso feito e o ponto exato de onde vamos continuar quando você abrir este projeto em qualquer máquina (notebook ou PC).

---

## 📌 Regras da Mentoria (Contrato de Aprendizado)

1. **Atuação:** O assistente atua como **Professor e Mentor de Programação**, passando exercícios funcionais práticos e explicando o porquê de cada coisa, sem nunca entregar apenas código pronto.
2. **Ritmo:** **Um passo por vez**, sem pressa, do nível mais básico ao avançado.
3. **Sem código mágico:** Qualquer conceito, função ou símbolo novo (`const`, `useState`, `[]`, `{}`, `?`, etc.) é explicado de forma super óbvia, intuitiva e resumida.
4. **Nomes em Português:** Sempre que for código criado por nós (funções, variáveis, estados), usar nomes em português (`aoEnviar`, `iniciarEdicao`, `formulario`). Manter termos em inglês apenas quando for convenção de bibliotecas (ex: `useState`, `Link`, `Route`).
5. **Formato das Lições:**
   * O que vamos fazer
   * Por que precisamos fazer isso
   * Explicação linha a linha
   * Exercício prático para o aluno codificar
   * Revisão e feedback do resultado

---

## 🚀 Resumo do que já Aprendemos e Praticamos

### Módulo 1: HTML, JSX & Flexbox (Tela Inicial)
* **JSX vs HTML:** Diferenças fundamentais (ex: por que usamos `className` em vez de `class`).
* **Dead Code (Código Morto):** O que é e por que devemos limpar variáveis e constantes que não são mais usadas.
* **Flexbox no Tailwind:**
  * `flex` (coloca itens lado a lado em fila).
  * `items-center` (alinha todos na mesma altura/eixo vertical).
  * `gap-2`, `gap-4` (respiro automático entre os itens).
  * `justify-between` (empurra um item para a extrema esquerda e outro para a extrema direita).
  * `w-full` e `px-8` (largura total com respiro lateral).

### Módulo 2: TypeScript & Modelagem de Dados
* **Interfaces:** O "RG" ou molde de um objeto (`interface Ideia`).
* **Tipagem:** `string` (texto), `number` (número), `string[]` (lista de textos), `string | null` (união/ou).
* **Propriedades Opcionais (`?`):** A diferença prática entre um campo obrigatório (`categoria: string`) e um opcional (`autor?: string`).
* **Funções e Tipos:** Como o TypeScript valida parâmetros de entrada e tipos de retorno (`carregarIdeias(): Ideia[]`).
* **Persistência:** O que é o `localStorage` do navegador e por que usamos `JSON.stringify` (empacotar) e `JSON.parse` (desempacotar).

### Módulo 3: React & Estados (`useState`)
* **`useState`:** A analogia do *Quadro Branco* (o estado visível) e da *Caneta Mágica* (`setFormulario`).
* **Desestruturação:** O padrão `const [dado, setDado] = useState(...)`.
* **Inputs Controlados:** Como ligar uma caixinha `<input>` ao estado com `value` e `onChange={(e) => setFormulario({ ...formulario, campo: e.target.value })}`.
* **Operador Spread (`...`):** Copiar o estado anterior antes de alterar apenas um campo.
* **Fallback com `||`:** Prevenir erros no TypeScript quando um campo opcional pode vir vazio (`ideia.autor || ""`).

### Módulo 4: Git & Versionamento Profissional
* **Ciclo básico do Git:** `git init` (iniciar), `git add .` (palco), `git commit -m` (foto oficial com legenda).
* **Conventional Commits:** Padrões profissionais (`feat:`, `fix:`, `style:`, `refactor:`, `docs:`).
* **Conexão Remota:** `git branch -M main`, `git remote add origin <url>`, `git push -u origin main`.
* **Merge Conflicts (Conflitos no Git):** O que são as marcas `<<<<<<< HEAD`, como limpar arquivos em conflito e continuar o rebase (`git rebase --continue`).

---

## 📍 Onde Paramos (Ponto Exato para Continuar)

1. Criamos o campo `autor?: string` na interface `Ideia` em `src/lib/ideias.ts`.
2. Adicionamos o campo `autor` no estado `formularioVazio` e no formulário visual de cadastro em `src/routes/ideias.tsx`.
3. Fizemos o primeiro commit e push oficial para o repositório no GitHub: `https://github.com/railan-santos/ideia-simples`.

---

### Lição 7: Renderização Condicional no JSX ✅
* **Operador `&&` no JSX:** "SE a condição existir, ENTÃO renderiza o elemento. Senão, não mostra nada."
* **Valores falsos em JS:** `undefined`, `""` (string vazia) e `null` são todos considerados falsos — o `&&` ignora o elemento nesses casos.
* **Prática:** Adicionamos `{ideia.autor && <p>Autor: {ideia.autor}</p>}` nos cards da listagem.
* **Percepção:** O mesmo padrão já existia para `imagem`, `categoria` e `conteudo` — renderização condicional está por todo o projeto.

---

## 📍 Onde Paramos (Ponto Exato para Continuar)

1. Criamos o campo `autor?: string` na interface `Ideia` em `src/lib/ideias.ts`.
2. Adicionamos o campo `autor` no formulário de cadastro em `src/routes/ideias.tsx`.
3. Exibimos o autor nos cards com renderização condicional (`&&`).
4. Fizemos o primeiro commit e push oficial para o GitHub: `https://github.com/railan-santos/ideia-simples`.

---

## 🎯 Próxima Lição (Lição 8):

* **Barra de Busca / Filtro:** Criar um `<input>` de pesquisa e um estado `busca` para filtrar as ideias exibidas por título, categoria ou tag.
* **`useMemo` e `.filter()`:** Aprender a derivar uma lista filtrada a partir do estado original sem modificá-lo.
* **Conceito:** A diferença entre o estado "fonte da verdade" (`ideias`) e uma lista derivada para exibição (`ideiasExibidas`).

---

## 💬 Mensagem para colar no chat da IDE no seu PC:

> *"Olá! Estou continuando meus estudos do projeto Ideias Simples neste PC. Leia o arquivo `MENTORIA.md` para ver todo o nosso histórico de aprendizado, nossas regras de mentoria (um passo por vez, em português, sem código mágico) e vamos continuar exatamente a partir da **Lição 8**!"*
