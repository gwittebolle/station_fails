import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="home"
export default class extends Controller {
  static targets = ["button", "pageTitle"]

  connect() {
    this.blinkAutomatically()
    this.blinkPageTitle();
  }

  blinkAutomatically() {
    const colorButton = this.buttonTarget.children[0];
    const originalColor = "rgb(0, 0, 0)";
    const highlightColor = "rgb(30, 255, 0)";

    // Utilisez une promesse pour gérer le délai après la première animation
    new Promise((resolve) => setTimeout(resolve, 400))
      .then(() => {
        if (colorButton.style.backgroundColor === highlightColor) {
          colorButton.style.backgroundColor = originalColor;
          colorButton.style.color = "white";
          colorButton.style.boxShadow = `0 0 20px ${originalColor}`;
        }
        else
        {
          colorButton.style.backgroundColor = highlightColor;
          colorButton.style.color = "black";
          colorButton.style.boxShadow = `0 0 20px ${highlightColor}`;
        }
        this.blinkAutomatically();
      });
    }

    blinkTitle(titleElement, text, duration) {
      console.log("coucou");

      return new Promise((resolve) => {
        const startTime = Date.now();

        function update() {
          const currentTime = Date.now();
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);

          titleElement.innerText = text.substring(0, Math.floor(progress * text.length));

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            resolve(); // Résoudre la promesse lorsque l'animation est terminée
          }
        }

        update();
      });
    }

    blinkPageTitle() {
      const pageTitleElement = this.pageTitleTarget;
      const originalPageTitle = pageTitleElement.innerText;

      this.blinkTitle(pageTitleElement, originalPageTitle, 3000).then(() => {
        // Ajouter un délai de 3 secondes avant de relancer l'animation
        setTimeout(() => {
          this.blinkPageTitle();
        }, 3000);
      });
    }


}
