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
                display:'block',
                height:'4px',
                width:this.props.width,
                padding:'0px',
            },
            active:!this.props.active
        }
    }
    static propTypes = {
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
            <div style={this.state.style}>
                <svg style={{height:'4px',...this.state.style}} xmlns="http://www.w3.org/2000/svg">
                    <rect x={0} y={0} width={'100%'} height={'4px'} stroke="black" strokeWidth="0" fill={this.context.palette['default']['default'].backgroundColor}/>
                    <rect ref={"control"} x={0} y={0} width={'16px'} height={'4px'} stroke="black" strokeWidth="0" fill={this.context.palette['primary']['primary'].backgroundColor}/>
                </svg>
            </div>
        )
    }
}


export default Component;
