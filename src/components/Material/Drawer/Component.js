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
            style:{
                maxWidth:context.rootSheetDim.width,
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
            nstate = {...nstate, open:open}
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
            <Sheet ref='Paper' rules={this.context.theme.drawer.rules} behaviour={this.state.behaviour} open={this.state.open} role={this.props.role} style={{...this.state.style, ...this.state.drawer_style}} depth={1} className={this.context.theme.drawer.cn}> 
                    {React.Children.map(this.props.children, (val, key, arr) => {
                        return React.cloneElement(val, {key:key, width:this.state.style.width, onClick:(e)=>{val.props.onClick(e);}, ...val.props})
                    })} 
            </Sheet>
        );
    }
}


export default Component;
