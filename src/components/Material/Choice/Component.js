/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Image from '../../Lotus/Image'
import Icon from '../Icon'

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
            },
            active:!this.props.active
        }
    }
    static propTypes = {
        resolution:PropTypes.string,
        context:PropTypes.string,
        component:PropTypes.string,
        role:PropTypes.string,
        active:PropTypes.bool
    };
    static defaultProps = {
        resolution:'18px',
        active:false
    };
    static contextTypes = {
        theme: PropTypes.object
    }
    getIcon = (role, active) => {
        const check =  (<Icon onClick={(e) => this.handleClick(e)} resolution={"24px"} context={"toggle"} component={"check_box"}/>)
        const unchecked =  (<Icon onClick={(e) => this.handleClick(e)} resolution={"24px"} context={"toggle"} component={"check_box_outline_blank"}/>)
        const star_half =  (<Icon onClick={(e) => this.handleClick(e)} resolution={"24px"} context={"toggle"} component={"star_half"}/>)
        const star_filled =  (<Icon onClick={(e) => this.handleClick(e)} resolution={"24px"} context={"toggle"} component={"star"}/>)
        const star_empty =  (<Icon onClick={(e) => this.handleClick(e)} resolution={"24px"} context={"toggle"} component={"star_border"}/>)
        const option_select =  (<Icon onClick={(e) => this.handleClick(e)} resolution={"24px"} context={"toggle"} component={"radio_button_checked"}/>)
        const option_blank =  (<Icon onClick={(e) => this.handleClick(e)} resolution={"24px"} context={"toggle"} component={"radio_button_unchecked"}/>)
        
        if (role == 'check') {
            if (active) {
                return check
            } else {
                return unchecked
            }
        }
        else if (role == 'option') {
            if (active) {
                return option_select
            } else {
                return option_blank
            }
        }
        else if (role == 'star') {
            if (active) {
                return star_filled
            } else {
                return star_empty
            }
        }
        return null
    }
    handleClick = (e) => {
        this.setState({active:!this.state.active});
    }
    render() {
        return (
            <div style={this.state.style} onClick={this.props.onClick} className={this.context.theme.choice.default}>
                <div ref={'icon'} style={{height:'100%'}}>
                    {this.getIcon(this.props.role, this.state.active)}
                </div>
                <div ref={'text'} style={{height:'100%'}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}


export default Component;
