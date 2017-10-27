import Controller from 'ember-controller';

export default Controller.extend({

  showingHeader: true,
  showingFooter: true,

  actions: {
    clicked() {
      window.alert("clicked");
    },
    
    toggleHeader() {
      this.toggleProperty("showingHeader");
    },

    toggleFooter() {
      this.toggleProperty("showingFooter");
    }
  }
});
