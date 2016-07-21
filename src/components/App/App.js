/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.css';
import Header from '../Header';
import AppBar from '../Material/AppBar';
import Drawer from '../Material/Drawer/';
//import {AppBar, Paper, Theme, Button} from '../Material';
import MenuItem from '../Material/MenuItem/';
import Menu from '../Material/Menu/';
import Button from '../Material/Button';
import PopOver from '../Material/PopOver';
import Card from '../Material/Card';
import CardTitle from '../Material/Card/CardTitle';
import CardBody from '../Material/Card/CardBody';
import ColorPicker from '../Lotus/ColorPicker';
import Image from '../Lotus/Image';
import Palette from '../Material/Palette';
import Theme from '../Material/Theme';
import Paper from '../Material/Paper';
import Icon from '../Material/Icon';
import CommonFunctions from '../Material/CommonFunctions';
import Device from '../Material/Device';
import history from '../../core/history';
class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            openLeftDrawer:undefined,
        }
    }
    static propTypes = {
            context: PropTypes.shape({
            insertCss: PropTypes.func,
            setTitle: PropTypes.func,
            setMeta: PropTypes.func,
        }),
        children: PropTypes.element.isRequired,
        error: PropTypes.object,
    };

    static childContextTypes = {
        insertCss: PropTypes.func.isRequired,
        setTitle: PropTypes.func.isRequired,
        setMeta: PropTypes.func.isRequired,
    };

    getChildContext() {
        const context = this.props.context;
        return {
            insertCss: context.insertCss || emptyFunction,
            setTitle: context.setTitle || emptyFunction,
            setMeta: context.setMeta || emptyFunction,
        };
    }

    componentWillMount() {
        const { insertCss } = this.props.context;
        this.removeCss = insertCss(s);
    }

    componentWillUnmount() {
        this.removeCss();
    }

    render() {
        const openLeftNavigation = (state) => {
            if (typeof state == 'undefined') {
                return this.state.openLeftDrawer;
            }
            else {
                this.setState({openLeftDrawer:state})
                return state;
            }
        }
        const leftDrawer = (<Drawer open={openLeftNavigation} depth={1}>
                <Menu>
                    <Button contextName="menu" label="About Project" active={false} redirect={"/about"} />
                    <Button contextName="menu" label="Topics">
                        <Menu>
                            <Button contextName="menu" label="Creating Component Demo's" redirect={"/demo_guide"}/>
                        </Menu>
                    </Button>
                    <Button contextName="menu" label="Style">
                        <Menu>
                            <Button contextName="menu" label="Shadow's" redirect={"/shadows"}/>
                            <Button contextName="menu" label="Paper and Sheet's" redirect={"/paper"}/>
                        </Menu>
                    </Button>
                    <Button contextName="menu" label="Components" active={false}>
                        <Menu>
                            <Button contextName="menu" label="BarDecor" active={false} redirect={"/bar_decor"} />
                            <Button contextName="menu" label="Button" active={false} redirect={"/button"} />
                            <Button contextName="menu" label="Choice" active={false} redirect={"/choice"} />
                            <Button contextName="menu" label="Device" active={false} redirect={"/device"} />
                            <Button contextName="menu" label="Text Field" active={false} redirect={"/text_field"}/>
                            <Button contextName="menu" label="Appbar" active={false} redirect={"/appbar"} />
                            <Button contextName="menu" label="Drawer" active={false} redirect={"/drawer"} />
                            <Button contextName="menu" label="Menu" active={false} redirect={"/menu"} />
                            <Button contextName="menu" label="Paper" active={false} redirect={"/paper"} />
                            <Button contextName="menu" label="Icon" active={false} redirect={"/icon"} />
                        </Menu>
                    </Button>
                </Menu>
            </Drawer>)
        const menuButton = (
                <Button icon={<Icon resolution={"24px"} context={"navigation"} component={"menu"}/>} onClick={()=>{
                        openLeftNavigation(!this.state.openLeftDrawer)
                    }} />
        )
        const component =  !this.props.error ? (
                <Device>
                <CommonFunctions
                    redirect={(e, redirect_location) => {
                        e.preventDefault();
                        history.push(redirect_location);
                    }}>
                <Palette color={"blue"} primary={"500"} secondary={"700"} default={"800"}>
                    <Palette priority={"default"} color={"grey"} primary={"50"} secondary={"100"} default={"200"}>
                        <Palette priority={"secondary"} color={"pink"} primary={"500"} secondary={"700"} default={"600"}>
                            <Theme>
                                <Paper role={"body"}>
                                <AppBar icon={menuButton} title={"Material-Lotus"}/>
                                {leftDrawer}
                                {this.props.children}
                                </Paper>
                            </Theme>
                        </Palette>
                    </Palette>
                </Palette>
                </CommonFunctions>
                </Device>
        ) : this.props.children;

        return component;
    }
}

export default App;
