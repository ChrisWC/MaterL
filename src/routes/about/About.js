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
import s from './About.css';

const title = 'React Starter Kit';

function About(props, context) {
  return (
    <div style={{display:'inline-block', width:'100%'}}>
        <p>This is a project implementing Google's Material Specification</p>
    </div>
  );
}


export default withStyles(s)(About);
