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
const title = 'Layout -- Structure';

function Route({}, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
        <div className={s.container}>
            <section>
                <h1>Structure</h1>
                <p> The Material specification lays out a number of ui regions with 
                differing behaviours and styling. There are varying differences 
                between the ui regions on desktop, mobile, and other type of devices 
                and device type variations (such as resolution). This page deals with 
                structure components, how to use them, and the state of their
                implementation</p>
            </section>
            <section>
                <h1>Side Navigation Panels (Drawers)</h1>
            </section>
            <section>
                <h1>System Bars</h1>
            </section>
            <section>
                <h1>Toolbars</h1>
            </section>
            <section>
                <h1>Appbars</h1>
            </section>
        </div>
    </div>
  );
}

Route.propTypes = {
};
Route.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Route);
