import * as PIXI from "pixi.js";
export default class port {
    constructor(canvas, size = 256) {
        this.objs = {
            sprite: null,
            penTwoTurn: null,
            penStatic: null,
            penBG: null
        };
        this.settings = {
            outrad: 50,
            inrad: 40,
            center: size / 2,
            rot: 2,
            radMuilt: 1.3
        };
        this.App = new PIXI.Application(size, size, { view: canvas });
        this.state = {
            progress: 0
        };

        this.App.ticker.add(delta => this.loop(delta));
        this.sprite();
    }

    loop(delta) {
        this.state.progress %= 2 * Math.PI;
        this.state.progress += 0.015 * delta;
        this.render(this.state.progress);
    }

    render(progress) {
        this.App.stage.addChild(this.twoTurn(progress));
        if (this.objs.sprite) {
            this.App.stage.addChild(this.objs.sprite);
        }
    }

    sprite(path = "Shape.png") {
        PIXI.loader.add(path).load(() => {
            this.objs.sprite = new PIXI.Sprite(
                PIXI.loader.resources["Shape.png"].texture
            );
        });
    }
    twoTurn(progress) {
        if (!this.objs.penTwoTurn) {
            this.objs.penTwoTurn = new PIXI.Graphics();
            this.objs.penTwoTurn.pivot = new PIXI.Point(
                this.settings.center,
                this.settings.center
            );
            this.objs.penTwoTurn.x = this.objs.penTwoTurn.y = this.settings.center;
        }
        let pen = this.objs.penTwoTurn;
        pen.rotation = -progress * this.settings.rot;
        pen.clear();
        pen.lineStyle(10, 0xff3300, 1);
        pen.beginFill(0xfff, 0);
        let path = this.generatePath((progress % Math.PI) / Math.PI, true);
        pen.drawPolygon(path);
        path = this.generatePath((progress % Math.PI) / Math.PI, false);
        pen.drawPolygon(path);

        pen.endFill();
    }
    generatePath(progress, upflag) {
        let offset = upflag ? 0 : Math.PI;
        let p1 = offset + progress * progress * Math.PI * this.settings.radMuilt;
        let p2 =
            offset +
            (-(progress - 1) * (progress - 1) + 1) *
                Math.PI *
                this.settings.radMuilt;
        let pathout = [],
            pathin = [];
        let step = Math.PI / 100;
        for (let pos = p1; pos < p2; pos += step) {
            if (pos + step > p2) {
                step = p2 - pos;
            }
            pathout.push(
                this.settings.center + this.settings.outrad * Math.cos(pos),
                this.settings.center - this.settings.outrad * Math.sin(pos + step)
            );
            pathin.push(
                this.settings.center + this.settings.inrad * Math.cos(pos),
                this.settings.center - this.settings.inrad * Math.sin(pos + step)
            );
        }
        pathout.reverse();
        pathin.concat(pathout);
        return pathin;
    }

    drawPos(pen) {
        for (let x = 0; x < 256; x += 32) {
            for (let y = 0; y < 256; y += 32) {
                pen.lineStyle(1, 1, 0);
                pen.beginFill(0xffffff, 1);
                pen.drawCircle(x, y, 1);
            }
        }
    }
}
