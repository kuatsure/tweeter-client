import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';
import EmberValidations, { validator } from 'ember-validations';

export default Model.extend( EmberValidations, {
  message: attr( 'string' ),
  scheduled: attr( 'date' ),
  status: attr( 'string', {
    defaultValue() { return 'scheduled'; }
  }),
  createdAt: attr( 'date', {
    defaultValue() { return new Date(); }
  }),

  validations: {
    message: {
      presence: true,
      length: {
        maximum: 140
      }
    },

    scheduled: {
      presence: true,
      inline: new validator( function() {
        if ( this.get( this.property ) < new Date() ) {
          return 'date cannot be set in the past';
        }
      })
    }
  }
});
