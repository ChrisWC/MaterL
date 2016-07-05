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
const width = {
    'window': {
        xsmall:[480],
        small:[600, 720, 840],
        medium:[960, 1024],
        large:[1280, 1440, 1600],
        xlarge:[1920]
    },
    'handset-portait':{

    },
    'handset-landscape':{

    },
    'tablet-portrait':{

    },
    'tablet-landscape':{

    }
}
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
           style:{
               backgroundColor:this.props.backgroundColor,
               ...this.props.style
            },
            shadow:[{
                offset: {
                   x: '0px',
                   y: '0px'
                },
                blur: {
                    radius:5,
                },
                spread:1,
           }],
           dragActive:false,
           disabled:false,
           foregroundActive:false,
           inForeground:false
        }
    }

    getWidthByName = (n) => {
        switch (this.props.width) {
            case "small-0":
                return '600px'
            case "small-1":
                return width['window'].small[1]
            case "small-2":
                return width['window'].small[2]
            default:
                return '100%'
        }
    }
    static propTypes = {
        showShadows: PropTypes.bool,
        fullscreen: PropTypes.bool,
        width: PropTypes.string,
        foreground: PropTypes.array.isRequired,
        backgroundColor: PropTypes.string,
        draggable:PropTypes.bool,
        style:PropTypes.object,
        role:PropTypes.string.isRequired,
        depth:PropTypes.number.isRequired,
        palette:PropTypes.object,
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
               position:'fixed',
               bottom:'0px'
        },
        palette: {
            base: {
                fontFamily: 'Roboto, sans-serif',
            },
            primary: {
                backgroundColor:'',
                textColor:'',
                accentColor:'',
            },
            secondary: {

            },
            accent: {

            }
        }
    }
    componentDidMount = () => {
        window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleResize);
    }
    calculateSize = () => {
    }
    handleResize = (e) => {
        if (this.props.fullscreen) {
            this.setState({style:{width:window.innerWidth,...this.state.style}})
        }
        else {
            //check if size is smaller than component or greater than threshold
        }
    }
    getParentSheets = () => {
        //return ancestors
        return this.props.sheets
    }
    //static methods
    static statics = {

    }
    handleClick = (e) => {
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
        console.log('DRAG')
    }
    render() {
        //console.log(" " + this.props.ind)
        //console.log(this)

        return (<Sheet role={this.props.role} content={[]} drawers={[]} appbars={[]} draggable='true' onClick={this.handleClick} onDragStart={this.handleDrag} foreground={[]} check={this.props.check} width={this.props.width} backgroundColor={this.props.backgroundColor} style={this.state.style} popover={this.props.popover} depth={this.props.depth} {...this.props}> {this.props.children}</Sheet>)
    }
}


export default Component;
