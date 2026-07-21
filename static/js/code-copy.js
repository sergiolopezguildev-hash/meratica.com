(() => {
  const blocks = document.querySelectorAll(".prose pre");
  blocks.forEach((pre) => {
    const wrapper = document.createElement("div");
    wrapper.className = "code-block";
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "Copiar";
    btn.setAttribute("aria-label", "Copiar bloque de código");
    wrapper.appendChild(btn);

    btn.addEventListener("click", async () => {
      const text = pre.innerText;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = "Copiado";
        setTimeout(() => {
          btn.textContent = "Copiar";
        }, 1600);
      } catch {
        btn.textContent = "Error";
      }
    });
  });
})();
