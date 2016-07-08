/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
//import Isvg from 'react-inlinesvg';
import s from './Component.css';
var Icon = require('babel!svg-react!./ic_menu_24px.svg?name=Icon');
//const icon = require('./material-design-icons/navigation/svg/production/ic_apps_18px.svg')
class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                color:'white',
                fill:this.props.style.fill,
                display:'inline-block',
                position:'relative'
            }
        }
    }
    static propTypes = {
        resolution:PropTypes.string,
        context:PropTypes.string,
        component:PropTypes.string,
        style:PropTypes.object,
    };
    static defaultProps = {
        resolution:'18px',
        style:{
            fill:'purple',
        }
    };
    getIcon = () => {
        /*var icon = icons.svg[this.props.resolution]
        console.log("TEST")
        console.log(icon)
        if (icon !== undefined) {
            icon = icon[this.props.context]

            console.log("TEST")
            console.log(icon)
            if (icon !== undefined) {
                icon = icon[this.props.component]

                console.log("TEST")
                console.log(icon)
                return icon
            }
        }
        return undefined*/
    }
    render() {
        return (
            <div style={this.state.style} onClick={this.props.onClick}>
                {/*this.getIcon()? <Isvg src={this.getIcon()}/>:null*/}
                <Icon className='normal' style={this.state.style} />
            </div>
        );
    }
}


export default Component;
