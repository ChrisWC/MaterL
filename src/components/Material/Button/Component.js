import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Component.css';
import classNames from 'classnames';

import Layer from '../Layer';
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            round:false,
            raised:false,
            outer_style:{
                display:(this.props.contextName === 'menu')? 'block':'inline-block',
                width:(this.props.width !== undefined)? this.props.width:'auto',
            },
            icon_style:{
                display:'inline-block',
                float:'left'
            },
            inner_style:{
                ...this.getShadow(),
                ...this.getColor(),
                paddingLeft:(this.props.menuDepth+1)*16+'px',
                display:'block',
            },
            title_style:{
                display:'inline-block',
                float:'left',
                margin:0,
                padding:0,
                border:'none',
                top:-1,
            },
            hover:false,
            openPopovers:false,
            active:this.props.active
        }
    }
    getClassnames = () => {
        if (this.props.contextName === 'appbar') {
            return classNames({[this.context.theme.button.appbar]:true})
        }
        else if (this.props.contextName === 'menu') {
            return classNames({[this.context.theme.button.menu]:true})
        }
        return classNames({[this.context.theme.button.button]:true, [this.context.theme.button.dense]:(this.props.dense)})
    }
    getShadow = () => {
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
        if (this.props.raised) {
            if ((this.state && this.state.hover && this.state.active == false)) {
                return this.context.palette[this.props.priority]['secondary']
            }
            else if ((this.state && this.state.active)) {
                return this.context.palette[this.props.priority]['default']
            }
            else {
                return this.context.palette[this.props.priority]['primary']
            }
        }
        else {
            var color = this.context.palette[this.props.priority]

            if ((this.state && this.state.hover == true && this.state.active == false)) { 
                if (this.context.backgroundColor) {
                    return this.context.backgroundColor.secondary
                }
                var ncolor = {
                    backgroundColor:this.context.palette.default.secondary.backgroundColor, 
                    color:color.secondary.backgroundColor
                }
                return this.props.priority == 'default'? color.secondary:ncolor
            }
            else if ((this.state && this.state.active == true)) { 
                if (this.context.backgroundColor) {
                    return this.context.backgroundColor.default;
                }
                var ncolor = {
                    backgroundColor:this.context.palette.default.default.backgroundColor, 
                    color:color.default.backgroundColor
                }
                return this.props.priority == 'default'? color.default:ncolor
            }
            else {
                var ncolor = {
                    backgroundColor:this.context.palette.default.primary.backgroundColor, 
                    color:this.context.palette[this.props.priority].primary.backgroundColor
                }
            
                return (this.context.backgroundColor)? this.context.backgroundColor.primary:(this.props.priority === 'default'? this.context.palette.default.primary:ncolor)
            }
        }
        return {backgroundColor:'rgba(0,0,0,0)', color:'black'}
    }
    static propTypes = {
        label:PropTypes.string,
        priority:PropTypes.string,
        context:PropTypes.string,
        dense:PropTypes.bool.isRequired,
        touchable:PropTypes.bool,
        popover:PropTypes.element,
        active:PropTypes.bool.isRequired,
        icon:PropTypes.element,
        contextName:PropTypes.string.isRequired,
        toggle:PropTypes.bool.isRequired,
        redirect:PropTypes.string,
        rightIcon:PropTypes.element,
        primary:PropTypes.bool,
        raised:PropTypes.bool,
        menuDepth:PropTypes.number,
        contextMenu:PropTypes.string
    };
    static defaultProps = {
        active:false,
        toggle:false,
        contextName:'default',
        dense:false,
        raised:false,
        primary:false,
        redirect:null,
        popover:null,
        priority:'default',
        menuDepth:0

    };
    static contextTypes = {
        sheets: React.PropTypes.arrayOf(React.PropTypes.object),
        palette: React.PropTypes.object,
        commonFunctions: React.PropTypes.object,
        theme: React.PropTypes.object,
        isDense: React.PropTypes.bool,
        backgroundColor: React.PropTypes.object
    }
    handleHover = (new_state) => {
        this.setState({hover:new_state})
    }
    handleDefault = () => {
        this.setState({openPopovers:false, inner_style:{...this.state.inner_style, ...this.getColor()}})
    }
    getPopoverAsOverlay = () => {
        var rect = this.refs['cont'].getBoundingClientRect();
        var minWidth = rect.right - rect.left;
        var left = rect.left;
        var top = rect.bottom;
        return <Layer role={'layer'} foreground={[React.cloneElement(this.props.popover, 
                    {open:false, handleClose:() =>{
                            this.setState({active:false})
                            this.context.sheets[this.context.sheets.length - 1].handleForegroundRequest(this.getPopoverAsOverlay, false)
                        }, 
                        minWidth:minWidth, width:'auto', left:left, 
                        top:top, summoningComponent:rect, 
                        ...this.props.popover.props})]}/>
    }
    handleClick = (e) => {
        if (this.props.contextName != 'menu') {
            //this.setState({active:!this.state.active})
        }
        if (this.props.popover && !this.state.active) {
            //this.setState({inner_style:{...this.state.inner_style, backgroundColor:colors.blue900,}})
            this.context.sheets[this.context.sheets.length - 1].handleForegroundRequest(this.getPopoverAsOverlay, true)
            this.setState({active:true})
        }
        else if (this.props.popover && this.state.active) {
            //this.setState({inner_style:{...this.state.inner_style, backgroundColor:colors.blue700,}})
            this.context.sheets[this.context.sheets.length - 1].handleForegroundRequest(this.getPopoverAsOverlay, false)
            //this.context.sheets[this.context.sheets.length - 1].handleForegroundRequest(React.cloneElement(this.props.popover, {open:false, handleClose:this.handleClick, minWidth:minWidth, width:'auto', left:left, top:top , summoningComponent:rect, ...this.props.popover.props}))
            this.setState({active:false})
        }

        if (this.props.onClick !== undefined) {
            //e.stopPropagation()
            this.props.onClick(e)
        }

        if (this.props.redirect !== null && this.context.commonFunctions.redirect) {
            this.context.commonFunctions.redirect(e, this.props.redirect);
        }
    }
    handleMouseDown = (e) => {
        if (this.props.contextName != 'menu') {
            this.setState({active:true})
            //e.stopPropagation()
        } else {
            //e.stopPropagation()
        }
    }
    handleTouchStart = (e) => { 
        if (this.props.contextName != 'menu') {
            this.setState({active:true})
            e.stopPropagation()
        } else {
            e.stopPropagation()
        }
    }
    handleMouseUp = (e) => {
        if (this.props.contextName != 'menu') {
            this.setState({active:false})
            //e.stopPropagation()
        }
    }
    handleTouchEnd = (e) => {
        if (this.props.contextName != 'menu') {
            this.setState({active:false})
            e.stopPropagation()
        }
    }
    componentDidMount = () => {
        
    }
    componentWillUnmount = () => {

    }
    componentWillReceiveProps = (newProps) => {
        this.setState({
            inner_style:{...this.state.inner_style, ...this.getColor()},
            active:newProps.active,
        })
    }
    render() {
        var color = this.getColor()
        var cn = this.getClassnames()
        return(
            <div role="button" ref="cont" style={this.state.outer_style} onMouseLeave={() => {this.handleDefault()}} >
                <div id="inner" className={cn} style={{...this.state.inner_style, ...this.getColor(), ...this.getShadow() }}  
                    onMouseDown={(e) => this.handleMouseDown(e)} 
                    onMouseUp={(e) => this.handleMouseUp(e)}
                    onTouchStart={(e) => this.handleTouchStart(e)}
                    onTouchEnd={(e) => this.handleTouchEnd(e)}
                    onMouseEnter={(e) => this.handleHover(true)} 
                    onMouseOver={(e) => this.handleHover(true)} 
                    onMouseOut={(e) => this.handleHover(false)} 
                    onClick={(e) => {
                        this.handleClick(e)

                    }} >
                    {this.props.icon? React.cloneElement(this.props.icon, {...this.props.icon.props, className:this.context.theme.button.icon }):null}
                    {this.props.label? <div style={this.state.title_style} >{this.props.label}</div>:null}
                    {this.props.rightIcon? React.cloneElement(this.props.rightIcon, {style:this.state.icon_style, fill:this.state.icon_style.fill, ...this.props.icon.props, float:'right', paddingRight:'16px'}):null}
                </div>
                
            </div>
        );
    }
}


export default withStyles(s)(Component);
