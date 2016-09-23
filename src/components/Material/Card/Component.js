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

const inner_style = {
}
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log(this.props.columnWidth)
        this.state = {
            style:{
                ...this.props.style,
                width:this.props.columnWidth? this.props.columnWidth+'px':this.props.style.width
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
            width:200
        }
    };
    static contextTypes = {
        theme: PropTypes.object,
        palette: PropTypes.object
    }
    componentWillReceiveProps = (nProps) => {
        if (nProps.columnWidth && this.props.style && this.props.style.width && nProps.columnWidth > parseInt(this.props.style.width, 10)) {
            this.setState({style:{...this.state.style, width:nProps.columnWidth + "px"}})
        }
    }
    render() {
        return(
            <Paper role={"card"} style={this.state.style} columns={this.props.columns} className={this.context.theme.card.container} depth={1}>    
                {this.props.children}
            </Paper>
        );
    }
}


export default Component;
