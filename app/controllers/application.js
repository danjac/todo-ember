import Ember from 'ember';


export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  torii: Ember.inject.service('torii'),
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    },
    login() {
      this.get('torii')
      .open('linked-in-oauth2')
      .then(authData => {
        return this.get('session').authenticate('authenticator:drf-token-authenticator', authData.authorizationCode, authData.provider);
      })
      .catch(reason => console.log(reason));
    }
  }
});
