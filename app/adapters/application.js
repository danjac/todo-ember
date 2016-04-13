import ENV from 'todo-ember/config/environment';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.host,
  namespace: 'api',
  authorizer: 'authorizer:drf-token-authorizer'
});
