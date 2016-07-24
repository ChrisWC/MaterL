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
            dirty:false,
            error:false,
            value:""
        }
    }
    static propTypes = {
        error:PropTypes.bool,
        valid:PropTypes.bool,
        required:PropTypes.bool,
        inset:PropTypes.bool
    };
    static defaultProps = {
        error:false,
        valid:false,
        required:false,
        inset:false
    };
    static contextTypes = {
        palette: React.PropTypes.object,
        theme: React.PropTypes.object
    };
    handleClick = (e) => {
        this.setState({active:!this.state.active});
    }
    handleChange = (e, v) => {
        this.setState({value: e.target.value, dirty:(e.target.value == "")? false:true})
    }
    handleFocus = (e) => {
        this.setState({active:true})

        //move floating hint text to top
    }
    handleBlur = (e) => {
        this.setState({active:false})
    }
    render() {
        const css = `
            @keyframes primary-bar {
                0% {
                    background-color:`+this.context.palette['primary']['primary'].backgroundColor+`;
                    width:10%;
                    margin:0 45%;
                }
                100% {
                    background-color:`+this.context.palette['primary']['primary'].backgroundColor+`;
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
                border-top-width:0px;
                border-left-width:0px;
                border-right-width:0px;
                border-bottom-width:0px;
                height:2px;
                display:block;
                background-color:`+this.context.palette['primary']['primary'].backgroundColor+`;
                animation-name:primary-bar;
                animation-duration:1s;
                padding:0px;
                text-align:center;
            }
            .textfield-bar-clean {
                border-top-width:0px;
                border-left-width:0px;
                border-right-width:0px;
                border-bottom-width:0px;
                height:2px;
                display:block;
                background-color:`+this.context.palette['default']['default'].backgroundColor+`;
                padding:0px;
                text-align:center;
            }
            .textfield-bar-error {
                border-top-width:0px;
                border-left-width:0px;
                border-right-width:0px;
                border-bottom-width:0px;
                height:2px;
                display:block;
                background-color:`+this.context.palette['secondary']['default'].backgroundColor+`;
                padding:0px;
                text-align:center;
            }
            .textfield-bar-disabled {
                border-top-width:0px;
                border-left-width:0px;
                border-right-width:0px;
                border-bottom-width:0px;
                height:2px;
                display:block;
                background-color:`+this.context.palette['secondary']['default'].backgroundColor+`;
                padding:0px;
                text-align:center;
            }
            .floatinghint-clean {
                position:absolute;
                display:inline-block;
                bottom:0px;
                left:0px;
                right:0px;
                top:8px;
                font-size:16px;
                height:auto;
            }
            .floatinghint-dirty {
                position:absolute;
                display:inline-block;
                bottom:0px;
                left:0px;
                right:0px;
                top:0px;
                font-size:8px;
                height:auto;
                animation-name:floating-hint-animation;
                animation-duration:0.1s;
            }
            .helptext {
                font-size:8px;
            }
        `
        console.log(this.state)
        return (
            <div className={this.context.theme.textfield.default} onClick={this.props.onClick}>
                <style>{css}</style> 
                
                <div className={(this.state.active || this.state.dirty)? 'floatinghint-dirty':'floatinghint-clean'} ref="FloatingHintText">{this.state.active? this.props.floatingHintText:"HINT HINT"}</div>
                <textarea ref="textfield" rows={1}  onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    value={this.state.value}>
                </textarea> 
                <span style={{width:'100%'}}>
                    <span className={this.state.dirty? (this.state.error? 'textfield-bar-error':'textfield-bar-dirty'):(this.props.required? (this.state.error? 'textfield-bar-error':'textfield-bar-clean'):'textfield-bar-clean')}></span>
                </span>
                <div className={'helptext'}>Hint Text</div>

            </div>
        );
    }
}


export default Component;
