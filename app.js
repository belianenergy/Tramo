const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

function showToast(message) {
  let toast = qs(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function initSegmentedControls() {
  qsa(".segmented").forEach((group) => {
    qsa("button", group).forEach((button) => {
      button.addEventListener("click", () => {
        qsa("button", group).forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        showToast(`Vista actualizada: ${button.textContent.trim()}`);
      });
    });
  });
}

function initApartmentFilters() {
  const form = qs("[data-apartment-filters]");
  if (!form) return;
  const cards = qsa("[data-apartment-card]");
  const count = qs("[data-apartment-count]");
  const apply = () => {
    const status = form.status.value;
    const city = form.city.value;
    const query = form.query.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const matchesStatus = status === "todos" || card.dataset.status === status;
      const matchesCity = city === "todas" || card.dataset.city === city;
      const matchesQuery = !query || card.textContent.toLowerCase().includes(query);
      const show = matchesStatus && matchesCity && matchesQuery;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (count) count.textContent = `${visible} propiedades`;
  };
  form.addEventListener("input", apply);
  form.addEventListener("reset", () => window.setTimeout(apply));
  apply();
}

function initOperations() {
  const taskList = qs("[data-task-list]");
  if (!taskList) return;
  const filters = qsa("[data-task-filter]");
  const tasks = qsa("[data-task-row]");
  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.taskFilter;
      tasks.forEach((task) => {
        task.hidden = filter !== "todos" && task.dataset.priority !== filter;
      });
    });
  });
  qsa("[data-complete-task]", taskList).forEach((button) => {
    button.addEventListener("click", () => {
      const row = button.closest("[data-task-row]");
      row.classList.toggle("done");
      button.textContent = row.classList.contains("done") ? "Reabrir" : "Marcar hecha";
      showToast(row.classList.contains("done") ? "Acción marcada como hecha" : "Acción reabierta");
    });
  });
}

function initReportTabs() {
  const tabs = qsa("[data-tab]");
  if (!tabs.length) return;
  const panels = qsa("[data-tab-panel]");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
      });
      panels.forEach((panel) => { panel.hidden = true; });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      const panel = qs(`[data-tab-panel="${tab.dataset.tab}"]`);
      if (panel) panel.hidden = false;
    });
  });
}

function initCopyButtons() {
  qsa("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const source = qs(button.dataset.copy);
      const text = source ? source.innerText.trim() : "";
      try {
        await navigator.clipboard.writeText(text);
        showToast("Resumen copiado");
      } catch {
        showToast("No se pudo copiar en este navegador");
      }
    });
  });
}

function initLeadForm() {
  const form = qs("[data-lead-form]");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    showToast("Solicitud preparada para el piloto");
    form.reset();
  });
}

initSegmentedControls();
initApartmentFilters();
initOperations();
initReportTabs();
initCopyButtons();
initLeadForm();
