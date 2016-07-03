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
import s from './Drawer.css';
import Image from '../../components/Lotus/Image'

import Menu from '../../components/Material/Menu/';
import Button from '../../components/Material/Button';
import PopOver from '../../components/Material/PopOver';
import Card from '../../components/Material/Card';
import CardTitle from '../../components/Material/Card/CardTitle';
import CardBody from '../../components/Material/Card/CardBody';

import Icon from '../../components/Material/Icon'

const title = 'React Starter Kit';

function DrawerRoute({}, context) {
  context.setTitle(title);
  return (
      <div>
        <Card title={"Menu"} width={"small-1"}>
            <CardTitle title={"Menu Component"}/>
            <CardBody>
                <p>This is an example of the Menu Component.</p>
                <Menu style={{width:'200px'}}>
                    <Button contextName="menu" label="Menu Button"/>
                    <Button contextName="menu" label="Menu Button"/>
                </Menu>
            </CardBody>
        </Card>
        <Card title={"Buttons and Popovers"} width={"small-0"}>
            <CardTitle title={"Popover Component"}/>
            <CardBody>
            <p>Buttons come in several flavors in the Material spec. Our implementation uses props
            to allow users to specify which flavour they would like. We usea literal interpretation of a
            button as a component that reacts to a click.</p>
            <div>
            <Button label={"A BUTTON"} raised={false} primary={false} popover={
                <PopOver ref="pop" >
                    <Menu>
                        <Button contextName="menu" label="Menu Button"/>
                        <Button contextName="menu" label="Menu Button"/>
                    </Menu>
                </PopOver>}>
            </Button>
            <Button label={"A BUTTON"} raised={true} primary={true} popover={
                <PopOver role="popover" ref="pop">
                    <Menu>
                        <Button contextName="menu" label="Menu Button"/>
                        <Button contextName="menu" label="Menu Button"/>
                    </Menu>
                </PopOver>}>
            </Button>
            </div>
            </CardBody>
        </Card>
    </div>
  );
}

DrawerRoute.propTypes = {
};
DrawerRoute.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(DrawerRoute);
