/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';

/*****************************************
 * Provides a scrollbar for material components.
 *
 *****************************************/
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.getColor = this.getColor.bind(this)
        var color = null
        if (this.props.primary) {
            color = (this.props.active)? this.context.primary['primary']['900']:this.context.palette['primary']['700']
        }
        if (this.getColor){
            color = this.getColor();
        }
        this.state = {
            round:false,
            raised:false,
            outer_style:{
                display:'inline-block',
                width:'10px',
                height:'100%',
                backgroundColor:'orange',
                float:'clear',
                float:'right',
                position:'relative',
                overflow:'hidden',
            },
            inner_style:{
                ...this.getDensityStyling(),
                ...this.getShadow(),
                ...color,
                display:'block',
                position:'relative',
            },
        }
    }
    getDensityStyling = () => {
        return {}
    }
    getShadow = () => {
        return {}
    }
    getColor = () => {
        return {}
    }
    static propTypes = {
    };
    static defaultProps = {
    };
    static contextTypes = {
    }
    handleHover = (start) => {
    }
    handleDefault = () => {
    }
    handleClick = () => {
    }
    handleMouseDown = () => {
    }
    handleMouseUp = () => {
    }
    componentDidMount = () => {
        
    }
    componentWillUnmount = () => {

    }
    componentWillReceiveProps = (newProps) => {
        if (newProps.clicked) {
            //this.handleClick()
        }
        this.setState({
            inner_style:{...this.state.inner_style, ...this.getColor()},
            active:newProps.active,
        })
    }
    render() {
        var color = this.getColor()
        return(
            <div role="scrollbar" style={this.state.outer_style}>
            </div>
        );
    }
}


export default Component;
