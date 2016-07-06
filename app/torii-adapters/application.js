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

    const adapter = getOwner( this ).lookup( 'adapter:application' );

    adapter.set( 'headers', { 'access-token': localStorage.token });

    Ember.$.ajaxSetup({
      beforeSend( xhr ) {
        xhr.withCredentials = true;
        xhr.setRequestHeader( 'access-token', localStorage.token );
      }
    });

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

    adapter.set( 'headers', { 'access-token': localStorage.token });

    Ember.$.ajaxSetup({
      beforeSend( xhr ) {
        xhr.withCredentials = true;
        xhr.setRequestHeader( 'access-token', localStorage.token );
      }
    });

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
    adapter.set( 'headers', { 'access-token': authToken });

    Ember.$.ajaxSetup({
      beforeSend( xhr ) {
        xhr.withCredentials = true;
        xhr.setRequestHeader( 'access-token','' );
      }
    });

    return new Ember.RSVP.Promise( function( resolve, reject ) {
      Ember.$.ajax({
        url: '/logout',
        headers: {
          'access-token': authToken
        },
        type: 'POST',
        success: Ember.run.bind( null, resolve ),
        error: Ember.run.bind( null, reject )
      });
    });
  }
});
