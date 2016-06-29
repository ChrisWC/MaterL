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
//import * as colors from 'material-ui/styles/colors';

const icon_style = {
    border:'none',
    display:'inline-block',
    position:'relative',
    height:'36px',
    fill:'white',
    'float':'left'
}
const title_style = {
    display:'inline-block',
    margin:0,
    padding:0,
    border:'none',
    color:'white',
    paddingLeft:'8px',
    height:'36px',
    lineHeight:'36px',
    fontSize:'24px',
    float:'left',
    verticalAlign:'middle',
    position:'relative',
}
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
                height:'48px',
                display:(this.props.contextName === 'menu')? 'block':'inline-block',
                lineHeight:'64px',
                width:(this.props.width !== undefined)? this.props.width:'auto',
                margin:(this.props.contextName === 'menu')? '0px':'5px',
                float:'clear',
                position:'relative',
                overflow:'hidden',
            },
            inner_style:{
                height:(this.props.contextName === 'menu')? '48px':'36px',
                width:(this.props.contextName === 'menu')? 'auto':'auto',
                display:'block',
                ...color,
                paddingLeft:'16px',
                paddingRight:'16px',
                lineHeight:(this.props.contextName === 'menu')? '48px':'36px',
                margin:(this.props.contextName === 'menu')? '0px':'5px',
                position:'relative',
                borderRadius:'2px',
                ...this.getShadow()
            },
            title_style:{
                display:'inline-block',
                margin:0,
                padding:0,
                border:'none',
                height:(this.props.contextName === 'menu')? '48px':'36px',
                lineHeight:(this.props.contextName === 'menu')? '48px':'36px',
                fontSize:'14',
                fontFamily:"Roboto-Medium",
                float:'left',
                verticalAlign:'middle',
                position:'relative',
            },
            hover:false,
            openPopovers:false,
            active:this.props.active
        }
    }
    getShadow = () => {
        console.log("SHADOW")
        console.log(this.props)
        if (this.props.raised) {
            if (this.state) {
                if (this.state.hover) {
                    return this.context.theme.shadows['3']
                }
                else {
                    return this.context.theme.shadows['2']
                }
            }
        }
        return null
    }
    getColor = () => {
        if (this.props.primary) {
            if ((this.state && this.state.hover && this.state.active == false)) {
                return this.context.palette['primary']['600']
            }
            else if ((this.state && this.state.active)) {
                return this.context.palette['primary']['700']
            }
            else {
                return this.context.palette['primary']['500']
            }
        } else { 
            if ((this.state && this.state.hover == true && this.state.active == false)) {
                return this.context.palette['primary']['600']
            }
            else if ((this.state && this.state.active == true)) {
                return this.context.palette['primary']['700']
            }
            else {
                return null
            }
        }
        return null
    }
    static propTypes = {
        label:PropTypes.string,
        context:PropTypes.string,
        dense:PropTypes.bool,
        touchable:PropTypes.bool,
        popover:PropTypes.element,
        active:PropTypes.bool.isRequired,
        icon:PropTypes.element,
        contextName:PropTypes.string.isRequired,
        toggle:PropTypes.bool.isRequired,
    };
    static defaultProps = {
        active:false,
        toggle:false,
        contextName:'default',
    };
    static contextTypes = {
        sheets: React.PropTypes.arrayOf(React.PropTypes.object),
        palette: React.PropTypes.object,
        theme: React.PropTypes.object,
        isDense: React.PropTypes.bool,
    }
    handleHover = (start) => {
        if (start) {
            this.setState({hover:true})
        } else {
            this.setState({hover:false})
        }
    }
    handleDefault = () => {
        this.setState({openPopovers:false, inner_style:{...this.state.inner_style, ...this.getColor()}})
    }
    handleClick = () => {
        var rect = this.refs.cont.getBoundingClientRect();
        var minWidth = rect.right - rect.left;
        var left = rect.left;
        var top = rect.bottom;
        
        if (this.props.onClick !== undefined) {
            this.props.onClick()
        }

        if (this.props.contextMenu !== 'menu') {
            this.setState({active:!this.state.active})
        }
        if (this.props.popover && !this.state.active) {
            //this.setState({inner_style:{...this.state.inner_style, backgroundColor:colors.blue900,}})
            this.context.sheets[this.context.sheets.length - 1].handleForegroundRequest(React.cloneElement(this.props.popover, {open:true, handleClose:this.handleClick, minWidth:minWidth, width:'auto', left:left, top:top , ...this.props.popover.props}))
            this.setState({active:true})
        }
        else if (this.props.popover && this.state.active) {
            //this.setState({inner_style:{...this.state.inner_style, backgroundColor:colors.blue700,}})
            this.context.sheets[this.context.sheets.length - 1].handleForegroundRequest(React.cloneElement(this.props.popover, {open:false, handleClose:this.handleClick, minWidth:minWidth, width:'auto', left:left, top:top , ...this.props.popover.props}))
            this.setState({active:false})
        }
    }
    handleMouseDown = () => {
        if (this.props.contextMenu !== 'menu') {
            this.setState({active:true})
        }
    }
    handleMouseUp = () => {
        if (this.props.contextMenu !== 'menu') {
            this.setState({active:false})
        }
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
            <div role="button" ref="cont" style={this.state.outer_style} onMouseLeave={() => {this.handleDefault()}} >
                <div style={{...this.state.inner_style, ...this.getColor(), ...this.getShadow() }}  
                    onMouseDown={() => this.handleMouseDown()} 
                    onMouseUp={() => this.handleMouseUp()}
                    onMouseEnter={() => this.handleHover(true)} 
                    onMouseOut={() => this.handleHover(false)} 
                    onClick={() => {
                        this.handleClick()
                    }} >
                    {this.props.icon? React.cloneElement(this.props.icon, {style:icon_style, ...this.props.icon.props}):null}
                    {this.props.label? <span style={this.state.title_style}>{this.props.label}</span>:null}
                </div>
            </div>
        );
    }
}


export default withStyles(s)(Component);
