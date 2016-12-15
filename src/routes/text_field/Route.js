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
import s from './Route.css';
import Image from '../../components/Lotus/Image'

import Menu from '../../components/Material/Menu/';
import Button from '../../components/Material/Button';
import PopOver from '../../components/Material/PopOver';
import BarDecor from '../../components/Material/BarDecor';
import ArcDecor from '../../components/Material/ArcDecor';
import Card from '../../components/Material/Card';
import CardTitle from '../../components/Material/Card/CardTitle';
import CardBody from '../../components/Material/Card/CardBody';

import Icon from '../../components/Material/Icon'
import TextField from '../../components/Material/TextField'
const title = 'React Starter Kit';

function Route({}, context) {
  context.setTitle(title);
  return (
    <div className={s.root}>
        <div className={s.container}>
            <h1>Text Fields</h1>
            <p>
                Under the Material Specification, text-fields and text-boxes are
                the same. There function is instead determined by its parameters.
            </p>
            <TextField value="More Text" hintText="Text" floatingHintText="A Text Field"/><Button icon={<Icon component={"create"}/>} label={"A Button"} priority={"primary"}/>
            <h3>
                Disabled
            </h3>
            <div style={{position:'relative'}}>
            <TextField value="MOre" hintText="Disabled" floatingHintText="Disabled" disabled={false} icon={<Icon component={"create"}/>}/><Button raised={true} icon={<Icon component={"create"}/>} label={"A Button"} priority={"primary"}/><Button label={"A Button"} priority={"primary"}/>
            </div>
            <h3>
                Inline
            </h3>
            <section>
                <TextField hintText="Username" floatingHintText="Enter Username" helpText="Sample help text"/><br />
                <TextField value="password" password={true} hintText="Password" floatingHintText="Enter Password"/><br />
            </section>
            <section>
                <p>TextField as a selector:</p>
                <TextField dropdown={true} hintText="Fill suggestions" floatingHintText="Enter Text" 
                    getOptions={(val) => {
                        return ["Option 1", "Option 2", "Option 3"]
                    }}/><br />
            </section>
            <section>
                <h2>Multi-Line Input</h2>
                <TextField multiline={true} hintText="Multi-line input" floatingHintText="Multi-line input"/>
            </section>
            <section>
                <h2>Full-width</h2>
                <Card style={{width:'600px'}}>
                    <TextField inline={true} hintText="Inline" floatingHintText="Inline" helpText="single line"/>
                    <TextField inline={true} multiline={true} hintText="Multi-line" floatingHintText="Multi-line"/>
                </Card>
            </section>
        </div>
    </div>
  );
}

Route.propTypes = {
};
Route.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Route);
