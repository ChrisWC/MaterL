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

import React, { PropTypes } from 'react';

import Sheet from '../Sheet';
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);


        this.state = {
            inner_style:{
                minWidth:this.props.minWidth,
                left:this.props.left,
                top:this.props.top,
                ...this.props.style
            },
            children:[],
            open:this.props.open,
            activeItem:0
        }
    }
    getPosition = (props) => {
        if (this.state.open) {
            var cont = this.refs['container']
            console.log(this.state)
            console.log(cont)
            console.log(this.refs)
            var rect = this.refs['container'].getBoundingClientRect()
            var height = rect.bottom;
            var position = {
                    minWidth:props.summoningComponent.right - this.props.summoningComponent.left,
                    left:props.summoningComponent.left,
                    top:props.summoningComponent.bottom
            }
            if (height > window.innerHeight) {
                return {...position, top:props.summoningComponent.top -(rect.bottom-rect.top)};
            } else {
                return position
            }
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
        toForeground: React.PropTypes.func,
        theme: React.PropTypes.object
    }
    handleMenuClick = (index,items) => {
        this.setState({activeItem:index})
    }
    componentWillMount = () => { 
        
    }
    componentDidMount = () => {
        var position = this.getPosition(this.props)
        this.setState({inner_style:{...this.state.inner_style, ...position}})
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
            this.props.handleClose();
            this.handleClose()
        }
        if (!newProps.open) {
            this.handleClose();
        }
    }
    handleClose = () => {
        //this.props.handleClose();
        console.log("HANDLE CLOSE")
        this.setState({open:false});
    }
    handleClick = (e, v, context) => {

    }
    render() {
        return this.state.open? (
                <Sheet role="popover" ref="container" className={this.context.theme.popover.cn} style={this.state.inner_style} onClick={(e) => {
                    e.stopPropagation();
                }}>
                    {React.Children.map(this.props.children, (val, key, arr) => {
                        return React.cloneElement(val, {key:key, externalClick:this.props.externalClick, ...val.props})
                    })}
                </Sheet>
        ):null;
    }
}

export default Component;
