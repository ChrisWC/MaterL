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
import Card from '../../components/Material/Card';
import DropDown from '../../components/Material/DropDown';
import CardTitle from '../../components/Material/Card/CardTitle';
import CardBody from '../../components/Material/Card/CardBody';
import TextField from '../../components/Material/TextField';
import Icon from '../../components/Material/Icon';
import Choice from '../../components/Material/Choice';
import ExpansionPanel from '../../components/Material/ExpansionPanel';
const title = 'Expansion Panel|Materi-L';

import ResponsiveUI from '../../components/Material/Sheet/ResponsiveUI'
function Route(props, context) {
  context.setTitle(title);
  return (
    <div>
        <h1>Expansion Panel</h1>
        <p>Button styling are affected by a number of conditions in the
        material spec. Currently, they do not take into account touch
        events; but should shortly</p>

        <ExpansionPanel title="Expansion Panel" subtitle="demo" expanded={false}>
            <h3>Test test test</h3>
        </ExpansionPanel>
        <ResponsiveUI responsive={true} numOfCols={12} columnSpan={12}> 
        <Card title={"Expansion Panel"} columnSpan={4}>
            <CardTitle title={"Flat Buttons"}/>
            <CardBody>
                <div>
                <p>This is an example of the Flat Button.</p>
                <Button label="Flat Button"></Button>
                </div>
                <Choice role="check" active={false}> Is Working </Choice><br/>
                <Choice role="check" active={false}> Has Correct Style </Choice>
            </CardBody>
            <ExpansionPanel title="Expansion Panel" subtitle="demo" expanded={false}>
                <h3>Test test test</h3>

            </ExpansionPanel>
            <ExpansionPanel title="Expansion Panel" value={"test"} expanded={false}>
                <h3>Test test test</h3>

            </ExpansionPanel>
            <ExpansionPanel title="Expansion Panel" subtitle="demo" input={<TextField incognito={true} hintText="name" floatingHintText="name"/>} expanded={false}>
                <TextField hintText="Firstname" floatingHintText="Firstname"/>
                <TextField hintText="Middlename" floatingHintText="Middlename"/>
                <TextField hintText="Lastname" floatingHintText="Lastname"/>
            </ExpansionPanel>
        </Card>
        <Card title={"Example Form"} columnSpan={6}>
            <CardTitle title={"Example Form"}/>
            <ExpansionPanel title="Name" input={<TextField hintText="name" floatingHintText="name"/>} expanded={false} value={"demo"}>
                <TextField hintText="Firstname" floatingHintText="Firstname"/><br />
                <TextField hintText="Middlename" floatingHintText="Middlename"/><br />
                <TextField hintText="Lastname" floatingHintText="Lastname"/><br />
            </ExpansionPanel>
            <ExpansionPanel title="Email" input={<TextField hintText="Email" floatingHintText="Email"/>} expanded={false}>
            </ExpansionPanel>
            <ExpansionPanel title="Location" input={<TextField hintText="Location" floatingHintText="Location"/>} expanded={false}>
                <TextField hintText="Street Number" floatingHintText="Street Number"/><br />
                <TextField hintText="Street Name" floatingHintText="Street Name"/><br />
                <TextField hintText="City" floatingHintText="City"/><br />
            </ExpansionPanel>
        </Card>
        </ResponsiveUI>
    </div>
  );
}

Route.propTypes = {
};
Route.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Route);
