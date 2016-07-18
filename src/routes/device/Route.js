/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Components, PropTypes } from 'react';
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
import Palette from '../../components/Material/Palette';
import Theme from '../../components/Material/Theme';
import Icon from '../../components/Material/Icon';
import Choice from '../../components/Material/Choice';
import Device from '../../components/Material/Device';
import AppBar from '../../components/Material/AppBar';
import Paper from '../../components/Material/Paper';
import Drawer from '../../components/Material/Drawer';
import DeviceInfo from '../../components/Material/DeviceInfo';

const title = 'Device';

class Route extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            openLeftDrawer:true,
        }
    }
    render() {
      return (
        <div className={s.root}>
            <div className={s.container}>
                <section>
                    <h1 className={s.sectionHeader}>Device and Device Info Components</h1>
                    <p>
                        In the Material Specification there are a number of differences, decided 
                        by which device and their form-factor, which govern how components are 
                        styled and behave. The Device Component is meant to gather that information 
                        by either being assigned it by the developer, or by gathering it from the 
                        brower api. The Device Info component, on the other hand, is for viewing 
                        the configuration of the Device Component on different browsers.
                    </p>
                    <p>
                        The Device Info Component is meant to be for developer consumption, and is 
                        not intended for use by consumers. There may be some scenarios in which a 
                        developer may wish to use it, and you are free to do so.
                    </p>
                    <p>
                        Currently we do not provide a formfactor specification in the Device Component
                        to reflect the Material Spec breakpoints, but it is listed as a suggestion for
                        future implementation. It probably is not necessary to have it in device since
                        sheets calculate their form-factor with the material spec breakpoints or by 
                        user specified breakpoints (overriding the breakpoints within the Theme Component).
                    </p>
                </section>
                <section style={{display:'inline-block', width:'100%'}}>
                    <DeviceInfo />
                </section>
            </div>
        </div>
      );
  }
}

Route.propTypes = {
};
Route.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Route);
