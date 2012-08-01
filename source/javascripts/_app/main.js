/**
 * The root namespace and app.
 */
Issues = Em.Application.create({
  
  Router: Em.Router.extend({
    root: Em.Route.extend({
      index: Em.Route.extend({
        route: '/',
        
        selectedOrg: Ember.Route.transitionTo('orgDetail'),
        
        connectOutlets: function(router) {
          var userController = router.get('userController');
          userController.set('content', Issues.User.find('tdreyno'));
          router.get('applicationController').connectOutlet('orgs', userController.get('orgs'));
        },
        
        orgsIndex: Em.Route.extend({
          route: '/'
        }),
        
        orgDetail: Em.Route.extend({
          route: '/:org_id',

          selectedRepo: Ember.Route.transitionTo('repoDetail'),

          connectOutlets: function(router, context) {
            router.get('orgsController').connectOutlet('repos', context.get('repos'));
          },

          reposIndex: Em.Route.extend({
            route: '/'
          }),
          
          repoDetail: Em.Route.extend({
            route: '/:repo_id',

            selectedIssue: Ember.Route.transitionTo('issueDetail'),

            connectOutlets: function(router, context) {
              router.get('reposController').connectOutlet('issues', context.get('issues'));
            },

            issuesIndex: Em.Route.extend({
              route: '/'
            }),

            issueDetail: Em.Route.extend({
              route: '/:issue_id',

              connectOutlets: function(router, context) {
                router.get('issuesController').connectOutlet('issueDetail', context);
              }
            })
          })
        })
      })
    })
  }),
  
  /**
   * Our data store, used to fetch and store models.
   */
  store: DS.Store.create({
    revision: 4,
    adapter: 'DS.IssuesRESTAdapter'
  }),
  
  ready: function () {
    // Preload
    var u = Issues.User.find('tdreyno');
    
    var self = this;
    Em.run.later(function() {
      u.get('orgs');
      
      Em.run.later(function() {
        self.initialize();
      }, 800);
    }, 800);
  }
});