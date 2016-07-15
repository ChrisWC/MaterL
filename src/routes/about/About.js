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
    <div className={s.root}>
        <div className={s.container}>
            <h1> About </h1>
            <p>This project is currently under active development and many features have not begun being implemented
            or are not fully implemented. Due to its current status it has not been release to the public and will not be
            until it is stable, but feel free to fool around with it here. Documentation is not complete, but will exist 
            at this location and this website is included alongside the source code of project, but not in the npm package 
            meant to be included within other packages.</p>
            <p>This project is meant to implement Google's Material Specification with a number of additions for inclusion
            into ReactJS projects. This library is developed without the use of any routing library or flux implementation
            so it may be used in any project wanting to adopt it. Commonly desired functionality is able to be included for
            use within projects by using the function wrapper to define it.
            </p>
        </div>
    </div>
  );
}


export default withStyles(s)(About);
