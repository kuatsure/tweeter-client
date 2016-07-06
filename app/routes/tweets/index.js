import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll( 'tweet' ).then( tweets => {
      return tweets.sortBy( 'scheduled' );
    });
  },

  actions: {
    gotoTweet( t ) {
      if ( t.get( 'status' ) === 'posted' ) {
        this.transitionTo( 'tweet', t );
      } else {
        this.transitionTo( 'tweet.edit', t );
      }
    }
  }
});
