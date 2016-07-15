import React from 'react';
import Route from './Route';
import fetch from '../../core/fetch';

export default {

  path: '/demo_guide',

  async action() {
    return <Route />;
  },

};
