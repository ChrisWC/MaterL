
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
/**
 * Layout Engine to reduce empty spaces, and allow for Material-like structures
 */

import React, { PropTypes } from 'react';
import Cell from './Cell';
import CellList from './CellList';
import classNames from 'classnames';
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        var cells = new CellList({order:this.props.sort}, React.Children.map(this.props.children, (val, ind, props) => {
            return new Cell({id:ind, x:0, y:0})
        }))
        
        var ec =new Cell( {
            width:props.width? props.width:-1,
            height:props.height? props.height:-1,
            x:0,
            y:0
        })
        
        this.state = {
            columnCount:this.props.numOfCols,
            columnSize:200,
            gutterSize:8,
            h:ec.specs.height < 0? 0:ec.specs.height,
            w:ec.specs.width < 0? 0:ec.specs.width,
            heights:[
            ],
            emptyCells:new CellList({order:this.props.sort}, [ec]),
            cells:cells,
            style:{
                width:props.width? props.width+'px':'100%',
                height:props.height? props.height+'px':'auto',
                boxSizing:'border-box',
                position:'relative'
            },
            emptyID:this.getEmptyID(),
            theme_id:context.theme_component_id.next().value
        }
        this.state.emptyCells.elements = cells.cells
    }
    static propTypes = {
        title: PropTypes.string,
        responsive: PropTypes.bool,
        numOfCols: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
        wrap: PropTypes.bool,
        remderEmptyCells: PropTypes.bool
    };
    static defaultProps = {
        responsive: false,
        numOfCols:2,
        wrap:false,
        renderEmptyCells:false
    };
    static contextTypes = {
        theme: PropTypes.object,
        palette: PropTypes.object,
        device: React.PropTypes.object,
        theme_component_id: PropTypes.object,
        updateDOM: PropTypes.func,
    }
    static childContextTypes = {
        updateDOM: React.PropTypes.func,
    }
    getChildContext = () => {
        return {
            updateDOM:() => {
            }
        }
    }
    componentWillMount = () => {
    }
    componentDidMount = () => {
        var n = this.updateDOM(this.state, this.props)
        this.setState({emptyCells:n.emptyCells, h:n.h, w:n.w})
    }
    componentWillReceiveProps = (nProps) => {
    }
    componentDidUpdate = (nProps, nState) => {
        /*var ec = {
            width:nProps.width? nProps.width:-1,
            height:nProps.height? nProps.height:-1,
            x:0,
            y:0
        }
        var nstate = {...nState, emptyCells:[ec]}

        var n = this.updateDOM(nstate, nProps)
        var changed = false
        if (n.elements && this.state.elements && n.elements.length == this.state.elements.length) {
            for (var i in n.elements.length) {
                if (n.elements[i].x != this.state.elements[i].x || n.elements[i].y != this.state.elements[i].y || 
                    n.elements[i].width != this.state.elements[i].width || n.elements[i].height != this.state.elements[i].height) {
                    changed = true
                }
            }
        } else if (n.elements && this.state.elements && n.elements.length != this.state.elements.length){
            changed = true
        }
        if (changed) {
            this.setState({emptyCells:n.emptyCells, cells:n.elements, h:n.h, w:n.w})
        }*/
        /*this.state.emptyCells = n.emptyCells
        this.state.cells = n.elements
        this.state.h = n.h
        this.state.w = n.w*/
        //this.setState({emptyCells:n.emptyCells, cells:n.elements, h:n.h, w:n.w})
    }
    cellFitsElement = (C, E) => {
        return (C.width >= E.width || E.width_info.scale) && (C.height >= E.height || E.height_info.scale)
    }
    getEmptyID = function*() {
        var id = 0;
        while (true) {
            yield id;
            id++;
        }
    }
    cellContainsCell = (A, B) => {
        //A Contains B
        var a = new Cell(A)
        var b = new Cell(B)
        return a.contains(b)
    }
    cellsIntersect = (A, B) => {
        var a = new Cell(A)
        var b = new Cell(B)
        return a.intersects(b)
    }
    elementInfo = (e, cell, C) => {
        var rect = null;
        if (C.getBoundingClientRect) {
            rect = C.getBoundingClientRect()
        }
        else if (e.getBoundingClientRect) {
            rect = e.getBoundingClientRect()
        }
        var width_info = {
            scale:false,
        }
        var height_info = {
            scale:false,
        }
        var width = 0
        var height = 0
        if (C && C.getBoundingClientRect) {
            width_info.scale = C.props.style.width.endsWith('%')
            height_info.scale = C.props.style.height.endsWith('%')
            width = parseFloat(C.props.style.width)
            height = parseFloat(C.props.style.height)
        }
        var ret = {x:(C && C.props.style.left)? C.props.style.left:cell.x, y:(C && C.props.style.top)? C.props.style.top:cell.y, 
                width:rect? rect.width:width, width_info:width_info, height:rect? rect.height:height, height_info:height_info}
        
        if (C && C.props.name) {
            ret['name'] = C.props.name
        }
        if (C && C.props.id) {
            ret['id'] = C.props.id
        }
        if (C && C.props.over) {
            ret['over'] = C.props.over
        }
        if (C && C.props.under) {
            ret['under'] = C.props.under
        }
        return ret
    }
    updateDOM = (nState, nProps) => {
        var r = this.refs['container'].getBoundingClientRect()
        var nstate = nState
        var emptyCells = nstate.emptyCells
        if (!nProps.children) {
            return {emptyCells:new CellList({order:this.props.sort}, []), h:nstate.h, w:nstate.w}
        }
        var children = nProps.children
        if (nProps.children && !Array.isArray(nProps.children)) {
            children = [nProps.children]
        }

        var c_i = 0;
        var blanks = new CellList({order:this.props.sort}, [])
        
        var cells = emptyCells.elements
        emptyCells.elements = []
        var l = emptyCells
        while (c_i < children.length) {
            var inf = this.elementInfo(this.refs[c_i], cells[c_i].specs, children[c_i])
            if (inf) {
                var ec = blanks.cells.length > 0? blanks:l
                var ae = ec.addElement(new Cell(inf))
                if (!ae) {
                    if (this.props.height == -1 && this.props.width == -1) {
                        var b = {y:0, x:nstate.w, width:this.refs[c_i].getBoundingClientRect().width, height:(nstate.h+this.refs[c_i].getBoundingClientRect().height)}
                        blanks.cells.push(b)
                        var b = {y:nstate.h, x:0, width:(nstate.w + this.refs[c_i].getBoundingClientRect().width), height:this.refs[c_i].getBoundingClientRect().height}
                        blanks.cells.push(b)
                        ec = blanks.cells.length > 0? blanks:l
                        nstate.w = b.x + b.width
                        nstate.h = b.y + b.height
                    }
                    else if (this.props.height == -1) {
                        var b = {y:nstate.h, x:0, width:this.props.width, height:this.refs[c_i].getBoundingClientRect().height}
                        blanks.cells.push(b)
                        ec = blanks.cells.length > 0? blanks:l
                        nstate.h = b.y + b.height
                    }
                    else if (this.props.width == -1) {
                        var b = {y:0, x:nstate.w, width:this.refs[c_i].getBoundingClientRect().width, height:this.props.height}
                        blanks.cells.push(b)
                        ec = blanks.cells.length > 0? blanks:l
                        nstate.w = b.x + b.width
                    }
                    ae = ec.addElement(new Cell(inf))
                }
                blanks = ec
            }
            c_i++;

        }
        return {emptyCells:blanks, h:nstate.h, w:nstate.w}
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
        return "\n"+`.scm_`+this.state.theme_id+` {`+"\n"+this.genCSS()+`}`+"\n";
    }
    
    render() {
        return(
            <div {...this.props} ref={'container'} className={this.context.theme.responsiveui.container}>
                <style>
                    {this.getCSSStyle()}
                </style>
                <div className={classNames({['scm_'+this.state.theme_id]:true})}>
                {this.props.children? React.Children.map(this.props.children, (val, key, arr) =>{
                    var r = this.state.cells && this.state.emptyCells.elements.length > 0? this.state.emptyCells.elements[key].specs:{y:0, x:0}
                    var style = val.props['style']
                    var props = val.props
                    props = {...props, style:{}}
                    style = {...style, display:"inline-block", position:"absolute", boxSizing:'border-box'}
                    if (val.width >= 0) {
                        style['width'] = r.width + 'px'
                    }
                    if (val.height >= 0) {
                        style['height'] = r.height + 'px'
                    }
                    var l = style.left? (parseFloat(style.left, 10)-r.x):r.x
                    if (l) {
                        if (r.x != parseFloat(l, 10)) {
                            l = parseFloat(l, 10)
                        } else {
                            l = r.x
                        }
                    } else {
                        l = r.x
                    }
                    var t = style.top? (parseFloat(style.top)-r.y):r.y
                    if (t) {
                        if (r.x != parseFloat(t, 10)) {
                            t = parseFloat(t, 10)
                        } else {
                            t = r.y
                        }
                    } else {
                        t = r.y
                    }
                    style = {left:l, top:t, ...style}
                    if (this.props.wrap) {
                        return <div ref={key} style={style}>{React.cloneElement(val, {...props, id_key:key})}</div>;
                    } else {
                        return React.cloneElement(val, {...props, ref:key, style:style, id_key:key});
                    }
                }):null}
                {this.props.renderEmptyCells? this.state.emptyCells.cells.map((val, ind, arr) => {
                    var style = {border:'1px dashed black', position:'absolute', boxSizing:'border-box'}
                    if (val.specs.width >= 0) {
                        style['width'] = val.specs.width + 'px'
                    }
                    if (val.specs.height >= 0) {
                        style['height'] = val.specs.height + 'px'
                    }
                    style['left'] = val.specs.x + 'px'
                    style['top'] = val.specs.y + 'px'
                    return <div style={style}></div>
                }):null}
                </div>
            </div>
        );
    }
}


export default Component;
