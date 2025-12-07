export class MissManager {
  constructor(maxMisses = 5) {
    this.misses = 0;
    this.maxMisses = maxMisses;
    this.missElement = document.getElementById("miss-value");

    if (!this.missElement) {
      console.warn("Элемент miss-value не найден в DOM");
      this.missElement = this.createFallbackElement(
        "miss-value",
        "Пропущено: ",
      );
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
    value.textContent = `${this.misses}/${this.maxMisses}`;

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

  addMiss() {
    this.misses++;
    this.updateDisplay();
    return this.misses >= this.maxMisses;
  }

  reset() {
    this.misses = 0;
    this.updateDisplay();
  }

  updateDisplay() {
    if (this.missElement) {
      this.missElement.textContent = `${this.misses}/${this.maxMisses}`;
    }
  }
}
