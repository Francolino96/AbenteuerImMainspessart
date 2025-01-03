export function gameOver() {

    add([
        rect(width() + 100, height() + 100),  // Crea un rettangolo che copre il testo
        pos(0, 0), // Posiziona il rettangolo
        color(0, 0, 0),  // Colore di sfondo (nero)
    ]); 


    add([
        text("Game Over!", {
            size: 100,
            font: "arcade",  // Puoi scegliere un font che ti piace
            width: width(), 
            background: "black",
        }),
        pos(center().x - (text("Game Over!").width / 2) - 400, center().y-50),
        color(255, 0, 0), // Colore del testo (rosso)
    ]);
}