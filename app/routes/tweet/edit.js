import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor( 'tweet' );
  },

  setupController( controller, model ) {
    this._super( controller, model );

    controller.set( 'scheduled', new Date( model.get( 'scheduled' ) ) );

    controller.set( 'statuses', [
      'scheduled',
      'posted'
    ] );
  },

  actions: {
    willTransition( transition ) {
      if ( this.currentModel.get( 'hasDirtyAttributes' ) ) {
        if ( confirm( 'You have unsaved changes. Do you wish to proceed?' ) ) {
          this.currentModel.rollbackAttributes();

          return true;

        /* eslint no-else-return: "off" */
        } else {
          transition.abort();
        }
      } else {
        return true;
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
      this.transitionTo( 'tweet', this.currentModel );
    },

    destroy() {
      const m = this.currentModel;

      if ( confirm( 'This cannot be undone.  Do you wish to proceed?' ) ){
        m.destroyRecord().then( () => {
          this.transitionTo( 'tweets' );
        });
      }
    }
  }
});
