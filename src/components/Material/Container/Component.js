/****************************************************************************
*   Copyright 2016 Christopher W. Catton
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
*****************************************************************************/

import React, { PropTypes } from 'react';

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
