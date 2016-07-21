/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Paper from '../Paper'
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            style:{
                maxWidth:context.rootSheetDim.width,
                maxHeight:context.rootSheetDim.height,
                ...context.theme.drawer.style,
                ...props.style
            },
            drawer_style:{
                ...context.theme.drawer.style,
            },
            behaviour:{
                visibility:props.visibility,
                width:props.width,
                descriptors:props.descriptors
            },
            open:this.props.open,
        }
        //console.log("DRAWER 0")
        //console.log(this.state)
    }
    static propTypes = {
        open:PropTypes.func,
        role:PropTypes.string.isRequired,
        handleResize:PropTypes.func,
        visibility:PropTypes.string,
        width:PropTypes.string,
        descriptors:PropTypes.array
    };
    static defaultProps = {
       role:"drawer",
       visibility:'persistent',
       width:'sticky',
       descriptors:['left']
    };
    static contextTypes = {
        theme: PropTypes.object,
        palette: PropTypes.object,
        rootSheetDim: PropTypes.object,
        sheets: React.PropTypes.arrayOf(React.PropTypes.object),
    }
    
    componentWillReceiveProps = (newProps, nContext) => {
        var nstate = {}
        if (newProps.open !== undefined) {
            var open = newProps.open()
            if (this.props.handleResize && open != this.state.open) {
                this.props.handleResize('left', {width:(open)? this.state.style.width:'0px'})
                nstate = {...nstate, open:open}
            }
        }
        
        this.setState({...this.state, ...nstate, style:{...this.state.style, maxWidth:nContext.rootSheetDim.width+'px', maxHeight:nContext.rootSheetDim.height+'px'}, drawer_style:{...this.state.drawer_style,maxWidth:nContext.rootSheetDim.width+'px', maxHeight:nContext.rootSheetDim.height+'px'}})
    }
    handleResize = (e) => {
        this.setState({style:{...this.state.style, maxWidth:window.innerWidth}})
    }
    componentWillMount = () => {
        /*if (typeof(window) !== 'undefined') {
            this.setState({style:{...this.state.style, maxWidth:window.innerWidth, maxHeight:window.innerHeight}})
        } else { 
            this.setState({style:{...this.state.style, maxWidth:'100%', maxHeight:'100%'}})
        }*/
        //console.log(global.viewport)
    }
    componentReceiveProps = (nProps, nContext) => {
    }
    componentDidMount = () => {
        window.addEventListener('resize', this.handleResize);
        this.setState({style:{...this.state.style, maxWidth:window.innerWidth, maxHeight:window.innerHeight}})
    }
    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleResize);
    }
    render() {
        return (
            <Paper ref='Paper' rules={this.context.theme.drawer.rules} behaviour={this.state.behaviour} open={this.state.open} role={this.props.role} style={{...this.state.style, ...this.state.drawer_style}} depth={1} className={this.context.theme.drawer.cn}> 
                <div style={{float:'clear', width:'auto', height:'100%', overflow:'hidden', overflowY:'auto', position:'relative'}}>
                    {React.Children.map(this.props.children, (val, key, arr) => {
                        return React.cloneElement(val, {key:key, width:this.state.style.width, onClick:(e)=>{val.props.onClick(e);}, ...val.props})
                    })} 
                </div>
            </Paper>
        );
    }
}


export default Component;
