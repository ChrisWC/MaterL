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
    };
    static defaultProps = {
        graph: React.PropTypes.object, 
        data: React.PropTypes.array,
        columnHeaders: React.PropTypes.array
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
        const controlHeight = 8;
        const sliderHeight = 2;
        const sliderOffset = (controlHeight-sliderHeight)/2.0
        const sliderSegments = 4;
        /*var segments = []
        for (var i = 0; 0 < sliderSegments; i++) {
            segments.push((<div className={'slider-bar-segment'} ref="SliderBarLeft"/>))
        }*/

        const css = `
            @keyframes slider-drag {
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
            @keyframes slider-click {

            }
            @keyframes slider-control-hover {

            }
            .slider-bar-segment {
                border-top-width:0px;
                border-left-width:0px;
                border-right-width:0px;
                border-bottom-width:0px;
                border-style:none;
                height:`+sliderHeight+`px;
                width:50px;
                display:block;
                float:left;
                background-color:`+this.context.palette['default']['default'].backgroundColor+`;
                padding:0px;
                margin-top:`+sliderOffset +`px;
                margin-bottom:`+sliderOffset+`px;
                text-align:center;
            }
            .slider-bar-segment-cap {

            }
            .slider-control {
                border-radius:100px;
                background-color:`+this.context.palette['primary']['primary'].backgroundColor+`;
                height:`+controlHeight+`px;
                float:left;
                width:`+controlHeight+`px;
            }
        `
        return (
            <div className={this.context.theme.textfield.default} onClick={this.props.onClick}>
                <style>{css}</style>
                {
                    this.props.data.map((key, val, arr) => {
                        return (<div></div>)
                    })
                }
            </div>
        );
    }
}


export default Component;
