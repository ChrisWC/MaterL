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
import Appbar from 'material-ui/AppBar';

import Header from '../Header';
import AppBar from '../Material/AppBar/';
import Drawer from '../Material/Drawer/';
import Paper from '../Material/Paper/';
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

import Icon from '../Material/Icon'

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

  render2() {
    const component =  !this.props.error ? (
        <div className={s.page} >
            <Paper>
                <div>
                    <Paper>
                        <Paper width={'small-0'} backgroundColor='blue' check={true} popover={<Paper width={'small-0'} backgroundColor='green'/>}>
                            <div> Test 2</div>
                        </Paper>
                        <Paper width={'small-0'} backgroundColor='pink' check={true} popover={<Paper width={'small-0'} backgroundColor='green'/>}>
                            <div> Test 2</div>
                        </Paper>
                    </Paper>
                </div>
                <Paper width={'small-0'} backgroundColor='red' >
                    <div >Test 3</div>
                </Paper>
            </Paper>
        </div>
    ) : this.props.children;


  }
  render() {
    const leftDrawer = (<Drawer open={this.state.openLeftDrawer} depth={1}>
            <Menu>
                <Button contextName="menu" label="About Project" active={false} redirect={"/about"} />
                <Button contextName="menu" label="Components" active={false} redirect={"/"}>
                    <Menu>
                        <Button contextName="menu" label="Button" active={false} redirect={"/button"} />
                        <Button contextName="menu" label="Choice" active={false} redirect={"/choice"} />
                        <Button contextName="menu" label="Appbar" active={false} redirect={"/appbar"} />
                        <Button contextName="menu" label="Drawer" active={false} redirect={"/drawer"} />
                        <Button contextName="menu" label="Menu" active={false} redirect={"/menu"} />
                        <Button contextName="menu" label="Paper" active={false} redirect={"/paper"} />
                        <Button contextName="menu" label="Icon" active={false} redirect={"/icon"} />
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
        <Theme>
            <Palette primary="deepPurple" secondary="lightBlue">
                <Paper showShadows={false} fullscreen={true} role={"body"}>
                    <AppBar icon={menuButton} right={<Button label={"Donate"} raised={true}/>}/>
                    {leftDrawer}
                    {this.props.children}
                </Paper>
            </Palette>
        </Theme>
    ) : this.props.children;


    //const muiTheme = getMuiTheme({palette: {primary1Color: grey800}, userAgent: global.navigator.userAgent,});
    //const wrapper = React.createElement(MuiThemeProvider, {muiTheme}, component);
    return component;
  }

}

export default App;
