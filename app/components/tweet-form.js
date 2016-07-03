import Ember from 'ember';

const { $ } = Ember;

export default Ember.Component.extend({
  didInsertElement() {
    $( 'input' ).attr( 'autocomplete', 'off' );
  }
});
