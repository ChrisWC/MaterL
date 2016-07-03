import React from 'react';
import ChoiceRoute from './Choice';
import fetch from '../../core/fetch';

export default {

  path: '/choice',

  async action() {
    return <ChoiceRoute />;
  },

};
