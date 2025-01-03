import kaboom from "kaboom";

// Funzione per creare un ostacolo
export function createObstacle(element, x, y) {
    const tag = element === "bomb" ? "bomb" : element === "spike" ? "spike" : "obstacle";

    return add([
        sprite(element),
        area(),
        pos(x, y),
        anchor("bot"),
        tag,
        body({ isStatic: true }),
    ]);
}