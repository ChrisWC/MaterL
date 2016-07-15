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
    constructor(props) {
        super(props);

        this.state = {
            style:{
                backgroundColor:colors.white["500"],
                color:colors.black["500"],
                width:'360px',
                paddingLeft:'0px',
                paddingRight:'0px',
                display:'inline-block',
                position:'relative',
            },
            swatch_style:{
                width:'330px',
                height:'16px',
                display:'block',
                paddingLeft:'15px',
                paddingRight:'15px',
                paddingTop:'15px',
                paddingBottom:'15px',
            }
        }
    }
    static propTypes = {
        role:PropTypes.string.isRequired,
        primary:PropTypes.string,
        secondary:PropTypes.string,
        default:PropTypes.string
    };
    static defaultProps = {
        role:'swatch',
        swatch:'base',
        primary:'600',
        secondary:'700',
        default:'500'
    }
    static childContextTypes = {
        palette: React.PropTypes.object
    }

    getChildContext = () => {
        return {
            palette:{
                ...Palette,
                primary:{
                    primary:colors[this.props.primary],
                    secondary:colors[this.props.secondary],
                    default:colors[this.props.default]
                }
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
