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
import Tree from '../../components/Material/Tree'

function Route({}, context) {
  context.setTitle(title);
  return (
    <ResponsiveUI>
    <div columnSpan={12}>
        <h1>Tree</h1>
        <svg height="110" width="500"><text x="50" y="50" style={{textAnchor:"middle", color:'black', fontSize:35, fontFamily:"Verdana"}}>TEST</text></svg>
        <svg height="500" width="800">
        <Tree y={0} nodes={[{name:'0', value:0, children:[{name:'1', value:1}, {name:'2', value:2, children:[{name:'4', value:3}, {name:'5', value:4}, {name:'6', value:5}]}, {name:'3', value:6}]}]}/>
        </svg>
    </div>
    </ResponsiveUI>
  );
}

Route.propTypes = {
};
Route.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Route);
