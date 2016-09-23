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
import CardActions from '../../components/Material/Card/CardActions';
import CardMedia from '../../components/Material/Card/CardMedia';

import Icon from '../../components/Material/Icon'
import Choice from '../../components/Material/Choice'
const title = 'React Starter Kit';

import ResponsiveUI from '../../components/Material/Sheet/ResponsiveUI'
function Route({}, context) {
  context.setTitle(title);
  return (
    <div>
        <ResponsiveUI responsive={true}>
        <Card style={{width:"200px"}}>
            <CardTitle title={"A Simple Text Card"}/>
            <CardBody>
                <p>A Card can be simply made out of text. This text
                should have 16px empty space between title and the beginning of the
                description. The specification also specifies that if nothing is 
                below this element then there should be 24px of padding.</p>
            </CardBody>
        </Card>
        <Card>
            <CardTitle title={"Squirrel"}/>
            <CardMedia src={"http://www.livescience.com/images/i/000/025/221/original/squirrel.jpg?interpolation=lanczos-none&downsize=*:1000"}/>
            <CardBody>
                <p>
                    This is mean to be an area in which you 
                    can describe the card. You may use other
                    components within the CardBody. But, should
                    follow the conventions set out in the 
                    specification
                </p>
            </CardBody>
            <CardActions>
                <Button label="Action 1" priority={"primary"}/>
                <Button label="Action 2" priority={"primary"}/>
            </CardActions>
        </Card>
        <Card>
            <CardTitle title={"Squirrel"} subtitle={"A Fierce Beast"}/>
            <CardMedia src={"http://www.livescience.com/images/i/000/025/221/original/squirrel.jpg?interpolation=lanczos-none&downsize=*:1000"}/>
            <CardBody>
                    This is mean to be an area in which you 
                    can describe the card. You may use other
                    components within the CardBody. But, should
                    follow the conventions set out in the 
                    specification.
                    This text should be revealed by scrolling.
                    dfsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasd
                    aafffffffffffffffffffffffffffffff
                    dsafffffffffffffffffffffffffffffffff
                    asdffffffffffffffffff
                    asdffffffffffffffffffffffffffffffffffff
                    adsfffffffffffffffffff
            </CardBody>
            <CardActions>
                <Button label="Action 1" priority={"primary"}/>
                <Button label="Action 2" priority={"primary"}/>
            </CardActions>
        </Card>
        <Card>
            <CardTitle title={"Squirrel"} subtitle={"A Fierce Beast"} 
                avatar={"http://www.livescience.com/images/i/000/025/221/original/squirrel.jpg?interpolation=lanczos-none&downsize=*:1000"}/>
            <CardMedia />
            <CardBody>
                <p>
                    This is mean to be an area in which you 
                    can describe the card. You may use other
                    components within the CardBody. But, should
                    follow the conventions set out in the 
                    specification.
                </p>
            </CardBody>
            <CardActions>
                <Button label="Action 1" priority={"primary"}/>
                <Button label="Action 2" priority={"primary"}/>
            </CardActions>
        </Card>
        <Card>
            <CardTitle title={"Squirrel"} 
                avatar={"http://www.livescience.com/images/i/000/025/221/original/squirrel.jpg?interpolation=lanczos-none&downsize=*:1000"}/>
            <CardMedia />
            <CardBody>
                <p>
                    This is mean to be an area in which you 
                    can describe the card. You may use other
                    components within the CardBody. But, should
                    follow the conventions set out in the 
                    specification
                </p>
            </CardBody>
            <CardActions>
                <Button label="Action 1" priority={"primary"}/>
                <Button label="Action 2" priority={"primary"}/>
            </CardActions>
        </Card>
        </ResponsiveUI>
    </div>
  );
}

Route.propTypes = {
};
Route.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Route);
