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

import Icon from '../../components/Material/Icon'
import Choice from '../../components/Material/Choice'
const title = 'React Starter Kit';

import ResponsiveUI from '../../components/Material/Sheet/ResponsiveUI'
function Route({}, context) {
  context.setTitle(title);
  return (
        <ResponsiveUI responsive={true} numOfCols={4}>
            <Card role={"sidepanel"} position={"left"} columnSpan={2} >
                <CardTitle title={"Sidepanel"} />
                <CardBody>
                    <h2>Side Panel</h2>
                </CardBody>
            </Card>
            <Card style={{width:'20px'}}>
                <CardBody>
                    1
                </CardBody>
            </Card>
            <Card style={{width:'20px', height:'150px'}}>
            </Card>
            <Card style={{width:'20px', height:'150px'}}>
            </Card>
            <Card style={{width:'20px', height:'150px'}}>
            </Card>
            <Card style={{width:'20px', height:'150px'}}>
            </Card>
            <Card style={{width:'20px', height:'150px'}}>
            </Card>
            <Card style={{width:'20px', height:'150px'}}>
            </Card>
            <Card style={{width:'20px', height:'150px'}}>
            </Card>
            <Card style={{width:'20px', height:'150px'}}>
            </Card>
            <Card style={{width:'20px', height:'316px'}}>
            </Card>
            <Card style={{width:'20px', height:'150px'}}>
            </Card>
            <Card style={{width:'20px', height:'150px'}}>
            </Card>
        </ResponsiveUI>
  );
}

Route.propTypes = {
};
Route.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Route);
