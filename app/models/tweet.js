import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  message: attr( 'string' ),
  scheduled: attr( 'date' ),
  status: attr( 'string', {
    defaultValue() { return 'scheduled'; }
  }),
  createdAt: attr( 'date', {
    defaultValue() { return new Date(); }
  })
});
