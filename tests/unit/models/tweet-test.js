import { moduleForModel, test } from 'ember-qunit';

moduleForModel('tweet', 'Unit | Model | tweet', {
  // Specify the other units that are required for this test.
  needs: [
    'ember-validations@validator:local/presence',
    'ember-validations@validator:local/length'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
