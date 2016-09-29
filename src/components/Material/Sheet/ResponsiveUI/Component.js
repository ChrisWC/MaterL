
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
 * Uses Breakpoint information to determine size of elements
 */

import React, { PropTypes } from 'react';

import classNames from 'classnames';
class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        var r = []

        for (var i = 0; i < this.props.children.length; i++) {
            r.push({id:i, left:0, top:0})
        }
        
        
        this.state = {
            columnCount:this.props.numOfCols,
            columnSize:200,
            gutterSize:8,
            columns:[
            ],
            m:[
            ],
            r:r,
            heights:[
            ],
            style:{
                width:'100%',
                height:'auto'
            },
            theme_id:context.theme_component_id.next().value
        }
    }
    static propTypes = {
        title: PropTypes.string,
        responsive: PropTypes.bool,
        numOfCols: PropTypes.number,
    };
    static defaultProps = {
        responsive: false,
        numOfCols:2
    };
    static contextTypes = {
        theme: PropTypes.object,
        palette: PropTypes.object,
        device: React.PropTypes.object,
        theme_component_id: PropTypes.object,
        updateDOM: PropTypes.func,
    }
    findNColumn = (cols, col, l) => {
        var min = 0;
        for (var i = 0; i < cols.length; i++) {
            if (cols[min] > cols[i] && (i+l) <= cols.length) {
                min = i;
            }
        }
        return min

    }
    dimChange = (height, ind) => {
        if (this.state.heights.length == this.props.children.length
            && this.state.heights[ind] != height) {
            var nheights = this.state.heights;
            nheights[ind] = height;
            this.setState({heights:nheights});
        }
    }
    static childContextTypes = {
        updateDOM: React.PropTypes.func,
    }
    getChildContext = () => {
        return {
            updateDOM:() => {
                var r = this.refs['container'].getBoundingClientRect()
                var nstate = this.state
                var bp = this.getBreakpoint()
                nstate['breakpoint'] = bp
                nstate['columnCount'] = bp['columns']
                nstate['gutterSize'] = isNaN(bp['gutter'])? bp['gutter'][0]:bp['gutter']
                nstate['columnSize'] = (r.right-(r.left + (nstate.columnCount+1)*nstate.gutterSize))/this.state.columnCount
                var nr = this.updateDOM(nstate, this.props)
                nstate['r'] = nr['r']
                nstate['style']['height'] = nr['h'] + 'px'
                this.setState(nstate)
                if (this.context.updateDOM) {
                    this.context.updateDOM()
                }
            }
        }
    }
    componentWillMount = () => {
    }
    componentDidMount = () => {
        window.addEventListener('resize', () => {
            var r = this.refs['container'].getBoundingClientRect()
            var nstate = this.state
            var bp = this.getBreakpoint()
            nstate['breakpoint'] = bp
            nstate['columnCount'] = bp['columns']
            nstate['gutterSize'] = isNaN(bp['gutter'])? bp['gutter'][0]:bp['gutter']
            nstate['columnSize'] = (r.right-(r.left + (nstate.columnCount+1)*nstate.gutterSize))/this.state.columnCount
            var nr = this.updateDOM(nstate, this.props)
            nstate['r'] = nr['r']
            nstate['style']['height'] = nr['h'] + 'px'
            this.setState(nstate)
        })
        var r = this.refs['container'].getBoundingClientRect()
        var nstate = this.state
        
        var bp = this.getBreakpoint()
        nstate['breakpoint'] = bp
        nstate['columnCount'] = bp['columns']
        nstate['gutterSize'] = isNaN(bp['gutter'])? bp['gutter'][0]:bp['gutter']
        nstate['columnSize'] = (r.right-(r.left + (nstate.columnCount+1)*nstate.gutterSize))/this.state.columnCount
        var nr = this.updateDOM(nstate, this.props)
        nstate['r'] = nr['r']
        nstate['style']['height'] = nr['h'] + 'px'


        this.setState(nstate)
    }
    componentWillReceiveProps = (nProps) => {
    }
    getNextColumns = (m, nr, columnSpan) => {
        var span = []
        var lspan = []
        for (var n = 0; n <  m.length; n++) {
            var mni = m[n]
            if (n + columnSpan <= m.length) {
                span.push(n)
                var mnj = m[n+1]
                for (var i = 1; i < columnSpan && span.length == i; i++) {
                    
                    var ni = n+i
                    var mnj = m[ni]
                    if (mni == [] && mnj == []) {
                        span.push(ni)
                    }
                    else if (mni != [] && mnj <= mni) {
                        span.push(ni)
                    }
                }

                if (span.length > lspan.length) {
                    lspan = span
                }
                else if (span.length == lspan.length
                    && m[span[0]].length < m[lspan[0]].length) {
                    lspan = span
                }
                span = []
            }
        }
        return lspan

    }
    componentDidUpdate = (nProps, nState) => {
        var r = this.refs['container'].getBoundingClientRect()
        var nstate = this.state

        var bp = this.getBreakpoint()
        nstate['breakpoint'] = bp
        nstate['columnCount'] = bp['columns']
        nstate['gutterSize'] = isNaN(bp['gutter'])? bp['gutter'][0]:bp['gutter']
        nstate['columnSize'] = (r.right-(r.left + (nstate.columnCount+1)*nstate.gutterSize))/nstate.columnCount
        var nr = this.updateDOM(nstate, this.props)
        nstate['r'] = nr['r']
        nstate['style']['height'] = nr['h'] + 'px'
        this.state = nstate
        //
        if (nProps.children.length != this.props.children.length) {
            this.setState(nstate)
            //this.forceUpdate()
        }
        if (nr['r'].length != this.state['r'].length) {
            this.setState(nstate)
        }
        var nheight = parseFloat(nState.style.height, 10)
        var pheight = parseFloat(this.state.style.height, 10)
        if (nheight != pheight) {
            this.context.updateDOM()
        }
        //nState.r = nr
        //return true;
    }
    getBreakpoint = () => {
        var rect = this.refs['container'].getBoundingClientRect()
        var resolution = rect.right - rect.left
        var formfactor = this.context.theme.sheet.widthBreakpoints[this.context.device.device_type.toUpperCase()];
         
        if (this.context.device.device_type.toUpperCase().match(/DESKTOP/)) {
            for (var i in formfactor) {
                if (window.innerWidth >= formfactor[i].range[0] 
                    && (window.innerWidth < formfactor[i].range[1] 
                    || formfactor[i].range[1] == -1)) {

                    return {device:'DESKTOP', ...formfactor[i]}
                }
            }
        } 
        else if (typeof this.context.device.orientation != 'undefined'
                    && this.context.device.device_type.toUpperCase().match(/(TABLET|PHONE)/)
                    && this.context.device.orientation.toUpperCase().match(/(LANDSCAPE|PORTRAIT)/)) {
            formfactor = formfactor[this.context.device.orientation.toUpperCase().match(/(LANDSCAPE|PORTRAIT)/)[0]]
            for (var i in formfactor) {
                if (window.innerWidth >= formfactor[i].range[0] 
                    && (window.innerWidth < formfactor[i].range[1] 
                    || formfactor[i].range[1] == -1)) {

                    return {device:this.context.device.device_type.toUpperCase(), ...formfactor[i]}
                }
            }
        } 

        return {}
    }
    updateDOM = (nState, props) => {
        var m = []
        var n = [];
        var mLeft = nState.gutterSize;
        var nr = [];
        var nTop = 0;
        var mxHeight = 0.0;
        var children = []
        if (!Array.isArray(props.children)) {
            children = [props.children]
        } else {
            children = props.children
        }

        var sidepanels_left = []
        var sidepanels_top = []
        var components = []
        var columnCount = nState.columnCount;
        for (var i = 0; i < children.length; i++) {
            var role = children[i].props.role
            var position = children[i].props.position

            if (role && (role == 'sidepanel' || role == 'drawer' || role == 'appbar')) {
                if (position && position == 'left') {
                    sidepanels_left.push(children[i])
                    columnCount--;
                }
                if (position && position == 'above') {
                    sidepanels_top.push(children[i])
                }
            }
            else {
                components.push(children[i])
            }
        }
        for (var i = 0; i < columnCount; i++) {
            m.push([])
        }
        
        for (var i = 0; i < sidepanels_left.length; i++) {
            //nr.push({id:i, left:mLeft, top:nTop})
            mLeft += sidepanels_left[i].props.columnSpan != undefined? (sidepanels_left[i].props.columnSpan*nState.columnSize + ((sidepanels_left[i].props.columnSpan)*nState.gutterSize)):(1*nState.columnSize+nState.gutterSize)
        }
        for (var i in components) {
            var ai = sidepanels_left.length + parseInt(i,10)
            var columnSpan = components[i].props.columnSpan;
            columnSpan = columnSpan? columnSpan:1;
            console.log(columnSpan)
            columnSpan = (columnSpan <= this.state.columnCount)? columnSpan:this.state.columnCount;

            console.log(columnSpan)
            var cols = this.getNextColumns(m, nr, columnSpan)

            for (var j = 0; j < cols.length; j++) {
                m[cols[j]].push(i)
            }
            var j= cols[0]
            n = m[j]
            var nro = {id:i, left:mLeft, top:nTop}
            //n.push(i)
            if (this.refs[ai] &&this.refs[ai].getBoundingClientRect) {
                var r = this.refs[ai].getBoundingClientRect()
                if (n && n.length > 1) {
                    var mn = n[n.length-2]
                    nTop = nr[mn]['bottom']
                    mLeft = nr[mn]['left']
                }
                var height = r.bottom - r.top
                var width = nState.columnSize*columnSpan + nState.gutterSize*(columnSpan-1) //r.right - r.left
                nro['top'] = nTop
                nro['bottom'] = nTop + height
                nro['left'] = mLeft
                nro['right'] = mLeft + width
                nro['width'] = width
                nro['height'] = r.height
                if (mxHeight < nro['bottom']) {
                    mxHeight = nro['bottom'];
                }
                nr.push(nro)
                mLeft += (width + nState.gutterSize)
            }
        }
        mLeft =0
        var nre = []
        nTop = 0
        
        for (var i = 0; i < sidepanels_left.length; i++) {
            var width =  (sidepanels_left[i].props.columnSpan*nState.columnSize + ((sidepanels_left[i].props.columnSpan)*nState.gutterSize))
            var rect = this.refs[i].getBoundingClientRect()
            nre.push({id:i, left:mLeft, top:nTop, right:(mLeft + width), bottom:(nTop + (rect.bottom - rect.top))})
            mLeft += sidepanels_left[i].props.columnSpan != undefined? (sidepanels_left[i].props.columnSpan*nState.columnSize + ((sidepanels_left[i].props.columnSpan)*nState.gutterSize)):(1*nState.columnSize+nState.gutterSize)
        }
        for (n in nr) {
            nre.push(nr[n])
        }
        return {'r':nre, 'h':mxHeight}
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
        return "\n"+`.responsiveui_`+this.state.theme_id+` {`+"\n"+this.genCSS()+`}`+"\n";
    }
    render() {
        var components = 0
        var sidepanel_left = 0
        return(
            <div {...this.props} ref={'container'} className={this.context.theme.responsiveui.container}>
                <style>
                    {this.getCSSStyle()}
                </style>
                <div className={classNames({['responsiveui_'+this.state.theme_id]:true})}>
                {React.Children.map(this.props.children, (val, key, arr) =>{
                    var r = this.state.r && this.state.r.length > 0? this.state.r[key]:{top:0, left:0}
                    var rkey = ""
                    if (val.props.role && val.props.role == 'sidepanel') {
                        if (val.props.position && val.props.position == 'left') {
                            sidepanel_left++;
                            rkey = "s"+sidepanel_left
                        }
                    } else {
                        components++;
                        rkey = components
                    }
                    return <div ref={key} style={{display:"inline-block", position:"absolute", top:r.top + 'px', left:r.left + 'px', width:r.width+'px'}}>{React.cloneElement(val, {...val.props, columnWidth:(this.state.columnSize), gutterSize:(this.state.gutterSize), id_key:key})}</div>;
                })}
                </div>
            </div>
        );
    }
}


export default Component;
