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
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
import Icon from '../Material/Icon'
import CommonFunctions from '../Material/CommonFunctions'

import history from '../../core/history';
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openLeftDrawer:true,
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
    const leftDrawer = (<Drawer open={this.state.openLeftDrawer} depth={1}>
            <Menu>
                <Button contextName="menu" label="About Project" active={false} redirect={"/about"} />
                <Button contextName="menu" label="Topics">
                    <Menu>
                        <Button contextName="menu" label="Creating Component Demo's"/>
                    </Menu>
                </Button>
                <Button contextName="menu" label="Style">
                    <Menu>
                        <Button contextName="menu" label="Shadow's"/>
                        <Button contextName="menu" label="Paper and Sheet's"/>
                    </Menu>
                </Button>
                <Button contextName="menu" label="Components" active={false}>
                    <Menu>
                        <Button contextName="menu" label="BarDecor" active={false} redirect={"/bar_decor"} />
                        <Button contextName="menu" label="Button" active={false} redirect={"/button"} />
                        <Button contextName="menu" label="Choice" active={false} redirect={"/choice"} />
                        <Button contextName="menu" label="Appbar" active={false} redirect={"/appbar"} />
                        <Button contextName="menu" label="Drawer" active={false} redirect={"/drawer"} />
                        <Button contextName="menu" label="Menu" active={false} redirect={"/menu"} />
                        <Button contextName="menu" label="Paper" active={false} redirect={"/paper"} />
                        <Button contextName="menu" label="Icon" active={false} redirect={"/icon"} />
                    </Menu>
                </Button>
                <Button contextName="menu" label="Material Spec">
                    <Menu>
                    <Button contextName="menu" label="Layout" active={false}>
                        <Menu>
                            <Button contextName="menu" label="Principles"/>
                            <Button contextName="menu" label="Units and measurements"/>
                            <Button contextName="menu" label="Metrics and keylines"/>
                            <Button contextName="menu" label="Responsive UI"/>
                            <Button contextName="menu" label="Split Screen"/>
                        </Menu>
                    </Button>
                    <Button contextName="menu" label="Components">
                        <Menu>
                            <Button contextName="menu" label="Bottom Navigation"/>
                            <Button contextName="menu" label="Bottom Sheets"/>
                            <Button contextName="menu" label="Buttons"/>
                            <Button contextName="menu" label="Buttons: Floating Action Buttons"/>
                            <Button contextName="menu" label="Cards"/>
                            <Button contextName="menu" label="Data Tables"/>
                            <Button contextName="menu" label="Dialogs"/>
                            <Button contextName="menu" label="Dividers"/>
                            <Button contextName="menu" label="Expansion Panels"/>
                            <Button contextName="menu" label="Grid List"/>
                            <Button contextName="menu" label="Lists"/>
                            <Button contextName="menu" label="Lists: Controls"/>
                            <Button contextName="menu" label="Menus"/>
                            <Button contextName="menu" label="Pickers"/>
                            <Button contextName="menu" label="Progress & activity"/>
                            <Button contextName="menu" label="Selection controls"/>
                            <Button contextName="menu" label="Sliders"/>
                            <Button contextName="menu" label="Snackbars & toasts"/>
                            <Button contextName="menu" label="Steppers"/>
                            <Button contextName="menu" label="Tabs"/>
                            <Button contextName="menu" label="Text Fields"/>
                            <Button contextName="menu" label="Toolbars"/>
                            <Button contextName="menu" label="Tooltips"/>
                        </Menu>
                    </Button>
                    </Menu>
                </Button>
                <Button contextName="menu" label="Layout" active={false}/>
            </Menu>
        </Drawer>)
    const menuButton = (
            <Button icon={<Icon resolution={"24px"} context={"navigation"} component={"menu"} onClick={()=>{
                    this.setState({openLeftDrawer:!this.state.openLeftDrawer})
                }
            } />}/>
    )
    const component =  !this.props.error ? (
            <CommonFunctions
                redirect={(e, redirect_location) => {
                    e.preventDefault();
                    history.push(redirect_location);
                }}>
            <Palette primary={"blue"} secondary={"amber"}>
                <Theme>
                    <Paper role={"body"}>>
                    <AppBar icon={menuButton} title={"CHRWC"}/>
                    {leftDrawer}
                    {this.props.children}
                    </Paper>
                </Theme>
            </Palette>
            </CommonFunctions>
    ) : this.props.children;


    //const muiTheme = getMuiTheme({palette: {primary1Color: grey800}, userAgent: global.navigator.userAgent,});
    //const wrapper = React.createElement(MuiThemeProvider, {muiTheme}, component);
    return component;
  }

}

export default App;
