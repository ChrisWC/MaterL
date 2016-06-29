/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
function Header() {
  return (
    <AppBar title="Login" iconElementRight={<span></span>}>
    </AppBar>
  );
}

export default withStyles(s)(Header);
