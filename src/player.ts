import P5 from 'p5';

export default class Player {
    pos: P5.Vector;
    vel: P5.Vector;
    maxSpeed: number;
    p5: P5;

    constructor(p5: P5) {
        this.p5 = p5;
        this.pos = this.p5.createVector();
        this.vel = this.p5.createVector();
        this.maxSpeed = 10;
    }

    update() {
        this.pos.add(this.vel);
    }

    render() {
        this.p5.push();
        this.p5.translate(this.pos);
        this.p5.circle(this.pos.x, this.pos.y, 10);
        this.p5.pop()
    }
}
