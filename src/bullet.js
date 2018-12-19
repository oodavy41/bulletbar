import zrender from "zrender";

export default class bulletbar {
    constructor(canvas, data = {}, width = 300, height = 100) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.zr = zrender.init(this.canvas, { devicePixelRatio: 1 });
        this.style = {
            textColor: "#000000",
            trailColor: "#000000",
            colorClass: ["#cccccc", "#999999", "#555555"]
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
            mainx = 5,
            mainy = h / 2 + 5;
        let ps = new zrender.Group();
        ps.position = [w - this.data.levels.length * 60, gap];
        this.data.levels.forEach((e, i) => {
            ps.add(
                new zrender.Text({
                    style: {
                        text: this.data.levels[i].text,
                        textFill: this.style.textColor
                    },
                    position: [i * 60 - 7, gap + 3]
                })
            );
            ps.add(
                new zrender.Rect({
                    fill: this.style.colorClass[i],
                    shape: {
                        r: 5,
                        x: i * 60 + 25,
                        y: gap,
                        width: 25,
                        height: 15
                    }
                })
            );
        });
        this.zr.add(ps);

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
