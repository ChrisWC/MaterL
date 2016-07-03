import React from 'react';
import About from './About';
import fetch from '../../core/fetch';

export default {

  path: '/about',

  async action() {
    return <About />;
  },

};
