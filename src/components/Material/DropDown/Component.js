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
import Paper from '../Paper';
import PopOver from '../PopOver';
import Menu from '../Menu';
import Button from '../Button';
import Icon from '../Icon';
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            listed_options:this.props.options,
            value:-1,
            value_label:this.props.label
        }
    }
    static propTypes = {
        options: PropTypes.array,
        value: PropTypes.number
    };
    static defaultProps = {
    };
    static contextTypes = {
        theme: PropTypes.object,
        palette: PropTypes.object,
    }
    
    componentWillReceiveProps = (newProps, nContext) => {
        this.setState({listed_options:newProps.options})
    }
    componentWillMount = () => {
    }
    componentReceiveProps = (nProps, nContext) => {
    }
    componentDidMount = () => {
    }
    componentWillUnmount = () => {
    }
    handleChange = (e, v) => {
        console.log(v)
        this.setState({...this.state, value:v, value_label:this.state.listed_options[Number(v)]})
    }
    render() {
        return (
            <Button rightIcon={<Icon component={"arrow_drop_down"}/>} label={this.state.value_label} raised={this.props.raised} popover={
                <PopOver role="popover" {...this.props}>
                    <Menu handleChange={this.handleChange}>
                        {this.state.listed_options == undefined? 
                            <Button contextName="menu" label={"Nothing Here."}/>:
                            this.state.listed_options.map((val, ind, arr) => {
                                return <Button contextName="menu" label={val}/>
                            })}
                    </Menu>
                </PopOver>}>
            </Button>
        );
    }
}


export default Component;
