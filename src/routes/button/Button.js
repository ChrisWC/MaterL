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
import s from './Button.css';
import Image from '../../components/Lotus/Image'

import Menu from '../../components/Material/Menu/';
import Button from '../../components/Material/Button';
import PopOver from '../../components/Material/PopOver';
import Card from '../../components/Material/Card';
import DropDown from '../../components/Material/DropDown';
import CardTitle from '../../components/Material/Card/CardTitle';
import CardBody from '../../components/Material/Card/CardBody';

import Icon from '../../components/Material/Icon'
import Choice from '../../components/Material/Choice'

const title = 'Button|Materi-L';

import ResponsiveUI from '../../components/Material/Sheet/ResponsiveUI'
function ButtonRoute(props, context) {
  context.setTitle(title);
  return (
    <div>
        <div>
        <h1>Buttons</h1>
        <section>
        <p>Button styling are affected by a number of conditions in the
        material spec. Currently, they do not take into account touch
        events; but should shortly</p>
        </section>
        <section>
            <h3>Non-Dense, Flat, Primary and Secondary</h3>
            <Button label="Default"/>
            <Button label="Primary" priority={'primary'}/>
            <Button label="Secondary" priority={'secondary'}/>
        </section>
        <section>
            <h3>Non-Dense, Raised, Primary and Secondary</h3>
            <Button label="Default" raised={true} priority={'default'}/>
            <Button label="Secondary" raised={true} priority={'secondary'}/>
            <Button label="Primary" raised={true} priority={'primary'}/>
        </section>
        <section>
            <h3>Dense and Non-Dense, Flat, Secondary</h3>
            <Button label="Non-Dense" dense={false}/>
            <Button label="Dense" dense={true}/>
        </section>
        <section>
            <h3>Dense, Flat, Primary and Secondary</h3>
            <Button label="Default" primary={false} dense={true} priority={'default'}/>
            <Button label="Secondary" primary={false} dense={true} priority={'secondary'}/>
            <Button label="Primary" primary={true} dense={true} priority={'primary'}/>
        </section>
        <section>
            <h3>Dense, Raised, Primary and Secondary</h3>
            <Button label="Default" primary={false} dense={true} raised={true} priority={'default'}/>
            <Button label="Secondary" primary={false} dense={true} raised={true} priority={'secondary'}/>
            <Button label="Primary" primary={true} dense={true} raised={true} priority={'primary'}/>
        </section>
        <section>
            <h3>Button With Icon on Left</h3>
            <Button icon={<Icon component={"create"}/>} rightIcon={<Icon component={"create"}/>} label="Button" priority={'primary'} raised={true}/>
        </section>
        </div>

        <ResponsiveUI responsive={true} numOfCols={1}> 
        <Card title={"Flat Buttons"} width={"small-1"}>
            <CardTitle title={"Flat Buttons"}/>
            <CardBody>
                <div>
                <p>This is an example of the Flat Button.</p>
                <Button label="Flat Button"></Button>
                </div>
                <Choice role="check" active={false}> Is Working </Choice><br/>
                <Choice role="check" active={false}> Has Correct Style </Choice>
            </CardBody>
        </Card>
        <Card title={"Raised Buttons"} width={"small-1"}>
            <CardTitle title={"Raised Buttons"}/>
            <CardBody>
                <div>
                <p>This is an example of the Raised Button.</p>
                <Button label="Raised Button" raised={true}></Button>
                </div>
                <Choice role="check" active={false}> Is Working </Choice><br/>
                <Choice role="check" active={false}> Has Correct Style </Choice>
            </CardBody>
        </Card>
        <Card title={"Persistent Footer Buttons"} width={"small-1"}>
            <CardTitle title={"Persistent Footer Buttons"}/>
            <CardBody>
                <div>
                <p>This is an example of a Persistent Footer Button. Persistent Footer Buttons are to
                be used in Dialog or Screen Footer Contexts</p>
                <Button context={"footer"} label="Footer Button" raised={true}></Button>
                <Button context={"dialog"} label="Dialog Button" raised={true}></Button>
                </div>
            </CardBody>
        </Card>
        <Card title={"Dropdown Buttons"} width={"small-1"}>
            <CardTitle title={"Dropdown Buttons"}/>
            <CardBody>
                <div>
                <p>This is an example of a Dropdown Button. Dropdown buttons display multiple sections</p>
                <DropDown label={"dropdown"} raised={true} options={["Option 1", "Option 2", "Option 3"]}/>
                <Button context={"dialog"} label="Dialog Button" raised={true}></Button>
                <Button label="Primary" priority={'primary'} getfile={true}/>
                </div>
            </CardBody>
        </Card>
        <Card title={"Toggle Buttons"} width={"small-1"}>
            <CardTitle title={"Toggle Buttons"}/>
            <CardBody>
                <p>This is an example of a Toggle Button. Toggle buttons group related options.</p>
            </CardBody>
        </Card>
        <Card title={"Menu Context Buttons"} width={"small-1"}>
            <CardTitle title={"Menu Component"}/>
            <CardBody>
                <p>This is an example of the Menu Component.</p>
                <Menu style={{width:'200px'}}>
                    <Button contextName="menu" label="Menu Button"/>
                    <Button contextName="menu" label="Menu Button"/>
                </Menu>
            </CardBody>
        </Card>
        <Card title={"Buttons and Popovers"} width={"small-0"}>
            <CardTitle title={"Popover Component"}/>
            <CardBody>
            <p>Buttons come in several flavors in the Material spec. Our implementation uses props
            to allow users to specify which flavour they would like. We usea literal interpretation of a
            button as a component that reacts to a click.</p>
            <div>
            <Button label={"A BUTTON"} raised={false} primary={false} popover={
                <PopOver>
                    <Menu>
                        <Button contextName="menu" label="Menu Button"/>
                        <Button contextName="menu" label="Menu Button"/>
                    </Menu>
                </PopOver>}>
            </Button>
            <Button label={"A BUTTON"} raised={true} primary={true} popover={
                <PopOver role="popover">
                    <Menu>
                        <Button contextName="menu" label="Menu Button"/>
                        <Button contextName="menu" label="Menu Button"/>
                    </Menu>
                </PopOver>}>
            </Button>
            </div>
            </CardBody>
        </Card>
        </ResponsiveUI>
    </div>
  );
}

ButtonRoute.propTypes = {
};
ButtonRoute.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(ButtonRoute);
