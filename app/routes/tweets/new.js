import Ember from 'ember';

const { Logger } = Ember;

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
          }).catch( error => {
            Logger.error( error );
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

      m.validate().then( () => {
        m.save().then( r => {
          this.transitionTo( 'tweet', r );

        }).catch( error => {
          Logger.error( error );
        });

      }).catch( error => {
        Logger.error( error );
      });
    },

    cancel() {
      this.transitionTo( 'tweets' );
    }
  }
});
