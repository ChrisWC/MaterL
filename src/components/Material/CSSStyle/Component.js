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
import Button from '../Button';
import Icon from '../Icon';
/************************
 * contains title and expansion button and minimum
 *
 * will hold multiple values, passed in as children.
 ************************/
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open:false
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
    }
    
    componentWillReceiveProps = (newProps, nContext) => {
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
        this.props.onChange(e, v);
    }
    render() {
        return (
            <div ref="container">
                <style>
                    {this.props.style}
                </style>
                {this.props.children}
            </div>
        );
    }
}


export default Component;
