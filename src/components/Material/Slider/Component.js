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
            incognito:false,
            left:0
        }
    }
    static propTypes = {
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
    componentDidMount = () => {
        this.state.left_start = this.refs['cont'].getBoundingClientRect().left;
        console.log({...this.state})
    }
    onMouseDown = (e, v) => {
        var s = this.refs['cont'].getBoundingClientRect().left;
        var d = e.pageX - s;
        this.setState({...this.state, dragging:true, left:d, start:s, end:(this.refs['cont'].getBoundingClientRect().right-s)})
        e.stopPropagation()
    }
    onMouseUp = (e, v) => {
        this.setState({dragging:false})
        e.stopPropagation()
    }
    onMouseMove = (e, v) => {
        //update position
        if (this.state.dragging) {
            //console.log("Move")
            var d = e.pageX-this.state.start//this.refs['SliderControl'].getBoundingClientRect().left;
            if (d >= 0 && d <= this.state.end) {
                this.setState({left:d})
            }
            //console.log(d)
            e.stopPropagation()
        }
    }
    render() {
        const controlHeight = 8;
        const sliderHeight = 2;
        const sliderOffset = (controlHeight-sliderHeight)/2.0
        const sliderSegments = 20;
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
                border-radius:0px;
                width:10px;
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
                width:`+controlHeight+`px;
                position:relative;
                left:`+this.state.left+"px"+`;
            }
        `
        return (
            <div ref="cont" className={this.context.theme.textfield.default} onClick={this.props.onClick} onMouseMove={this.onMouseMove} onMouseLeave={this.onMouseUp} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
                <style>{css}</style> 
                {[...Array(sliderSegments)].map((x, i, arr) => {
                    return <div key={i} className={'slider-bar-segment'} onMouseDown={this.onMouseDown}/>
                })}
                <div className={'slider-control'} ref="SliderControl" onDragStart={(e,v) => {
                        //this.setState({left_start:e.clientX, diff:0})
                        //console.log("START")
                    }}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    />
            </div>
        );
    }
}


export default Component;
