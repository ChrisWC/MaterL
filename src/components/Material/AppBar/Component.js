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
const icon_style = {
    border:'none',
    display:'inline-block',
    height:'24px',
    fill:'white',
}

class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            style:{
                ...context.palette['primary']['primary'],
                color:'white',
            },
            title_style: {
                color:'white',
                paddingLeft:this.props.icon? '0px':'24px',
            }
        }

        if (this.props.handleResize) {
            this.props.handleResize('top', '64px', this);
        }
    }
    static propTypes = {
        role:PropTypes.string.isRequired,
        title:PropTypes.string,
        icon:PropTypes.element,
    };
    static defaultProps = {
        role:"appbar"
    }
    static contextTypes = {
        palette: React.PropTypes.object,
        theme: React.PropTypes.object
    }
    static childContextTypes = {
        backgroundColor: React.PropTypes.object,
        contextName:React.PropTypes.string
    }
    getChildContext = () => {
        return {backgroundColor:this.context.palette['primary'], contextName:'appbar'}
    }
    componentWillReceiveProps = (newProps) => {
        if (newProps.handleResize) {
            //newProps.handleResize('top', this.state.style.height, this)
        }
    }
    render() {
        return(
            <Sheet style={this.state.style} className={this.context.theme.appbar.default} depth={4} {...this.props} {...this.defaultProps}>
                <div className={this.context.theme.appbar.default}>
                <span style={{float:'left'}}>
                {this.props.icon? React.cloneElement(this.props.icon, {...this.props.icon.props, contextName:'appbar'}):null}
                </span>
                <span style={this.state.title_style} className={this.context.theme.appbar.title}>{this.props.title}</span>
                <div className={this.context.theme.appbar.right}>
                    {this.props.right}
                </div>
                </div>
            </Sheet>
        );
    }
}


export default Component;
