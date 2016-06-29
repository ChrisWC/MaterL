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
import * as colors from 'material-ui/styles/colors'
import Paper from '../Paper'

const icon_style = {
    border:'none',
    display:'inline-block',
    height:'24px',
    margin:'8px 8px',
    padding:'12px',
    fill:'white',
    'float':'left'
}
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            style:{
                ...context.palette['primary']['900'],
                color:'white',
                width:'100%',
                height:'64px',
                left:'0px',
                top:'0px',
                paddingLeft:'8px',
                paddingRight:'0px',
                display:'block',
                position:'absolute'
            },
        }
    }
    static propTypes = {
        role:PropTypes.string.isRequired
    };
    static defaultProps = {
        role:"appbar"
    }
    static contextTypes = {
        palette: React.PropTypes.object
    }
    render() {
        return(
            <Paper style={this.state.style} depth={4} {...this.props} {...this.defaultProps}>

                <div style={{position:'relative', float:'left', paddingTop:'4px', paddingBottom:'4px', display:'inline-block', lineHeight:'48px', height:'48px'}}>
                    {React.cloneElement(this.props.icon, {style:icon_style, ...this.props.icon.props})}
                </div>
                {this.props.left}
                <div className={s.title}><span><strong>Title</strong></span></div>
                <div style={{position:'relative', paddingRight:'8px', float:'right', paddingTop:'4px', paddingBottom:'4px', display:'block', lineHeight:'48px', height:'48px'}}>
                    {this.props.right }
                </div>
            </Paper>
        );
    }
}


export default withStyles(s)(Component);
