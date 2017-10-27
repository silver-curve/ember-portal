import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route("portals", function() {
    this.route('example', function() {
      this.route('bar', function() {
        this.route('baz');
      });
      this.route('foo');
    });
  });
  this.route('noportals', function() {
    this.route('foo');
  });
});

export default Router;
