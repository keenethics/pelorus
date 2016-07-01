// import './subscriptions.js';
import './set_user_language.js';
// import './router.js';
// // import './seo.js';
 import './language_on_login.js';
// import './global_helpers.js';
// import './subscriptions.js';

import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Pelorus from '/imports/ui/Pelorus';

Meteor.startup(() => {
  render(<Pelorus />, document.getElementById('render-target'));
});
