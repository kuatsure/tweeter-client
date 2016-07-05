import Ember from 'ember';

const { getOwner } = Ember;

const rejectPromise = function() {
  return new Ember.RSVP.Promise( function( resolve, reject ) {
    reject( 'no code' );
  });
};

export default Ember.Object.extend({
  store: Ember.inject.service(),

  open( auth ) {
    if ( !auth.code ) {
      return rejectPromise();
    }

    localStorage.token = auth.code;
    localStorage.raw = JSON.stringify( auth );

    const adapter = getOwner( this ).lookup( 'adapter:application' );

    adapter.set( 'headers', { 'Authorization': localStorage.token });

    return this.get( 'store' ).find( 'user', 'me' ).then( function( user ) {
      return {
        currentUser: user
      };
    });
  },

  fetch() {
    if ( !localStorage.token ) {
      return rejectPromise();
    }

    const adapter = getOwner( this ).lookup( 'adapter:application' );

    adapter.set( 'headers', { 'Authorization': localStorage.token });
    console.log( localStorage.token );
    console.log( adapter );

    return this.get( 'store' ).find( 'user', 'me' ).then( function( user ) {
      return {
        currentUser: user
      };
    });
  },

  close() {
    const authToken = localStorage.token;
    const adapter = getOwner( this ).lookup( 'adapter:application' );

    localStorage.token = null;
    adapter.set( 'headers', { 'Authorization': authToken });

    return new Ember.RSVP.Promise( function( resolve, reject ) {
      Ember.$.ajax({
        url: '/logout',
        headers: {
          'Authorization': authToken
        },
        type: 'POST',
        success: Ember.run.bind( null, resolve ),
        error: Ember.run.bind( null, reject )
      });
    });
  }
});
