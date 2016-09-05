/**
 * Uses Breakpoint information to determine size of elements
 */

import React, { PropTypes } from 'react';

class Component extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
        }
    }
    static propTypes = {
        title: PropTypes.string,
    };
    static defaultProps = {
    };
    static contextTypes = {
        theme: PropTypes.object,
        palette: PropTypes.object
    }
    render() {
        return(
            <div {...this.props}>
                {this.props.children}
            </div>
        );
    }
}


export default Component;
