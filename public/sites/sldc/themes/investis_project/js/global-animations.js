/* const globalAnimation = (elements) => {
  if (elements.length) {
    elements.forEach((element) => {
      if (!element.classList.contains("animate")) {
        const rect = element.getBoundingClientRect();
        if (
          rect.top >= 0 &&
          rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        ) {
          const animationType = `animate--${element.getAttribute("data-animation")}`;
          element.classList.add("animate");
          element.classList.add(animationType);
        }
      }
    });
  }
};

// Make it available globally
window.globalAnimation = globalAnimation;
 */
const globalAnimation = (elements) => {
  if (elements.length) {
    elements.forEach((element) => {
      if (!element.classList.contains("animate")) {
        const rect = element.getBoundingClientRect();
        if (
          rect.top >= 0 &&
          rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        ) {
          const animationType = `animate--${element.getAttribute("data-animation")}`;
          element.classList.add("animate");
          element.classList.add(animationType);
        }
      }
    });
  }
};

window.globalAnimation = globalAnimation; // Attach to window


