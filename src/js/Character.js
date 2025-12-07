export class Character {
  constructor(imageSrc) {
    this.imageSrc = imageSrc;
    this.element = null;
    this.isVisible = false;
    this.hideTimeout = null;
  }

  create() {
    if (this.element) {
      return this.element;
    }

    this.element = document.createElement("img");
    this.element.src = this.imageSrc;
    this.element.className = "character";
    this.element.alt = "Game Character";
    return this.element;
  }

  showInCell(cell) {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    this.create();

    if (this.element.parentNode) {
      this.element.parentNode.append(this.element);
    }
    cell.append(this.element);
    this.isVisible = true;

    // Анимация появления
    this.element.style.opacity = "0";
    this.element.style.transform = "scale(0.5)";
    this.element.style.transition = "opacity 50ms, transform 50ms";

    requestAnimationFrame(() => {
      this.element.style.opacity = "1";
      this.element.style.transform = "scale(1)";
    });
  }

  hide() {
    if (!this.element || !this.isVisible) return;
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
    this.isVisible = false;

    // Анимация исчезновения
    this.element.style.transition = "opacity 300ms, transform 300ms";
    this.element.style.opacity = "0";
    this.element.style.transform = "scale(0.5)";

    this.hideTimeout = setTimeout(() => {
      if (this.element.parentNode) {
        this.element.parentNode.append(this.element);
      }
      this.hideTimeout = null;
    }, 300);
  }

  isClicked(event) {
    return this.element && this.element.contains(event.target);
  }
}
