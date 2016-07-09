import React, { PropTypes } from 'react';
//import history from '../../../core/history';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Component.css';

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
        var leftTab = 16

        if (this.props.menuDepth) {
            leftTab = (this.props.menuDepth + 1)*16
        }
        this.state = {
            round:false,
            raised:false,
            outer_style:{
                display:(this.props.contextName === 'menu')? 'block':'inline-block',
                width:(this.props.width !== undefined)? this.props.width:'auto',
                margin:(this.props.contextName === 'menu')? '0px':'5px',
                float:'clear',
                position:'relative',
                overflow:'hidden',
            },
            icon_style:{
                ...this.context.theme.button.icon
            },
            inner_style:{
                ...this.getDensityStyling(),
                ...this.getShadow(),
                ...color,
                paddingLeft:leftTab + "px",
                display:'block',
                position:'relative',
            },
            title_style:{
                display:'inline-block',
                margin:0,
                padding:0,
                border:'none',
                height:(this.props.contextName === 'menu')? '48px':'36px',
                lineHeight:(this.props.contextName === 'menu')? '48px':'36px',
                fontSize:'14px',
                fontFamily:'Roboto-Medium',
                float:'left',
                verticalAlign:'middle',
                position:'relative',
            },
            hover:false,
            openPopovers:false,
            active:this.props.active
        }
    }
    getDensityStyling = () => {
        if (this.props.contextName === 'menu') {
            return this.context.theme.button.defaultMenu
        }
        else {
            if (this.context.dense) {
                return this.context.theme.button.dense
            }
            else {
                return this.context.theme.button.default
            }
        }
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
                return {backgroundColor:'rgba(0,0,0,0)', color:'black'}
            }
        }
        return {backgroundColor:'rgba(0,0,0,0)', color:'black'}
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
        redirect:PropTypes.string,
        rightIcon:PropTypes.element
    };
    static defaultProps = {
        active:false,
        toggle:false,
        contextName:'default',
    };
    static contextTypes = {
        sheets: React.PropTypes.arrayOf(React.PropTypes.object),
        palette: React.PropTypes.object,
        commonFunctions: React.PropTypes.object,
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
    handleClick = (e) => {
        var rect = this.refs['cont'].getBoundingClientRect();
        var minWidth = rect.right - rect.left;
        var left = rect.left;
        var top = rect.bottom;
        

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

        if (this.props.onClick !== undefined) {
            this.props.onClick(e)
        }

        if (this.props.redirect && this.context.commonFunctions.redirect) {
            //e.preventDefault();
            //history.push(this.props.redirect);
            this.context.commonFunctions.redirect(e, this.props.redirect);
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
                    onClick={(e) => {
                        this.handleClick(e)
                    }} >
                    {this.props.icon? React.cloneElement(this.props.icon, {...this.props.icon.props, style:this.state.icon_style,}):null}
                    {this.props.label? <span style={this.state.title_style} className={s.button}>{this.props.label}</span>:null}
                    {this.props.rightIcon? React.cloneElement(this.props.rightIcon, {style:this.state.icon_style, fill:this.state.icon_style.fill, ...this.props.icon.props, float:'right', paddingRight:'16px'}):null}
                </div>
            </div>
        );
    }
}


export default withStyles(s)(Component);
