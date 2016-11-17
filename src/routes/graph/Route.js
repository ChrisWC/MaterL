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

import Icon from '../../components/Material/Icon'
import Slider from '../../components/Material/Slider'
const title = 'React Starter Kit';
import DataTable from '../../components/Material/DataTable'
function Route({}, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
        <div className={s.container}>
            <h1> Data Tables </h1>
            <p>
                A slider should be discreet, and may contain a label to describe
                what it's manipulating and another label to describe the value. Label
                Text should be centered against the control.
            </p>
            <p>
                There should be two modes. One in which the slider control moves only to
                the ends of the segments, and one where the slider control may move anywhere
                along each segement (infinite).
            </p>
            <p>
                Slider control should be customizable in size, and have a component above
                or below the the control itself that acts as the control. this control should
                be customizable by the user.
            </p>
            <DataTable columnHeaders={["Name", "Username"]} columnTypes={["textfield", "textfield"]} data={()=>{
                return [['John R. Doe', 'oscar-willy'], ['Greogory Arnault', 'octo-crab']]
            }}/>
        </div>
    </div>
  );
}

Route.propTypes = {
};
Route.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Route);
