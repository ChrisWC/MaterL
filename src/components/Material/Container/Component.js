/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Paper from '../Paper';

const width = {
    'window': {
        xsmall:[480],
        small:[600, 720, 840],
        medium:[960, 1024],
        large:[1280, 1440, 1600],
        xlarge:[1920]
    },
    'handset-portait':{

    },
    'handset-landscape':{

    },
    'tablet-portrait':{

    },
    'tablet-landscape':{

    }
}
class Container extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    static propTypes = {
        width: PropTypes.string,
        display: PropTypes.string
    };
    static defaultProps = {
        width: 'medium',
        display: 'window'
    };
    render() {
        return(
            <div style={style}>

            </div>
        );
    }
}


export default Component;
