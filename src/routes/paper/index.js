import React from 'react';
import PaperRoute from './Paper';
import fetch from '../../core/fetch';

export default {

  path: '/paper',

  async action() {
    return <PaperRoute />;
  },

};
