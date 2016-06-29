/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Component.css';

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style:{
                backgroundColor:'white',
                position:'relative',
            }
        }
    }
    componentWillReceiveProps = (newProps) => {
        if (newProps.active) {
            this.setState({'style':{...this.state.style, backgroundColor:'grey'}});
        }
        else {
            this.setState({'style':{...this.state.style, backgroundColor:'white'}});
        }
    }
    static propTypes = {
        primaryText:PropTypes.string,
        active:PropTypes.bool,
    };
    render() {
        return(
            <div className={s.menuitem} style={this.state.style} onClick={() => {
                this.props.onClick()
                console.log("TEST MENU BUTTON")
                }}>
                <span className={s.menulabel} style={{position:'relative'}}>{this.props.primaryText}</span>
            </div>
        );
    }
}

export default withStyles(s)(Component);
