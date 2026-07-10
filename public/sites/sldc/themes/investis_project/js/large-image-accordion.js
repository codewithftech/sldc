export const largeImageAccordion = (largeAccordionInstances) => {
  largeAccordionInstances.forEach((largeAccordionInstance) => {
    const prevButton = largeAccordionInstance.querySelector("[data-arrow-button]:first-of-type");
    const nextButton = largeAccordionInstance.querySelector("[data-arrow-button]:last-of-type");
    const expandCTAInstaces = largeAccordionInstance.querySelectorAll("[data-expand-cta]");

    expandCTAInstaces.forEach((expandCTA) => {
      const ctaLabelElm = expandCTA.querySelector(".cta__label");
      const ctaIconElm = expandCTA.querySelector(".cta__icon");
      let currentCTALabel = ctaLabelElm.textContent;

      expandCTA.addEventListener("click", (e) => {
        e.preventDefault();
        expandCTA.parentNode.classList.toggle("open");
        expandCTA.parentNode.nextElementSibling.classList.toggle("open");
        ctaIconElm.classList.toggle("icon-chevron-down");
        ctaIconElm.classList.toggle("icon-close");
        ctaLabelElm.textContent = expandCTA.getAttribute("data-expand-label");
        ctaLabelElm.parentNode.setAttribute("data-expand-label", currentCTALabel);
      });
    });

    const largeAccordionSwiper = new Swiper(largeAccordionInstance, {
      loop: true,
      slidePerView: 1,
      loopAdditionalSlides: 1,
      centeredSlides: true,
      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
    });
  });
};
