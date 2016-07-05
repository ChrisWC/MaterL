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

const defaultTheme = {
    appbar:{
        inset:16,
        zDepth:4,
    },
    button:{
        raised:{
            resting:{
                elevation:2,
            },
            pressed:{
                elevation:8,
            }
        },
        raisedDesktop:{
            resting:{
                elevation:0,
            },
            pressed:{
                zDepth:2,
            }
        },
        default:{
            fontFamily:"Roboto-Medium",
            foxtSize:14,
            height:'36px',
            lineHeight:'36px',
            paddingLeft:'16px',
            paddingRight:'16px',
            borderRadius:'2px',
            margin:'5px'
        },
        defaultMenu:{
            fontFamily:"Roboto-Medium",
            foxtSize:14,
            height:'48px',
            lineHeight:'48px',
            paddingLeft:'16px',
            paddingRight:'16px',
            borderRadius:'0px',
        },
        dense:{
            fontFamily:"Roboto-Medium",
            foxtSize:13,
            height:'32px',
            lineHeight:'32px',
            paddingLeft:'16px',
            paddingRight:'16px',
            borderRadius:'2px',
            margin:'5px'
        },
        floating:{
            resting:{
                zDepth:6,
            },
            pressed:{
                zDepth:12,
            }
        },
        icon:{
            border:'none',
            display:'inline-block',
            position:'relative',
            height:'36px',
            fill:'white',
            color:'white',
            'float':'left'
        },
        inset:16,
    },
    drawer:{
        iconInsetLeft:16,
        labelInsetLeft:72,
        InsetRight:16
    },
    popover:{

    },
    card:{
        textTitle:{
            leftInset:16,
            rightInset:16,
            topInset:24,
            bottomInset:24,
        },
        text:{
            inset:16,
        },
        actions:{
            inset:8,
        },
        style:{
            boder:'1px solid black',
            borderRadius:'2px',
            overflow:'hidden'
        }
    },
    shadows:{
        "0":{
            boxShadow:"0px 0px 2px 1px rgba(0,0,0,0.2)"
        },
        "1":{
            boxShadow:"0px 0px 4px 2px rgba(0,0,0,0.2)"
        },
        "2":{
            boxShadow:"0px 0px 6px 3px rgba(0,0,0,0.2)"
        },
        "3":{
            boxShadow:"0px 0px 8px 4px rgba(0,0,0,0.2)"
        },
        "4":{
            boxShadow:"0px 0px 16px 6px rgba(0,0,0,0.14)"
        },
        "5":{
            boxShadow:"0px 0px 16px 8px rgba(0,0,0,0.2)"
        },
        "6":{
            boxShadow:"0px 0px 18px 9px rgba(0,0,0,0.2)"
        },
        "7":{
            boxShadow:"0px 0px 24px 12px rgba(0,0,0,0.2)"
        },
        "8":{
            boxShadow:"0px 0px 32px 16px rgba(0,0,0,0.2)"
        },
        "9":{
            boxShadow:"0px 0px 48px 24px rgba(0,0,0,0.2)"
        },
    }
}
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    static propTypes = {
        role:PropTypes.string.isRequired,
        theme:PropTypes.object.isRequired,
    };
    static defaultProps = {
        role:"palatte",
        theme:defaultTheme
    }
    static childContextTypes = {
        theme: React.PropTypes.object
    }

    getChildContext = () => {
        return {
            theme: this.props.theme
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
