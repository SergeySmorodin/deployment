export class CustomCursor {
  setup() {
    const hammerSVG = `
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="120" viewBox="0 0 60 120">
                <rect x="24" y="20" width="12" height="80" rx="3" fill="#8B4513" stroke="#654321" stroke-width="2"/>
                <rect x="10" y="15" width="40" height="30" rx="4" fill="#A9A9A9" stroke="#696969" stroke-width="2"/>
            </svg>
        `;

    const encodedSVG = encodeURIComponent(hammerSVG);
    const cursorURL = `url('data:image/svg+xml;utf8,${encodedSVG}') 30 10, auto`;

    const style = document.createElement("style");
    style.textContent = `* { cursor: ${cursorURL} !important; }`;
    document.head.append(style);
  }
}
