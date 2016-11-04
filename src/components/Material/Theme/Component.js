/****************************************************************************
*   Copyright 2016 Christopher W. Catton
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
*****************************************************************************/

import React, { PropTypes } from 'react';
import s from './Component.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles';

const defaultTheme = {
    appbar:{
        default:s.appbar,
        title:s['appbar-title'],
        inset:16,
        zDepth:4,
    },
    choice:{
        default:s.choice,
        body:s['choice-body'],
    },
    expansion_panel:{
        default:s['expansion-panel'],
        container:s['expansion-panel-header'],
        title:s['title'],
        subtitle:s['subtitle'],
        label:s['expansion-panel-label'],
        value:s['expansion-panel-value'],
        button:s['expansion-panel-button']
    },
    textfield:{
        default:s.textfield,
        floatinghint:s['textfield-floatinghint'],
        hint:s['textfield-hint']
    },
    menu:{
        menu:s['menu']
    },
    button:{
        button:s.button,
        drawer_header:s['drawer-header-button'],
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
        },
        rules:[
            {
                breakpoint:{
                    device:'TABLET'
                },
                behaviour:{
                    visibility:'persistent',
                    width:'fixed'
                }
            },
            {
                breakpoint:{
                    device:'DESKTOP'
                },
                behaviour:{
                    visibility:'persistent',
                    width:'fixed'
                }
            },
            {
                breakpoint:{
                    device:'PHONE',
                },
                behaviour:{
                    visibility:'temporary',
                    width:'overlay'
                }
            }
        ]
    },
    sheet:{
        autoOpenThreshold:'600px',
        content_area:s['content-area'],
        widthBreakpoints:{
            'DESKTOP':[
                {
                    range:[0,480],
                    size:'xsmall',
                    columns:4,
                    gutter:16
                },
                {
                    range:[480,600],
                    size:'xsmall',
                    columns:8,
                    gutter:16
                },
                {
                    range:[600,840],
                    size:'small',
                    columns:8,
                    gutter:[16,24]
                },
                {
                    range:[840,960],
                    size:'small',
                    columns:12,
                    gutter:[16,24]
                },
                {
                    range:[960,1280],
                    size:'medium',
                    columns:12,
                    gutter:24
                },
                {
                    range:[1280,1440],
                    size:'large',
                    columns:12,
                    gutter:24
                },
                {
                    range:[1440,1600],
                    size:'large',
                    columns:12,
                    gutter:24
                },
                {
                    range:[1600,1920],
                    size:'large',
                    columns:12,
                    gutter:24
                },
                {
                    range:[1920, -1],
                    size:'xlarge',
                    columns:12,
                    gutter:24
                }
            ],
            'PHONE':{
                'PORTRAIT':[
                    {
                        range:[0,360],
                        size:['small'],
                        columns:4,
                        gutter:16
                    },
                    {
                        range:[360,400],
                        size:['medium'],
                        columns:4,
                        gutter:16
                    },
                    {
                        range:[400, -1],
                        size:['large'],
                        columns:4,
                        gutter:16
                    }
                ],
                'LANDSCAPE':[
                    {
                        range:[0, 600],
                        size:['small'],
                        columns:4,
                        gutter:[16]
                    },
                    {
                        range:[600, 720],
                        size:['medium'],
                        columns:[8],
                        gutter:[16,24]
                    },
                    {
                        range:[720, 960],
                        size:['large'],
                        columns:[8,12],
                        gutter:[16,24]
                    }
                ]
            },
            'TABLET':{
                'PORTRAIT':[
                    {
                        range:[600,720],
                        size:['small'],
                        columns:8,
                        gutter:[16,24]

                    },
                    {
                        range:[720,840],
                        size:['large'],
                        columns:12,
                        gutter:[16,24]
                    }
                ],
                'LANDSCAPE':[
                    {
                        range:[960,1024],
                        size:['small'],
                        columns:12,
                        gutter:24
                    },
                    {
                        range:[1024,1280],
                        size:['large'],
                        columns:12,
                        gutter:24
                    }
                ]
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
        container:s['card'],
        title:{
            container:s['cardtitle'],
            primary:s['primarytext'],
            avatar:s['avatar'],
            secondary:s['secondarytext']
        },
        body:{
            container:s['cardbody'],
        },
        media:{
            container:s['cardmedia'],
        },
        actions:{
            container:s['cardactions'],
        }
    },
    responsiveui:{
        container:s['responsive-ui'],
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

        this.state = {
            t:this.getThemeComponentId()
        }

        console.log("THEME")
    }
    static propTypes = {
        role:PropTypes.string.isRequired,
        theme:PropTypes.object.isRequired,
    };
    getThemeComponentId = function*() {
        var id = 0;

        while (true) {
            id += 1;
            yield id;
        }
    }
    static defaultProps = {
        role:"palatte",
        theme:defaultTheme,
    }
    static childContextTypes = {
        theme: React.PropTypes.object,
        theme_component_id: React.PropTypes.object
    }
    getChildContext = () => {
        return {
            theme: this.props.theme,
            theme_component_id: this.state.t
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
