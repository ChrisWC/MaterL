/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Image from '../../Lotus/Image'
import Icon from '../Icon';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Component.css';
/****************************************************************
 * A linear control with animations and 'reflexes', it
 * is the base class for scroll bars and progress bars.
 ****************************************************************/
class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                color:'black',
                display:'inline-block',
                position:'relative',
                width:this.props.width+'px',
                height:this.props.width+'px',
            },
            active:!this.props.active
        }
    }
    static propTypes = {
        resolution:PropTypes.string,
        context:PropTypes.string,
        component:PropTypes.string,
        role:PropTypes.string,
        active:PropTypes.bool,
        determinate:PropTypes.bool,
        vertical:PropTypes.bool
    };
    static defaultProps = {
        resolution:'18px',
        active:false,
        determinate:false,
        vertical:false
    };
    static contextTypes = {
        palette: React.PropTypes.object,
    };
    handleClick = (e) => {
        this.setState({active:!this.state.active});
    }
    polarToCartesian = (cX, cY, r, angleInDegrees) => {
        var angleInRadians = (angleInDegrees-90)*Math.PI/180.0;

        return {
            x: cX + (r*Math.cos(angleInRadians)),
            y: cY + (r*Math.sin(angleInRadians))
        };
    }
    describeArc = (x, y, radius, startAngle, endAngle) => {
        var start = this.polarToCartesian(x, y, radius, endAngle);
        var end = this.polarToCartesian(x, y, radius, startAngle);

        var arcSweep = endAngle - startAngle <= 180 ? "0":"1";

        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(" ")
        return d;
    }
    render() {
        return (
            <div style={this.state.style} onClick={this.props.onClick}>
                <svg className={s.orbit} key={1} xmlns="http://www.w3.org/2000/svg" width={'100%'} height={'100%'}>
                    <path ref={"base"} id={"BaseRing"}  d={this.describeArc(this.props.width/2.0,this.props.width/2.0,(this.props.width)/2.0-4,0,359.99)} strokeWidth="4px" fill={'none'} stroke={this.context.palette['default']['default'].backgroundColor}/>
                    <path ref={"ring0"} d={this.describeArc(this.props.width/2.0,this.props.width/2.0,(this.props.width/2.0) -4.0,0,60)} strokeWidth="4px" fill={'none'} stroke={this.context.palette['primary']['primary'].backgroundColor}/>
                </svg>
            </div>
        );
    }
}


export default withStyles(s)(Component);
