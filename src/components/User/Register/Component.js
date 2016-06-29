/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
import history from '../../../core/history';

import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    static propTypes = {
    };
    render() {
        return(
            <Card className={s.card}>
                <CardTitle title={"Register"} primary={true}/>
                <CardText>
                    <TextField hintText={"Username"}/><br/>
                    <TextField hintText={"Email Address"}/> <br/>
                    <TextField hintText={"Password"}/><br/>
                    <TextField hintText={"Password Re-enter"}/><br />
                </CardText>
                <CardActions>
                    <RaisedButton label={"Login"} primary={true}/>
                    <RaisedButton label={"Sign Up"}/>
                </CardActions>
            </Card>
        );
    }
}


export default withStyles(s)(Component);
