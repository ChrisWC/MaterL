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
    constructor(props) {
        super(props);

        this.state = {
           style:{
               width:this.getWidthByName(this.props.width),
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
           contentArea:{
               top:'64px',
               left:'320px',
           },
           disabled:false,
           foregroundActive:false,
           inForeground:false
        }
        this.handleForegroundRequest = this.handleForegroundRequest.bind(this);
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
    genBoxShadowString = (bs) => {
        /*Object.keys(bs).map((val, index, arr) => {

        })*/
        if (this.props.depth >= 0) {
            this.setState({style:{boxShadow:this.context.theme['shadows'][""+this.props.depth]['boxShadow'], ...this.state.style}})
        }
        /*else if (this.props.depth > 0) {
            var nmargin = bs[0].spread + 'px';
            var str = bs[0].offset.x + " " + bs[0].offset.y + " " + " " + bs[0].blur.radius + 'px' + " " + bs[0].spread + 'px' + ((bs[0].color)? " " + bs[0].color:"");
            this.setState({style:{boxShadow:str, margin:nmargin, ...this.state.style}});
        }
        else {

        }*/
    }
    static contextTypes = {
        sheets: React.PropTypes.arrayOf(React.PropTypes.object),
        theme: React.PropTypes.object
    }
    static childContextTypes = {
        sheets: React.PropTypes.arrayOf(React.PropTypes.object),
    }
    getChildContext = () => {
        return {sheets: [this, ...(this.context.sheets? this.context.sheets:[])], }
    }
    componentWillMount = () => {

        //this.processProps(this.props.children)
        this.genBoxShadowString(this.state.shadow)
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
        console.log("HANDLE FOREGROUND")
        console.log(found)
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
    //static methods
    static statics = {

    }
    componentWillReceiveProps = (newProps) => {
        //console.log("RECEIVED NEW PROPS")
        //console.log(this)
        /*if (newProps.foreground) {// && this.props.foreground.length <= 0) {
            this.props.foreground.splice(0)
            this.props.foreground.push(newProps.foreground)
            console.log(this.props.foreground)
            //this.setState({'test':'t'})
        }*/
        //console.log(newProps)
    }
    componentDidMount = () => {
        //console.log("TEST CDM")
        if (this.context.sheets && this.props.check == true && this.state.inForeground == false) {
            //console.log("TEST CDM TEST " + this.props.ind)
            this.setState({disabled:true, inForeground:true})
            //console.log("HAANDLE FOREGROUND REQUEST")
            //this.context.sheets[this.context.sheets.length - 1].handleForegroundRequest(this.props.popover)
            //this.context.sheets[this.context.sheets.length - 1].handleForegroundRequest(this.getComponent())
        }
    }
    handleResizeElement = (loc, spec) => {
        //console.log(obj)
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
        if (this.state.disabled == false) {
            return(
                <div {...this.props} style={this.state.style}>
                    {this.props.toolbars}
                    {this.props.drawers}
                    {!this.context.sheets? <div style={{position:'fixed', display:'block',  overflow:'hidden', overflowY:'scroll', left:this.state.contentArea.left, top:this.state.contentArea.top, bottom:'0px', height:'auto', width:'100%'}}>
                        {this.props.content}
                    </div>:this.props.content}
                    {this.state.foregroundActive? <Layer backgroundColor={'black'} key={0} role={'layer'} foreground={this.props.foreground} />:null}
                </div>
            );
        } else {
            return (<span/>);
        }
    }
}


export default withStyles(s)(Component);
