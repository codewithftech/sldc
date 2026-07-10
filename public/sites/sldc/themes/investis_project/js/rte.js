export const tables = (tableInstances) => {
  tableInstances?.forEach((tableInstance) => {
    const parentElement = tableInstance.closest(".rte");

    if (parentElement) {
      if (!tableInstance.parentElement.classList.contains("overflow-x-auto")) {
        const wrapper = document.createElement("div");
        wrapper.className = "overflow-x-auto";

        tableInstance.parentNode.insertBefore(wrapper, tableInstance);

        wrapper.appendChild(tableInstance);
      }
    }
  });
};
