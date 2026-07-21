(() => {
  const dialog = document.getElementById("search-dialog");
  const openBtn = document.getElementById("search-open");
  const closeBtn = document.getElementById("search-close");
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");
  const hint = document.getElementById("search-hint");
  if (!dialog || !openBtn || !input || !results) return;

  let docs = null;
  let loading = null;
  let active = -1;

  const candidates = ["/search_index.es.json", "/search_index.en.json", "/search_index.json"];

  const extractDocs = (data) => {
    if (Array.isArray(data)) return data;
    if (data?.documentStore?.docs) {
      return Object.values(data.documentStore.docs);
    }
    if (data?.docs) return Object.values(data.docs);
    if (data?.index) return Object.values(data.index);
    return [];
  };

  const loadIndex = async () => {
    if (docs) return docs;
    if (loading) return loading;
    loading = (async () => {
      for (const url of candidates) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          docs = extractDocs(await res.json());
          return docs;
        } catch {
          /* try next */
        }
      }
      throw new Error("No se pudo cargar el índice de búsqueda");
    })();
    return loading;
  };

  const open = async () => {
    dialog.showModal();
    openBtn.setAttribute("aria-expanded", "true");
    input.value = "";
    results.innerHTML = "";
    active = -1;
    input.focus();
    try {
      await loadIndex();
      if (hint) hint.textContent = "Escribe al menos 2 caracteres. Atajo: /";
    } catch {
      if (hint) hint.textContent = "No se pudo cargar el índice de búsqueda.";
    }
  };

  const close = () => {
    dialog.close();
    openBtn.setAttribute("aria-expanded", "false");
    openBtn.focus();
  };

  const searchDocs = (query) => {
    if (!docs?.length) return [];
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return docs
      .map((d) => {
        const title = d.title || "";
        const body = d.body || d.content || d.description || "";
        const path = d.id || d.path || d.url || "";
        const hay = `${title} ${body} ${path}`.toLowerCase();
        const score = terms.reduce((acc, t) => acc + (hay.includes(t) ? 1 : 0), 0);
        return { title, path, score };
      })
      .filter((d) => d.score === terms.length)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  };

  const render = (items) => {
    results.innerHTML = "";
    if (!items.length) {
      const li = document.createElement("li");
      li.innerHTML = "<p class='search-hint'>Sin resultados.</p>";
      results.appendChild(li);
      return;
    }
    items.slice(0, 12).forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.path.startsWith("http") || item.path.startsWith("/") ? item.path : `/${item.path}`;
      a.setAttribute("role", "option");
      a.setAttribute("aria-selected", "false");
      a.innerHTML = `<strong>${item.title || "Sin título"}</strong><span class="result-path">${item.path}</span>`;
      li.appendChild(a);
      results.appendChild(li);
    });
  };

  openBtn.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) close();
  });

  input.addEventListener("input", () => {
    const q = input.value.trim();
    active = -1;
    if (q.length < 2) {
      results.innerHTML = "";
      return;
    }
    render(searchDocs(q));
  });

  document.addEventListener("keydown", (e) => {
    const tag = document.activeElement?.tagName;
    if (e.key === "/" && !dialog.open && tag !== "INPUT" && tag !== "TEXTAREA") {
      e.preventDefault();
      open();
    }
    if (e.key === "Escape" && dialog.open) close();
    if (!dialog.open) return;

    const options = [...results.querySelectorAll("a")];
    if (e.key === "ArrowDown") {
      e.preventDefault();
      active = Math.min(active + 1, options.length - 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      active = Math.max(active - 1, 0);
    } else if (e.key === "Enter" && active >= 0 && options[active]) {
      options[active].click();
    }
    options.forEach((el, i) => el.setAttribute("aria-selected", String(i === active)));
    options[active]?.scrollIntoView({ block: "nearest" });
  });
})();
