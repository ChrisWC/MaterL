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
import PopOver from '../PopOver';
import Menu from '../Menu';
import classNames from 'classnames';
import Button from '../Button';
import Icon from '../Icon';
/************************
 * contains title and expansion button and minimum
 *
 * will hold multiple values, passed in as children.
 *
 * programatically center label
 ************************/
class Component extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            open:false,
            theme_id:context.theme_component_id.next().value,
            label_container_vpadding:0,
        }
    }
    static propTypes = {
        onChange: PropTypes.func
    };
    static defaultProps = {
        onChange:(e)=>{},
    };
    static contextTypes = {
        theme: PropTypes.object,
        palette: PropTypes.object,
        theme_component_id: PropTypes.object,
    }
    
    componentWillReceiveProps = (newProps, nContext) => {
    }
    componentWillMount = () => {
    }
    componentReceiveProps = (nProps, nContext) => {
    }
    updatePadding = () => {
        if (this.refs["label_container"] && this.refs["header_container"]
                && this.refs["label_container"].getBoundingClientRect
                && this.refs["header_container"].getBoundingClientRect) {
            var l = (this.refs["header_container"].getBoundingClientRect().height
                        - this.refs["label_container"].getBoundingClientRect().height)/2.0;
            return l;
            this.setState({label_container_vpadding:l})
        }
        return this.state.label_container_vpadding;
    }
    componentDidMount = () => {
        //this.setState({label_container_vpadding:this.updatePadding()})
    }
    componentWillUnmount = () => {
    }
    componentDidUpdate = () => {
        var l = this.updatePadding();
        if (l != 0) {
            console.log(l);
            //this.setState({label_container_vpadding:l})
        }
    }
    handleChange = (e, v) => {
        this.props.onChange(e, v);
    }
    render() {
        const css = `
            .label_container-`+this.state.theme_id+` {
            }
        `
        return (
            <div className={this.context.theme.expansion_panel.default}>
                <div ref="header_container" className={this.context.theme.expansion_panel.container}>
                    <style>{css}</style> 
                    <div ref="label_container" className={classNames({[this.context.theme.expansion_panel.label]:true, ['label_container-'+this.state.theme_id]:true})}>
                        {this.props.input && !this.state.open? this.props.input:<div><div ref="title" className={this.context.theme.expansion_panel.title}>
                            {this.props.title}
                        </div>
                        {this.props.subtitle? <div ref="subtitle" className={this.context.theme.expansion_panel.subtitle}>
                            {this.props.subtitle}
                        </div>:null}</div>}
                    </div>
                    {(!this.props.input || this.state.open)? <div ref="value_container" className={classNames({[this.context.theme.expansion_panel.value]:true, ['label_container-'+this.state.theme_id]:true})}>
                        {this.props.value}
                    </div>:null}
                    {this.props.children? <div ref="button" className={this.context.theme.expansion_panel.button}>
                        <Button icon={<Icon component={this.state.open? "expand_less":"expand_more"}/>}
                            onClick={(e)=>{
                                if (this.props.children) {
                                    this.setState({open:!this.state.open}) 
                                }
                            }}/>
                    </div>:null}
                </div>
                {this.state.open? <div>
                    {this.props.children}
                </div>:null}
            </div>
        );
    }
}


export default Component;
