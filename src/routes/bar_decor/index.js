import React from 'react';
import BarDecorRoute from './BarDecor';
import fetch from '../../core/fetch';

export default {

  path: '/bar_decor',

  async action() {
    return <BarDecorRoute />;
  },

};
