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
            nodes:this.unpackNodes(this.props.nodes)
        }
    }
    static propTypes = {
        nodes: React.PropTypes.array,
        y:React.PropTypes.number
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
    componentDidMount = () => {
        var e = this.updateTree([...this.state.nodes])
        this.setState({...this.state, ...e})
    }
    unpackNodes = (nodes) => {
        var packed = [].concat(nodes)
        var _nodes = []

        while (packed.length > 0) {
            console.log("T")
            if (packed[0] && packed[0].children && packed[0].children.length > 0) {
                packed = packed.concat(packed[0].children)
            }
            if (packed[0]) {
                if (!packed[0].x) {
                    packed[0].x = 25
                }
                if (!packed[0].y) {
                    packed[0].y = 0
                }
                _nodes.push(packed[0])
            }
            packed.splice(0,1)
        }
        return _nodes
    
    }
    updateTreeNode = (node, edges) => {
        edges = []
        var l_cly = 0;
        var l_clx = 0
        for (var j = 0; node.children && j < node.children.length; j++) {
            var l = node.children[j].p
            var enm = 'edge_'+node.value+'-'+node.children[j].value
            if (node.children[j].value > node.value) {
                node.children[j].x = node.x + l*3.141
                node.children[j].y += l_cly
                node.children[j].x -= (node.children[j].y - node.y)*0.62
            }
            edges.push({id:enm, from:{x:node.x, y:node.y}, to:{x:node.children[j].x, y:node.children[j].y}})
            l_cly += l*1.81
        }

        return {edges:edges}
    }
    updateTree = (nodes) => {
        //generate edges
        //update positioning of root elements node and text
        var edges = []
        if (!this.state.edges) {
            var cr = this.refs['container'].getBoundingClientRect()
            var lx = 0;
            for (var i = 0; nodes && i < nodes.length; i++) {
                var nm = 'node_'+i
                var n = this.refs[nm]
                var rect = this.refs[nm].getBoundingClientRect()
                var top = rect.top - cr.top
                var bottom = rect.bottom - cr.top
                var cy = top + (rect.height/2.0)
                var cx = rect.left + (rect.width/2.0)
                lx += cx
                nodes[i].y = cy
                nodes[i].x = lx
                nodes[i].p = rect.width/2.0
                lx += (rect.width/2.0)*2
            }
            for (var i = 0; nodes && i < nodes.length; i++) {
                console.log(nodes[i])
                edges = edges.concat(this.updateTreeNode(nodes[i]).edges)
                /*for (var j = 0; nodes[i].children && j < nodes[i].children.length; j++) {
                    var nm = 'edge_'+nodes[i].value+'-'+nodes[i].children[j].value
                    edges.push({id:nm, from:{x:nodes[i].x, y:nodes[i].y}, to:{x:nodes[i].children[j].x, y:nodes[i].children[j].y}})
                }*/
            }
        }

        return {edges:edges, nodes:this.state.nodes}
    }
    render() {
        //var nodes = this.unpackNodes(this.props.nodes)
        const css = `
        `
        return (
            <g ref='container'>
                {this.state.edges? this.state.edges.map((val, key, arr) => {
                    return (<g>
                    <line x1={val.from.x} x2={val.to.x} y1={val.from.y} y2={val.to.y} style={{strokeWidth:'2', stroke:'black'}}/>
                    </g>)
                }):null}
                {this.state.nodes? this.state.nodes.map((val, key, arr) => {
                    var x = 50*key
                    if (val) {
                        return (<g>
                            <circle ref={"node_"+key} cx={val.x} cy={val.y} r={25} style={{fill:'cyan', position:'absolute'}}/>
                            <text ref={"text_"+key} textAnchor="middle" x={val.x} y={val.y} style={{textAnchor:"middle", alignmentBaseline:'central', color:'black', fontSize:35, fontFamily:"Verdana"}}>{val.name}</text>
                        </g>)
                    }
                }):null}
            </g>
        );
    }
}


export default Component;
