/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

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
