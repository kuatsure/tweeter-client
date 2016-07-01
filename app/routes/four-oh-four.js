import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error( error ) {
      Ember.Logger.error( error );

      this.transitionTo( 'four-oh-four' );
    }
  }
});
