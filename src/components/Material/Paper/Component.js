/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Sheet from '../Sheet';

class Component extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
           style:{
               ...this.context.palette.default.primary,
               ...this.props.style,
            },
           dragActive:false,
           disabled:false,
           foregroundActive:false,
           inForeground:false,
           open:this.props.open,
           behaviour:this.props.behaviour
        }
    }

    getWidthByName = (n) => {
        return '100%'
    }
    static propTypes = {
        open:PropTypes.bool,
        showShadows: PropTypes.bool,
        fullscreen: PropTypes.bool,
        width: PropTypes.string,
        foreground: PropTypes.array.isRequired,
        backgroundColor: PropTypes.string,
        draggable:PropTypes.bool,
        style:PropTypes.object,
        role:PropTypes.string.isRequired,
        depth:PropTypes.number.isRequired,
        behaviour:PropTypes.object,
    }
    static defaultProps = { 
        foreground:new Array(),
        showShadows:true,
        fullscreen:false,
        sheets:[],
        ind:10,
        draggable:true,
        depth:0,
        style:{
               height:'100%',
               width:'100%',
               top:'0px',
               position:'absolute',
               bottom:'0px'
        },
        open:true,
        behaviour:{
            visibility:'permenant',
            width:'fluid',
            descriptors:[]
        }
    }
    static contextTypes = {
        palette: React.PropTypes.object
    }
    componentDidMount = () => {
        window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleResize);
    }
    componentWillReceiveProps = (nProps) => {
        var nstate = {style:{}}
        if (nProps.style) {
            if (nProps.style.maxWidth != this.state.maxWidth && nProps.style.maxHeight != this.state.maxHeight) {
                nstate = {style:{...this.state.style, maxWidth:nProps.style.maxWidth, maxHeight:nProps.style.maxHeight}}
            }
        
            if (nProps.style.top && nProps.style.left) {
                nstate = {style:{...this.state.style, ...nstate.style, top:nProps.style.top, left:nProps.style.left}}
            }
        }

        nstate = {...this.state, style:{...this.state.style, ...nstate.style}, open:(typeof nProps.open != 'undefined')? nProps.open:this.state.open, behaviour:(typeof nProps.behaviour != 'undefined')? nProps.behaviour:this.state.behaviour}
        this.setState(nstate)
    }
    handleResize = (e) => {
        if (this.props.fullscreen) {
            this.setState({style:{width:window.innerWidth,...this.state.style}})
        }
        else {
            //check if size is smaller than component or greater than threshold
        }
    }
    handleClick = (e) => {
        if (this.props.onClick) {
            this.props.onClick(e)
        }
    }
    getBoundingClientRect = () => {
        return this.refs['container'].getBoundingClientRect()
    }
    handleMouseDown = (e) => {
        if (this.props.draggable && !this.props.dragActive) {
            this.setState({dragActive:true})
        }
    }
    handleMouseUp = (e) => {
        if (this.props.draggable && this.props.dragActive) {
            this.setState({dragActive:false})
        }
    }
    handleDrag = (e) => {
    }
    render() {
        return (<Sheet ref='container' behaviour={this.state.behaviour} 
                    open={this.state.open} role={this.props.role} 
                    content={[]} drawers={[]} appbars={[]} 
                    draggable='false' onClick={this.handleClick} 
                    onDragStart={this.handleDrag} foreground={[]} 
                    check={this.props.check} width={this.props.width} 
                    className={this.props.className} style={this.state.style} 
                    popover={this.props.popover} depth={this.props.depth}>
                        {this.props.children}
                </Sheet>)
    }
}


export default Component;
