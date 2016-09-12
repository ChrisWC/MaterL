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

import classNames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Component.css';
import BarDecor from '../BarDecor';
/****************************************************************
 ****************************************************************/
class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
            },
            active:false,
            dirty:(this.props.value.length > 0)? true:false,
            error:false,
            value:this.props.value,
            disabled:this.props.disabled,
            incognito:false
        }
    }
    static propTypes = {
        error:PropTypes.bool,
        valid:PropTypes.bool,
        required:PropTypes.bool,
        inset:PropTypes.bool,
        hintText:PropTypes.string,
        value:PropTypes.string.isRequired,
    };
    static defaultProps = {
        error:false,
        valid:false,
        required:false,
        inset:false,
        value:""
    };
    static contextTypes = {
        palette: React.PropTypes.object,
        theme: React.PropTypes.object
    };
    handleClick = (e) => {
        this.setState({active:!this.state.active});
    }
    handleChange = (e, v) => {
        if (this.state.disabled) {
            return
        }
        this.setState({value: e.target.value, dirty:(e.target.value == "")? false:true})

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }
    handleFocus = (e) => {
        if (!this.state.disabled) {
            this.setState({active:true})
        }

        //move floating hint text to top
    }
    handleBlur = (e) => {
        this.setState({active:false})
    }
    render() {
        const css = `
            @keyframes primary-bar {
                0% {
                    border-color:`+this.context.palette['primary']['primary'].backgroundColor+`;
                    width:10%;
                    margin:0 45%;
                }
                100% {
                    border-color:`+this.context.palette['primary']['primary'].backgroundColor+`;
                    width:100%;
                    margin:0 0;
                }
            }
            @keyframes floating-hint-animation {
                0% {
                    font-size:16px;
                    top:8px;
                }
                100% {
                    font-size:8px;
                    top:0px;
                }
            }
            .textfield-bar-dirty {
                border-top-width:1px;
                border-left-width:0px;
                border-right-width:0px;
                border-bottom-width:0px;
                border-style:solid;
                height:3px;
                display:block;
                border-color:`+this.context.palette['primary']['primary'].backgroundColor+`;
                animation-name:primary-bar;
                animation-duration:1s;
                padding:0px;
                padding-bottom:2px;
                text-align:center;
            }
            .textfield-bar-clean {
                border-top-width:1px;
                border-left-width:0px;
                border-right-width:0px;
                border-bottom-width:0px;
                border-style:solid;
                height:3px;
                display:block;
                border-color:`+this.context.palette['default']['default'].backgroundColor+`;
                padding:0px;
                padding-bottom:2px;
                text-align:center;
            }
            .textfield-bar-error {
                border-top-width:1px;
                border-left-width:0px;
                border-right-width:0px;
                border-bottom-width:0px;
                border-style:solid;
                height:3px;
                display:block;
                border-color:`+this.context.palette['secondary']['default'].backgroundColor+`;
                padding:0px;
                padding-bottom:2px;
                text-align:center;
            }
            .textfield-bar-disabled {
                border-top-width:1px;
                border-left-width:0px;
                border-right-width:0px;
                border-bottom-width:0px;
                border-style:dashed;
                height:3px;
                display:block;
                border-color:`+this.context.palette['default']['default'].backgroundColor+`;
                padding:0px;
                text-align:center;
            }
            .floatinghint-clean {
                position:absolute;
                display:inline-block;
                bottom:0px;
                left:0px;
                right:0px;
                top:36px;
                font-size:16px;
                height:auto;
            }
            .floatinghint-dirty {
                position:absolute;
                display:inline-block;
                bottom:0px;
                left:0px;
                right:0px;
                padding-top:16px;
                padding-bottom:8px;
                top:0px;
                font-size:12px;
                height:auto;
                animation-name:floating-hint-animation;
                animation-duration:0.1s;
            }
            .helptext {
                font-size:8px;
            }
        `
        return (
            <div className={this.context.theme.textfield.default} onClick={this.props.onClick}>
                <style>{css}</style> 
                <div style={{float:"left"}}>
                <div className={(this.state.active || this.state.dirty)? 'floatinghint-dirty':'floatinghint-clean'} ref="FloatingHintText">
                    {(this.state.active && !this.state.disabled)? this.props.floatingHintText:this.props.hintText}</div>
                {this.props.password? <input type="password" 
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    value={this.state.value}
                    />:<textarea rows={1}  onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        value={this.state.value}>
                </textarea>} 
                <span style={{width:'100%',paddingBottom:'8px'}}>
                    {this.state.incognito? null:<span className={this.state.disabled? 'textfield-bar-disabled':(this.state.dirty? (this.state.error? 'textfield-bar-error':'textfield-bar-dirty'):(this.props.required? (this.state.error? 'textfield-bar-error':'textfield-bar-clean'):'textfield-bar-clean'))}></span>}
                </span>
                <div className={'helptext'}>{this.props.helpText}</div>
                </div>
                <div style={{float:"left"}}>
                    {this.props.icon? this.props.icon:null}
                </div>
            </div>
        );
    }
}


export default Component;
