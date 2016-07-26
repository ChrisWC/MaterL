/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Paper from '../Paper/'

class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            style:{
                width:(this.props.width)? this.props.width:'auto',
                ...this.props.style
            },
            activeItem:-1,
            menuDepth:this.props.menuDepth
        }
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.setState = this.setState.bind(this);
    }
    static propTypes = {
        style: PropTypes.object,
        active: PropTypes.bool,
        context: PropTypes.string,
        width: PropTypes.string,
        menuDepth: PropTypes.number
    };
    static defaultProps = {
        style:{
        },
        active:false,
        open:true,
        context:'default',
        menuDepth:0
    };
    static contextTypes = {
        theme: PropTypes.object
    }
    handleMenuClick = (index) => {
        this.setState({activeItem:index})
    }
    render() {
        return(
            <div className={this.context.theme.menu.menu} style={this.state.style}>
                    {this.props.open? React.Children.map(this.props.children, (val, key, arr) => {
                        var active= (this.state.activeItem==key);
                        if (val.type.ComposedComponent && val.type.ComposedComponent.defaultProps.role === 'menu') {
                            return React.cloneElement(val, {key:key, context:"menu",toggle:true, outer_style:{display:'inline-block', width:this.state.width},active:(this.state.activeItem==key),
                                onClick:(e)=>{
                                    e.stopPropagation()
                                    this.handleMenuClick(key);
                                    val.props.onClick(e);
                                }
                            });
                        }
                        else {
                            var smenu = [];

                            if (active) {
                                smenu = React.Children.map(val.props.children, (sval, key, arr) => {
                                    return React.cloneElement(sval, {key:key, menuDepth:(this.state.menuDepth+1), width:this.props.width, sval:sval, context:"menu", open:active, toggle:true, outer_style:{display:'inline-block', width:this.state.width},active:(this.state.activeItem==key),
                                        onClick:(e)=>{
                                            e.stopPropagation()
                                            this.handleMenuClick(key);
                                            val.props.onClick(e);
                                        }
                                    });
                                });
                            };
                            
                            if (smenu === undefined) {
                                smenu = [];
                            };
                            smenu = [React.cloneElement(val, {key:key, menuDepth:this.state.menuDepth, open:(this.state.activeItem==key), context:"menu",toggle:true, outer_style:{display:'inline-block', width:this.state.width},active:(this.state.activeItem==key),
                                onClick:(e)=>{
                                    e.stopPropagation()
                                    this.handleMenuClick(key);
                                    if (val.props.onClick) {
                                        val.props.onClick(e);
                                    };
                                }
                            }), ...smenu];

                            return smenu;
                        }
                    }):null}
            </div>
        );
    }
}

export default Component;