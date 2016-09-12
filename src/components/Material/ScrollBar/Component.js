/****************************************************************************
*   Copyright 2016 Christopher W. Catton
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
*****************************************************************************/

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
