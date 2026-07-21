(() => {
  const script = document.currentScript;
  const copyLabel = script?.dataset?.copyLabel || "Copiar";
  const copiedLabel = script?.dataset?.copiedLabel || "Copiado";

  const blocks = document.querySelectorAll(".prose pre");
  blocks.forEach((pre) => {
    const wrapper = document.createElement("div");
    wrapper.className = "code-block";
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = copyLabel;
    btn.setAttribute("aria-label", copyLabel);
    wrapper.appendChild(btn);

    btn.addEventListener("click", async () => {
      const text = pre.innerText;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = copiedLabel;
        setTimeout(() => {
          btn.textContent = copyLabel;
        }, 1600);
      } catch {
        btn.textContent = "Error";
      }
    });
  });
})();
