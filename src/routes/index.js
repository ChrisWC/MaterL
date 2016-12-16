/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import App from '../components/App';

import configureStore from '../stores/ConfigureStore'
const store = configureStore();
// Child routes
import home from './home';
import contact from './contact';
import login from './login';
import register from './register';
import content from './content';
import error from './error';
import about from './about';
import button from './button';
import icon from './icon';
import drawer from './drawer';
import appbar from './appbar';
import menu from './menu';
import paper from './paper';
import choice from './choice';
import bar_decor from './bar_decor';
import popover from './popover';
import text_field from './text_field';
import card from './card';
import shadows from './shadows';
import demo_guide from './demo_guide';
import device from './device';
import responsive_ui from './responsive_ui';
import structure from './structure';
import upcoming from './upcoming';
import slider from './slider';
import empty_cell_list from './empty_cell_list'
import tree from './tree'
import expansion_panel from './expansion_panel'
import data_table from './data_table'
import graph from './graph';
import { Provider } from 'react-redux';
import mcw from './mcw';
export default {

  path: '/',

  children: [
    home,
    mcw,
    responsive_ui,
    data_table,
    expansion_panel,
    empty_cell_list,
    slider,
    tree,
    upcoming,
    structure,
    button,
    card,
    device,
    shadows,
    demo_guide,
    bar_decor,
    text_field,
    drawer,
    appbar,
    graph,
    menu,
    icon,
    about,
    contact,
    login,
    paper,
    popover,
    choice,
    register,
    content,
    error,
  ],

  async action({ next, render, context }) {
    const component = await next();
    if (component === undefined) return component;
    return render(
        <Provider store={store}>
            <App context={context}>{component}</App>
        </Provider>
    );
  },
};
