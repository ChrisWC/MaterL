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
/************************
 * Encapsulates some functionality for cells/quads
 *
 ***********************/

class Cell {
    constructor(specs) {
        this.specs = specs
        this.descriptors = {
            'over':this.specs.over? this.specs.over:[],
            'under':[],
            'left':[],
            'right':[],
            'above':[],
            'below':[],
        }
        this.width = 'fixed'
        this.behaviour = 'permenant'
    }
    isMatch = (e) => {
        console.log("KKKKKKKKKKKKK")
        console.log(e)
        console.log(this.specs)
        if (this.specs.name && e.name && this.specs.name == e.name) {
            return true;
        }
        return false;
    }
    getDescriptor = function*() {
        for (var i in this.descriptors['over']) {
            yield {'descriptor':'over', 'e':this.descriptors['over'][i]}
        }
        for (var i in this.descriptors['under']) {
            yield {'descriptor':'under', 'e':this.descriptors['under'][i]}
        }
    }
    contains = (cell) => {

        if (this.specs['x'] <= cell.specs['x'] && cell.specs['width'] + cell.specs['x'] <= this.specs['width'] + this.specs['x'] && this.specs['y'] <= cell.specs['y'] && cell.specs['height'] + cell.specs['y'] <= this.specs['height'] + this.specs['y']) {
            return true
        }
        return false
    }
    isect_y = (cell) => {
            if (this.specs['y'] <= cell.specs['y'] && this.specs['y'] + this.specs['height'] > cell.specs['y']) {
                //Ay+h intersects By
                return true
            }
            else if (cell.specs['y'] <= this.specs['y'] && cell.specs['y'] + cell.specs['height'] > this.specs['y']) {
                //By+h intersect Ay
                return true
            }
            else {
                return false
            }
    }
    isect_x = (cell) => {
            if (this.specs['x'] <= cell.specs['x'] && this.specs['x'] + this.specs['width'] > cell.specs['x']) {
                //Ay+h intersects By
                return true
            }
            else if (cell.specs['x'] <= this.specs['x'] && cell.specs['x'] + cell.specs['width'] > this.specs['x']) {
                //By+h intersect Ay
                return true
            }
            else {
                return false
            }
    }
    intersects = (cell) => {
        return this.isect_y(cell) && this.isect_x(cell)
    }
    merge = (cell) => {
        //cell is mergable if merged they form a rectangle
        if (this.specs['x'] == cell.specs['x'] && this.specs['width'] == cell.specs['width']) {
            var nspec = {x:this.specs['x'], width:this.specs['width'], y:Math.min(cell.specs['y'], this.specs['y'])}

            var top = Math.min(cell.specs['y'], this.specs['y'])
            var height = Math.max(this.specs['y'] + this.specs['height'], cell.specs['y'] + cell.specs['height'])-top
            nspec['y'] = top
            nspec['height'] = height
            return new Cell(nspec)
        }
        else if (this.specs['y'] == cell.specs['y'] && this.specs['height'] == cell.specs['height']) {
            var nspec = {y:this.specs['y'], height:this.specs['height']}

            var left = Math.min(cell.specs['x'], this.specs['x'])
            var width = Math.max(this.specs['x'] + this.specs['width'], cell.specs['x'] + cell.specs['width'])-left
            nspec['x'] = left
            nspec['width'] = width
            return new Cell(nspec)
        }

        return undefined
    }
    xminor = (cell) => {
        var cR = cell.specs['y'] + cell.specs['height']
        var tR = this.specs['y'] + cell.specs['height']
        return this.specs['y'] >= cell.specs['y'] && tR <= cR
    }
    yminor = (cell) => {
        var cR = cell.specs['x'] + cell.specs['width']
        var tR = this.specs['x'] + cell.specs['width']
        return this.specs['x'] >= cell.specs['x'] && tR <= cR
    }
    extend = (cell) => {
        //this extends into cell
        console.log("EXTEND")
        console.log(cell)
        var ab = this.specs['y'] + this.specs['height']
        var bb = cell.specs['y'] + cell.specs['height']
        var ar = this.specs['x'] + this.specs['width']
        var br = cell.specs['x'] + cell.specs['width']

        //this is y minor if it is between cell left and right
        //this is x minor if it is between cell top and bottom
        var xm = this.xminor(cell)
        var ym = this.yminor(cell)

        if (ym) {
            //then extend width, or decrease y
            var y = Math.min(this.specs['y'], cell.specs['y'])
            var h = Math.max(ab, bb) - y
            console.log("R")
            return new Cell({y:y, width:this.specs['width'], x:this.specs['x'], height:h})
        } else if (xm) {
            console.log("R")
            var x = Math.min(this.specs['x'], cell.specs['x'])
            var w = Math.max(ar, br) - x
            return new Cell({x:x, height:this.specs['height'], y:this.specs['y'], width:w})
        }
        return undefined 
    }
    add = (cell, descriptor) => {
        this.descriptors[descriptor].push(cell)
    }
    fits = (cell) => {
        if (this.specs['width'] >= ((cell.specs['x'])+cell.specs['width']) && this.specs['height'] >= cell.specs['height']+cell.specs['y']) {
            return true
        }
        return false
    }
    isLeft = (cell) => {
        if (this.specs['x']+this.specs['width'] == cell.specs['x'] && this.isect_y(cell)) {
           return true 
        }
        return false
    }
    isRight = (cell) => {
        if (cell.specs['x']+cell.specs['width'] == this.specs['x'] && this.isect_y(cell)) {
           return true 
        }
        return false
    }
    isAbove = (cell) => {
        if (this.specs['y']+this.specs['height'] == cell.specs['y'] && this.isect_x(cell)) {
           return true 
        }
        return false
    }
    isBelow = (cell) => {
        if (cell.specs['y']+cell.specs['height'] == this.specs['y'] && this.isect_x(cell)) {
           return true 
        }
        return false
    }
    decompose = (element) => {
        //-x from the start of the cell.x to the element.x with full height
        console.log(element.specs)
        console.log(this.specs)
        var e_1 = {x:this.specs['x'], y:this.specs['y'], width:element.specs['x']-this.specs['x'], height:this.specs['height']}
        //-y 
        var e_2 = {width:this.specs['width'], x:this.specs['x'], y:this.specs['y'], height:element.specs['y'] - this.specs['y']}
        //+x
        var e_3 = {width:this.specs['width']-((element.specs['x'] + element.specs['width']) - this.specs['x']), x:(element.specs['x']+element.specs['width']), y:this.specs['y'], height:this.specs['height']}
        var e_4 = {height:this.specs['height'] - ((element.specs['y'] + element.specs['height']) - this.specs['y']), y:(element.specs['y'] + element.specs['height']), x:this.specs['x'], width:this.specs['width']}
        
        return [e_1, e_2, e_3, e_4]
    }
}

export default Cell
