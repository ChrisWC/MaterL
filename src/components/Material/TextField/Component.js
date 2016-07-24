import React, { PropTypes } from 'react';

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
            active:!this.props.active,
            dirty:false,
            error:true,
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
    render() {
        const css = `
            @keyframes primary-bar {
                0% {
                    background-color:`+this.context.palette['primary']['primary'].backgroundColor+`;
                    width:10%;
                    margin:0 45%;
                }
                25% {
                    background-color:`+this.context.palette['primary']['primary'].backgroundColor+`;
                    width:25%;
                    margin:0 37.5%;
                }
                50% {
                    background-color:`+this.context.palette['primary']['primary'].backgroundColor+`;
                    width:60%;
                    margin:0 20%;
                }
                100% {
                    background-color:`+this.context.palette['primary']['primary'].backgroundColor+`;
                    width:100%;
                    margin:0 0;
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
                animation-duration:2s;
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
                background-color:`+this.context.palette['default']['secondary'].backgroundColor+`;
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
        `
        console.log(this.state)
        return (
            <div className={this.context.theme.textfield.default} onClick={this.props.onClick}>
                <style>{css}</style>
                <div className={this.context.theme.textfield.floatinghint} ref="FloatingHintText">{this.state.active? this.props.floatingHintText:null}</div>
                <textarea ref="textfield" rows={1}  onChange={this.handleChange}
                    value={this.state.value}>
                </textarea>
                <span style={{width:'180px'}}>
                    <span className={this.state.dirty? (this.state.error? 'textfield-bar-error':'textfield-bar-dirty'):(this.props.required? (this.state.error? 'textfield-bar-error':'textfield-bar-clean'):'textfield-bar-clean')}></span>
                </span>
            </div>
        );
    }
}


export default Component;
