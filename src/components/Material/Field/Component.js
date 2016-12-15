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
        }
    }
    static propTypes = {
        type:PropTypes.oneOf(['text', 'select', 'toggle']),
        fill:PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ]),
        value:PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number])
    };
    static defaultProps = {
    };
    static contextTypes = {
        palette: React.PropTypes.object,
        theme: React.PropTypes.object
    };
    componentDidMount = () => {
    }
    render() {

        const css = `
        `
        return (
            <div ref="cont" >
            </div>
        );
    }
}


export default Component;
