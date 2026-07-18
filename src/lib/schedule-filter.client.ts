export function setupScheduleFilters(): void {
  const itemsContainer = document.getElementById("schedule-items");
  const noResults = document.getElementById("no-results");
  if (!itemsContainer) return;

  function filterSchedule(): void {
    const docente = (document.getElementById("docente-select") as HTMLSelectElement)?.value?.toLowerCase() ?? "";
    const modalidad = (document.getElementById("modalidad-select") as HTMLSelectElement)?.value ?? "";
    const dia = (document.getElementById("dia-select") as HTMLSelectElement)?.value ?? "";

    const instructorCards = itemsContainer.querySelectorAll<HTMLElement>(".instructor-card");
    let visibleCount = 0;

    instructorCards.forEach((card) => {
      const instructorName = card.dataset.instructor ?? "";
      const attentionCards = card.querySelectorAll<HTMLElement>(".attention-card");
      let hasVisible = false;

      const instructorMatch = !docente || instructorName.includes(docente);

      if (!instructorMatch) {
        card.style.display = "none";
        return;
      }

      attentionCards.forEach((att) => {
        const attModalidad = att.dataset.modalidad ?? "";
        const attDia = att.dataset.dia ?? "";
        const match = (!modalidad || attModalidad === modalidad) && (!dia || attDia === dia);
        att.style.display = match ? "" : "none";
        if (match) hasVisible = true;
      });

      if (hasVisible) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (noResults) {
      noResults.classList.toggle("hidden", visibleCount > 0);
    }
  }

  document.addEventListener("filter-change", filterSchedule);
  filterSchedule();
}
