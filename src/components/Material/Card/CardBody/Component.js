/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Paper from '../../Paper';

const style = {
    display:'inline-block',
    position:'relative',
    width:'auto',
    padding:'10px',
    margin:'0px',
    float:'left'
}

const inner_style = {
    margin:'0px',
    display:'inline-block',
    position:'relative',
    float:'clear'
}
const titleStyle = {
    height:'48px',
    display:'block',
    lineHeight:'48px',
    paddingLeft:'24px',
    paddingRight:'24px',
    position:'relative'
}
const bodyStyle = {
    padding:'10px',
    display:'inline-block',
    position:'relative',
}
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            titleStyle:{
                ...titleStyle,
                ...context.palette.primary['500'],
            },
            bodyStyle:{
                ...bodyStyle,
                padding:context.theme.card.text.inset + 'px',
            }
        }
    }
    static propTypes = {
        title: PropTypes.string,
    };
    static defaultProps = {
    };
    static contextTypes = {
        theme: PropTypes.object,
        palette: PropTypes.object
    }
    render() {
        return(
            <div style={this.state.bodyStyle} role={'card'}>
                {this.props.children}
            </div>
        );
    }
}


export default Component;
