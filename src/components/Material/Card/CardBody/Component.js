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

import classNames from 'classnames';
const titleStyle = {
    height:'48px',
    display:'block',
    lineHeight:'48px',
    paddingLeft:'24px',
    paddingRight:'24px',
    position:'relative'
}
const bodyStyle = {
    padding:'10px',
    display:'inline-block',
    position:'relative',
}
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            style:{
                height:'50px',
                width:'100%'
            },
            theme_id:context.theme_component_id.next().value
        }
    }
    static propTypes = {
        title: PropTypes.string,
    };
    static defaultProps = {
    };
    static contextTypes = {
        theme: PropTypes.object,
        palette: PropTypes.object,
        theme_component_id: PropTypes.object
    }
    genCSS = () => {
       var css = Object.keys(this.state.style).map((val, index, arr) => {
            var name = val.replace(/([A-Z])/g, (str) => {return '-'+str.toLowerCase();})
            return ``+name+`:`+this.state.style[val]+`;`
        })
        var css_template = '';
        for (var i = 0; i < css.length; i++) {
            css_template += ("\t" + css[i] + "\n")
        }
        return css_template
    }
    componentWillReceiveProps = (nProps) => {
    }
    getCSSStyle = () => {
        return "\n"+`.card-body_`+this.state.theme_id+` {`+"\n"+this.genCSS()+`}`+"\n";
    }
    render() {
        return(
            <div>
            <style>
                {this.getCSSStyle()}
            </style>
            <div ref="cont" className={classNames({[this.context.theme.card.body.container]:true,['card-body_'+this.state.theme_id]:true})} role={'card'}>
                {this.props.children}
            </div>
            </div>
        );
    }
}


export default Component;
