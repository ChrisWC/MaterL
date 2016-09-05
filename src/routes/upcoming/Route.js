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
import TextField from '../../components/Material/TextField'
const title = 'React Starter Kit';

function Route({}, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
        <div className={s.container}>
            <h1> Upcoming </h1>
            <ul>
                <li>
                    <h1>Cards</h1>
                    <p>
                        Next up is 'cards'. Which vary in behaviour depending on
                        context (list, card-grid). These acts as containers that 
                        may display data in an organized fashion.
                    </p>
                    <p>
                        A card, at minimum, should contain a set of one or more 
                        images, descriptive text, and a set of actionable items.
                    </p>
                </li>
                <li>
                    <h1>Sliders</h1>
                    <p>
                        Sliders allow the scaling of a value or a selection of
                        a value along a predefined interval or list of values.
                    </p>
                </li>
                <li>
                    <h1>Lists</h1>
                    <p>
                        Lists display related data within a vertical context. 
                    </p>
                </li>
                <li>
                    <h1>Table</h1>
                    <p>
                        Allows the display of sets of data and controls. Fields
                        should be able to be edited.
                    </p>
                </li>
            </ul>
        </div>
    </div>
  );
}

Route.propTypes = {
};
Route.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Route);
