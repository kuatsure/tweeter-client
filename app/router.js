/*eslint 'space-in-parens': 'off'*/
/*eslint 'array-callback-return': 'off'*/
/*eslint 'no-empty-function': 'off'*/

import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('tweets', { path: '/' }, function() {
    this.route('new', { path: '/tweet/new' });
  });
  this.route('tweet', { path: '/tweet/:tweet_id' }, function() {
    this.route('edit');
  });
  this.route('sign-in');
  this.route('four-oh-four', { path: '/*path' });
});

export default Router;
