Issues = Em.Application.create({
  ApplicationController: Ember.Controller.extend({
    user: null,
    orgsBinding: 'user.orgs',
  // controller.set("issues", Issues.store.findAll(Issues.Issue));
    
  }),
  ApplicationView: Ember.View.extend({
    templateName: 'app'
  }),
  Store: DS.Store.extend({
    revision: 4,
    adapter: 'Issues.RESTAdapter'
  }),
  Router: Ember.Router.extend({
    root: Ember.Route.extend({
      index: Ember.Route.extend({
        route: '/',
        connectOutlets: function(router) {
          var controller = router.get('applicationController');
          controller.set("user", Issues.User.find('tdreyno'));
        }
      })
    })
  })
});

Issues.RESTAdapter = DS.RESTAdapter.create({
  find: function(store, type, id) {
    var root = this.rootForType(type);

    this.ajax(this.buildURL(root, id), "GET", {
      success: function(json) {
        store.load(type, json["data"]);
      }
    });
  },
  
  findAll: function(store, type) {
    var root = this.rootForType(type), plural = this.pluralize(root);

    this.ajax(this.buildURL(root), "GET", {
      success: function(json) {
        store.loadMany(type, json["data"]);
      }
    });
  },
    
  ajax: function(url, type, hash) {
    hash.url = url;
    hash.type = type;
    hash.dataType = 'jsonp';
    hash.contentType = 'application/json; charset=utf-8';
    hash.context = this;

    if (hash.data && type !== 'GET') {
      hash.data = JSON.stringify(hash.data);
    }

    jQuery.ajax(hash);
  },
  
  buildURL: function(record, suffix) {
    return 'https://api.github.com' + this._super(record, suffix);
  }
});

Issues.AutoloadHasMany = function(type, options) {
  options = options || {};
  
  var pluralName = Issues.RESTAdapter.pluralize(Issues.RESTAdapter.rootForType(type));
  var cachedName = '__autoloaded_' + pluralName;

  return Ember.computed(function(key, value) {
    var data = this.get('data'),
        store = this.get('store'),
        ids, id, association;

    if (typeof type === 'string') {
      type = this.getPath(type, false) || Em.getPath(window, type);
    }
    
    var cachedModels = this.get(cachedName);
    
    if (Em.none(cachedModels)) {
      cachedModels = [];
      
      if (!Em.none(this.get("url"))) {
        this.set(cachedName, cachedModels);
        var url = this.get("url") + "/" + pluralName;
      
        var self = this;
      
        Issues.RESTAdapter.ajax(url, "GET", {
          success: function(json) {
            var result = store.loadMany(type, json["data"]);
            self.set(cachedName, result.ids.map(function(id) {
              return type.find(id);
            }));
          }
        });
      }
    }
    
    return cachedModels;
  }).property("url", cachedName).cacheable();
};

Issues.User = DS.Model.extend({
  primaryKey: 'login',
  url: DS.attr('string'),
  avatar_url: DS.attr('string'),
  comments: DS.hasMany('Issues.Comment'),
  issues: DS.hasMany('Issues.Issue'),
  
  orgs: Issues.AutoloadHasMany('Issues.Org')
});

Issues.Org = DS.Model.extend({
  primaryKey: 'login',
  'url': DS.attr('string'),
  'avatar_url': DS.attr('string'),
  repos: Issues.AutoloadHasMany('Issues.Repo')
});

Issues.Repo = DS.Model.extend({
  'url': DS.attr('string'),
  'name': DS.attr('string'),
  'description': DS.attr('string'),
  owner: DS.belongsTo('Issues.User', { embedded: true }),
  issues: Issues.AutoloadHasMany('Issues.Issue')
});

Issues.Issue = DS.Model.extend({
  primaryKey: 'number',
  
  'url': DS.attr('string'),
  'state': DS.attr('string'),
  'title': DS.attr('string'),
  'body': DS.attr('string'),
  'updated_at': DS.attr('date'),
  
  user: DS.belongsTo('Issues.User', { embedded: true }),
  assignee: DS.belongsTo('Issues.User', { embedded: true }),
  comments: Issues.AutoloadHasMany('Issues.Comment')
});

Issues.Comment = DS.Model.extend({
  'body': DS.attr('string'),
  'updated_at': DS.attr('date'),
  
  user: DS.belongsTo('Issues.User', { embedded: true })
});

Issues.initialize();