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

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import React, { PropTypes } from 'react';
import Sheet from '../Sheet';
/****************************************************************
 * A linear control with animations and 'reflexes', it
 * is the base class for scroll bars and progress bars.
 ****************************************************************/
const devices = {
    "nexus6":{
        width:'360px',
        height:'640px'
    }

}
const breakpoints = {
    
}
class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                display:'block',
                height:'640px',
                width:'360px',
                padding:'0px',
            },
            active:!this.props.active,
            orientation:this.props.orientation,
            user_agent:this.props.user_agent,
            platform:this.props.platform,
            maxTouchPoints:this.props.maxTouchPoints,
            resolution:this.props.resolution,
            device_type:this.props.device_type
        }
    }
    static propTypes = {
        device:PropTypes.string,
        emulate:PropTypes.bool,
        orientation:PropTypes.string,
        user_agent:PropTypes.string,
        platform:PropTypes.string,
        maxTouchPoints:PropTypes.number,
        useResolutionAsDeviceQueue:PropTypes.bool,
        resolution:PropTypes.arrayOf(PropTypes.number),
        device_type:PropTypes.string
    };
    static defaultProps = {
        active:false,
        determinate:false,
        vertical:false,
        emulate:false,
        orientation:'LANDSCAPE',
        user_agent:'unknown',
        platform:'unknown',
        maxTouchPoints:0,
        resolution:[1366,768],
        useResolutionAsDeviceQueue:false,
        device_type:'DESKTOP'
    };
    static childContextTypes = {
        device: React.PropTypes.object,
        sheets: React.PropTypes.arrayOf(React.PropTypes.object),
    };
    getDevice = () => {
        return {
                orientation:this.state.orientation,
                user_agent:this.state.user_agent,
                platform:this.state.platform,
                maxTouchPoints:this.state.maxTouchPoints,
                resolution:this.state.resolution,
                device_type:this.state.device_type
        }
    }
    getChildContext = () => {
        return {
            sheets:[],
            device:this.getDevice()
        }
    }
    handleClick = (e) => {
    }
    handleOrientationEvent = (e) => {
        this.setState({orientation:(typeof window.screen.orientation !== 'undefined')? window.screen.orientation.type:'unknown'})
    }
    handleResizeEvent = (e) => {
        this.setState({resolution:[window.innerWidth, window.innerHeight]})
    }
    componentWillMount = () => { 
    }
    componentDidMount = () => {
        if (typeof window !== 'undefined' && !this.props.emulate) {
            //console.liog(window.orientation)
            var device = 'Desktop'

            if (window.navigator.userAgent.match(/(Mobile|iPod|iPhone)/)) {
                device = 'Phone'
            }
            if (window.navigator.userAgent.match(/(Tablet|iPad)/)) {
                device = 'Tablet'
            }

            this.setState({
                orientation:(typeof window.screen.orientation !== 'undefined')? window.screen.orientation.type:'unknown',
                user_agent:window.navigator.userAgent,
                platform:window.navigator.platform,
                maxTouchPoints:window.navigator.maxTouchPoints,
                resolution:[window.innerWidth, window.innerHeight],
                device_type:device
            })
        }
        window.addEventListener('deviceorientation', this.handleOrientationEvent);
        window.addEventListener('resize', this.handleResizeEvent);
    }
    componentWillUnmount = () => {
        window.removeEventListener('deviceorientation', this.handleOrientationEvent);
        window.removeEventListener('resize', this.handleResizeEvent);
    }
    render() {
        return this.props.emulate? (
            <div style={this.state.style}>
                <Sheet {...this.props} depth={1} role={"device"} width={this.props.width} height={'700px'} style={{display:'block', position:'relative', height:this.state.style.height, width:this.state.style.width}}>
                    {React.Children.map(this.props.children, (val, key, arr) => {
                        return React.cloneElement(val, {...val.props, key:key});
                    })}
                </Sheet>
            </div>
        ):(
            <div>
                    {React.Children.map(this.props.children, (val, key, arr) => {
                        return React.cloneElement(val, {...val.props, key:key});
                    })}
            </div>
        );
    }
}


export default Component;
