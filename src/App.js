import React, { Component } from "react";
import Zr from "zrender";
import "./App.css";
import bulletbar from "./bullet";

class App extends Component {
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
                    width: 320,
                    height: 75,
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr 9fr",
                    gridTemplateRows: "1fr 1fr",
                    gridColumnGap: 5,
                    gridRowGap: 5,
                    justifyItems: "center"
                }}
            >
                <div style={{ gridColumn: "1 / 3", gridRow: "1 / 2" }}>Aim text</div>
                <div style={{ gridColumn: "1 / 2", gridRow: "2 / 3" }}>now</div>
                <div style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}>9X%</div>
                <canvas
                    ref={mine => {
                        this.canvas = mine;
                    }}
                    width="300"
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

export default App;
