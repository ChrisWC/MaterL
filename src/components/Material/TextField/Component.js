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
import BarDecor from '../BarDecor';
/****************************************************************
 ****************************************************************/
class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                width:'180px',
            },
            active:!this.props.active,
            value:""
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
    handleChange = (e) => {

    }
    render() {
        return (
            <div style={this.state.style} onClick={this.props.onClick}>
                <div style={{display:'block'}} ref="FloatingHintText">{this.state.active? this.props.floatingHintText:null}</div>
                <textarea ref="textfield" style={{padding:'0px', border:'none', borderRadius:'0px', padding:'0px', width:this.state.style.width,display:'block', position:'relative', resize:'none'}} rows={1}  onChange={this.handleChange}
                    value={this.state.active? (this.state.dirty? this.state.value:this.props.hintText):(this.state.dirty? this.state.value:this.props.floatingHintText)}>
                </textarea>
                <BarDecor width={180}/>
            </div>
        );
    }
}


export default withStyles(s)(Component);
