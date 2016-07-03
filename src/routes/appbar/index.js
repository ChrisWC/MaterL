import React from 'react';
import AppbarRoute from './Appbar';
import fetch from '../../core/fetch';

export default {

  path: '/appbar',

  async action() {
    return <AppbarRoute />;
  },

};
