import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord( 'tweet' );
  },

  actions: {
    willTransition( transition ) {
      if ( !confirm( 'You have unsaved changes. Do you wish to proceed?' ) && this.currentModel.get( 'hasDirtyAttributes' ) ) {
        transition.abort();
      } else {
        this.currentModel.destroyRecord().then( () => {
          return true;
        });
      }
    },

    submit() {
      const m = this.currentModel;
      const d = new Date( this.controller.get( 'scheduled' ) );

      m.set( 'scheduled', d );

      m.save().then( r => {
        this.transitionTo( 'tweet', r );
      });
    },

    cancel() {
      this.transitionTo( 'tweets' );
    }
  }
});
