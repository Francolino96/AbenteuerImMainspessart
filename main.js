import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
kaboom();
loadFont("arcade", "./PressStart2P-Regular.ttf");
/*setGameProps({
    timestep: 1/120, // Default è 1/60, prova con 1/120 o 1/180
});*/
setGravity(1200);

loadSound("jump", "sounds/jump.mp3");
loadSound("jumpover", "sounds/jumpOver.mp3");
loadSound("coin", "sounds/coin.mp3");
loadSound("gameover", "sounds/gameOver.mp3");
loadSound("gamestart", "sounds/gameStart.mp3");
loadSound("soundtrack", "sounds/soundtrack.mp3");
loadSound("laser", "sounds/laser.mp3");

// Riproduce in loop
const music = play("soundtrack", {
    loop: true,
    volume: 3.0,
})


loadSprite("block", "Tiles/Transparent/tile_0009.png");
loadSprite("grass", "Tiles/Transparent/tile_0018.png");
loadSprite("flowers", "Tiles/Transparent/tile_0017.png");
loadSprite("flowers2", "Tiles/Transparent/tile_0016.png");
loadSprite("coin", "Tiles/Transparent/tile_0001.png");
loadSprite("player_idle", "Tiles/Transparent/tile_0300.png");
loadSprite("player_jump", "Tiles/Transparent/tile_0305.png");
loadSprite("player_run1", "Tiles/Transparent/tile_0301.png"); 
loadSprite("player_run2", "Tiles/Transparent/tile_0302.png");
loadSprite("enemy1", "Tiles/Transparent/tile_0320.png");
loadSprite("enemy2", "Tiles/Transparent/tile_0321.png");
loadSprite("enemy3", "Tiles/Transparent/tile_0322.png");
loadSprite("enemy4", "Tiles/Transparent/tile_0323.png");
loadSprite("enemy5", "Tiles/Transparent/tile_0324.png");


let scala = 3;

let coinCount = 0;

