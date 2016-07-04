import Ember from 'ember';

const { Logger } = Ember;

export default Ember.Route.extend({
  actions: {
    error( error ) {
      Logger.error( error );

      this.transitionTo( 'four-oh-four' );
    }
  }
});
