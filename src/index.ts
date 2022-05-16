import P5 from 'p5';
//import Player from './player';


function sketch(p5: P5) {
    //let player: Player;
    const players: P5.Vector[] = [];

    let ws: WebSocket;
    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);

        ws = new WebSocket('ws://p5.crystaline.xyz:8080');

        ws.addEventListener('open', function open() {
            console.log('ws open');
        });

        ws.addEventListener('message', function message(messageEvent) {
            console.log('received: %s', messageEvent.data.toString());
            let data = JSON.parse(messageEvent.data);
            if (data.clientNumber) {
                players[data.clientNumber] = p5.createVector(data.x, data.y);
            }
        });
    }

    p5.draw = () => {
        p5.background(220);
        p5.circle(p5.mouseX, p5.mouseY, 10);
        for (const player of players) {
            if (!player) continue;
            p5.circle(player.x, player.y, 10);
        }
    }

    p5.mouseMoved = () => {
        if (p5.mouseX && p5.mouseY)
            ws.send(JSON.stringify({x: p5.mouseX, y: p5.mouseY}));
    }

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        console.log(`Window resize (${p5.windowWidth}, ${p5.windowHeight})`)
    }
}

new P5(sketch, document.body);
