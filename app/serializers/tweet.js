import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeFindRecordResponse( store, type, payload ) {
    return {
      data: {
        id: payload.tweet.id,
        type: type.modelName,
        attributes: {
          message: payload.tweet.message,
          createdAt: payload.tweet.created_at,
          scheduled: payload.tweet.scheduled,
          status: payload.tweet.status
        }
      }
    };
  }
});
