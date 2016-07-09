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
import s from './BarDecor.css';
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

function BarDecorRoute({}, context) {
  context.setTitle(title);
  return (
    <div>
        <Card title={"Bar Decor"} width={"small-1"}>
            <CardTitle title={"Checkbox Choice"}/>
            <CardBody>
                <p>This is an example of the Choice Component. Choice components can be
                use as Select Many, Select One, or Enable/Disable Components.</p>
                <div>
                    <BarDecor width={'330px'} height={'20px'}/>
                </div>
            </CardBody>
        </Card>
        <Card title={"Arc Decor"} width={"small-1"}>
            <CardTitle title={"Checkbox Choice"}/>
            <CardBody>
                <p>This is an example of the Choice Component. Choice components can be
                use as Select Many, Select One, or Enable/Disable Components.</p>
                <div>
                    <ArcDecor width={'30'} />
                </div>
            </CardBody>
        </Card>
    </div>
  );
}

BarDecorRoute.propTypes = {
};
BarDecorRoute.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(BarDecorRoute);
