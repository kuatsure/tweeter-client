import Ember from 'ember';

const { Logger, inject } = Ember;

export default Ember.Route.extend({
  session: inject.service(),

  beforeModel() {
    return this.get( 'session' ).fetch().then( () => {
      Logger.info( 'session fetched' );

    }, error => {
      Logger.error( error );
    });
  },

  actions: {
    signIn() {
      this.get( 'session' ).open( 'twitter' ).then( () => {
        this.transitionTo( 'tweets' );

      }, error  => {
        Logger.error( error );
      });
    },

    signOut() {
      this.get( 'session' ).close();
    }
  }
});
