/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Layer from '../Layer';
import ScrollBar from '../ScrollBar';

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
    constructor(props,context) {
        super(props,context);

        this.state = {
           style:{
               width:this.getWidthByName(this.props.width),
               backgroundColor:this.props.backgroundColor,
               ...this.props.style,
               ...this.getShadow(this.props.depth)
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
           contentArea:{
               top:'64px',
               left:context.theme.drawer.style.width,
               right:'0px',
               marginLeft:'0px',
               marginRight:'0px'
           },
           width:'0px',
           height:'0px',
           contentWidth:'100%',
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
        ind:PropTypes.number,
        role:PropTypes.string.isRequired,
        depth:PropTypes.number.isRequired,
        toolbars: PropTypes.array.isRequired,
        drawers: PropTypes.array.isRequired,
        content: PropTypes.array.isRequired,
    }
    static defaultProps = { 
        foreground:new Array(),
        toolbars: [],
        drawers:[],
        content:[],
        showShadows:true,
        fullscreen:false,
        depth:0,
        sheets:[],
        ind:10
    }
    getShadow = (depth) => {
        /*Object.keys(bs).map((val, index, arr) => {

        })*/
        if (this.props.depth >= 0) {
            return this.context.theme['shadows'][""+depth]
        }
        return {boxShadow:'none'}
    }
    static contextTypes = {
        sheets: React.PropTypes.arrayOf(React.PropTypes.object),
        theme: React.PropTypes.object
    }
    static childContextTypes = {
        sheets: React.PropTypes.arrayOf(React.PropTypes.object),
        rootSheetDim: React.PropTypes.object,
    }
    getChildContext = () => {
        return {sheets: [this, ...(this.context.sheets? this.context.sheets:[])], rootSheetDim:{width:this.state.width, height:this.state.height} }
    }
    componentWillMount = () => {

        //this.processProps(this.props.children)
        //this.genBoxShadowString(this.state.shadow)
    }
    componentWillUpdate = (nextProps, nextState) => {
    }
    componentDidMount = () => {
        window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleResize);
    }
    
    handleResize = (e) => {
        if (this.props.fullscreen) {
            this.setState({style:{width:window.innerWidth,...this.state.style}})
        }
        else {
            //check if size is smaller than component or greater than threshold
        }
        this.setState({contentWidth:window.innerWidth})
    }
    handleForegroundRequest = (c) => {
        /*****************************************************************************
         * take child element and render to foreground -- display over everything else
         * e -- event
         * c -- child component
         * l -- layer to be rendered too
         ****************************************************************************/
        var found = false
        found = this.props.foreground.map((val, key, arr) => {
            if (val == c) {
                return true
            }
        })
        if (found.length == 0) {
            this.props.foreground.push(c)
            this.setState({foregroundActive:true})
        }
        else {
            this.props.foreground.splice(0, this.props.foreground.length)
            this.setState({foregroundActive:false})
        }

    }
    getParentSheets = () => {
        //return ancestors
        return this.props.sheets
    }
    componentWillReceiveProps = (nProps, nContext) => {
        if (nProps.style) {
            //console.log(this.state.style)
            //console.log(nProps.style)
            if (nProps.style.maxWidth != this.state.maxWidth && nProps.style.maxHeight != this.state.maxHeight) {
                this.setState({style:{...this.state.style, maxWidth:nProps.style.maxWidth, maxHeight:nProps.style.maxHeight}})
                //this.genBoxShadowString(this.state.shadow)
            }
        }
    }
    componentDidMount = () => {
        if (this.context.sheets && this.props.check == true && this.state.inForeground == false) {
            this.setState({disabled:true, inForeground:true})
        }
        else if (!this.context.sheets || this.context.sheets.length == 0) {
            var rect = this.refs['sheet'].getBoundingClientRect();
            this.setState({width:rect.right-rect.left, height:rect.bottom-rect.top})
        }
    }
    handleResizeElement = (loc, spec) => {
        if (loc === 'top') {
            //this.setState({contentArea:{...this.state.contentArea, top:this.state.style.height}})
        }
        else if (loc === 'left') {
            this.setState({contentArea:{...this.state.contentArea, left:spec.width}})
        }
    }
    processProps = (props) => {
        this.props.toolbars.splice(0, this.props.toolbars.length)
        this.props.content.splice(0, this.props.content.length) 
        this.props.drawers.splice(0, this.props.drawers.length)
        React.Children.map(props, (val, key, arr) => {
            if (val != null && val.props != null && val.props !== undefined) {
                if ((val.props.role && val.props.role == "appbar") || (!val.props.role && val.type.ComposedComponent && val.type.ComposedComponent.defaultProps && val.type.ComposedComponent.defaultProps.role === 'appbar')) {
                    this.props.toolbars.push(React.cloneElement(val, {key:key, handleResize:this.handleResizeElement, getParentSheets:this.getParentSheets, ...val.props}))
                }
                else if (val.props.role && val.props.role == "drawer"|| (!val.props.role && val.type.ComposedComponent && val.type.ComposedComponent.defaultProps && val.type.ComposedComponent.defaultProps.role === 'drawer')) {
                    this.props.drawers.push(React.cloneElement(val, {key:key, open:true, handleResize:this.handleResizeElement, getParentSheets:this.getParentSheets, ...val.props}))
                }
                else if (val.props.role && val.props.role == "popover"|| (!val.props.role && val.type.ComposedComponent && val.type.ComposedComponent.defaultProps && val.type.ComposedComponent.defaultProps.role === 'popover')) {
                    //this.props.drawers.push(React.cloneElement(val, {key:key, getParentSheets:this.getParentSheets, ...val.props}))
                }
                else {
                    this.props.content.push(React.cloneElement(val, {key:key, getParentSheets:this.getParentSheets, ...val.props}))
                }
            }

        })

    }
    render() {
        this.processProps(this.props.children)
        return(
            <div {...this.props} ref="sheet" style={this.state.style}>
                {this.props.toolbars}
                {this.props.drawers}
                {(!this.context.sheets || this.context.sheets.length == 0)? <div style={{position:'absolute', display:'block',  overflow:'hidden', overflowY:'scroll', marginLeft:this.state.contentArea.marginLeft, marginRight:this.state.contentArea.marginRight, left:(this.props.drawers.length > 0)? this.state.contentArea.left:'0px', right:this.state.contentArea.right, top:this.state.contentArea.top, bottom:'0px', height:'auto'}}>
                    {this.props.content}
                </div>:this.props.content}
                {this.state.foregroundActive? <Layer backgroundColor={'black'} key={0} role={'layer'} foreground={this.props.foreground} />:null}
            </div>
        );
    }
}


export default Component;
