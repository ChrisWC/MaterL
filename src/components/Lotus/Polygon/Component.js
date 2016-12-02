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
        vertices:React.PropTypes.number,
        radius:React.PropTypes.number,
        cx:React.PropTypes.number,
        cy:React.PropTypes.number,
        sx:React.PropTypes.number,
        sy:React.PropTypes.number
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
    getVertices = () => {
        var arcDeg = 0;
        var arcLen = 360.0/this.props.vertices;
        var points = [];
        for (var i = 0; i < this.props.vertices; i++) {
            //calculate point
            var p = [0, 0]
            points.push(p[0])
            points.push(p[1])
            arcDeg += arcLen;
        }
        return [0, 0];
    }
    render() {
        const css = ``
        
        return (
            <g>
                <polygon points={this.getVertices().join(',')} style={this.props.style}/>
            </g>
        );
    }
}


export default Component;
