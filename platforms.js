import kaboom from "kaboom";

export function createPlatforms(x, y, width, height) {
    return add([
        rect(width, height), // Larghezza e altezza della piattaforma
        pos(x, y),   // Posizione della piattaforma
        area(), 
        outline(0),
        body({ isStatic: true }),     // Rende la piattaforma solida
    ]);
}