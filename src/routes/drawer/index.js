import React from 'react';
import DrawerRoute from './Drawer';
import fetch from '../../core/fetch';

export default {

  path: '/drawer',

  async action() {
    return <DrawerRoute />;
  },

};
