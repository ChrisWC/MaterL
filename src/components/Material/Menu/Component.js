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
import s from './Component.css';
import Paper from '../Paper/'

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style:{
                height:'auto',
                display:'inline-block',
                position:'relative',
                width:(this.props.width)? this.props.width:'auto',
                ...this.props.style
            },
            activeItem:-1
        }
    }
    static propTypes = {
        style: PropTypes.object,
        active: PropTypes.bool
    };
    static defaultProps = {
        style:{
            display:'inline-block',
        },
        active:false
    };
    handleMenuClick = (index) => {
        this.setState({activeItem:index})
    }
    componentWillUpdate = (nextProps, nextState) => {
        if (nextState.activeItem != this.state.activeItem) {
            //this.props.children[this.state.activeItem] = React.cloneElement(this.props.children[this.state.activeItem], {...this.props.children[this.state.activeItem].props, active:false})
            //this.props.children[nextState.activeItem] = React.cloneElement(this.props.children[nextState.activeItem], {...this.props.children[nextState.activeItem].props, active:true})
        }
    }
    render() {
        return(
            <div style={this.state.style}>
                    {React.Children.map(this.props.children, (val, key, arr) => {
                        return React.cloneElement(val, {key:key, toggle:{true}, outer_style:{display:'inline-block', width:this.state.width},active:(this.state.activeItem==key), onClick:()=>{
                                this.handleMenuClick(key)
                            }});
                    })}
            </div>
        );
    }
}

export default withStyles(s)(Component);