scene("game", () => {
    setBackground(38, 35, 74);

    const levelMap = [
        "================================================",
        "=                                              =",
        "=                                              =",
        "=                                              =",
        "=     @                                        =",
        "=     ===                                      =",
        "=               $ $                            =",
        "=              =====                           ==================",
        "=                               $                               =",
        "=      %    ====                                                =      ========",
        "=     ====               gg     g                               =      =      =========",
        "=                      ==========                               ========              =",
        "=                                                        %                            =",
        "=                                                     ========                    % $ =",
        "=================              $                                                =======",
        "=                                              %                 g                    =",
        "=                   ====                  ===============     =========               =",
        "=         ====                                           ==                           =",
        "=                    $  $                                                             =",
        "=                 =========                                                           =",
        "=                                              %   gg  g                              =",
        "=                                             ===========                             =",
        "=       fggf g%gggggfggFgfggggFggg%gggggggggg================ggggFggggggggfggFggggg   =", 
        "=       ===========================================================================   =",
        "=      ==                                                                         =   =",
        "===    =                                                                          =   =",
        "=      =                                                                          =   =",
        "=  $   =                                                                          =   =",
        "=      =                                                                          =   =",
        "=      =                                                                          =   =",
        "=    ===                                                ===========================   =",
        "=      =                                                ==                            =",
        "=      =                                                ==     ========== $ g         =",
        "=g     =                                                ==    ==        ======gggg    =",
        "===    =                                                ==    =              ======   =",
        "=      =                                                ==    =                   =   =",
        "=      =                              ====================    =                   =   =",
        "=      =                             ===                      =                   =   =",
        "=     ==                            ====                    ===                   =   =",
        "=      =                           ==              $          =                   =  =",
        "=      =                           ==             ===         =                   =  =",
        "=      =                           ==F                        =                   =  =",
        "=     ==                           ===   == g       %         =                   =  =",
        "=      =                            ==  ========  ggg f F Fgg==                   =$ =",
        "=      =                            ==  ======================                    =  =",
        "=      =                             =  =                                         =  =",
        "==     =                             =  =                                         =  =",
        "=      =                            ==  =                                         =  =",
        "=    ===                            =   =                                         =  =",
        "=      =                            =  ==                                         =  =",
        "=      =                           ==  =                                          =  =",
        "=      =                         ===   ==                                         =  =",
        "=      =                         =      ==                                        =  =",
        "==     =                         =   ==  ===                                      =  =",
        "=      =                         =         ======                                 =  =",
        "=      =                         === %          =                                 =  =",
        "=      =                           ====         =                                 =  =",
        "=     ==                              == $$$$$  =                                 =  =",
        "=      =                               ==========                             =====  =",
        "=      =                                                                      =      =",
        "=      =                                                                      =      =",
        "=      =                                                                      =     g=",
        "===    ====                                                                   =   ====",
        "====      ==                                                                  =      =",
        "=====      ==                                                                 =      =",
        "=  $==      ==                                                                =      =",
        "=    ==      ==                                                             ===      =",
        "=     ==      ==                                                          ===        =",
        "=      ==      ==                                                       ===     $    =",
        "=       ==      ====                                                  ===            =",
        "===      ====      ==                         ==========          =====              =",
        "=          ==       ===========================$       ============                  =",
        "=          ==                                                                        =",
        "=                 fg  %                                                           ====",
        "==     $         =========                                                           =",
        "=                                                                                    =",
        "=                                         ====                %                      =",
        "=                                                                                    =",
        "=ggggg  fgggf    ggg ggFggggggggg  ggggfggggggggggg $$$     ggggg ggfggg  g  g  ======",
        "=================================================================================",
                     
    ];






    function getRandomEnemySprite() {
        const sprites = ["enemy1", "enemy2", "enemy3", "enemy4"];
        return sprites[Math.floor(Math.random() * sprites.length)];
    }
    
    const levelConfig = {
        tileWidth: 16 * scala,
        tileHeight: 16 * scala,
        tiles: {
            "f": () => [sprite("flowers"), scale(scala * 0.7), pos(0, 14)],
            "g": () => [sprite("grass"), scale(scala * 0.5), pos(0, 16 * scala * 0.5)],
            "F": () => [sprite("flowers2"), scale(scala * 0.7), pos(0, 14)],
            "=": () => [sprite("block"), scale(scala), area(), body({ isStatic: true }), "block"],
            "$": () => [sprite("coin"), scale(scala * 1.3), area(), "coin"],
            "@": () => [sprite("player_idle"), scale(scala * 1.2), area(), body(), "player"],
            "%": () => {
                const initialSprite = getRandomEnemySprite();
                return [
                    sprite(initialSprite),
                    scale(scala * 1.5),
                    area(),
                    body(),
                    "enemy",
                    { currentSprite: initialSprite, direction: -1 },
                ];
            },
        },
    };


    const level = addLevel(levelMap, levelConfig);
    const player = level.get("player")[0];
    const enemies = level.get("enemy");

    loop(0.2, () => {
        enemies.forEach((enemy) => {
            if (enemy.currentSprite === "enemy1") {
                enemy.use(sprite("enemy2"));
                enemy.currentSprite = "enemy2"; // Aggiorna la proprietà
            } else if (enemy.currentSprite === "enemy2") {
                enemy.use(sprite("enemy3"));
                enemy.currentSprite = "enemy3"; // Aggiorna la proprietà
            } else if (enemy.currentSprite === "enemy3") {
                enemy.use(sprite("enemy4"));
                enemy.currentSprite = "enemy4"; // Aggiorna la proprietà
            } else {
                enemy.use(sprite("enemy1"));
                enemy.currentSprite = "enemy1"; // Aggiorna la proprietà
            }
        });
    });

    loop(1, () => {
        enemies.forEach((enemy) => {
            const belowPos = vec2(enemy.pos.x, enemy.pos.y + enemy.height / 2 + 1);
            const hasSupport = enemy.isColliding(belowPos, { isStatic: true });
    
            if (!hasSupport) {
                enemy.direction *= -1;
            }
            enemy.move(enemy.direction * 1000, 0);
        });
    });
    
    

    onUpdate(() => {
        camPos(player.pos);
    });

    const coinCounter = add([
        text(`Coins: ${coinCount}`, {
            size: 24,
            font: "arcade",
        }),
        pos(20, 20), // Posizione in alto a sinistra
        fixed(),     // Rimane fisso sullo schermo
    ]);

    let runningAnimation;
    let isJumping = false;

    onKeyDown("left", () => {
        player.move(-250 * scala, 0);

        if (!runningAnimation) {
            let toggle = false;
            runningAnimation = loop(0.1, () => { // Cambia sprite ogni 0.1 secondi
                toggle = !toggle;
                player.use(sprite(toggle ? "player_run1" : "player_run2"));
                player.flipX = true;
            });
        }
    });

    onKeyDown("right", () => {
        player.move(250 * scala, 0);

        if (!runningAnimation) {
            let toggle = false;
            runningAnimation = loop(0.1, () => { // Cambia sprite ogni 0.1 secondi
                toggle = !toggle;
                player.use(sprite(toggle ? "player_run1" : "player_run2"));
                player.flipX = false;
            });
        }
    });

    onKeyRelease("left", () => {
        if (runningAnimation) {
            runningAnimation.cancel(); // Ferma il loop
            runningAnimation = null;
        }
        player.use(sprite("player_idle")); // Torna alla sprite idle
    });

    onKeyRelease("right", () => {
        if (runningAnimation) {
            runningAnimation.cancel(); // Ferma il loop
            runningAnimation = null;
        }
        player.use(sprite("player_idle")); // Torna alla sprite idle
    });

    onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.use(sprite("player_jump"));
            player.jump(400 * scala);
            play("jump", {
                volume: 0.5,
            });
            isJumping = true;
        }
    });

    onUpdate(() => {
        if (isJumping && player.isGrounded()) {
            isJumping = false;
            if (runningAnimation) {
                let toggle = false;
                player.use(sprite(toggle ? "player_run1" : "player_run2"));
            } else {
                player.use(sprite("player_idle"));
            }
        }
    });

    player.onCollide("coin", (coin) => {
        destroy(coin);
        play("coin", {
            volume: 0.1,
        });
        coinCount++; // Incrementa il conteggio delle monete
        coinCounter.text = `Coins: ${coinCount}`; // Aggiorna il testo
        console.log("Coin collected!");
    });

    function shrinkObject(obj, scaleFactor) {
        if (scaleFactor > 0.1) {
            console.log("ciao mamma");
            scaleFactor -= 0.1;
            obj.scale = vec2(scaleFactor, scaleFactor);
            wait(0.1, () => shrinkObject(obj, scaleFactor));
        } else {
            destroy(obj);
        }
    }

    player.onCollide("enemy", (enemy) => {
        let scaleFactor = 1;
        if (player.pos.y < enemy.pos.y - enemy.height + 1) {
            enemy.use(sprite("enemy5"));
            shrinkObject(enemy, scaleFactor);
            play("jumpover", {
                volume: 0.5,
            });
            player.jump();
            wait(1, () => destroy(enemy));
        } else {
            //shrinkObject(player, scaleFactor);
            console.log("Game Over!");
            music.stop();
            play("gameover", {
                volume: 0.5,
            });
            wait(0.3, () => {
                go("gameover");  
            });            
        }
    });
});

scene("gameover", () => {

    add([
        rect(width() + 100, height() + 100),
        pos(0, 0),
        color(0, 0, 0),
    ]); 

    add([
        text("Game Over!", {
            size: 60,
            font: "arcade"
        }),
        anchor("center"),
        pos(width() / 2, height() / 2 - 50),
        color(255, 0, 0),
    ]);

    const retryBtn = add([
        text("riprova", {
            size: 20,
            font: "arcade"
        }),
        pos(width() / 2, height() / 2 + 70),
        anchor("center"),
        color(255, 255, 255),
        area(),
        "retry-button"
    ]);

    onHover("retry-button", (btn) => {
        btn.color = rgb(200, 200, 200);
    });

    onHoverEnd("retry-button", (btn) => {
        btn.color = rgb(255, 255, 255);
    });

    onClick("retry-button", () => {
        go("game");
    });
});

go("game");

