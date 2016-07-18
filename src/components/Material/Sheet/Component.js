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

class Component extends React.Component {
    constructor(props,context) {
        super(props,context);

        this.state = {
           style:{
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
               left:(this.props.openLeftNavigation && this.props.openLeftNavigation())? this.context.theme.drawer.style.width:'0px',
               right:'0px',
               marginLeft:'0px',
               marginRight:'0px'
           },
           width:'0px',
           height:'0px',
           contentWidth:'100%',
           disabled:false,
           foregroundActive:false,
           inForeground:false,
           device:this.context.device,
           openLeftNavigation:this.props.openLeftNavigation,
           open:this.props.open,
           behaviour:this.props.behaviour
        }
    }

    getWidthByName = (n) => {
        return '100%'
    }
    static propTypes = {
        open: PropTypes.bool,
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
        openLeftNavigation: PropTypes.func.isRequired,
        behaviour: PropTypes.object
    }
    static defaultProps = { 
        open:true,
        foreground:new Array(),
        toolbars: [],
        drawers:[],
        content:[],
        showShadows:true,
        fullscreen:false,
        depth:0,
        sheets:[],
        ind:10,
        openLeftNavigation:(state)=>{},
        behaviour:{
            visibility:'permenant',
            width:'fluid',
            descriptors:[]
        }
    }
    getShadow = (depth) => {
        if (this.props.depth >= 0) {
            return this.context.theme['shadows'][""+depth]
        }
        return {boxShadow:'none'}
    }
    static contextTypes = {
        sheets: React.PropTypes.arrayOf(React.PropTypes.object),
        theme: React.PropTypes.object,
        device: React.PropTypes.object
    }
    static childContextTypes = {
        sheets: React.PropTypes.arrayOf(React.PropTypes.object),
        rootSheetDim: React.PropTypes.object,
    }
    getChildContext = () => {
        return {sheets: [this, ...(this.context.sheets? this.context.sheets:[])], rootSheetDim:{width:this.state.width, height:this.state.height} }
    }
    getBehaviour = () => {
        //Get Behaviour according to rules
        return this.state.behaviour
    }
    getReaction = () => {
        //Get Outcome of behaviour, the Reaction
        var open = true;
        if (this.state.behaviour.visibility == 'permenant') {
            open = true;
        }
        else if (this.state.behaviour.visibility == 'persistent') {
            open = this.state.open
        } else if (this.state.behaviour.visibility == 'temporary') {
            open = this.state.open

            //if other elements are manipulated then close.
            //we could use the layer here
        }

        return {
            open:open
        }
    }
    getBreakpoint = () => {
        var resolution = window.innerWidth
        
        var formfactor = this.context.theme.sheet.widthBreakpoints[this.context.device.device_type.toUpperCase()];

       if (this.context.device.device_type.toUpperCase().match(/DESKTOP/)) {
            for (var i in formfactor) {
                if (window.innerWidth >= formfactor[i].range[0] 
                    && (window.innerWidth < formfactor[i].range[1] 
                    || formfactor[i].range[1] == -1)) {

                    return formfactor[i]
                }
            }
        } 
        else if (typeof this.context.device.orientation != 'undefined' 
                    && this.context.device.orientation.toUpperCase().match(/(LANDSCAPE|PORTRAIT)/)) {
            formfactor = formfactor[this.context.device.orientation.toUpperCase()]
            console.log("TEST 2")
            for (var i in formfactor) {
                if (window.innerWidth >= formfactor[i].range[0] 
                    && (window.innerWidth < formfactor[i].range[1] 
                    || formfactor[i].range[1] == -1)) {

                    return formfactor[i]
                }
            }
        } 
        else if (this.context.device.device_type.toUpperCase().match(/(PHONE|TABLET)/)) {
            //find breakpoint based on resolution
        }

        return {}
    }
    componentWillMount = () => {
    }
    componentWillUpdate = (nextProps, nextState) => {
    }
    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleResize);
    }
    
    handleResize = (e) => {
        var nstate = {}
        if (this.props.fullscreen) {
            //nstate = {style:{width:window.innerWidth,...this.state.style}}
        }
        else {
            //check if size is smaller than component or greater than threshold
        }
        nstate = {...nstate, contentWidth:window.innerWidth, breakpoint:this.getBreakpoint()}
        this.setState({...this.state, ...nstate})
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
        return this.props.sheets
    }
    componentWillReceiveProps = (nProps, nContext) => {
        var nstate = {style:{...this.state.style}, open:(typeof nProps != undefined)? nProps.open:this.state.open};
        if (nProps.style) {
            //console.log(this.state.style)
            //console.log(nProps.style)
            if (nProps.style.maxWidth != this.state.maxWidth && nProps.style.maxHeight != this.state.maxHeight) {
                nstate = {...nstate, style:{...this.state.style, maxWidth:nProps.style.maxWidth, maxHeight:nProps.style.maxHeight}}
                //this.genBoxShadowString(this.state.shadow)
            }

            if (nProps.style.top) {
                nstate = {...nstate, style:{...this.state.style, ...nstate.style, top:nProps.style.top, bottom:nProps.style.bottom, left:nProps.style.left}}

            }
        }

        if (nContext.device) {
            if (nContext.device.device_type != this.state.device.device_type) {
                if (nContext.device.device_type == 'Desktop') {
                    this.props.openLeftNavigation(undefined, true);
                } else {
                    this.props.openLeftNavigation(undefined, false);
                }
            }
            nstate = {...nstate, device:nContext.device}
        }

        if (Object.keys(nstate).length > 0) {
            this.setState({...nstate, behaviour:(typeof nProps.behaviour != 'undefined')? nProps.behaviour:this.state.behaviour});
        }
    }
    componentDidMount = () => {
        var nstate = {}
        if (this.context.sheets && this.props.check == true && this.state.inForeground == false) {
            nstate = {disabled:true, inForeground:true}
        }
        else if (!this.context.sheets || this.context.sheets.length == 0) {
            var rect = this.refs['sheet'].getBoundingClientRect();
            nstate = {width:rect.right-rect.left, height:rect.bottom-rect.top}
        }
        nstate = {...nstate, breakpoint:this.getBreakpoint()}
        this.setState({...this.state, ...nstate})
    
        window.addEventListener('resize', this.handleResize);
    }
    handleResizeElement = (loc, spec) => {
        if (loc === 'top') {
            //this.setState({contentArea:{...this.state.contentArea, top:this.state.style.height}})
        }
        else if (loc === 'left') {
            this.setState({contentArea:{...this.state.contentArea, left:spec.width}})
        }
    }
    getBoundingClientRect = () => {
        return this.refs['sheet'].getBoundingClientRect()
    }
    processProps = (props) => {
        this.props.toolbars.splice(0, this.props.toolbars.length)
        this.props.content.splice(0, this.props.content.length) 
        this.props.drawers.splice(0, this.props.drawers.length)
        React.Children.map(props, (val, key, arr) => {
            if (val != null && val.props != null && val.props !== undefined) {
                if ((val.props.role && val.props.role == "appbar") || (!val.props.role && val.type.ComposedComponent && val.type.ComposedComponent.defaultProps && val.type.ComposedComponent.defaultProps.role === 'appbar')) {
                    this.props.toolbars.push(React.cloneElement(val, {key:key, handleResize:this.handleResizeElement, ...val.props}))
                }
                else if (val.props.role && val.props.role == "drawer"|| (!val.props.role && val.type.ComposedComponent && val.type.ComposedComponent.defaultProps && val.type.ComposedComponent.defaultProps.role === 'drawer')) {
                    this.props.drawers.push(React.cloneElement(val, {key:key, open:true, handleResize:this.handleResizeElement, ...val.props}))
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
    handleClick = (e) => {
        if (this.props.onClick) {
            this.props.onClick(e)
        }
    }
    render() {
        //console.log(this.state.breakpoint)
        this.processProps(this.props.children)
        return (this.state.open || this.state.behaviour.visibility == 'permenant')? (
            <div {...this.props} ref="sheet" style={this.state.style} onClick={this.handleClick}>
                {this.props.toolbars}
                {this.props.drawers}
                {(!this.context.sheets || this.context.sheets.length == 0)? <div style={{position:'absolute', display:'block',  overflow:'hidden', overflowY:'auto', marginLeft:this.state.contentArea.marginLeft, marginRight:this.state.contentArea.marginRight, left:(this.props.drawers.length > 0)? this.state.contentArea.left:'0px', right:this.state.contentArea.right, top:this.state.contentArea.top, bottom:'0px', height:'auto'}}>
                    {this.props.content}
                </div>:this.props.content}
                {this.state.foregroundActive? <Layer backgroundColor={'black'} key={0} role={'layer'} foreground={this.props.foreground} />:null}
            </div>
        ): null;
    }
}


export default Component;
