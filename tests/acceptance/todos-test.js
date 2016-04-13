import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Todo', {
  beforeEach: function() {
    application = startApp();
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /todos without data', function(assert) {
  visit('/todos');

  andThen(function() {
    assert.equal(currentPath(), 'todos.index');
    assert.equal(find('#blankslate').text().trim(), 'No Todos found');
  });
});

test('visiting /todos with data', function(assert) {
  server.create('todo');
  visit('/todos');

  andThen(function() {
    assert.equal(currentPath(), 'todos.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new todo', function(assert) {
  visit('/todos');
  click('a:contains(New Todo)');

  andThen(function() {
    assert.equal(currentPath(), 'todos.new');

    fillIn('label:contains(Label) input', 'MyString');
    fillIn('label:contains(Text) input', 'MyString');
    fillIn('label:contains(Done) input', false);

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing todo', function(assert) {
  server.create('todo');
  visit('/todos');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'todos.edit');

    fillIn('label:contains(Label) input', 'MyString');
    fillIn('label:contains(Text) input', 'MyString');
    fillIn('label:contains(Done) input', false);

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing todo', function(assert) {
  server.create('todo');
  visit('/todos');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'todos.show');

    assert.equal(find('p strong:contains(Label:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Text:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Done:)').next().text(), false);
  });
});

test('delete a todo', function(assert) {
  server.create('todo');
  visit('/todos');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'todos.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
