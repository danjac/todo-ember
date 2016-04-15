import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  session: Ember.inject.service('session'),
  authorize(sessionData, block) {
    const token = sessionData.attributes && sessionData.attributes.token;
    if(this.get('session.isAuthenticated') && !Ember.isEmpty(token)) {
      block('Authorization', 'Token ' + token);
    }
  }
});
