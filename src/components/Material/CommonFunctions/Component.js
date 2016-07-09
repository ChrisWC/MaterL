/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Paper from '../Paper'

const defaultFunctions = {
    redirect:(e, redirect_location)=>{
    }
}
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    static propTypes = {
        redirect:PropTypes.func,
    };
    static defaultProps = {
    }
    static childContextTypes = {
        commonFunctions: React.PropTypes.object
    }

    getChildContext = () => {
        return {
            commonFunctions: {
                redirect:this.props.redirect? this.props.redirect:defaultFunctions.redirect,
            }
        }
    }
    render() {
        return(
            <div>
                {React.Children.map(this.props.children, (val, key, arr)=>{
                    return React.cloneElement(val, {key:key, ...val.props})
                })}
            </div>
        );
    }
}


export default Component;
