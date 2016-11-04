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
import Paper from '../../components/Material/Sheet';
import Icon from '../../components/Material/Icon'
import Choice from '../../components/Material/Choice'
const title = 'React Starter Kit';

function Route({}, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
        <div className={s.container}>
            <p>
                The Material Specification Suggests having several generic implementations
                of shadows to be used on certain elements...
            </p>
            <section>
            <div style={{display:'inline-block'}}>
            <Paper depth={0} style={{width:'128px', height:'128px', float:'left', position:'relative', display:'inline-block'}}>
            </Paper>
            <p>
                Depth 0
            </p>
            </div>
            <Paper depth={1} style={{width:'128px', height:'128px'}}>
                <p>Depth 1</p>
            </Paper>
            <Paper depth={2} style={{width:'128px', height:'128px'}}>
                <p>Depth 2</p>
            </Paper>
            <Paper depth={3} style={{width:'128px', height:'128px'}}>
                <p>Depth 1</p>
            </Paper>
            <Paper depth={4} style={{width:'128px', height:'128px'}}>
                <p>Depth 4</p>
            </Paper>
            <Paper depth={5} style={{width:'128px', height:'128px'}}>
                <p>Depth 5</p>
            </Paper>
            <Paper depth={6} style={{width:'128px', height:'128px'}}>
                <p>Depth 6</p>
            </Paper>
            <Paper depth={7} style={{width:'128px', height:'128px'}}>
                <p>Depth 7</p>
            </Paper>
            </section>
        </div>
    </div>
  );
}

Route.propTypes = {
};
Route.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Route);
