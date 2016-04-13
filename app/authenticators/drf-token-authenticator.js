import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from 'todo-ember/config/environment';

export default Base.extend({
  restore(data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      if(Ember.isEmpty(data.token)){
        reject();
      } else {
        resolve(data);
      }
    });
  },
  authenticate(username, password) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        url: ENV.host + '/api-auth-token/',
        type: 'POST',
        data: JSON.stringify({
          username: username,
          password: password
        }),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json'
      })
      .then(response => {
        Ember.run(function() {
          resolve({ token: response.token });
        });
      }, xhr => {
        Ember.run(function() {
          reject(xhr.responseText);
        });
      });
    });
  }

});
