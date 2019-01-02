import * as PIXI from "pixi.js";
export default class port {
    constructor(canvas, colors = {}, size = 256) {
        this.objs = {
            sprite: null,
            penTwoTurn: null,
            penStatic: null,
            penBG: null
        };
        this.settings = {
            colors: [
                [0x3eb2b9, 0x338c92, 0x26676b],
                [0xc4b850, 0xa79c3a, 0x81782e],
                [0xc04c44, 0x9b3c36, 0x752e29]
            ],
            outrad: 60,
            inrad: 50,
            centerrad: 25,
            centerBrad: 30,
            bgrad: 65,
            bgexplan: 0.15,
            center: size / 2,
            rot: 1,
            radMuilt: 1,
            trinkRound: 1.5
        };
        Object.assign(this.settings, colors);
        this.App = new PIXI.Application(size, size, {
            view: canvas,
            transparent: true
        });
        this.state = {
            progress: 0,
            speed: 1,
            colorType: 1
        };

        this.App.ticker.add(delta => this.loop(delta));
        this.sprite();
    }

    set(state) {
        Object.assign(this.state, state);
    }

    loop(delta) {
        this.state.progress %= 2 * Math.PI;
        this.state.progress += 0.015 * delta * this.state.speed;
        this.renderANIM(this.state.progress);
    }

    renderANIM(progress) {
        this.App.stage.addChild(this.background(progress));
        this.App.stage.addChild(this.twoTurn(progress));
        this.App.stage.addChild(this.static());
        this.trink(progress);
    }

    trink(progress) {
        if (this.objs.sprite) {
            this.objs.sprite.alpha =
                Math.abs((progress % Math.PI) - Math.PI / 2) / (Math.PI / 2);
            this.App.stage.addChild(this.objs.sprite);
        } else {
            this.sprite();
        }
    }

    sprite(path = "anchor.png") {
        if (!PIXI.loader.resources.anchor) {
            PIXI.loader.add("anchor", path).load(() => {
                this.objs.sprite = new PIXI.Sprite(
                    PIXI.loader.resources.anchor.texture
                );
                this.objs.sprite.scale = new PIXI.Point(0.5, 0.5);
                this.objs.sprite.anchor.x = this.objs.sprite.anchor.y = 0.5;
                this.objs.sprite.x = this.objs.sprite.y = this.settings.center;
            });
        } else if (!this.objs.sprite && PIXI.loader.resources.anchor.texture) {
            this.objs.sprite = new PIXI.Sprite(PIXI.loader.resources.anchor.texture);
            this.objs.sprite.scale = new PIXI.Point(0.5, 0.5);
            this.objs.sprite.anchor.x = this.objs.sprite.anchor.y = 0.5;
            this.objs.sprite.x = this.objs.sprite.y = this.settings.center;
        }
    }

    static() {
        if (!this.objs.penStatic) {
            this.objs.penStatic = new PIXI.Graphics();
        }
        let pen = this.objs.penStatic;
        pen.clear();
        pen.lineStyle(6, this.settings.colors[this.state.colorType][2], 1);
        pen.beginFill(this.settings.colors[this.state.colorType][1], 1);
        pen.drawCircle(this.settings.center, this.settings.center, 30);
        pen.endFill();
        pen.lineStyle(6, this.settings.colors[this.state.colorType][2], 0);
        pen.beginFill(this.settings.colors[this.state.colorType][2], 1);
        for (let rad = 0; rad < Math.PI * 2; rad += Math.PI / 20) {
            pen.drawCircle(
                this.settings.center + this.settings.bgrad * Math.cos(rad),
                this.settings.center + this.settings.bgrad * Math.sin(rad),
                3
            );
        }
        pen.endFill();
        return pen;
    }

    background(progress) {
        if (!this.objs.penBG) {
            this.objs.penBG = new PIXI.Graphics();
        }
        let pen = this.objs.penBG;
        pen.clear();
        pen.lineStyle(0, 0, 0);
        pen.beginFill(this.settings.colors[this.state.colorType][0]);
        let muit = 1;
        if (progress > Math.PI) {
            muit +=
                ((Math.PI / 2 - Math.abs(progress - Math.PI * 1.5)) /
                    (Math.PI / 2)) *
                this.settings.bgexplan;
        }
        pen.drawCircle(
            this.settings.center,
            this.settings.center,
            this.settings.bgrad * muit
        );
        pen.endFill();
        return pen;
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
        pen.lineStyle(10, this.settings.colors[this.state.colorType][2], 1);
        pen.beginFill(0, 0);
        let path = this.generatePath((progress % Math.PI) / Math.PI, true);
        pen.drawPolygon(path);
        path = this.generatePath((progress % Math.PI) / Math.PI, false);
        pen.drawPolygon(path);

        pen.endFill();
        return pen;
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
