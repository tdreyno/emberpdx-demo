/**
 * The root namespace and app.
 */
Issues = Em.Application.create({
  /**
   * Our data store, used to fetch and store models.
   */
  store: DS.Store.create({
    revision: 4,
    adapter: 'DS.IssuesRESTAdapter'
  }),
  
  /**
   * App-wide ready event.
   */
  ready: function() {
    // Setup our primary/only controller with some data
    Issues.set('applicationController', Issues.ApplicationController.create({
      user: Issues.User.find('tdreyno')
    }));
  }
});