export const attachShareListeners = (parentElements) => {
  const parents = parentElements instanceof NodeList ? parentElements : [parentElements];

  parents.forEach((parentElement) => {
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    const buttons = parentElement.querySelectorAll("[data-share]");
    const shareButtons = parentElement.querySelector("[data-share-link]");
    const shareClose = document.querySelector(".share__close");
    shareButtons?.addEventListener("click", (e) => {
      e.preventDefault();
      shareButtons?.parentElement.classList.add("open");
    });

    shareClose.addEventListener("click", (event) => {
      event.preventDefault();
      const openElement = shareClose.closest(".share");
      if (openElement) {
        openElement.classList.remove("open");
      }
    });
    buttons.forEach((button) => {
      if (button.dataset.facebook) {
        button.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
      }
      if (button.dataset.twitter) {
        button.href = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
      }
      if (button.dataset.linkedin) {
        button.href = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`;
      }

      button.addEventListener("click", (event) => {
        event.preventDefault();
        window.open(button.href, "_blank", "width=600,height=400");
      });
    });
  });
};
