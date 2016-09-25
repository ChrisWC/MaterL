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

const style = {
    display:'inline-block',
    position:'relative',
    width:'auto',
    padding:'0px',
    margin:'0px',
    float:'left'
}

const inner_style = {
    margin:'0px',
    display:'inline-block',
    position:'relative',
    float:'clear'
}
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
    height:'100%',
}
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            titleStyle:{
                ...context.palette.primary['500'],
            },
            style:{
                height:'auto',
                width:'100%',
                display:'inline-block'
            },
        }
    }
    static propTypes = {
        title: PropTypes.string,
        width: PropTypes.number.isRequired
    };
    static defaultProps = {
    };
    static contextTypes = {
        theme: PropTypes.object,
        palette: PropTypes.object,
        theme_component_id: PropTypes.object
    }
    componentWillReceiveProps = (nProps) => {
        /*if (this.refs['cont']) {
            var rect = this.refs['cont'].getBoundingClientRect()
            var height = rect.bottom - rect.top;
            var nheight = height
            height = parseInt(this.state.style.height, 10)
            var width = rect.right - rect.left*/
            var width = this.props.width
            if (nProps.width) {
                width = nProps.width
            }
            var theme_id = this.state.theme_id;
            if (theme_id === undefined) {
                theme_id = this.context.theme_component_id.next().value
            }
            var nheight = width*(2.0/3.0)

            //var dimChange = height == nheight
            
            var height = nheight
 
            /*if (dimChange && this.props.dimChange) {
                this.props.dimChange(nheight)
            }
            this.setState({...this.state.style, theme_id:theme_id, style:{...this.state.style, height:height+'px', width:width+'px'}})
        }*/
    }
    componentDidMount = () => {
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
    getCSSStyle = () => {
        return "\n"+`.card-media_`+this.state.theme_id+` {`+"\n"+this.genCSS()+`}`+"\n";
    }
    render() {
        return this.props.src ? (
            <div ref="cont" className={this.context.theme.card.media.container} role={'card'}>
                <style>
                    {this.getCSSStyle()}
                </style>
                <img className={'card-media_'+this.state.theme_id} src={this.props.src}/>
            </div>):null;
    }
}


export default Component;
