/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Route.css';
import Image from '../../components/Lotus/Image'

import Menu from '../../components/Material/Menu/';
import Button from '../../components/Material/Button';
import PopOver from '../../components/Material/PopOver';
import BarDecor from '../../components/Material/BarDecor';
import ArcDecor from '../../components/Material/ArcDecor';
import Card from '../../components/Material/Card';
import CardTitle from '../../components/Material/Card/CardTitle';
import CardBody from '../../components/Material/Card/CardBody';
import CardActions from '../../components/Material/Card/CardActions';
import CardMedia from '../../components/Material/Card/CardMedia';

import Icon from '../../components/Material/Icon'
import Choice from '../../components/Material/Choice'
const title = 'React Starter Kit';

import ResponsiveUI from '../../components/Material/Sheet/ResponsiveUI'
import EmptyCellList from '../../components/Material/Layout/EmptyCellList'

function Route({}, context) {
  context.setTitle(title);
  return (
    <ResponsiveUI responsive={true}>
    <div columnSpan={12}>
        <h1>Empty Cell List</h1>
        <section>
        <p>The empty cell list tracks the empty cells that are available for
        element insertion. The list of empty cells are ordered and that order 
        may be changed.</p>
        <p> Currently, there are some short-comings with how the ordering 
        algorithm handles elements of different heights. A strict column first
        ordering does not work very well in practice, and a smarter algorithm 
        should be written.</p>
        </section>
        <section>
        <h2>Step 2</h2>
        <p>Render Child Elements and find the space they consume</p>
        </section>
        <section>
        <h2>Step 3 </h2>
        <p>
        For each child element, find the first  empty cell that may fit 
                child element. Create cell within the empty cell and split the 
                empty cell as to not contain the new cell.
        </p>
        <section>
        <EmptyCellList width={240} height={240} sort='col' wrap={false} renderEmptyCells={true}>
            <Card style={{boxSizing:'border-box'}}>
                <CardTitle title={"Squirrel"}/>
            </Card>
            <Card style={{boxSizing:'border-box'}}>
                <CardTitle title={"Rat"}/>
            </Card>
            <Card style={{boxSizing:'border-box'}}>
                <CardTitle title={"Rat"}/>
            </Card>
            <Card style={{boxSizing:'border-box'}}>
                <CardTitle title={"Rat"}/>
            </Card>
            <Card style={{boxSizing:'border-box'}}>
                <CardTitle title={"Rat"}/>
            </Card>
        </EmptyCellList>
        </section>
        <section>
        <h2>Using ECL for App Structure (Appbar, Drawers, etc.)</h2>
        <EmptyCellList width={600} height={360} sort='col' wrap={false} renderEmptyCells={true}>
        <div name="appbar" under={[{name:'drawer'}]} style={{width:'100%', height:'64px', border:'8px solid black'}}>
            Appbar
        </div>
        <div name="drawer" over={[{name:'appbar'}]} style={{width:'128px', height:'360px', border:'8px solid purple'}}>
            Drawer
        </div>
        </EmptyCellList>
        </section>
        </section>
    </div>
    </ResponsiveUI>
  );
}

Route.propTypes = {
};
Route.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Route);
