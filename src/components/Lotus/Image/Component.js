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

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    static propTypes = {
    };
    render() {
        var placeholder = (
                <svg xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height}>
                    <rect width={this.props.width} height={this.props.height} fill="black"/>
                    <rect x={5} y={5} width={this.props.width-10} height={this.props.height-10} fill="white"/>
                    <text x={this.props.width/2.0} y={this.props.height/2.0} textAnchor="middle" pointerEvents={"auto"} fontFamily={"Vedana"} fontSize={12}>
                        {this.props.width}x{this.props.height}
                    </text>
                </svg>
        );
        return(
            <div>
                {this.props.children? this.props.children:placeholder}
            </div>
        );
    }
}


export default Component;
