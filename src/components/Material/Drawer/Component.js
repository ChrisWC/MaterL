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
                width:'320px',
                height:'100%',
                maxWidth:context.rootSheetDim.width,
                maxHeight:context.rootSheetDim.height,
                top:'0px',
                left:'0px',
                bottom:'0px',
                display:'inline-block',
                overflow:'hidden',
                overflowY:'scroll',
                position:'absolute',
                ...context.theme.drawer.style,
                ...props.style
            },
            drawer_style:{
                width:'325px',
                top:'64px',
                left:'0px',
                bottom:'0px',
                float:'left',
                overflow:'hidden',
                position:'absolute',
                display:'block',
                ...context.theme.drawer.style,
            },
            open:this.props.open,
        }
    }
    static propTypes = {
        open:PropTypes.bool,
        role:PropTypes.string.isRequired,
        handleResize:PropTypes.func
    };
    static defaultProps = {
       role:"drawer" 
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
            if (this.props.handleResize && newProps.open != this.state.open) {
                this.props.handleResize('left', {width:(newProps.open)? this.state.style.width:'0px'})
                nstate = {...nstate, open:newProps.open}
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
        return this.props.open? (
            <div style={this.state.drawer_style} role={this.props.role}>
                <Paper role={this.props.role} style={this.state.style} depth={1} > 
                    <div style={{float:'clear', width:'auto', overflow:'hidden', position:'relative'}}>
                        {React.Children.map(this.props.children, (val, key, arr) => {
                            return React.cloneElement(val, {key:key, width:this.state.style.width, onClick:(e)=>{val.props.onClick(e);}, ...val.props})
                        })} 
                    </div>
                </Paper>
            </div>
        ):(null);
    }
}


export default Component;
