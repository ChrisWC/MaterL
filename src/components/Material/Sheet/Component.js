/****************************************************************************
*   Copyright 2016 Christopher W. Catton
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
*****************************************************************************/
/****************************************************************************
 * Sheet -- A container for elements with width, height, position (x, y, z)
 *
 *
 ***************************************************************************/

import React, { PropTypes } from 'react';
import Layer from '../Layer';
import ScrollBar from '../ScrollBar';
import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
//import ResponsiveUI from './ResponsiveUI';
//import s from './Component.css';
class Component extends React.Component {
    constructor(props,context) {
        super(props,context);

        this.state = {
           style:{
               backgroundColor:this.props.backgroundColor,
               ...this.context.palette.default.primary,
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
           },
           theme_id:context.theme_component_id.next().value
        }
    }

    static propTypes = {
        showShadows: PropTypes.bool,
        fullscreen: PropTypes.bool,
        width: PropTypes.number,
        columns: PropTypes.number,
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
        style:{
               height:'100%',
               width:'100%',
               top:'0px',
               position:'absolute',
               bottom:'0px'
        },
        sheets:[],
        ind:10,
        inLayer:false,
        open:undefined,
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
        palette: React.PropTypes.object,
        device: React.PropTypes.object,
        theme_component_id: PropTypes.object,
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
                openRequestRet = openRequest()
            } else {
                openRequestRet = openRequest
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
            if (typeof openRequest === "function") {
                openRequestRet = openRequest()
            } else {
                openRequestRet = openRequest
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
    componentDidMount = () => {

        window.addEventListener('resize', this.handleResize);
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
        nstate = {...nstate, style:{...this.state.style, maxWidth:window.innerWidth}, contentWidth:window.innerWidth, breakpoint:this.getBreakpoint()}
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
            if (i.match(/Drawer/) && this.refs[i].refs['Paper'].refs['sheet']) {
                var w = this.refs[i].refs['Paper'].getMetrics().width.match(/\d+/g)
                if (w.length == 1 && this.refs[i].refs['Paper'].state.reaction.open) {
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
                nstate = {style:{...nstate.style, maxWidth:nProps.style.maxWidth, maxHeight:nProps.style.maxHeight}}
            }
        
            if (nProps.style.top && nProps.style.left) {
                nstate = {style:{...nstate.style, ...nstate.style, top:nProps.style.top, left:nProps.style.left}}
            }
            if (nProps.style.width) {
                nstate = {...nstate, style:{...nstate.style, width:nProps.style.width}}

            }
        }
        /*if (nProps.style) {
            if (nProps.style.maxWidth != this.state.maxWidth && nProps.style.maxHeight != this.state.maxHeight) {
                nstate = {...nstate, style:{...this.state.style, maxWidth:nProps.style.maxWidth, maxHeight:nProps.style.maxHeight}}
            }

            if (nProps.style.top) {
                nstate = {...nstate, style:{...this.state.style, ...nstate.style, top:nProps.style.top, bottom:nProps.style.bottom, left:nProps.style.left}}

            }
        }*/
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
        if (props != undefined) {
            React.Children.map(props, (val, key, arr) => {
                if (val != null && val.props != null && val.props !== undefined && val.type) {
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
        }
        return {toolbars:toolbars, content:content, drawers:drawers}
    }
    getAsOverlay = () => {
        return (<Layer role={'layer'} foreground={[<Component ref='container' rules={this.props.rules}
                    onClick={(e)=>{
                        e.stopPropagation()
                        if (this.props.onClick) {
                            this.props.onClick(e)
                        }
                    }}
                    inLayer={true}
                    behaviour={this.state.behaviour} 
                    open={this.state.open} role={this.props.role} 
                    draggable='false' onClick={this.handleClick} 
                    width={this.props.width} 
                    style={this.state.style} className={this.props.className}
                    popover={this.props.popover} depth={this.props.depth}>
                        {this.props.children}
                </Component>]}/>)
    }
    handleClick = (e) => {
        if (this.props.onClick) {
            this.props.onClick(e)
        }
    }
    genCSS = () => {
        var css = Object.keys(this.state.style).map((val, index, arr) => {
            var name = val.replace(/([A-Z])/g, (str) => {return '-'+str.toLowerCase();})
            return ``+name+`:`+this.state.style[val]+`;`
        })
        var css_template = '';
        for (var i = 0; i < css.length; i++) {
            css_template += ("\t" + css[i] + "\n")
        }
        return css_template
    }
    render() {
        var elements = this.processProps(this.props.children)
        
        var shouldRender = (this.state.behaviour.visibility == 'temporary' && this.props.inLayer)
                            || (this.state.behaviour.visibility != 'temporary' && !this.props.inLayer);

        var css = `.sheet-`+this.props.role+"_"+this.state.theme_id+` {`+"\n"+this.genCSS()+`}`
        return (this.state.reaction.open && shouldRender)? (
            <div {...this.props} ref="sheet" className={classNames({['sheet-'+this.props.role+"_"+this.state.theme_id]:true, [this.props.className]:true})} onClick={(e) => {
                        this.handleClick(e)
                    }
                }>
                <style>
                    {css}
                </style>
                {elements.toolbars}
                {(!this.context.sheets || this.context.sheets.length == 0)? <div className={this.context.theme.sheet.content_area} style={{
                    ...this.calculateContentArea()}}>
                    {elements.content}
                </div>:<div>{elements.content}</div>} 
                {elements.drawers}
                {this.state.foregroundActive? this.state.foreground():null}
            </div>
        ): <div ref="sheet"></div>;
    }
}

export default Component;
