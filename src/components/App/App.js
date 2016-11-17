/****************************************************************************
*   Copyright 2016 Christopher W. Catton
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
*****************************************************************************/

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
import Icon from '../Material/Icon';
import CommonFunctions from '../Material/CommonFunctions';
import Device from '../Material/Device';
import history from '../../core/history';
import TextField from '../Material/TextField';
import Sheet from '../Material/Sheet';
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
                    <Button icon={<Icon resolution={"24px"} component={"chevron_left"}/>} contextName="menu" role="header" label="MaterL" active={false} onClick={()=>{openLeftNavigation(!this.state.openLeftDrawer)}}/>
                    <Button contextName="menu" label="About Project" active={false} redirect={"/about"} />
                    <Button contextName="menu" label="Topics">
                        <Menu>
                            <Button contextName="menu" label="Creating Component Demo's" redirect={"/demo_guide"}/>
                        </Menu>
                    </Button>
                    <Button contextName="menu" label="Layout">
                        <Menu>
                            <Button contextName="menu" label="Structure" redirect={"/layout/structure"}/>
                            <Button contextName="menu" label="Responsive UI" redirect={"/layout/responsive-ui"}/>
                            <Button contextName="menu" label="Empty Cell List" redirect={"/layout/ecl"}/>
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
                            <Button contextName="menu" label="Appbar" active={false} redirect={"/appbar"} />
                            <Button contextName="menu" label="BarDecor" active={false} redirect={"/bar_decor"} />
                            <Button contextName="menu" label="Button" active={false} redirect={"/button"} />
                            <Button contextName="menu" label="Card" active={false} redirect={"/card"}/>
                            <Button contextName="menu" label="Choice" active={false} redirect={"/choice"} />
                            <Button contextName="menu" label="Device" active={false} redirect={"/device"} />
                            <Button contextName="menu" label="Drawer" active={false} redirect={"/drawer"} />
                            <Button contextName="menu" label="DataTable" active={false} redirect={"/data_table"} />
                            <Button contextName="menu" label="Expansion Panel" active={false} redirect={"/expansion_panel"} />
                            <Button contextName="menu" label="Graph" active={false} redirect={"/graph"} />
                            <Button contextName="menu" label="Menu" active={false} redirect={"/menu"} />
                            <Button contextName="menu" label="Paper" active={false} redirect={"/paper"} />
                            <Button contextName="menu" label="Icon" active={false} redirect={"/icon"} />
                            <Button contextName="menu" label="Slider" active={false} redirect={"/slider"} />
                            <Button contextName="menu" label="Text Field" active={false} redirect={"/text_field"}/>
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
                <Palette color={"cyan"} primary={"500"} secondary={"700"} default={"800"}>
                    <Palette priority={"default"} color={"grey"} primary={"50"} secondary={"200"} default={"400"}>
                        <Palette priority={"secondary"} color={"pink"} primary={"500"} secondary={"700"} default={"600"}>
                            <Theme>
                                <Sheet role={"body"}>
                                <AppBar icon={menuButton} title={"MaterL"} right={<div><TextField discreet={true} hintText={"Search"} 
                                    icon={<Icon resolution={"24px"} component={"search"}/>}
                                    dropdown={true} getOptions={(v) => {return ['Option 1', 'Option 2', 'Option 3']} }/>
                                    <Button icon={<Icon component={"filter_list"}/>}/>
                                    <Button icon={<Icon resolution={"24px"} component={"account_circle"}/>}/>
                                    </div>}/>
                                {leftDrawer}
                                {this.props.children}
                                </Sheet>
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
