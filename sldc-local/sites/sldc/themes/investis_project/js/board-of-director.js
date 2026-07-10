export const bod = (bodInstances) => {
    bodInstances.forEach((bodInstance) => {
      const profileCards = bodInstance.querySelectorAll("[data-profile-card]:not([data-bs-toggle])");
      const profileDetails = bodInstance.querySelectorAll("[data-profile-details]");
      const profilecardLinks = bodInstance.querySelectorAll(".profile-card__card-link");
      const tabButtons = bodInstance.querySelectorAll(".tabs__link");
      const checkPopup = bodInstance.classList.contains("bod--popup");
  
      profileDetails.forEach((detail) => {
        if (!checkPopup)
          detail
            .querySelectorAll("button, a")
            .forEach((button) => button.setAttribute("tabindex", "-1"));
      });
  
      function handleProfileToggle(profileCard) {
        if (checkPopup) return;
  
        const profileDetail = profileCard.nextElementSibling;
        const isActive = profileCard.classList.contains("profile-card--visible");
        closeProfile();
  
        if (!isActive) {
          profileCard.classList.add("profile-card--visible");
          if (profileDetail) {
            profileDetail.classList.add("profile-detail--visible");
            profileDetail
              .querySelectorAll("button, a")
              .forEach((button) => button.setAttribute("tabindex", "0"));
          }
        }
        changeCTA(profileCard);
      }
  
      function closeProfile() {
        profileCards.forEach((profileCard) => {
          if (profileCard.classList.contains("profile-card--visible")) {
            profileCard.classList.remove("profile-card--visible");
            const profileDetail = profileCard.nextElementSibling;
            if (profileDetail) {
              profileDetail.classList.remove("profile-detail--visible");
              if (!checkPopup)
                profileDetail
                  .querySelectorAll("button, a")
                  .forEach((button) => button.setAttribute("tabindex", "-1"));
            }
            changeCTA(profileCard);
          }
        });
      }
  
      function changeCTA(card) {
        const ctaLabel = card.querySelector(".cta__label");
        if (!ctaLabel) return;
        const ctaIcon = card.querySelector(".cta__icon");
        const isActive = card.classList.contains("profile-card--visible");
        if (!ctaLabel.dataset.textContent) {
          // ctaLabel.dataset.textContent = ctaLabel.textContent;
           ctaLabel.dataset.textContent = "Learn more";
        }
        ctaLabel.textContent = isActive ? "Close" : ctaLabel.dataset.textContent;
        ctaIcon.classList.toggle("icon-close", isActive);
        ctaIcon.classList.toggle("icon-chevron-right", !isActive);
      }
  
      profileCards.forEach((profileCard) => {
        profileCard.addEventListener("click", (event) => {
          if (!event.target.closest(".profile-card__content")) {
            handleProfileToggle(profileCard);
          }
          event.target.blur();
        });
        profileCard
          .querySelector(".profile-card__input")
          ?.addEventListener("focus", () => handleProfileToggle(profileCard));
      });
  
      profileDetails.forEach((profileDetail) => {
        profileDetail.querySelector("[data-action-button]")?.addEventListener("click", closeProfile);
      });
  
      if (window.innerWidth > 992) {
        profilecardLinks.forEach((cardLink) => {
          cardLink.addEventListener("focusin", () => {
            const profileCard = cardLink.closest("[data-profile-card]");
            if (profileCard) handleProfileToggle(profileCard);
          });
        });
      }
  
      function cardLayouts() {
        document.querySelectorAll("[data-equal]").forEach((bodCard) => {
          const cards = bodCard.querySelectorAll("[data-equal-card]");
          const maxHeight = Math.max(...Array.from(cards, (card) => card.scrollHeight));
          cards.forEach((card) => {
            card.style.minHeight = window.innerWidth > 768 ? `${maxHeight}px` : "auto";
          });
        });
  
        document.querySelectorAll(".profile-card__image-wrapper").forEach((image) => {
          const cardLink = image.closest(".profile-card__card-link");
          const targetCard = cardLink?.querySelector(".profile-card__content");
          if (targetCard) {
            cardLink.style.paddingBottom = `${targetCard.scrollHeight}px`;
          }
        });
      }
  
      cardLayouts();
      window.addEventListener("resize", cardLayouts);
  
      tabButtons.forEach((button) => {
        button.addEventListener("click", cardLayouts);
      });
  
      profilecardLinks.forEach((cardLink) => {
        cardLink.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.keyCode === 13) {
            cardLink.querySelector(".cta--overlay-card")?.click();
          }
        });
      });
  
      bodInstance.addEventListener("keydown", (event) => {
        if (event.keyCode === 27) closeProfile();
      });
    });
  };
  