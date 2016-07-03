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
import Paper from '../Paper'
import ScrollBar from '../ScrollBar'
class Component extends React.Component {
    constructor(props, context) {
        super(props), context;

        this.state = {
            style:{
                width:'320px',
                top:'0px',
                left:'0px',
                bottom:'0px',
                display:'inline-block',
                overflow:'hidden',
                position:'absolute',
                backgroundColor:'white',
            },
            open:this.props.open,
        }
    }
    static propTypes = {
        open:PropTypes.bool,
        role:PropTypes.string.isRequired,
        handleResize:PropTypes.func
    };
    static defaultProps = {
       role:"drawer" 
    };
    static contextTypes = {
        theme: PropTypes.object,
        palette: PropTypes.object
    }
    
    componentWillReceiveProps = (newProps) => {
        if (newProps.open !== undefined) {
            if (this.props.handleResize && newProps.open != this.state.open) {
                this.props.handleResize('left', {width:(newProps.open)? this.state.style.width:'0px'})
                this.setState({open:newProps.open})
            }
            
        }
    }
    render() {
        return this.props.open? (
            <div className={s.drawer} role={this.props.role}>
                <Paper role={this.props.role} style={this.state.style} depth={1} > 
                    <div style={{float:'clear', width:'auto', overflow:'hidden', position:'relative'}}>
                        {React.Children.map(this.props.children, (val, key, arr) => {
                            return React.cloneElement(val, {key:key, width:this.state.style.width, onClick:(e)=>{val.props.onClick(e);}, ...val.props})
                        })} 
                    </div>
                </Paper>
            </div>
        ):(null);
    }
}


export default withStyles(s)(Component);
