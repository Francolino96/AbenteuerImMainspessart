import { gameOver } from "./gameOver";

export function createPlayer(element, x, y) {
    return add([
        sprite(element),
        pos(x, y),
        area(),
        body(),
        anchor("botleft"),
        health(8),
        "player",    
    ]);
}

function shrinkObject(obj, scaleFactor) {
    if (scaleFactor > 0.3) {
        scaleFactor -= 0.1;
        obj.scale = vec2(scaleFactor, scaleFactor);
        wait(0.02, () => shrinkObject(obj, scaleFactor));
    } else {
        destroy(obj);
    }
}

// Eventi e logica per il player
export function setupPlayerEvents(player) {
    onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.jump(1200);
        }
    });

    onKeyDown("left", () => {
        player.move(-550, 0);
    });
    onKeyDown("right", () => {
        player.move(550, 0);
    });

    player.onUpdate(() => {
        if (player.pos.y >= height()) {
            destroy(player);
            wait(0.3, () => {
                gameOver();
            });
        }
    });

    player.onCollide("coin", (coin) => {
        destroy(coin);
        console.log("Coin collected!");
    });

    player.onCollide("enemy", (enemy) => {
        let scaleFactor = 1;
        if (player.pos.y < enemy.pos.y - enemy.height + 1) {
            shrinkObject(enemy, scaleFactor);
            player.jump();
        } else {
            shrinkObject(player, scaleFactor);
            wait(0.3, () => {
                gameOver();
            });
        }
    });

    player.onCollide("jumper", () => {
        player.jump(1800);
    });

    player.onCollide("bomb", (bomb) => {
        destroy(player);
        destroy(bomb);
        addKaboom(bomb.pos);
        wait(0.3, () => {
            gameOver();
        });
    });
}
