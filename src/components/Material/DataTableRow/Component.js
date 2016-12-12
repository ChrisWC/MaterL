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
import Choice from '../Choice';
import TextField from '../TextField';
/****************************************************************
 ****************************************************************/
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            style: {
                boxShadow:this.context.theme.shadows['3'].boxShadow
            },
            columnHeaders:this.props.columnHeaders,
            columnTypes:this.props.columnTypes,
            data:this.props.data(),
            rows:1
        }
    }
    static propTypes = {
    };
    static defaultProps = {
        graph: React.PropTypes.object, 
        data: React.PropTypes.func,
        columnTypes: React.PropTypes.array,
        columnHeaders: React.PropTypes.array
    };
    static contextTypes = {
        palette: React.PropTypes.object,
        theme: React.PropTypes.object,
        theme_component_id: PropTypes.object,
    };
    componentWillMount = () => {
        this.state.theme_id = this.context.theme_component_id.next().value
    }
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
    render() {
        var css = `.datatable-row-`+"_"+this.state.theme_id+` {`+"\n"+this.genCSS()+`}`
        return (<tr>
                <td><Choice role="check" active={false}></Choice></td>
                {this.props.row.map((data, colIndex) => {
                    if (this.state.columnTypes[colIndex] == 'textfield') {
                        return (<td><TextField incognito={true} value={data}/></td>)
                    }
                    else if (this.state.columnTypes[colIndex] == 'choice') {

                    }
                })}
                </tr>)
    }
}


export default Component;
