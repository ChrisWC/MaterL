import React from 'react';
import Route from './Route';
import fetch from '../../core/fetch';

export default {

  path: '/visualize/tree',

  async action() {
    return <Route />;
  },
};
