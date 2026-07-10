export const sharePriceCaraousels = (sharePriceCaraouselInstances) => {
  sharePriceCaraouselInstances.forEach((sharePriceCaraouselInstance) => {
    const sharepriceCarousal = sharePriceCaraouselInstance?.querySelector("[data-shareprice-swiper]");
    const sharepricePrevButton = sharepriceCarousal?.querySelectorAll("[data-arrow-button]")[0];
    const sharepriceNextButton = sharepriceCarousal?.querySelectorAll("[data-arrow-button]")[1];
    let sharePrice = null;
    if (sharepriceCarousal) {
      sharePrice = new Swiper(sharepriceCarousal, {
        navigation: {
          nextEl: sharepriceNextButton,
          prevEl: sharepricePrevButton,
        },
      });
    }
    if (sharepriceCarousal) {
      const sharePrieCards = sharepriceCarousal.querySelectorAll("[data-shareprice-card]");
      sharePrieCards?.forEach((sharePrieCard) => {
        async function getData() {
          const url = sharePrieCard.getAttribute("data-json-url");
          const $date = sharePrieCard.querySelector("[data-sharprice-date]");
          const $price = sharePrieCard.querySelector("[data-shareprice-currency]");
          const $change = sharePrieCard.querySelector("[data-shareprice-changes]");

          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }

            // Destructure stockquotes from the response
            const { stockquotes } = await response.json();

            if (stockquotes) {
              const market = stockquotes.Market; // Ensure 'market' is correctly assigned

              // Update the date and market
              if ($date) {
                $date.textContent = `${market ? market : ""} ${market ? "|" : ""} ${stockquotes.Date}`;
              }

              // Update the price
              const Currency = stockquotes.Currency || "GBP"; // Fallback to GBP if currency is not available
              if ($price) {
                $price.textContent = `${stockquotes.CurrentPrice} ${Currency}`;
              }

              // Update the change
              if ($change) {
                $change.textContent = `${stockquotes.Change} (${stockquotes.PercentageChange}%)`;
              }
            } else {
              throw new Error("Invalid data structure");
            }
          } catch (error) {
            console.error("Failed to fetch data: ", error.message);
            if ($date) {
              $date.textContent = "Error loading data"; // Update with an error message
            }
            if ($price) {
              $price.textContent = ""; // Clear price on error
            }
            if ($change) {
              $change.textContent = ""; // Clear change on error
            }
          }
        }

        getData(); // Call the function to fetch data
      });
    }
  });
};
