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
import Icon from '../Icon'

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Component.css';
import classNames from 'classnames';

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                fontSize:'16px',
                lineHeight:'16px',
            },
            active:!this.props.active
        }
    }
    static propTypes = {
        resolution:PropTypes.string,
        context:PropTypes.string,
        component:PropTypes.string,
        role:PropTypes.string,
        active:PropTypes.bool,
        onChange:PropTypes.func
    };
    static defaultProps = {
        resolution:'18px',
        active:false,
        onChange:(e)=>{}
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
        e.target.value = !this.state.active;
        this.props.onChange(e);
    }
    render() {
        return (
            <div className={this.context.theme.choice} style={this.state.style} onClick={this.props.onClick} className={this.context.theme.choice.default}>
                {this.getIcon(this.props.role, this.state.active)}
                <div className={this.context.theme.choice.body} ref={'text'} style={{float:'left'}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}


export default withStyles(s)(Component);
