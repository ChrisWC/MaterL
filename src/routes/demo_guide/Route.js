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
const title = 'React Starter Kit';

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
                    <h1 className={s.sectionHeader}>Creating Demos</h1>
                    <p>
                        Showing off GUI can be a little complicated, we often mutate gui
                        depending of features of a device such as input and form-factor. 
                        Built into this library is the ability to emulate how those devices
                        will look by allowing developers to specify parameters to apps
                        and allowing the nesting of apps.
                    </p>
                    <p>
                        Creating a demo using this library should be easy and provide an
                        interactive way of testing and showing functionality.
                    </p>
                </section>
                <section style={{display:'inline-block', width:'100%'}}>
                    <div className={s.sectionmain}>
                        <Palette color={"pink"}>
                            <Theme>
                                <Device device={"nexus6"} role={"device-body"}>
                                        <AppBar icon={
                                            <Button icon={
                                                <Icon resolution={"24px"} context={"navigation"} component={"menu"} 
                                                    onClick={()=>{
                                                        this.setState({openLeftDrawer:!this.state.openLeftDrawer})    
                                                    }}/>
                                            }/>
                                        } title={"PHONE DEMO"}/>
                                        <Drawer open={this.state.openLeftDrawer} depth={1}>

                                        </Drawer>
                                        <div>
                                            This is content
                                        </div>
                                </Device>
                            </Theme>
                        </Palette>
                    </div>
                    <div className={s.sectionright}>
                        <p>
                            Using a `device` tag you are able to emulate a device such as an android phone. The new device
                            element should have the appropriate dimensions and elements that a phone would have. This means
                            that if a phone has gui buttons on the bottom of the screens, that are not apart of the app, they
                            will also be present within the demo unless otherwise specified.
                        </p>
                        <p>
                            Some differences may apply until, such as style of scroll bar, until we find time to deal
                            with them.
                        </p>
                    </div>
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
