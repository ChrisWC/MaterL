/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    static propTypes = {
    };
    render() {
        var placeholder = (
                <svg xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height}>
                    <rect width={this.props.width} height={this.props.height} fill="black"/>
                    <rect x={5} y={5} width={this.props.width-10} height={this.props.height-10} fill="white"/>
                    <text x={this.props.width/2.0} y={this.props.height/2.0} textAnchor="middle" pointerEvents={"auto"} fontFamily={"Vedana"} fontSize={12}>
                        {this.props.width}x{this.props.height}
                    </text>
                </svg>
        );
        return(
            <div>
                {this.props.children? this.props.children:placeholder}
            </div>
        );
    }
}


export default Component;
