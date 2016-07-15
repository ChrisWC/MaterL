/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Paper from '../Paper';
/****************************************************************
 * A linear control with animations and 'reflexes', it
 * is the base class for scroll bars and progress bars.
 ****************************************************************/
const devices = {
    "nexus6":{
        width:'360px',
        height:'640px'
    }

}
class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                display:'block',
                height:'640px',
                width:'360px',
                padding:'0px',
            },
            active:!this.props.active
        }
    }
    static propTypes = {
        device:PropTypes.string,
    };
    static defaultProps = {
        resolution:'18px',
        active:false,
        determinate:false,
        vertical:false
    };
    static childContextTypes = {
        sheets: React.PropTypes.arrayOf(React.PropTypes.object),
    };
    getChildContext = () => {
        return {sheets:[]}
    }
    handleClick = (e) => {
        this.setState({active:!this.state.active});
    }
    render() {
        return (
            <div style={this.state.style}>
                <Paper depth={1} role={"device"} width={this.props.width} height={'700px'} style={{display:'block', position:'relative', height:this.state.style.height, width:this.state.style.width}}>
                    {React.Children.map(this.props.children, (val, key, arr) => {
                        return React.cloneElement(val, {...val.props, key:key});
                    })}
                </Paper>
            </div>
        )
    }
}


export default Component;
