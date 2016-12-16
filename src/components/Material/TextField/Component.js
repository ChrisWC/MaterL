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
import BarDecor from '../BarDecor';
import PopOver from '../PopOver';
import Layer from '../Layer';
import Menu from '../Menu';
import Button from '../Button';
import Icon from '../Icon';
/****************************************************************
 * Variant Options:
 *      dropdown -- display a popover with additional information,
 *          and suggested completions.
 *      filefield -- prompt user with the file browser and accept 
 *          the uer selection.
 * Options:
 *      discreet -- show textfield only when active, i.e. when button is pressed
 *      dense -- show floating hint text to the left it 
 *               not dense, or over if it is. But, keep the hint text above.
 ****************************************************************/
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            active:false,
            dirty:(this.props.value.length > 0)? true:false,
            error:this.props.error,
            value:this.props.value,
            disabled:this.props.disabled,
            incognito:this.props.incognito,
            visible:this.props.discreet? false:true,
            theme_id:context.theme_component_id.next().value,
            width:this.props.width,
            scrollHeight:16,
            scale_width:true
        }
    }
    static propTypes = {
        error:PropTypes.bool,
        valid:PropTypes.bool,
        required:PropTypes.bool,
        inset:PropTypes.bool,
        hintText:PropTypes.string,
        value:PropTypes.string.isRequired,
        dropdown:PropTypes.bool,
        filefield:PropTypes.bool,
        getOptions:PropTypes.func,
        discreet:PropTypes.bool,
        dense:PropTypes.bool,
        width:PropTypes.number,
        incognito:PropTypes.bool,
        multiline:PropTypes.bool,
    };
    static defaultProps = {
        error:false,
        valid:false,
        required:false,
        inset:false,
        value:"",
        filefield:false,
        dropdwon:false,
        discreet:false,
        dense:false,
        short:true,
        width:100,
        incognito:false,
        multiline:false,
        inline:false,
        getOptions:(val) => {
            //should generate a filtered list using val
            //ideally an id associated with the value, if valid, will
            //be stored outside of this function (e.g. redux)
            return []
        }
    };
    static contextTypes = {
        sheets: React.PropTypes.arrayOf(React.PropTypes.object),
        palette: React.PropTypes.object,
        theme: React.PropTypes.object,
        theme_component_id: PropTypes.object,
    };
    getPopoverAsOverlay = () => {
        var rect = this.refs['cont'].getBoundingClientRect();
        var minWidth = rect.right - rect.left;
        var left = rect.left;
        var top = rect.bottom;
        var popover = this.getPopOver();
        return <Layer role={'layer'} foreground={[React.cloneElement(popover, 
                    {open:false, handleClose:() =>{
                            this.setState({active:false})
                            this.context.sheets[this.context.sheets.length - 1].handleForegroundRequest(this.getPopoverAsOverlay, false)
                        }, 
                        minWidth:minWidth, width:'auto', left:left, 
                        top:top, summoningComponent:rect, 
                        ...popover.props})]}/>
    }
    componentDidMount = () => {
        if (this.refs['cont'] && this.refs['innerleft']) {
        var r = this.refs['cont'].getBoundingClientRect();
        var r1 = this.refs['innerleft'].getBoundingClientRect();
        this.setState({...this.state, style:{height:r.height}, innerleft:r1.height})
        }
    }
    handleClick = (e) => {
        if (!this.props.dropdown) {
            this.setState({active:!this.state.active});
        }
        if (this.props.dropdown && !this.state.active) {
            //this.setState({inner_style:{...this.state.inner_style, backgroundColor:colors.blue900,}})
            this.context.sheets[this.context.sheets.length - 1].handleForegroundRequest(this.getPopoverAsOverlay, true)
            this.setState({active:true})
        }
        else if (this.props.dropdown && this.state.active) {
            //this.setState({inner_style:{...this.state.inner_style, backgroundColor:colors.blue700,}})
            this.context.sheets[this.context.sheets.length - 1].handleForegroundRequest(this.getPopoverAsOverlay, false)
            //this.context.sheets[this.context.sheets.length - 1].handleForegroundRequest(React.cloneElement(this.props.popover, {open:false, handleClose:this.handleClick, minWidth:minWidth, width:'auto', left:left, top:top , summoningComponent:rect, ...this.props.popover.props}))
            this.setState({active:false})
        }
    }
    handleChange = (e, v) => {
        if (this.state.disabled) {
            return
        }
        var ta = this.refs["textarea"]
        var scrollHeight = this.state.scrollHeight;
        if (e.target.value.length < this.state.value.length && this.props.multiline) {
            scrollHeight = 16;//ta.scrollHeight;
            
            //console.log({...e.target})
            //console.log(e.target.scrollTop)
            //console.log(e.target.clientHeight)
            //console.log(e.target.offsetHeight)
            //e.target.clientHeight = e.target.scrollHeight;
            //this.refs["textarea"].clientHeight = scrollHeight;
        }
        this.setState({value: e.target.value, dirty:(e.target.value == "")? false:true, scrollHeight:scrollHeight})

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }
    handleResize = (e, v) => {

    }
    componentDidUpdate = (pState, pProps) => {
       if (this.refs["textarea"] && this.refs["textarea"].scrollHeight != this.refs["textarea"].clientHeight && this.props.multiline) {
            //console.log(this.refs["textarea"])
            this.setState({scrollHeight:this.refs["textarea"].scrollHeight})
            //this.refs["textarea"].clientHeight = this.refs["textarea"].scrollHeight;

       }
    }
    handleFocus = (e) => {
        if (this.props.dropdown && !this.state.disabled) {
            //this.setState({inner_style:{...this.state.inner_style, backgroundColor:colors.blue900,}})
            this.context.sheets[this.context.sheets.length - 1].handleForegroundRequest(this.getPopoverAsOverlay, true)
        }
        if (!this.state.disabled) {
            this.setState({active:true})
        }
        //move floating hint text to top
    }
    handleBlur = (e) => {
        /*if (this.props.dropdown && !this.state.disabled) {
            //this.setState({inner_style:{...this.state.inner_style, backgroundColor:colors.blue700,}})
            this.context.sheets[this.context.sheets.length - 1].handleForegroundRequest(this.getPopoverAsOverlay, false)
            //this.context.sheets[this.context.sheets.length - 1].handleForegroundRequest(React.cloneElement(this.props.popover, {open:false, handleClose:this.handleClick, minWidth:minWidth, width:'auto', left:left, top:top , summoningComponent:rect, ...this.props.popover.props}))
        }*/
        this.setState({active:false})
    }
    getPopOver = () => {
        var options = this.props.getOptions(this.state.value)
        return (
            <PopOver role="popover" {...this.props}>
                <Menu handleChange={(e, v) => {
                        e.target.value = options[v]
                        e.target.options = options
                        e.target.index = v
                        this.context.sheets[this.context.sheets.length - 1].handleForegroundRequest(this.getPopoverAsOverlay, false)
                        this.setState({...this.state, value:options[v], dirty:true, active:false})
                        this.handleChange(e, v)
                    }}>
                    {options.length == 0? 
                        <Button contextName="menu" label={"Nothing Here."}/>:
                            options.map((val, ind, arr) => {
                                return <Button contextName="menu" label={val}/>
                            })}
                </Menu>
            </PopOver>
        )
    }
    render() {
        //var lh = (parseFloat(this.state.style.height) - parseFloat(this.state.innerleft))/2.0;
        //var ih = lh+36;
        const css = `
            @keyframes primary-bar {
                0% {
                    border-top-width:2px;
                    border-color:`+this.context.palette['primary']['primary'].backgroundColor+`;
                    width:10%;
                    margin:0 45%;
                }
                30% {
                    border-top-width:2px;
                    border-color:`+this.context.palette['primary']['primary'].backgroundColor+`;
                    width:50%;
                    margin:0 25%;
                }
                100% {
                    border-top-width:2px;
                    border-color:`+this.context.palette['primary']['primary'].backgroundColor+`;
                    width:100%;
                    margin:0 0;
                }
            }
            @keyframes error-bar {
                0% {
                    border-top-width:2px;
                    border-color:`+this.context.palette['secondary']['primary'].backgroundColor+`;
                    width:10%;
                    margin:0 45%;
                }
                30% {
                    border-top-width:2px;
                    border-color:`+this.context.palette['secondary']['primary'].backgroundColor+`;
                    width:50%;
                    margin:0 25%;
                }
                100% {
                    border-top-width:2px;
                    border-color:`+this.context.palette['secondary']['primary'].backgroundColor+`;
                    width:100%;
                    margin:0 0;
                }
            }
            @keyframes floating-hint-animation {
                0% {
                    font-size:12px;
                    top:8px;
                }
                100% {
                    font-size:12px;
                    top:0px;
                }
            }
            .textfield-bar-dirty-`+this.state.theme_id+` {
                border-top-width:2px;
                border-left-width:0px;
                border-right-width:0px;
                border-bottom-width:0px;
                border-style:solid;
                height:0px;
                display:block;
                border-color:`+this.context.palette['primary']['primary'].backgroundColor+`;
                animation-name:primary-bar;
                animation-duration:2s;
                padding:0px;
                padding-bottom:0px;
                text-align:center;
            }
            .textfield-bar-clean-`+this.state.theme_id+` {
                border-top-width:1px;
                border-left-width:0px;
                border-right-width:0px;
                border-bottom-width:0px;
                border-style:solid;
                height:0px;
                display:block;
                border-color:`+this.context.palette['default']['default'].backgroundColor+`;
                padding:0px;
                padding-top:4px;
                padding-bottom:0px;
                position:relative;
                text-align:center;
            }
            .textfield-bar-error-`+this.state.theme_id+` {
                border-top-width:2px;
                border-left-width:0px;
                border-right-width:0px;
                border-bottom-width:0px;
                border-style:solid;
                height:0px;
                display:block;
                border-color:`+this.context.palette['secondary']['primary'].backgroundColor+`;
                animation-name:error-bar;
                animation-duration:2s;
                padding:0px;
                padding-bottom:0px;
                text-align:center;
            }
            .textfield-bar-disabled-`+this.state.theme_id+` {
                border-top-width:1px;
                border-left-width:0px;
                border-right-width:0px;
                border-bottom-width:0px;
                border-style:dashed;
                height:2px;
                display:block;
                border-color:`+this.context.palette['default']['default'].backgroundColor+`;
                padding:0px;
                padding-bottom:0px;
                text-align:center;
            }
            .floatinghint-clean-`+this.state.theme_id+` {
                position:absolute;
                display:inline-block;
                left:0px;
                right:0px;
                top:16px;
                color:`+this.context.palette['default']['default'].color+`;
                opacity:0.38;
                padding-top:`+0+`px;
                padding-bottom:4px;
                line-height:16px;
                font-size:16px;
                height:auto;
                overflow:hidden;
            }
            .floatinghint-dirty-`+this.state.theme_id+` {
                overflow:hidden;
                position:absolute;
                display:inline-block;
                bottom:0px;
                left:0px;
                right:0px;
                top:0px;
                color:`+(this.state.error? this.context.palette['secondary']['primary'].backgroundColor:this.context.palette['primary']['primary'].color)+`;
                opacity:0.38;
                padding-top:`+0+`px;
                padding-bottom:4px;
                top:0px;
                font-size:12px;
                line-height:12px;
                height:auto;
                animation-name:floating-hint-animation;
                animation-duration:0.1s;
            }
            .helptext-`+this.state.theme_id+` {
                font-size:10px;
                line-height:14px;
                position:realative;
                height:auto;
                color:`+this.context.palette['default']['default'].color+`;
                opacity:0.54;
            }
            .textfield-discreet-hidden-`+this.state.theme_id+` {
                position:relative;
                padding-top:`+0+`px;
                float:left;
                width:0px;
                overflow:hidden;
            }
            .textfield-discreet-active-`+this.state.theme_id+` {
                position:relative;
                padding-top:`+(0)+`px;
                padding-bottom:4px;
                overflow:auto;
                width:100%;
                float:left;
            }
            .textfield-icon-`+this.state.theme_id+` {
                float:left;
                position:absolute;
                text-anchor:middle;
                top:0px;
                right:-8px;
                overflow:hidden;
            }
            .textfield-dense {
                padding-top:16px;
            }
            .textfield-default {
                padding-top:12px;
            }
            .textfield-`+this.state.theme_id+` {
                position:relative;
                bottom:0px;
            }
            .textfield-`+this.state.theme_id+` textarea {
                overflow:hidden;
                height:`+this.state.scrollHeight+`px;
                color:`+(this.state.disabled? this.context.palette['default']['default'].color:this.context.palette['default']['default'].color)+`;
                opacity:`+(this.state.disabled? 0.54:0.87)+`;
            }
            .textfield-`+this.state.theme_id+` input {
                overflow:hidden;
                opacity:0.87;
            }
        `
        return (
            <div ref={'cont'} className={classNames({[this.props.inline? this.context.theme.textfield.inline:this.context.theme.textfield.default]:true})} onClick={this.props.onClick}>
                <style>{css}</style> 
                <div ref={"innerleft"} className={classNames({
                        [(this.props.discreet && !this.state.visible)? ('textfield-discreet-hidden-'+this.state.theme_id):('textfield-discreet-active-'+this.state.theme_id)]:true,
                        ['textfield-'+this.state.theme_id]:true,
                        [this.context.theme.line.short]:this.props.short && (!this.props.discreet || (this.props.discreet && this.state.visible)),
                        [this.context.theme.line.body]:!this.props.short && (!this.props.discreet || (this.props.discreet && this.state.visible)),
                        'textfield-dense':this.props.dense,
                        'textfield-default':!this.props.dense
                    })}>
                <div className={(this.state.active || this.state.dirty)? 'floatinghint-dirty-'+this.state.theme_id:'floatinghint-clean-'+this.state.theme_id} ref="FloatingHintText">
                    {(this.state.active && !this.state.disabled)? this.props.floatingHintText:this.props.hintText}</div>
                {this.props.password? <input type="password" 
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onResize={()=>{}}
                    value={this.state.value}
                    />:<textarea ref="textarea" onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        value={this.state.value}>
                </textarea>} 
                <div style={{width:'100%',paddingBottom:'0px',paddingTop:'6px'}}>
                    {this.state.incognito? null:<span className={
                        this.state.disabled? 
                            'textfield-bar-disabled-'+this.state.theme_id:(
                            this.state.dirty? (
                                this.state.error? 
                                    'textfield-bar-error-'+this.state.theme_id:
                                    'textfield-bar-dirty-'+this.state.theme_id):(
                                this.props.required? (
                                    this.state.error? 
                                        'textfield-bar-error-'+this.state.theme_id:
                                        'textfield-bar-clean-'+this.state.theme_id):
                                    'textfield-bar-clean-'+this.state.theme_id))}>
                    </span>}
                </div>
                <div className={'helptext-'+this.state.theme_id}>{this.props.helpText}</div>
                </div>
                <div className={'textfield-icon-'+this.state.theme_id}>
                {this.props.icon? <Button icon={this.props.icon} onClick={(e)=>{
                    if (this.props.discreet) {
                        this.setState({visible:!this.state.visible})
                    }
                }}/>:null}
                {this.props.dropdown && !this.props.icon ? <Button icon={<Icon component={"arrow_drop_down"}/>}/>:null}
                </div>
            </div>
        );
    }
}


export default Component;
