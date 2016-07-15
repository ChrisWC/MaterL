/**
 * PopOver -- Pops up near an object or a point
 */

import React, { PropTypes } from 'react';
import Paper from '../Paper/'

class Component extends React.Component {
    constructor(props, context) {
        super(props);

        this.state = {
            outer_style:{
                height:'auto',
                position:'fixed',
                display:'inline-block',
                minWidth:this.props.minWidth,
                left:this.props.left,
                top:this.props.top,
                ...this.props.style
            },
            inner_style:{
                height:'auto',
                position:'relative',
                display:'inline-block',
                backgroundColor:'white',
                ...this.props.style
            },
            children:[],
            open:this.props.open,
            activeItem:0
        }
    }
    static propTypes = {
        minWidth: PropTypes.number,
        maxWidth: PropTypes.number,
        targetCenterX: PropTypes.number,
        targetCenterY: PropTypes.number,
        halfHeight:PropTypes.number,
        pop:PropTypes.bool.isRequired,
        role:PropTypes.string.isRequired,
        open:PropTypes.bool.isRequired,
        clicked:PropTypes.bool.isRequired,
        handleClose:PropTypes.func,
    };
    static defaultProps = {
        pop:true,
        open:true,
        role:"popover",
        clicked:false,
    };
    static contextTypes = {
        toForeground: React.PropTypes.func
    }
    handleMenuClick = (index,items) => {
        this.setState({activeItem:index})
    }
    componentWillMount = () => { 
        
    }

    componentWillUpdate = (nextProps, nextState) => {
        if (nextState.activeItem != this.state.activeItem) {
            /*this.props.children[this.state.activeItem] = React.cloneElement(this.props.children[this.state.activeItem], {...this.props.children[this.state.activeItem].props, active:false})
            this.props.children[nextState.activeItem] = React.cloneElement(this.props.children[nextState.activeItem], {...this.props.children[nextState.activeItem].props, active:true})

            this.setState({children:React.Children.map(this.props.children, ((val, index, arr) => {
                        var nval = React.cloneElement(val, {key:index, ...val.props})
                        this.props.children[index] = nval
                        return (<div key={index} onClick={this.handleMenuClick.bind(this, index, this.props.children)}>{nval}</div>);
                    })}})*/
        }
    }
    componentWillReceiveProps = (newProps) => {
        if (newProps.clicked) {
            //this.props.handleClose();
        }
        if (newProps.externalClick) {
            this.handleClose()
        }
        if (!newProps.open) {
            this.handleClose();
        }
    }
    handleClose = () => {
        this.props.handleClose();
        this.setState({'open':false});
    }
    handleClick = (e, v, context) => {

    }
    render() {
        return this.state.open? (
            <div role="popover" style={this.state.outer_style} onClick={(e) => {
                    e.stopPropagation();
                }}>
                <Paper role="popover" style={this.state.inner_style}>
                    {React.Children.map(this.props.children, (val, key, arr) => {
                        return React.cloneElement(val, {key:key, style:this.state.style, externalClick:this.props.externalClick, ...val.props})
                    })}
                </Paper>
            </div>
        ):null;
    }
}

export default Component;
