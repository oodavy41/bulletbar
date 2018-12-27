import React, { Component } from "react";
import Zr from "zrender";
import bulletbar from "./bullet";

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.canvas = null;
    }

    componentDidMount() {
        if (this.canvas) {
            this.bb = new bulletbar(this.canvas);
        }
    }

    render() {
        return (
            <div
                className="App"
                style={{
                    width: 450,
                    height: 75,
                    display: "grid",
                    gridTemplateColumns: "2fr 2fr 17fr",
                    gridTemplateRows: "1fr 1fr",
                    gridColumnGap: 5,
                    gridRowGap: 5,
                    justifyItems: "center"
                }}
            >
                <div
                    style={{
                        marginLeft: 5,
                        justifySelf: "start",
                        gridColumn: "1 / 3",
                        gridRow: "1 / 2"
                    }}
                >
                    指标xxx
                </div>
                <div style={{ gridColumn: "1 / 2", gridRow: "2 / 3" }}>当前</div>
                <div style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}>9X%</div>
                <canvas
                    ref={mine => {
                        this.canvas = mine;
                    }}
                    width="450"
                    height="100"
                    style={{
                        gridColumn: "3 / 4",
                        gridRow: "1 / 3",
                        width: "100%",
                        height: "100%"
                    }}
                >
                    can't display canvas
                </canvas>
            </div>
        );
    }
}
