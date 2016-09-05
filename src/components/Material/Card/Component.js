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

const inner_style = {
}
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            style:{
                ...this.props.style
            },
        }
    }
    static propTypes = {
        title: PropTypes.string,
        columns: PropTypes.number,
        width: PropTypes.string
    };
    static defaultProps = {
    };
    static contextTypes = {
        theme: PropTypes.object,
        palette: PropTypes.object
    }
    render() {
        return(
            <Paper role={"card"} width={this.props.width} style={this.state.style} columns={this.props.columns} className={this.context.theme.card.container} depth={1}>    
                {this.props.children}
            </Paper>
        );
    }
}


export default Component;
