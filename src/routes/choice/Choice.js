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
import s from './Choice.css';
import Image from '../../components/Lotus/Image'

import Menu from '../../components/Material/Menu/';
import Button from '../../components/Material/Button';
import PopOver from '../../components/Material/PopOver';
import Card from '../../components/Material/Card';
import CardTitle from '../../components/Material/Card/CardTitle';
import CardBody from '../../components/Material/Card/CardBody';

import Icon from '../../components/Material/Icon'
import Choice from '../../components/Material/Choice'
import ChoiceGroup from '../../components/Material/ChoiceGroup'
const title = 'React Starter Kit';

function ChoiceRoute({}, context) {
  context.setTitle(title);
  return (
    <div>
            <p>This is an example of the Choice Component. Choice components can be
            use as Select Many, Select One, or Enable/Disable Components.</p>
            <Choice role="check" active={false}> This is a choice. </Choice> <br />
            <Choice role="option" active={false}> This is a choice. </Choice> <br />
            <Choice role="star" active={false}> This is a choice. </Choice> <br />
            <Choice role="check" active={false}> <p>First Line. <br/>
            Second Line. <br/></p></Choice> <br />
            <p>This is an example of the Choice Component. Choice components can be
            use as Select Many, Select One, or Enable/Disable Components.</p>
            
            <ChoiceGroup role="check" options={["1", "2"]} values={[true, false]}/>
    </div>
  );
}

ChoiceRoute.propTypes = {
};
ChoiceRoute.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(ChoiceRoute);
