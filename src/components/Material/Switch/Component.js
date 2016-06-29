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
        }
    }
    static propTypes = {
    };
    render() {
        return(
            <div className={s.drawer}>
                <span>T</span>
            </div>
        );
    }
}


export default withStyles(s)(Component);
