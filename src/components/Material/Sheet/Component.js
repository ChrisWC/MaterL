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
           contentArea:{
               top:'64px',
               left:'0px',
               right:'0px',
               marginLeft:'0px',
               marginRight:'0px'
           },
           width:'0px',
           height:'0px',
           contentWidth:'100%',
           disabled:false,
           foreground:()=>{},
           foregroundActive:false,
           inForeground:false,
           device:this.context.device,
           openLeftNavigation:this.props.openLeftNavigation,
           open:undefined,
           openRequest:this.props.open,
           behaviour:this.props.behaviour,
           reaction:{
               open:true,
               userOpen:undefined
           }
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
        openLeftNavigation: PropTypes.func.isRequired,
        behaviour: PropTypes.object
    }
    static defaultProps = { 
        foreground:[],
        toolbars: [],
        drawers:[],
        content:[],
        showShadows:true,
        fullscreen:false,
        depth:0,
        sheets:[],
        ind:10,
        openLeftNavigation:(state, pref)=>{},
        behaviour:{
            visibility:'permenant',
            width:'fluid',
            descriptors:[]
        },
        reaction:{
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
    getBreakpoint = () => {
        var resolution = window.innerWidth
        
        var formfactor = this.context.theme.sheet.widthBreakpoints[this.context.device.device_type.toUpperCase()];

        
       if (this.context.device.device_type.toUpperCase().match(/DESKTOP/)) {
            for (var i in formfactor) {
                if (window.innerWidth >= formfactor[i].range[0] 
                    && (window.innerWidth < formfactor[i].range[1] 
                    || formfactor[i].range[1] == -1)) {

                    return {device:'DESKTOP', ...formfactor[i]}
                }
            }
        } 
        else if (typeof this.context.device.orientation != 'undefined'
                    && this.context.device.device_type.toUpperCase().match(/(TABLET|PHONE)/)
                    && this.context.device.orientation.toUpperCase().match(/(LANDSCAPE|PORTRAIT)/)) {
            formfactor = formfactor[this.context.device.orientation.toUpperCase().match(/(LANDSCAPE|PORTRAIT)/)[0]]
            for (var i in formfactor) {
                if (window.innerWidth >= formfactor[i].range[0] 
                    && (window.innerWidth < formfactor[i].range[1] 
                    || formfactor[i].range[1] == -1)) {

                    return {device:this.context.device.device_type.toUpperCase(), ...formfactor[i]}
                }
            }
        } 

        return {}
    }
    getBehaviour = (state_behaviour, props) => {
        //Get Behaviour according to rules
        var breakpoint = this.getBreakpoint();
        var behaviour = {}
        var rule = {}
        for (var i in props.rules) {
            rule = props.rules[i];
            var match = true;
            for (var k in rule.breakpoint) {
                if (rule.breakpoint[k] !== breakpoint[k]) {
                    match = false
                }
            }
            if (match) {
                behaviour = {...behaviour, ...rule.behaviour}
            }
        }

        var b = {...state_behaviour, ...behaviour};

        return b;
    }
    getReaction = (props, context, behaviour) => {
        //var breakpoint = this.getBreakpoint()
        var open = this.state.reaction.open;
        var userOpen = this.state.reaction.userOpen;
        
        //get default
        var openRequestRet = undefined
        var openRequest = (props.open === undefined)? this.state.openRequest:props.open;

        if (behaviour.visibility == 'permenant' || this.props.inLayer) {
            open = true;
        }
        else if (behaviour.visibility == 'persistent') {
            if (typeof openRequest === "function") {
                openRequestRet = props.open()
            } else {
                openRequestRet = props.open
            }


            if (openRequestRet === undefined) {
                open = false;

                if (context.device && context.device.device_type) {
                    if (context.device.device_type.toUpperCase().match(/DESKTOP/)) {
                        open = true
                    } else {
                        open = false
                    }
                }
            }
            else if (openRequestRet !== undefined) {
                //SYNC
                if (userOpen === undefined) {
                    open = !open
                    userOpen = open
                    if (typeof openRequest == 'function') {
                        openRequest(open)
                    }
                } else {
                    open = openRequestRet
                    userOpen = openRequestRet
                }
            }
        } else if (behaviour.visibility == 'temporary') {
            if (this.props.paper) {
                this.props.paper.makeOverlay()
            }
            if (typeof openRequest === "function") {
                openRequestRet = props.open()
            } else {
                openRequestRet = props.open
            }


            if (openRequestRet === undefined) {
                //resolve with rules
                open = false;

                if (context.device && context.device.device_type) {
                    if (context.device.device_type.toUpperCase().match(/DESKTOP/)) {
                        open = false
                    } else {
                        open = false
                    }
                }
                //resolve user input and preference
            }
            else if (openRequestRet !== undefined) {
                //SYNC
                if (userOpen === undefined) {
                    open = !open
                    userOpen = open
                    if (typeof openRequest == 'function') {
                        openRequest(open)
                    }
                } else {
                    open = openRequestRet
                    userOpen = openRequestRet
                }
            }

            if (this.state.reaction.open != open) {
                if (open) {
                    //render with layer
                    this.context.sheets[this.context.sheets.length -1].handleForegroundRequest(this.getAsOverlay, true);            
                } else {
                    this.context.sheets[this.context.sheets.length -1].handleForegroundRequest(this.getAsOverlay, false);            
                }
            }
        }
        return {
            open:open,
            userOpen:userOpen
        }
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
    handleForegroundRequest = (c, a) => {
        /*****************************************************************************
         * take child element and render to foreground -- display over everything else
         * e -- event
         * c -- child component
         * a -- add or remove
         ****************************************************************************/
        //console.log("HANDLE FOREGROUND REQUEST");
        if (a) {
            this.setState({foregroundActive:true, foreground:c})
            //console.log(this.props.foreground)
        }
        else {
            this.setState({foregroundActive:false, foreground:c})
        }

    }
    getParentSheets = () => {
        return this.props.sheets
    }
    getMetrics = () => {
        if (this.state.behaviour.width == 'overlay') {
            return {
                width:'0px',
            }
        }

        var rect = this.refs['sheet'].getBoundingClientRect();
        var width = rect.right - rect.left;
        var left = rect.left;
        var top = rect.bottom;
        return {
            'width':width+'px',
        }
    }
    calculateContentArea = () => {
        var content_left = 0;
        for (var i in this.refs) {
            if (i.match(/Drawer/) && this.refs[i].refs['Paper'].refs['container']) {
                var w = this.refs[i].refs['Paper'].getMetrics().width.match(/\d+/g)
                if (w.length == 1 && this.refs[i].refs['Paper'].refs['container'].state.reaction.open) {
                    content_left = Math.max(content_left, Number(w[0]))
                }

            }
        }

        return {...this.state.contentArea, left:content_left}
    }
    handleClose = () => {
        //this.props.handleClose();
        if (typeof this.state.openRequest === 'function') {
            this.state.openRequest(false)
        }
    }
    componentWillReceiveProps = (nProps, nContext) => {
        if (this.props.inLayer && (nProps.externalClick || !this.state.reaction.open)) {
            this.handleClose()
        }
        var nstate = {style:{...this.state.style}, openRequest:(typeof nProps != undefined)? nProps.open:this.state.openRequest};
        if (nProps.style) {
            if (nProps.style.maxWidth != this.state.maxWidth && nProps.style.maxHeight != this.state.maxHeight) {
                nstate = {...nstate, style:{...this.state.style, maxWidth:nProps.style.maxWidth, maxHeight:nProps.style.maxHeight}}
            }

            if (nProps.style.top) {
                nstate = {...nstate, style:{...this.state.style, ...nstate.style, top:nProps.style.top, bottom:nProps.style.bottom, left:nProps.style.left}}

            }
        }
        var behaviour = this.getBehaviour(nstate, this.props);
        var r = this.getReaction(nProps, nContext, behaviour)
        nstate = {...nstate, reaction:r, behaviour:behaviour}
        if (Object.keys(nstate).length > 0) {
            this.setState({...nstate, contentArea:this.calculateContentArea()});
        }
    }
    componentDidMount = () => {
        var nstate = {}
        var behaviour = this.getBehaviour(this.state.behaviour, this.props);
        if (this.context.sheets && this.props.check == true && this.state.inForeground == false) {
            nstate = {disabled:true, inForeground:true}
        }
        else if (!this.context.sheets || this.context.sheets.length == 0) {
            var rect = this.getBoundingClientRect() //this.refs['sheet'].getBoundingClientRect();
            nstate = {width:rect.right-rect.left, height:rect.bottom-rect.top}
        }
        nstate = {...nstate, breakpoint:this.getBreakpoint()}
    
        window.addEventListener('resize', this.handleResize);

        var r = this.getReaction(this.props, this.context, behaviour)
        this.setState({...this.state, ...nstate, contentArea:this.calculateContentArea(), reaction:r, behaviour:behaviour})
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
        var toolbars = []
        var content = []
        var drawers = []
        React.Children.map(props, (val, key, arr) => {
            if (val != null && val.props != null && val.props !== undefined) {
                if ((val.props.role && val.props.role == "appbar") || (!val.props.role && val.type.ComposedComponent && val.type.ComposedComponent.defaultProps && val.type.ComposedComponent.defaultProps.role === 'appbar')) {
                    toolbars.push(React.cloneElement(val, {key:key, handleResize:this.handleResizeElement, ...val.props}))
                }
                else if (val.props.role && val.props.role == "drawer"|| (!val.props.role && val.type.ComposedComponent && val.type.ComposedComponent.defaultProps && val.type.ComposedComponent.defaultProps.role === 'drawer')) {
                    drawers.push(React.cloneElement(val, {ref:('Drawer'+key), key:key, open:true, handleResize:this.handleResizeElement, ...val.props}))
                }
                else {
                    content.push(React.cloneElement(val, {key:key, getParentSheets:this.getParentSheets, ...val.props}))
                }
            }

        })

        return {toolbars:toolbars, content:content, drawers:drawers}
    }
    getAsOverlay = () => {
        return this.props.paper.getAsOverlay();
    }
    handleClick = (e) => {
        if (this.props.onClick) {
            this.props.onClick(e)
        }
    }
    render() {
        var elements = this.processProps(this.props.children)
        
        var shouldRender = (this.state.behaviour.visibility == 'temporary' && this.props.inLayer)
                            || (this.state.behaviour.visibility != 'temporary' && !this.props.inLayer);

        return (this.state.reaction.open && shouldRender)? (
            <div {...this.props} ref="sheet" style={this.state.style} onClick={(e) => {
                        this.handleClick(e)
                    }
                }>
                {elements.toolbars}
                {(!this.context.sheets || this.context.sheets.length == 0)? <div className={this.context.theme.sheet.content_area} style={{
                    ...this.calculateContentArea()}}>
                    {elements.content}
                </div>:elements.content} 
                {elements.drawers}
                {this.state.foregroundActive? this.state.foreground():null}
            </div>
        ): <div ref="sheet"></div>;
    }
}


export default Component;
