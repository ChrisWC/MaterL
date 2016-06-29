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
import {grey800} from 'material-ui/styles/colors';
import Button from '../Material/Button';
import PopOver from '../Material/PopOver';
import Card from '../Material/Card';
import ColorPicker from '../Lotus/ColorPicker';
import Image from '../Lotus/Image';
import Palette from '../Material/Palette';
import Theme from '../Material/Theme';

import Icon from '../Material/Icon'

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


    const muiTheme = getMuiTheme({palette: {primary1Color: grey800}, userAgent: global.navigator.userAgent,});
    const wrapper = React.createElement(MuiThemeProvider, {muiTheme}, component);
    return wrapper
  }
  render() {
    const leftDrawer = (<Drawer open={this.state.openLeftDrawer} depth={1}>

            <Menu>
                <Button contextName="menu" label="Menu Button 1" active={false}/>
                <Button contextName="menu" label="Menu Button 2" active={false}/>
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
            <Palette primary="lightBlue" secondary="lightBlue">
                <Paper showShadows={false} fullscreen={true} role={"body"}>
                    <AppBar icon={menuButton} right={<Button label={"Hello!"} raised={true}/>}/>
                    {leftDrawer}
                        <Card title={"Menu"} width={"small-1"}>
                            <Menu style={{width:'200px'}}>
                                <Button contextName="menu" label="Menu Button"/>
                                <Button contextName="menu" label="Menu Button"/>
                            </Menu>
                        </Card>
                        <Card title={"Buttons and Popovers"} width={"small-0"}>
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
                        </Card>
                        {/*<Card title={"Lotus Color Picker"}>
                           <ColorPicker width={300} height={300}/> 
                        </Card>*/}
                        <Card title={"Material Icons"}>
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
                </Paper>
            </Palette>
        </Theme>
    ) : this.props.children;


    const muiTheme = getMuiTheme({palette: {primary1Color: grey800}, userAgent: global.navigator.userAgent,});
    const wrapper = React.createElement(MuiThemeProvider, {muiTheme}, component);
    return wrapper
  }

}

export default App;
