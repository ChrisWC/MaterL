/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Component.css';
import 'BarDecor' from '../BarDecor';
/****************************************************************
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
                <span ref="FloatingHintText">{this.state.active? this.props.floatingHintText:null}</span><br/>
                <textarea ref="textfield">
                    {this.state.active? {this.state.dirty? null:this.props.hintText}:{this.state.dirty? null:this.props.floatingHintText}}
                </textarea>
                <BarDecor/>
            </div>
        );
    }
}


export default withStyles(s)(Component);
