/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Paper from '../Paper';
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
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            style: {
                
            },
            device: {
                ...this.context.device,
            }
        }
    }
    static propTypes = {
    };
    static defaultProps = {
    };
    static contextTypes = {
        device: React.PropTypes.object
    };
    handleClick = (e) => {
    }
    componentDidMount = () => {
    }
    componentWillReceiveProps = (nProps, nContext) => {
        if (nContext.device) {
            this.setState({device:nContext.device});
        }
    }
    render() {
        return (
            <section>
                <h3>Device Info</h3>
                <p>orientation: {this.state.device.orientation}</p>
                <p>user agent: {this.state.device.user_agent}</p>
                <p>platform: {this.state.device.platform}</p>
                <p>maxTouchPoints: {/*this.state.device.maxTouchPoints*/}</p>
                <p>resolution: {/*this.state.device.resolution[0]xthis.state.device.resolution[1]*/}</p>
                <p>device type: {this.state.device.device_type} </p>
                <p>device width breakpoint: {this.state.device.breakpoint}</p>
            </section>
        );
    }
}


export default Component;
