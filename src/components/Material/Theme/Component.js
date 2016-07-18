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
import s from './Component.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const defaultTheme = {
    choice:{
        default:s.choice
    },
    appbar:{
        inset:16,
        zDepth:4,
    },
    menu:{
        menu:s['menu']
    },
    button:{
        button:s.button,
        menu:s['menu-button'],
        appbar:s['appbar-button'],
        dense:s['dense-button'],
        floating:{
            resting:{
                zDepth:6,
            },
            pressed:{
                zDepth:12,
            }
        },
        icon:s['icon-button'],
        inset:16,
    },
    drawer:{
        cn:s['drawer'],
        style:{
            width:'370px',
        },
        rules:{
            open:(breakpoint)=>{
                return false;
            }
        }
    },
    sheet:{
        autoOpenThreshold:'600px',
        widthBreakpoints:{
            'DESKTOP':[
                {
                    range:[0,480],
                    size:'xsmall',
                    columns:4
                },
                {
                    range:[480,600],
                    size:'xsmall',
                    columns:8
                },
                {
                    range:[600,840],
                    size:'small',
                    columns:8
                },
                {
                    range:[840,960],
                    size:'small',
                },
                {
                    range:[960,1280],
                    size:'medium',
                },
                {
                    range:[1280,1440],
                    size:'large'
                },
                {
                    range:[1440,1600],
                    size:'large'
                },
                {
                    range:[1600,1920],
                    size:'large'
                },
                {
                    range:[1920, -1],
                    size:'xlarge'
                }
            ],
            'PHONE':{
                'PORTAIT':[
                    {
                        range:[0,360],
                        size:['small']
                    },
                    {
                        range:[360,400],
                        size:['medium']
                    },
                    {
                        range:[400, -1],
                        size:['large']
                    }
                ],
                'LANDSCAPE':[
                    {
                        range:[0, 600],
                        size:['small']
                    },
                    {
                        range:[600, 720],
                        size:['medium']
                    },
                    {
                        range:[720, 960],
                        size:['large']
                    }
                ]
            },
            'TABLET':{
                'PORTAIT':{

                }
            }
        }
    },
    popover:{
        cn:s['popover']
    },
    layer:{
        default:s['layer']
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
            boxShadow:"0px 2px 2px 1px rgba(0,0,0,0.2)"
        },
        "1":{
            boxShadow:"0px 2px 4px 2px rgba(0,0,0,0.2)"
        },
        "2":{
            boxShadow:"0px 2px 6px 3px rgba(0,0,0,0.2)"
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


export default withStyles(s)(Component);
