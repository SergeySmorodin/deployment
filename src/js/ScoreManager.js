export class ScoreManager {
  constructor() {
    this.score = 0;
    this.scoreElement = document.getElementById("score-value");

    if (!this.scoreElement) {
      console.warn("Элемент score-value не найден в DOM");
      this.scoreElement = this.createFallbackElement("score-value", "Счет: ");
    }
  }

  createFallbackElement(id, labelText) {
    const container = document.createElement("div");
    container.className = "stat-item";

    const label = document.createElement("span");
    label.className = "stat-label";
    label.textContent = labelText;

    const value = document.createElement("span");
    value.id = id;
    value.className = "stat-value";
    value.textContent = this.score;

    container.append(label, value);

    let statsContainer = document.querySelector(".game-stats");
    if (!statsContainer) {
      statsContainer = document.createElement("div");
      statsContainer.className = "game-stats";
      const gameContainer = document.querySelector(".game-container");
      if (gameContainer) {
        const title = gameContainer.querySelector("h1");
        if (title) {
          title.after(statsContainer);
        }
      }
    }

    statsContainer.append(container);
    return value;
  }

  increase() {
    this.score++;
    this.updateDisplay();
  }

  reset() {
    this.score = 0;
    this.updateDisplay();
  }

  updateDisplay() {
    if (this.scoreElement) {
      this.scoreElement.textContent = this.score;
    }
  }
}
