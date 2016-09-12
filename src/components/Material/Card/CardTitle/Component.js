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
import Paper from '../../Paper';

class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
        }
    }
    static propTypes = {
        title: PropTypes.string,
    };
    static defaultProps = {
    };
    static contextTypes = {
        theme: PropTypes.object,
        palette: PropTypes.object
    }
    render() {
        return(
            <div className={this.context.theme.card.title.container}>
                {this.props.avatar?
                    <div className={this.context.theme.card.title.avatar}>
                    <img src={this.props.avatar}/></div>:null}
                <div> 
                <div className={this.context.theme.card.title.primary}>
                    {this.props.title}
                </div>
                {this.props.subtitle? 
                    <div className={this.context.theme.card.title.secondary}>
                        {this.props.subtitle}
                    </div>:null}
                </div>
            </div>
        );
    }
}


export default Component;
