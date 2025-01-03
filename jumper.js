export function createJumper(element, x, y) {
    return add([
        sprite(element),
        area(),
        pos(x, y),
        anchor("bot"),
        "jumper",
        body({ isStatic: true }),
    ]);
}