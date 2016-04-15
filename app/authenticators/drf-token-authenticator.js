import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from 'todo-ember/config/environment';

export default Base.extend({
  restore(data) {
    const token = data.attributes && data.attributes.token;
    return new Ember.RSVP.Promise((resolve, reject) => {
      if(Ember.isEmpty(token)){
        reject();
      } else {
        resolve(data);
      }
    });
  },
  authenticate(code) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        url: ENV.host + '/api-login/social/token/',
        type: 'POST',
        data: {
          code: code,
          provider: "linkedin-oauth2"
        },
//contentType: 'application/json;charset=utf-8',
        dataType: 'json'
      })
      .then(response => {
        Ember.run(function() {
          resolve(response.data);
        });
      }, xhr => {
        Ember.run(function() {
          reject(xhr.responseText);
        });
      });
    });
  }

});
