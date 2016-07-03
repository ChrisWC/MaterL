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
import s from './Home.css';
import Image from '../../components/Lotus/Image'

import Menu from '../../components/Material/Menu/';
import Button from '../../components/Material/Button';
import PopOver from '../../components/Material/PopOver';
import Card from '../../components/Material/Card';
import CardTitle from '../../components/Material/Card/CardTitle';
import CardBody from '../../components/Material/Card/CardBody';

import Icon from '../../components/Material/Icon'

const title = 'React Starter Kit';

function Home({}, context) {
  context.setTitle(title);
  return (
      <div>
        <Card title={""}>
            <CardTitle title={"Scroll Bar"}/>
            <CardBody>
                <p>
                    See the <a href="http://material.google.com/components/expansion-panels.html">Material Specification</a> for information on scroll bars.
                </p>
            </CardBody>
        </Card>
        <Card title={""}>
            <CardTitle title={"Text Field"}/>
            <CardBody>
                <p>
                    See the <a href="http://material.google.com/components/expansion-panels.html">Material Specification</a> for information on text fields.
                </p>
            </CardBody>
        </Card>
        <Card title={"Chips"}>
            <CardTitle title={"Chip Component"}/>
            <CardBody>
                <p>
                    In the <a href="http://material.google.com/components/chips.html">Material Specification</a>, Chips represent complex entities in small blocks.
                </p>
            </CardBody>
        </Card>
        <Card title={"Expansion Panel"}>
            <CardTitle title={"Expansion Panel Component"}/>
            <CardBody>
                <p>
                    See the <a href="http://material.google.com/components/expansion-panels.html">Material Specification</a> for information on expansion panels.
                </p>
            </CardBody>
        </Card>
        <Card title={"Animated Components"}>
            <CardTitle title={"Expansion Panel Component"}/>
            <CardBody>
                <p>
                    A number of components animate in response to certain events, such as scroll bars which react to scrolling events. This card provides a 
                    guide to customizing Animations and Animated Components.
                </p>
            </CardBody>
        </Card>
        <Card title={""}>
            <CardTitle title={"Selection Components"}/>
            <CardBody>
                <p>
                    Our implementation of Selection Controls are unified under the name Choice. A Choice may contain a number of options or choices, one or many
                    choices may be selected according to a choices settings, the form and styling of a choice component may be decided by the context it appears
                    in. Example, we may choose to show a drop-down style choice box instead of a list of options if space is limited.
                </p>
            </CardBody>
        </Card>
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
        {/*<Card title={"Lotus Color Picker"}>
           <ColorPicker width={300} height={300}/> 
        </Card>*/}
        <Card title={"Material Icons"}> 
            <CardTitle title={"Material Icons"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"apps"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"arrow_back"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"arrow_downward"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"arrow_drop_down"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"arrow_drop_down_circle"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"arrow_drop_up"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"arrow_forward"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"arrow_upward"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"cancel"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"check"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"chevron_left"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"chevron_right"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"close"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"expand_less"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"expand_more"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"first_page"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"fullscreen"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"fullscreen_exit"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"last_page"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"menu"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"more_horiz"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"more_vert"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"refresh"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"subdirectory_arrow_left"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"subdirectory_arrow_right"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"unfold_less"}/>
            <Icon resolution={"24px"} context={"navigation"} component={"unfold_more"}/>
            <Icon resolution={"24px"} context={"toggle"} component={"check_box"}/>
            <Icon resolution={"24px"} context={"toggle"} component={"check_box_outline_blank"}/>
            <Icon resolution={"24px"} context={"toggle"} component={"indeterminate_check_box"}/>
            <Icon resolution={"24px"} context={"toggle"} component={"radio_button_checked"}/>
            <Icon resolution={"24px"} context={"toggle"} component={"radio_button_unchecked"}/>
            <Icon resolution={"24px"} context={"toggle"} component={"star"}/>
            <Icon resolution={"24px"} context={"toggle"} component={"star_border"}/>
            <Icon resolution={"24px"} context={"toggle"} component={"star_half"}/>
        </Card>
    </div>
  );
}

Home.propTypes = {
};
Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Home);
