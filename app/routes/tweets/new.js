import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord( 'tweet' );
  },

  setupController( controller, model ) {
    this._super( controller, model );

    controller.set( 'statuses', [
      'scheduled',
      'posted'
    ] );
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
      const d = new Date( this.currentModel.get( 'scheduled' ) );

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
