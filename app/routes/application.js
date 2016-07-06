import Ember from 'ember';

const { Logger, inject } = Ember;

export default Ember.Route.extend({
  session: inject.service(),

  beforeModel() {
    return this.get( 'session' ).fetch().then( () => {
      Logger.info( 'session fetched' );

    }, error => {
      Logger.error( error );

      this.transitionTo( 'application' );
    });
  },

  redirect( model, transition ) {
    if ( this.get( 'session.currentUser' ) && transition.targetName === 'application' ) {
      this.transitionTo( 'tweets' );
    }
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

      this.transitionTo( 'application' );
    }
  }
});
