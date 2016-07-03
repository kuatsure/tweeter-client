import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord( 'tweet' );
  },

  actions: {
    willTransition( transition ) {
      if ( this.currentModel.get( 'hasDirtyAttributes' ) ) {
        if ( confirm( 'You have unsaved changes. Do you wish to proceed?' ) ) {
          this.currentModel.destroyRecord().then( () => {
            return true;
          });
        } else {
          transition.abort();
        }
      } else {
        return true;
      }
    },

    submit() {
      const m = this.currentModel;

      m.save().then( r => {
        this.transitionTo( 'tweet', r );
      });
    },

    cancel() {
      this.transitionTo( 'tweets' );
    }
  }
});
