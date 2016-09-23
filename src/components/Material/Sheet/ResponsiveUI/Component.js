
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

        this.state = {
            columnCount:4,
            columnSize:200,
            gutterSize:0,
            columns:[
            ]
        }
    }
    static propTypes = {
        title: PropTypes.string,
        responsive: PropTypes.bool,
    };
    static defaultProps = {
        responsive: false,
    };
    static contextTypes = {
        theme: PropTypes.object,
        palette: PropTypes.object
    }
    findNColumn = (cols, col, l) => {
        var min = 0;
        for (var i = 0; i < cols.length; i++) {
            if (cols[min] > cols[i]) {
                min = i;
            }
        }
        return min

    }
    reflow = () => {
        if (this.refs['container'] === undefined) {
            return
        }
        var cols = []
        var pos = []
        var currCol = 0
        var cr = this.refs['container'].getBoundingClientRect()
        var columnSize = (cr.right-cr.left)/this.state.columnCount;
        for (var i = 0; i < this.state.columnCount; i++) {
            cols.push(0)
        }
        for (var i = 0; i < this.props.children.length; i++) {
            if (this.refs[i] !== undefined) {
                var rect = this.refs[i].getBoundingClientRect()
                var width = rect.right - rect.left;
                var height = rect.bottom - rect.top;
                var colLength = parseInt(width/columnSize)
                if (width % this.state.columnSize != 0) {
                    colLength += 1;
                }
                currCol = this.findNColumn(cols, currCol, colLength)
                var pil = currCol*columnSize
                
                var pih = cols[currCol]
                for (var j = 0; j < colLength; j++) {
                    cols[currCol] += height
                    if (currCol < this.state.columnCount) {
                        currCol += 1;
                    }
                }
                pos.push([pih, pil])
            } else {
                pos.push([0,0])
            }
        }
        this.setState({...this.state, columnSize:columnSize,columns:cols, locs:pos})
        //find column id for each object
    }
    componentWillMount = () => {
    }
    componentDidMount = () => {
        window.addEventListener('resize', this.reflow);
        
        this.reflow()
    }
    getNextColumn = () => {
        for (var i in this.state.columns.length) {

        }
    }

    render() {
        return(
            <div {...this.props} ref='container'>
                {this.props.responsive? React.Children.map(this.props.children, (val, ind, arr) => {
                    var pos = [0,0]
                    if (this.state.locs && this.state.locs[ind]) {
                        pos =this.state.locs[ind]
                    }
                    return pos.length != 2? (
                        <div ref={ind} style={{position:'absolute'}}>
                            {React.cloneElement(val, {...val.props, columnWidth:this.state.columnSize-20, maxColumns:this.state.columnCount})}
                        </div>):(
                        <div ref={ind} style={{top:pos[0] + "px", left:pos[1] + "px", position:'absolute'}}>
                            {React.cloneElement(val, {...val.props, columnWidth:this.state.columnSize-20, maxColumns:this.state.columnCount})}
                        </div>)
                }):this.props.children}
            </div>
        );
    }
}


export default Component;
