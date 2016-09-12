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
import Image from '../../Lotus/Image'
import Icon from '../Icon'

/****************************************************************
 * A linear control with animations and 'reflexes', it
 * is the base class for scroll bars and progress bars.
 ****************************************************************/
class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                display:'block',
                height:'4px',
                width:this.props.width,
                padding:'0px',
            },
            active:!this.props.active
        }
    }
    static propTypes = {
        context:PropTypes.string,
        component:PropTypes.string,
        role:PropTypes.string,
        active:PropTypes.bool,
        determinate:PropTypes.bool,
        vertical:PropTypes.bool
    };
    static defaultProps = {
        resolution:'18px',
        active:false,
        determinate:false,
        vertical:false
    };
    static contextTypes = {
        palette: React.PropTypes.object,
    };
    handleClick = (e) => {
        this.setState({active:!this.state.active});
    }
    render() {
        return (
            <div style={this.state.style}>
                <svg style={{height:'4px',...this.state.style}} xmlns="http://www.w3.org/2000/svg">
                    <rect x={0} y={0} width={'100%'} height={'4px'} stroke="black" strokeWidth="0" fill={this.context.palette['default']['default'].backgroundColor}/>
                    <rect ref={"control"} x={0} y={0} width={'16px'} height={'4px'} stroke="black" strokeWidth="0" fill={this.context.palette['primary']['primary'].backgroundColor}/>
                </svg>
            </div>
        )
    }
}


export default Component;
