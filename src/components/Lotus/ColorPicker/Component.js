/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';

/******************************
 * Draw a Circle with each point a different Color
 *
 *
 **/

/*getDistanceFromPoint = (x0, y0, x1, y1) => {

}*/
/*********************************
 * Distance between two vectors with origin c with
 * a radial distance (non-straight).
 *
 ***********/
/*getRadialDistance = (x0, y0, cx, cy, ux, uy) => {

}*/
class Vec {
    constructor(points) {
        this.points = points;
    }
    length = () => {
        return this.points.length;
    }
    static distance = (from, to) => {
        if (from.length() == to.length()) {
            var sum = 0.0;
            var temp = 0.0;
            for (var i = 0; i < from.length(); i++) {
                temp = to.points[i] - from.points[i];
                sum += temp*temp;
            }
            return Math.sqrt(sum);
        }
    }
    static cross = (u, v) => {
        return undefined;
    }
    static dot = (u, v) => {
        return undefined;
    }
}
class Arc {
    constructor(start, end, origin) {
        this.start = start
        this.end = end
        this.origin = origin
    }
    points = () => {

    }
    length = () => {

    }
}
class ColorWheel {
    static test = () => {}
}
const v = new Vec([0, 0])
const v2 = new Vec([1, 1])
console.log(Vec.distance(v, v2))
class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    static propTypes = {
    };
    render() {

        const cx = this.props.width/2.0
        const cy = this.props.height/2.0
        const r = this.props.width/2.0
        const base_divisions = 3;
        const power_divisions = 1;
        const total_divisions = 3;

        const placeholder = (
                <svg xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height}>
                    <circle cx={cx} cy={cy} r={this.props.width/2.0} stroke="black" strokeWidth="3" fill="orange"/>
                    {Array.apply(null, Array(r)).map((_,i) => {return i;}).map((val, key, arr) => {
                        var red = 1.0;
                        var green = 0;
                        var blue = 0;
                        return (<circle cx={key} cy={cy} r={1} fill={"rgb("+red*val+","+green*val+","+blue*val+")"}/>)
                    })}
                </svg>
        );
        return(
            <div>
            {placeholder}
            </div>
        );
    }
}


export default Component;
