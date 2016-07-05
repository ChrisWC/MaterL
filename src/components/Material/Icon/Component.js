/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Image from '../../Lotus/Image'
import Isvg from 'react-inlinesvg';

const icons = {
    svg: {
        '18px':{
            'navigation':{
                'apps':require('material-design-icons/navigation/svg/production/ic_apps_18px.svg'),
                'arrow_back':require('material-design-icons/navigation/svg/production/ic_arrow_back_18px.svg'),
                'arrow_downward':require('material-design-icons/navigation/svg/production/ic_arrow_downward_24px.svg'),
                'arrow_drop_down':require('material-design-icons/navigation/svg/production/ic_arrow_drop_down_18px.svg'),
                'cancel':require('material-design-icons/navigation/svg/production/ic_cancel_18px.svg'),
                'check':require('material-design-icons/navigation/svg/production/ic_check_18px.svg'),
                'chevron_left':require('material-design-icons/navigation/svg/production/ic_chevron_left_18px.svg'),
                'chevron_right':require('material-design-icons/navigation/svg/production/ic_chevron_right_18px.svg'),
                'close':require('material-design-icons/navigation/svg/production/ic_close_18px.svg'),
                'expand_less':require('material-design-icons/navigation/svg/production/ic_expand_less_18px.svg'),
                'expand_more':require('material-design-icons/navigation/svg/production/ic_expand_more_18px.svg'),
                'first_page':require('material-design-icons/navigation/svg/production/ic_first_page_24px.svg'),
                'fullscreen':require('material-design-icons/navigation/svg/production/ic_fullscreen_18px.svg'),
                'fullscreen_exit':require('material-design-icons/navigation/svg/production/ic_fullscreen_exit_18px.svg'),
                'last_page':require('material-design-icons/navigation/svg/production/ic_last_page_24px.svg'),
                'menu':require('material-design-icons/navigation/svg/production/ic_menu_18px.svg'),
                'more_horiz':require('material-design-icons/navigation/svg/production/ic_more_horiz_18px.svg'),
                'more_vert':require('material-design-icons/navigation/svg/production/ic_more_vert_18px.svg'),
                'refresh':require('material-design-icons/navigation/svg/production/ic_refresh_18px.svg'),
                'subdirectory_arrow_left':require('material-design-icons/navigation/svg/production/ic_subdirectory_arrow_left_24px.svg'),
                'subdirectory_arrow_right':require('material-design-icons/navigation/svg/production/ic_subdirectory_arrow_right_24px.svg'),
                'unfold_less':require('material-design-icons/navigation/svg/production/ic_unfold_less_18px.svg'),
                'unfold_more':require('material-design-icons/navigation/svg/production/ic_unfold_more_18px.svg'),
            }
        },
        '24px':{
            'navigation':{
                'apps':require('material-design-icons/navigation/svg/production/ic_apps_24px.svg'),
                'arrow_back':require('material-design-icons/navigation/svg/production/ic_arrow_back_24px.svg'),
                'arrow_downward':require('material-design-icons/navigation/svg/production/ic_arrow_downward_24px.svg'),
                'arrow_drop_down':require('material-design-icons/navigation/svg/production/ic_arrow_drop_down_24px.svg'),
                'arrow_drop_down_circle':require('material-design-icons/navigation/svg/production/ic_arrow_drop_down_circle_24px.svg'),
                'arrow_drop_up':require('material-design-icons/navigation/svg/production/ic_arrow_drop_up_24px.svg'),
                'arrow_forward':require('material-design-icons/navigation/svg/production/ic_arrow_forward_24px.svg'),
                'arrow_upward':require('material-design-icons/navigation/svg/production/ic_arrow_upward_24px.svg'),
                'cancel':require('material-design-icons/navigation/svg/production/ic_cancel_24px.svg'),
                'check':require('material-design-icons/navigation/svg/production/ic_check_24px.svg'),
                'chevron_left':require('material-design-icons/navigation/svg/production/ic_chevron_left_24px.svg'),
                'chevron_right':require('material-design-icons/navigation/svg/production/ic_chevron_right_24px.svg'),
                'close':require('material-design-icons/navigation/svg/production/ic_close_24px.svg'),
                'expand_less':require('material-design-icons/navigation/svg/production/ic_expand_less_24px.svg'),
                'expand_more':require('material-design-icons/navigation/svg/production/ic_expand_more_24px.svg'),
                'first_page':require('material-design-icons/navigation/svg/production/ic_first_page_24px.svg'),
                'fullscreen':require('material-design-icons/navigation/svg/production/ic_fullscreen_24px.svg'),
                'fullscreen_exit':require('material-design-icons/navigation/svg/production/ic_fullscreen_exit_24px.svg'),
                'last_page':require('material-design-icons/navigation/svg/production/ic_last_page_24px.svg'),
                'menu':require('material-design-icons/navigation/svg/production/ic_menu_24px.svg'),
                'more_horiz':require('material-design-icons/navigation/svg/production/ic_more_horiz_24px.svg'),
                'more_vert':require('material-design-icons/navigation/svg/production/ic_more_vert_24px.svg'),
                'refresh':require('material-design-icons/navigation/svg/production/ic_refresh_24px.svg'),
                'subdirectory_arrow_left':require('material-design-icons/navigation/svg/production/ic_subdirectory_arrow_left_24px.svg'),
                'subdirectory_arrow_right':require('material-design-icons/navigation/svg/production/ic_subdirectory_arrow_right_24px.svg'),
                'unfold_less':require('material-design-icons/navigation/svg/production/ic_unfold_less_24px.svg'),
                'unfold_more':require('material-design-icons/navigation/svg/production/ic_unfold_more_24px.svg'),
            },
            'toggle':{
                'check_box':require('material-design-icons/toggle/svg/production/ic_check_box_24px.svg'),
                'check_box_outline_blank':require('material-design-icons/toggle/svg/production/ic_check_box_outline_blank_24px.svg'),
                'indeterminate_check_box':require('material-design-icons/toggle/svg/production/ic_indeterminate_check_box_24px.svg'),
                'radio_button_checked':require('material-design-icons/toggle/svg/production/ic_radio_button_checked_24px.svg'),
                'radio_button_unchecked':require('material-design-icons/toggle/svg/production/ic_radio_button_unchecked_24px.svg'),
                'star':require('material-design-icons/toggle/svg/production/ic_star_24px.svg'),
                'star_border':require('material-design-icons/toggle/svg/production/ic_star_border_24px.svg'),
                'star_half':require('material-design-icons/toggle/svg/production/ic_star_half_24px.svg')
            }
        },
        '36px':{
            'navigation':{
                'apps':require('material-design-icons/navigation/svg/production/ic_apps_36px.svg'),
                'arrow_back':require('material-design-icons/navigation/svg/production/ic_arrow_back_36px.svg'),
                'arrow_downward':require('material-design-icons/navigation/svg/production/ic_arrow_downward_24px.svg'),
                'arrow_drop_down':require('material-design-icons/navigation/svg/production/ic_arrow_drop_down_36px.svg'),
                'cancel':require('material-design-icons/navigation/svg/production/ic_cancel_36px.svg'),
                'check':require('material-design-icons/navigation/svg/production/ic_check_36px.svg'),
                'chevron_left':require('material-design-icons/navigation/svg/production/ic_chevron_left_36px.svg'),
                'chevron_right':require('material-design-icons/navigation/svg/production/ic_chevron_right_36px.svg'),
                'close':require('material-design-icons/navigation/svg/production/ic_close_36px.svg'),
                'expand_less':require('material-design-icons/navigation/svg/production/ic_expand_less_36px.svg'),
                'expand_more':require('material-design-icons/navigation/svg/production/ic_expand_more_36px.svg'),
                'first_page':require('material-design-icons/navigation/svg/production/ic_first_page_24px.svg'),
                'fullscreen':require('material-design-icons/navigation/svg/production/ic_fullscreen_36px.svg'),
                'fullscreen_exit':require('material-design-icons/navigation/svg/production/ic_fullscreen_exit_36px.svg'),
                'last_page':require('material-design-icons/navigation/svg/production/ic_last_page_24px.svg'),
                'menu':require('material-design-icons/navigation/svg/production/ic_menu_36px.svg'),
                'more_horiz':require('material-design-icons/navigation/svg/production/ic_more_horiz_36px.svg'),
                'more_vert':require('material-design-icons/navigation/svg/production/ic_more_vert_36px.svg'),
                'refresh':require('material-design-icons/navigation/svg/production/ic_refresh_36px.svg'),
                'subdirectory_arrow_left':require('material-design-icons/navigation/svg/production/ic_subdirectory_arrow_left_24px.svg'),
                'subdirectory_arrow_right':require('material-design-icons/navigation/svg/production/ic_subdirectory_arrow_right_24px.svg'),
                'unfold_less':require('material-design-icons/navigation/svg/production/ic_unfold_less_36px.svg'),
                'unfold_more':require('material-design-icons/navigation/svg/production/ic_unfold_more_36px.svg'),
            }
        },
        '48px':{
            'navigation':{
                'apps':require('material-design-icons/navigation/svg/production/ic_apps_48px.svg'),
                'arrow_back':require('material-design-icons/navigation/svg/production/ic_arrow_back_48px.svg'),
                'arrow_downward':require('material-design-icons/navigation/svg/production/ic_arrow_downward_48px.svg'),
                'arrow_drop_down':require('material-design-icons/navigation/svg/production/ic_arrow_drop_down_48px.svg'),
                'cancel':require('material-design-icons/navigation/svg/production/ic_cancel_48px.svg'),
                'check':require('material-design-icons/navigation/svg/production/ic_check_48px.svg'),
                'chevron_left':require('material-design-icons/navigation/svg/production/ic_chevron_left_48px.svg'),
                'chevron_right':require('material-design-icons/navigation/svg/production/ic_chevron_right_48px.svg'),
                'close':require('material-design-icons/navigation/svg/production/ic_close_48px.svg'),
                'expand_less':require('material-design-icons/navigation/svg/production/ic_expand_less_48px.svg'),
                'expand_more':require('material-design-icons/navigation/svg/production/ic_expand_more_48px.svg'),
                'first_page':require('material-design-icons/navigation/svg/production/ic_first_page_48px.svg'),
                'fullscreen':require('material-design-icons/navigation/svg/production/ic_fullscreen_48px.svg'),
                'fullscreen_exit':require('material-design-icons/navigation/svg/production/ic_fullscreen_exit_48px.svg'),
                'last_page':require('material-design-icons/navigation/svg/production/ic_last_page_48px.svg'),
                'menu':require('material-design-icons/navigation/svg/production/ic_menu_48px.svg'),
                'more_horiz':require('material-design-icons/navigation/svg/production/ic_more_horiz_48px.svg'),
                'more_vert':require('material-design-icons/navigation/svg/production/ic_more_vert_48px.svg'),
                'refresh':require('material-design-icons/navigation/svg/production/ic_refresh_48px.svg'),
                'subdirectory_arrow_left':require('material-design-icons/navigation/svg/production/ic_subdirectory_arrow_left_48px.svg'),
                'subdirectory_arrow_right':require('material-design-icons/navigation/svg/production/ic_subdirectory_arrow_right_48px.svg'),
                'unfold_less':require('material-design-icons/navigation/svg/production/ic_unfold_less_48px.svg'),
                'unfold_more':require('material-design-icons/navigation/svg/production/ic_unfold_more_48px.svg'),
            }
        }
    }
}
class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                color:'white',
                display:'inline-block',
                position:'relative'
            }
        }
    }
    static propTypes = {
        resolution:PropTypes.string,
        context:PropTypes.string,
        component:PropTypes.string
    };
    static defaultProps = {
        resolution:'18px',
    };
    getIcon = () => {
        var icon = icons.svg[this.props.resolution]

        if (icon !== undefined) {
            icon = icon[this.props.context]
            if (icon !== undefined) {
                icon = icon[this.props.component]
                return icon
            }
        }
        return undefined
    }
    render() {
        return (
            <div style={this.state.style} onClick={this.props.onClick} icon="icon">
                {this.getIcon()? <Isvg src={this.getIcon()}/>:null}
            </div>
        );
    }
}


export default Component;
