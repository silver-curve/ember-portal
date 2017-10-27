import Component from 'ember-component';
import service from 'ember-service/inject';
import computed from 'ember-computed';
import portalIdForName from '../utils/portal-id';

export default Component.extend({

  portalService: service("portal"),

  for: "default",

  items: computed("for", {
    get() {
      return this.get("portalService").itemsFor(this.get("for"));
    }
  }),

  wormholeName: computed("for", {
    get() {
      return portalIdForName(this.get("for"));
    }
  }),

  showingPortalItem: computed("items.length", {
    get() {
      return this.get("items.lastObject") === this;
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    this.setupWormholeElement();
    this.get("portalService").addPortalContent(this.get("for"), this);
  },

  willDestroyElement() {
    this.get("portalService").removePortalContent(this.get("for"), this);
    this._super(...arguments);
  },

  setupWormholeElement() {
    const id = this.get("wormholeName");
    if (document.getElementById(id)) {
      return;
    }

    const rootEl       = document.body;
    const stackElement = document.createElement('div');
    stackElement.id    = id;
    stackElement.style.display = 'none';

    rootEl.appendChild(stackElement);
  }

});
