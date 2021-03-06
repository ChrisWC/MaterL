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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Component.css';
import classNames from 'classnames';

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
            },
        }
    }
    static propTypes = {
        resolution:PropTypes.string,
        context:PropTypes.string,
        component:PropTypes.string,
        style:PropTypes.object,
    };
    static defaultProps = {
        resolution:'24px',
        style:{
            fill:'black',
        },
        onClick:(e)=>{}
    };
    getIcon = () => {
        var icon = null;
        var css = "material-icons md-24"
        try {
            icon = (<i className={css} onClick={this.props.onClick}>{this.props.component}</i>)
        }
        catch (e) {
            console.log(e)
        }
        return icon;
    }
    componentDidMount = () => {
    }
    render() {
        return (
            <div onClick={(e)=>this.props.onClick(e)} className={this.props.className}>
                {this.getIcon()}
            </div>
        );
    }
}


export default Component;
