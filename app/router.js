import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('todos', function() {
    this.route('new');

    this.route('edit', {
      path: ':todo_id/edit'
    });

    this.route('show', {
      path: ':todo_id'
    });
  });
  this.route('login');
  this.route('register');
});

export default Router;
