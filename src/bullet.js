import zrender from "zrender";

export default class bulletbar {
    constructor(canvas, data = {}) {
        this.canvas = canvas;
        this.zr = zrender.init(this.canvas, { devicePixelRatio: 1 });
        this.width = this.zr.getWidth();
        this.height = this.zr.getHeight();
        this.style = {
            textColor: "#000000",
            trailColor: "#f2f2f2",
            colorClass: ["#f00000", "#900000", "#500000"],
            psRound: 10,
            barRound: 15
        };
        this.data = {
            levels: [
                { stage: 20000, text: "阶段1" },
                { stage: 40000, text: "阶段2" },
                { stage: 50000, text: "阶段3" }
            ],
            sum: 35000,
            except: 30000
        };
        Object.assign(this.data, data);
        this.render();
    }

    render() {
        let w = this.width,
            h = this.height,
            gap = 5,
            psCellLength = 80,
            psWidth = 25,
            psHeight = 15,
            barHeight = 30,
            trailHeight = 10,
            targetWidth = 10,
            targetHeight = 25;
        let ps = new zrender.Group();
        ps.position = [w - this.data.levels.length * 80, gap];
        this.data.levels.forEach((e, i) => {
            ps.add(
                new zrender.Text({
                    style: {
                        textAlign: "center",
                        fontSize: 17,
                        text: this.data.levels[i].text,
                        textFill: this.style.textColor
                    },
                    position: [i * psCellLength, gap]
                })
            );
            ps.add(
                new zrender.Rect({
                    style: {
                        fill: this.style.colorClass[i]
                    },
                    shape: {
                        r: this.style.psRound,
                        x: i * psCellLength + psWidth,
                        y: gap,
                        width: psWidth,
                        height: psHeight
                    }
                })
            );
        });
        this.zr.add(ps);

        let maxValue = this.data.levels[this.data.levels.length - 1].stage;
        this.data.levels.forEach((e, i) => {
            this.zr.add(
                new zrender.Rect({
                    z: -i,
                    style: {
                        fill: this.style.colorClass[i]
                    },
                    shape: {
                        r: this.style.barRound,
                        x: gap,
                        y: h / 2 + gap,
                        width: (e.stage / maxValue) * (w - 2 * gap),
                        height: barHeight
                    }
                })
            );
        });

        this.zr.add(
            new zrender.Rect({
                z: 10,
                style: {
                    fill: this.style.trailColor
                },
                shape: {
                    r: this.style.barRound,
                    x: gap,
                    y: h / 2 + gap + (barHeight - trailHeight) / 2,
                    width: (this.data.sum / maxValue) * (w - 2 * gap),
                    height: trailHeight
                }
            })
        );

        this.zr.add(
            new zrender.Rect({
                z: 10,
                style: {
                    fill: this.style.trailColor
                },
                shape: {
                    r: 3,
                    x: gap + (this.data.except / maxValue) * (w - 2 * gap),
                    y: h / 2 + gap + (barHeight - targetHeight) / 2,
                    width: targetWidth,
                    height: targetHeight
                }
            })
        );

        // var rect = new zrender.Rect({
        //     shape: {
        //         r: 25,
        //         x: 10,
        //         y: 10,
        //         width: 200,
        //         height: 50
        //     },
        //     style: {
        //         fill: "#FFA",
        //         stroke: "#F00"
        //     }
        // });
        // this.zr.add(rect);
    }
}
