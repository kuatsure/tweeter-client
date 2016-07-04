import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    submit() {
      return true;
    },

    cancel() {
      this.transitionTo( 'tweets' );
    }
  }
});
