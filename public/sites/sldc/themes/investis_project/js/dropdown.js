export const globalDropdown = (dropdownInstances) => {
  if (dropdownInstances.length) {
    dropdownInstances.forEach((dropdownInstance) => {
      const dropdownTrigger = dropdownInstance.querySelector("[data-dropdown-trigger]");
      const dropdownRef = dropdownInstance.getAttribute("data-ref");
      document.addEventListener("click", (e) => {
        if (e.target.hasAttribute("data-dropdown-link")) {
          e.preventDefault();
          const currentLink = e.target;
          const selectedText = currentLink.getAttribute("data-value");
          const triggerLabel = e.target
            .closest("[data-dropdown-list]")
            .previousElementSibling.querySelector("[data-dropdown-button-label]");
          triggerLabel.textContent = selectedText;
          const customEvent = new CustomEvent("dropdownSelected", {
            detail: {
              dropdownRef,
              data: e.target.getAttribute("data-value"),
            },
          });
          window.dispatchEvent(customEvent);
        }
      });
    });
  }
};
