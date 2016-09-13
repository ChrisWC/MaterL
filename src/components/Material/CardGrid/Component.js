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
            incognito:false
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
    render() {
        //get container size
        return (
            <div>
                {React.Children.map(this.props.children, (val, ind, arr) => {
                    return val;
                })
            </div>
        );
    }
}


export default Component;
