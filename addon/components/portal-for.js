import Component from 'ember-component';
import portalIdForName from '../utils/portal-id';

export default Component.extend({
  name: 'default',

  'portal-class': null,

  portalElement() {
    const elementID = portalIdForName(this.get("name"));
    let element = document.getElementById(elementID);

    if (!element) {
      element = document.createElement('div');
      element.id = elementID;
    }

    return element;
  },

  didInsertElement() {
    this._super(...arguments);

    const portal = this.portalElement();
    portal.style.display = null;

    const portalClass = this.get("portal-class");
    if (portalClass && !portal.className) {
      portal.className = portalClass;
    }

    this._oldParent = portal.parentNode || document.body;
    this._portal = portal;

    const element = this.get("element");
    element.appendChild(portal);
  },

  willDestroyElement() {
    const portal = this._portal;
    portal.style.display = 'none';
    this._oldParent.appendChild(portal);
    this._super(...arguments);
  }

});
