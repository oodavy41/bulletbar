import React, { Component } from "react";
import * as PIXI from "pixi.js";
import port from "./portIcon";

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.canvas = null;
        this.state = {
            width: 120,
            height: 120
        };
    }

    componentDidMount() {
        if (this.canvas) {
            this.pixi = new port(this.canvas);
        }
    }

    render() {
        return (
            <canvas
                ref={mine => (this.canvas = mine)}
                width={this.state.width}
                height={this.state.height}
                style={{ width: this.state.width, height: this.state.height }}
            >
                your explorer not support canvas
            </canvas>
        );
    }
}
