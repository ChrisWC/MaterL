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
const test_arr = [0, 1, 2, 3, 4, 5]
function TCard(props, context) {
    return (<Card {...props}><CardBody>1</CardBody></Card>)
}
function Route({}, context) {
  context.setTitle(title);
  return (
        <div>
        <section>
            <h1> RESPONSIVE UI </h1>
        </section>
        <ResponsiveUI responsive={true}>
            <Card role={"sidepanel"} position={"left"}>
                <CardTitle title={"Sidepanel"} />
                <CardBody>
                    <h2>Side Panel</h2>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    1
                </CardBody>
            </Card>
            <Card>
            </Card>
            <Card>
            </Card>
            <Card>
            </Card>
            <Card>
            </Card>
            <Card>
            </Card>
            <Card>
            </Card>
            <Card>
            </Card>
            <Card>
            </Card>
            <Card>
            </Card>
            <Card>
            </Card>
            <Card>
            </Card>
        </ResponsiveUI>
        <ResponsiveUI responsive={true}>
            {test_arr.map((val, ind, arr) => {
                return (<TCard />)
            })}
        </ResponsiveUI>
        <h1>Siblings Components (Above)</h1>
        <h1>Nested Responsive UI</h1>
        <ResponsiveUI responsive={true}>
            <h1>T</h1>
            <ResponsiveUI responsive={true} columnSpan={4}>
                <h1>T2</h1>
            </ResponsiveUI>
            <h1>T3</h1>
        </ResponsiveUI>
        </div>
  );
}

Route.propTypes = {
};
Route.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Route);
