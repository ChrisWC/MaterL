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
import Cell from './Cell'
class CellList {
    constructor(specs, cells) {
        this.specs = specs
        this.cells = cells
        this.elements = []
    }
    shouldInsertCol = (nCell, nextCell)=> {
        if (nCell.specs['y'] < nextCell.specs['y']) {
            return true
        }
        else if (nCell.specs['x'] < nextCell.specs['x'] && nCell.specs['y'] == nextCell.specs['y']) {
            return true
        }
        else {
            return false
        }
    }
    shouldInsertRow = (nCell, nextCell)=> {
        if (nCell.specs['x'] < nextCell.specs['x']) {
            return true
        }
        else if (nCell.specs['y'] < nextCell.specs['y'] && nCell.specs['x'] == nextCell.specs['x']) {
            return true
        }
        else {
            return false
        }
    }
    shouldInsertRad = (nCell, nextCell)=> {
        if (nCell.specs['y'] <= nextCell.specs['y'] && nCell.specs['x'] <= nextCell.specs['x']) {
            return true
        }
        else {
            return false
        }
    }
    insertEmptyCells = (cells, element) => {
        //inserts element and new cells

        var i = 0;
        var j = 0;

        var n = []
        var shouldInsert = null
        if (this.specs.order == 'col') {
            shouldInsert = this.shouldInsertCol
        }
        else if (this.specs.order == 'row') {
            shouldInsert = this.shouldInsertRow
        }
        else if (this.specs.order == 'radial') {
            shouldInsert = this.shouldInsertRad
        }
        while (j < this.cells.length && i < cells.length) {

            var m = cells[i].merge(this.cells[j])
            var ei = cells[i].extend(this.cells[j])
            var ej = this.cells[j].extend(cells[i])
            if (!ej || (element && element.intersects(ej))) {
                ej = this.cells[j]
            }
            if (!ei || (element && (ei.intersects(element) || element.intersects(ei)))) {
                ei = cells[i]
            }
            //ei = cells[i]
            //ej = this.cells[j]
            if (false) {
                n.push(m)
                j++;
                i++;
            }
            else {
                //ei = cells[i]
                //ej = this.cells[j]
                if (ei.contains(ej)) {
                    n.push(ei)
                    j++;
                    i++;
                } 
                else if (ej.contains(ei)) {
                    if (element && element.intersects(ej)) {
                        //n.push(cells[i])
                        j++;
                        //i++;
                    } else {
                        n.push(ej)
                        j++;
                        i++;
                    }
                }
                else {

                    //if in order
                    if (shouldInsert(ei, ej)) {
                        n.push(ei)
                        n.push(ej)
                        i++;
                        j++;
                    } else {
                        n.push(ej)
                        j++;
                    }
                }
            }
        }

        while (j < this.cells.length) {
            n.push(this.cells[j]);
            j++;
        }
        while (i < cells.length) {
            n.push(cells[i]);
            i++;
        }
        this.cells = n
    }
    getCellsByRelation = (element) => {
        //exclusive
        for (var i = 0; i < this.cells.length; i++) {
            if (this.cells[i].contains(element)) {

            }
        }
        return {contains:[], intersect:[], other:[]}
    }
    getIntersections = function* (element) {
        for (var i = 0; i < this.cells.length; i++) {
            if (element.intersects(this.cells[i])) {
                yield this.cells[i]
            }
        }
    }
    getCellsThatCanFit = (element) => {
        //filter by adjacency if relative provided
        var cells = []
        var other = []
        for (let c of element.getDescriptor()) {
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].isMatch(c.e)) {
                    if (c.descriptor == 'over' || c.descriptor == 'under') {
                        //cells.push(this.elements[i])
                        var t = []
                        for (let cj of this.getAdjacentCells(this.elements[i])) {
                            console.log(cj)
                            if (cj.left || cj.right || cj.above || cj.below) {
                                cells.push(cj.value.extend(this.elements[i]))
                                //cells.push(this.elements[i])
                            } else {
                                other.push(cj)
                            }
                        }
                        console.log(t)
                    }
                }
            }
        }
        console.log("QQQQQQQQQQQQQQQQQQQQQQQQ")
        console.log(this.elements)
        console.log(element)
        console.log(cells)
        console.log(other)
        if (cells.length == 0) {
            cells = this.cells
            other = []
        } else {
            //return {'fits':cells, 'other':other}
        }

        var j = 0;
        var fit = []
        var nfit = other
        console.log("PPPPPPPPPPPPPPP")
        while (j < cells.length) {
            console.log(cells[j])
            if (cells[j].fits(element)) {
                fit.push(cells[j])
            }
            else {
                nfit.push(cells[j])
            }
            j++
        }
        return {'fits':fit, 'other':nfit}
    }
    getAdjacentCells = function*(cell) {
        for (var i = 0; i < this.cells.length; i++) {
            if (this.cells[i] != cell) {
                yield {left:this.cells[i].isLeft(cell),
                            right:this.cells[i].isRight(cell),
                            above:this.cells[i].isAbove(cell),
                            below:this.cells[i].isBelow(cell),
                            value:this.cells[i]}
            }
        }
    }
    addElement = (element) => {
        //add an element to the list
        var cells = this.getCellsThatCanFit(element)
        var n = []
        var i = 0;
        var _element = {}
        if (cells['fits'].length > 0) {
            var _element = new Cell({...element.specs,x:cells['fits'][0]['specs']['x']+element.specs['x'], y:cells['fits'][0]['specs']['y']+element.specs['y'], width:element.specs['width'], height:element.specs['height']})
            console.log("GGGGGGGGGGGGGGGGGGGGGGG")
            console.log(_element)
            var d = cells['fits'][0].decompose(new Cell(_element))

            var d = cells['fits'][0].decompose(_element)
            n = []
            for (var k = 0; k < this.cells.length; k++) {
                if (this.cells[k] != cells['fits'][0]) {
                    n.push(this.cells[k])
                }
            }
            for (var k = 0; k < d.length; k++) {
                if (d[k].width > 0 && d[k].height > 0) {
                    var l = new CellList(this.specs, n)
                    l.insertEmptyCells([new Cell(d[k])], _element)
                    n = l.cells
                }
            }
        } else {
        }
        i++;

        var _other = []
        while (i < cells['fits'].length) {
            _other.push(cells['fits'][i])
            i++;
        }
        i = 0;
        while (i < cells['other'].length && cells['fits'].length > 0) {
            _other.push(cells['other'][i])
            i++;
        }
        this.cells = _other
        for (let c of this.getIntersections(_element)) {
            var _blanks = c.decompose(_element)
            for (var k = 0; k < _blanks.length; k++) {
                if (_blanks[k].width > 0 && _blanks[k].height > 0) {
                    var l = new CellList(this.specs, n)
                    l.insertEmptyCells([new Cell(_blanks[k])], _element)
                    n = l.cells
                }
            }
        }
        this.cells = n
        this.elements.push(_element)
        return _element
    }
}

export default CellList
