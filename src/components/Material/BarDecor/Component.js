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
import Icon from '../Icon'

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
                width:this.props.vertical? '4px':'100%',
                height:this.props.vertical? '100%':'4px',
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
    render() {
        return (
            <div style={this.state.style} onClick={this.props.onClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width={'100%'} height={this.props.height}>
                    <rect x={0} y={0} width={'100%'} height={'4px'} stroke="black" strokeWidth="0" fill={this.context.palette['primary']['50'].backgroundColor}/>
                    <rect ref={"control"} x={0} y={0} width={'16px'} height={'4px'} stroke="black" strokeWidth="0" fill={this.context.palette['primary']['500'].backgroundColor}/>
                </svg>
            </div>
        );
    }
}


export default Component;
