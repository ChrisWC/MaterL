
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
                height:'100%'
            }
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
        device: React.PropTypes.object
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
            var nr = this.updateDOM(this.state)
            nstate['r'] = nr
            this.setState(nstate)
        })
        var r = this.refs['container'].getBoundingClientRect()
        var nstate = this.state
        
        var bp = this.getBreakpoint()
        nstate['breakpoint'] = bp
        nstate['columnCount'] = bp['columns']
        nstate['gutterSize'] = isNaN(bp['gutter'])? bp['gutter'][0]:bp['gutter']
        nstate['columnSize'] = (r.right-(r.left + (nstate.columnCount+1)*nstate.gutterSize))/this.state.columnCount
        var nr = this.updateDOM(this.state)
        nstate['r'] = nr


        this.setState(nstate)
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
    shouldComponentUpdate = (nProps, nState) => {
        var nr = this.updateDOM(nState)
        nState.r = nr
        return true;
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
    updateDOM = (nState) => {
        var m = []
        var n = [];
        var mLeft = nState.gutterSize;
        var nr = [];
        var nTop = 0;

        var children = []
        if (!Array.isArray(this.props.children)) {
            children = [this.props.children]
        } else {
            children = this.props.children
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
        console.log(mLeft)
        for (var i in components) {
            var ai = sidepanels_left.length + parseInt(i,10)
            var columnSpan = components[i].props.columnSpan;
            columnSpan = columnSpan? columnSpan:1;

            var cols = this.getNextColumns(m, nr, columnSpan)

            for (var j = 0; j < cols.length; j++) {
                m[cols[j]].push(i)
            }
            var j= cols[0]
            n = m[j]
            var nro = {id:i, left:mLeft, top:nTop}
            //n.push(i)
            console.log(ai)
            console.log(this.refs[ai])
            if (this.refs[ai].getBoundingClientRect) {
                var r = this.refs[ai].getBoundingClientRect()
                if (n.length > 1) {
                    var mn = n[n.length-2]
                    nTop = nr[mn]['bottom']
                    mLeft = nr[mn]['left']
                }
                var height = r.bottom - r.top
                var width = nState.columnSize*columnSpan + nState.gutterSize*(columnSpan-1) //r.right - r.left
                nro['top'] = nTop
                nro['bottom'] = nTop + height
                nro['left'] = mLeft
                console.log(mLeft)
                nr.push(nro)
                mLeft += (width + nState.gutterSize)
            }
        }
        mLeft =0
        var nre = []
        nTop = 0
        
        for (var i = 0; i < sidepanels_left.length; i++) {
            nre.push({id:i, left:mLeft, top:nTop})
            mLeft += sidepanels_left[i].props.columnSpan != undefined? (sidepanels_left[i].props.columnSpan*nState.columnSize + ((sidepanels_left[i].props.columnSpan)*nState.gutterSize)):(1*nState.columnSize+nState.gutterSize)
        }
        for (n in nr) {
            nre.push(nr[n])
        }
        return nre
    }
    render() {
        var components = 0
        var sidepanel_left = 0
        return(
            <div {...this.props} ref={'container'} className={this.context.theme.responsiveui.container}>
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

                    return <div ref={key} style={{display:"inline-block", position:"absolute", top:r.top, left:r.left}}>{React.cloneElement(val, {...val.props, columnWidth:(this.state.columnSize), gutterSize:(this.state.gutterSize), id_key:key})}</div>;
                })}
            </div>
        );
    }
}


export default Component;
