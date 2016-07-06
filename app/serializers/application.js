import RESTSerializer from 'ember-data/serializers/rest';

export default RESTSerializer.extend({
  normalizeFindRecordResponse( store, type, payload ) {
    return {
      data: {
        id: payload.id,
        type: type.modelName,
        attributes: {
          name: payload.name,
          picture: payload.picture
        }
      }
    };
  }
});
