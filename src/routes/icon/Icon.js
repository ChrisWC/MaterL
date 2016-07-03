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
import s from './Icon.css';
import Image from '../../components/Lotus/Image'

import Menu from '../../components/Material/Menu/';
import Button from '../../components/Material/Button';
import PopOver from '../../components/Material/PopOver';
import Card from '../../components/Material/Card';
import CardTitle from '../../components/Material/Card/CardTitle';
import CardBody from '../../components/Material/Card/CardBody';

import Icon from '../../components/Material/Icon'

const title = 'React Starter Kit';

function IconRoute({}, context) {
  context.setTitle(title);
  return (
      <div>
        <Card title={"Material Icons"}> 
            <CardTitle title={"Material Navigation Icons"}/>
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

IconRoute.propTypes = {
};
IconRoute.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(IconRoute);
