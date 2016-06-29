/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavigationComponent.css';

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    static propTypes = {
    };
    render() {
        const place_holder = (
            <div className={}>
                <svg xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height}>
                    <rect width={this.props.width} height={this.props.height} fill="black"/>
                    <rect x={5} y={5} width={this.props.width-10} height={this.props.height-10} fill="white"/>
                    <text x={this.props.width/2.0} y={this.props.height/2.0} textAnchor="middle" pointerEvents={"auto"} fontFamily={"Vedana"} fontSize={12}>
                        {this.props.width}x{this.props.height}
                    </text>
                </svg>
            </div>
        );

        const hex_map = this.props.children.map((val, key) => {
            var ring = 0; //calculate which ring child will be in (0 is center)
            var x = 0; //x center
            var y = 0; //y center
            //calculate position within ring
            return (
                <div key={key}>

                </div>
            );
        })
        return(
            {placeholder}
        );
    }
}

NavigationComponent.propTypes = {
  className: PropTypes.string,
};

export default withStyles(s)(Component);
