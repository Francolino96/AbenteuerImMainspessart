import kaboom from "kaboom";

// Funzione per creare un ostacolo
export function createEnemies(speed, element, x, y, width, height, rangeStart, rangeEnd) {
    const enemy = add([
        sprite(element),
        area(),
        pos(x, y),
        anchor("botleft"),
        color(255, 180, 255),
        body({ isStatic: true }),
        "enemy",
        { direction: -1},
    ]);

    enemy.onUpdate(() => {
        // Cambia direzione se il nemico supera i limiti
        if (enemy.pos.x <= rangeStart) {
            enemy.direction = 1; // Cambia direzione verso destra
        } else if (enemy.pos.x >= rangeEnd) {
            enemy.direction = -1; // Cambia direzione verso sinistra
        }

        enemy.move(enemy.direction * speed, 0);
    });

    return enemy;
}