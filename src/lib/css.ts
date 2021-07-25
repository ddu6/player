export const main=".player{\n    position: relative;\n}\n.player>video{\n    display: block;\n    width: 100%;\n    max-height: 100vh;\n}\n.player>.tool-bar{\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: linear-gradient(to top, var(--color-bg), 75%, transparent);\n    padding: var(--length-gap);\n}\n.player>.tool-bar>div{\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: var(--length-gap);\n}\n.player>.tool-bar>div>.number-bar{\n    flex-grow: 1;\n}\n.player>.tool-bar>div>.number-bar.time:before {\n    display: none;\n}"
export const all=main