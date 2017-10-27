import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance | portal', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /portals/example', function(assert) {
  visit('/portals/example');

  andThen(function() {
    assert.equal(find(".header").length, 1, 'Has 1 header');
    assert.equal(find(".footer").length, 1, 'Has 1 footer');

    assert.equal(find("#examples-header").length, 1, 'Shows the example header');
    assert.equal(find("#examples-footer").length, 1, 'Shows the example footer');
  });
});

test('visiting /portals/example/foo', function(assert) {
  visit('/portals/example/foo');

  andThen(function() {
    assert.equal(find(".header").length, 1, 'Has 1 header');
    assert.equal(find(".footer").length, 1, 'Has 1 footer');

    assert.equal(find("#foo-header").length, 1, 'Shows the foo header');
    assert.equal(find("#examples-footer").length, 1, 'Shows the example footer');
  });
});


test('visiting /portals/example/bar', function(assert) {
  visit('/portals/example/bar');

  andThen(function() {
    assert.equal(find(".header").length, 1, 'Has 1 header');
    assert.equal(find(".footer").length, 1, 'Has 1 footer');

    assert.equal(find("#examples-header").length, 1, 'Shows the example header');
    assert.equal(find("#bar-footer").length, 1, 'Shows the bar footer');
  });
});

test('cleans up when leaving page', function(assert) {
  assert.expect(0);
  visit('/portals/example/foo');

  andThen(function() {
    // throws errors in Ember 2.16 without bugfix
    visit('/noportals/foo');
  });
});

test('visiting /portals/example/bar/baz', function(assert) {
  visit('/portals/example/bar/baz');

  andThen(function() {
    assert.equal(find(".header").length, 1, 'Has 1 header');
    assert.equal(find(".footer").length, 1, 'Has 1 footer');

    assert.equal(find("#baz-header").length, 1, 'Shows the baz header');
    assert.equal(find("#baz-footer").length, 1, 'Shows the baz footer');
  });
});


test('can give portals classes', function(assert) {
  visit('/portals/example');

  andThen(function() {
    assert.equal(find("#ember-portal--header.header-portal").length, 1, 'header has a custom class');
    assert.equal(find("#ember-portal--footer.footer-portal").length, 1, 'footer has a custom class');
  });
});

test('should be without deprecation warnings', function(assert) {
  assert.expect(0);
  raiseOnDeprecations(function() {
    visit('/noportals/foo'); // start and finish with no portals
    visit('/portals/example');
    visit('/portals/example/foo');
    visit('/portals/example/bar');
    visit('/portals/example/bar/baz');
    visit('/noportals/foo');
  });
});

function raiseOnDeprecations(fn) {
  Ember.ENV.RAISE_ON_DEPRECATION = true;
  fn();
  andThen(function() {
    Ember.ENV.RAISE_ON_DEPRECATION = false;
  });
}