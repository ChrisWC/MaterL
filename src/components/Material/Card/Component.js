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
import Paper from '../Paper';

import ResponsiveUI from '../Sheet/ResponsiveUI'
const inner_style = {
}
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            style:{
                ...this.props.style,
                width:this.props.columnWidth? (this.props.columnWidth*this.props.columnSpan + (this.props.gutterSize*(this.props.columnSpan-1)))+'px':this.props.style.width
            },
        }
    }
    static propTypes = {
        title: PropTypes.string,
        columns: PropTypes.number,
        width: PropTypes.string,
        style: PropTypes.object
    };
    static defaultProps = {
        style:{
            width:'5px',
            height:'auto',
        },
        columnSpan:4,
        gutterSize:8
    };
    static contextTypes = {
        theme: PropTypes.object,
        palette: PropTypes.object
    }
    componentWillReceiveProps = (nProps) => {
        if (nProps.columnWidth && this.props.style && this.props.style.width && nProps.columnWidth > parseInt(this.props.style.width, 10)) {
            this.setState({style:{...this.state.style, width:(nProps.columnWidth*nProps.columnSpan + (nProps.gutterSize*(nProps.columnSpan-1))) + "px"}})
        }
    }
    getCSS = () => {
        var css = ``
        for (var child in this.props.children) {
            if (this.props.children[child].getCSSStyle !== undefined) {
                css += child.getCSSStyle()
            }
        }
        return css
    }
    render() {
        return(
            <Paper role={"card"} style={this.state.style} columns={this.props.columns} className={this.context.theme.card.container} depth={1}>    
                    {this.props.children != undefined? React.Children.map(this.props.children, (val, keys, ind) =>{
                        return React.cloneElement(val, {...val.props, width:parseFloat(this.state.style.width, 10)})
                    }):<div>No Content Found.</div>}
            </Paper>
        );
    }
}


export default Component;
