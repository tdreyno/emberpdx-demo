/**
 * Very dumb and very incomplete Adapter for GitHub api
 */
DS.IssuesRESTAdapter = DS.RESTAdapter.create({
  find: function(store, type, id) {
    var root = this.rootForType(type);

    this.ajax(this.buildURL(root, id), 'GET', {
      success: function(json) {
        store.load(type, json['data']);
      }
    });
  },
  
  findAll: function(store, type) {
    var root = this.rootForType(type), plural = this.pluralize(root);

    this.ajax(this.buildURL(root), 'GET', {
      success: function(json) {
        store.loadMany(type, json['data']);
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

/**
 * Convenience method for loading more data from Github when needed.
 */
DS.autoloadHasMany = function(type, options) {
  options = options || {};
  
  var pluralName = DS.IssuesRESTAdapter.pluralize(DS.IssuesRESTAdapter.rootForType(type));
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
      
      if (!Em.none(this.get('url'))) {
        this.set(cachedName, cachedModels);
        var url = this.get('url') + '/' + pluralName;
      
        var self = this;
      
        DS.IssuesRESTAdapter.ajax(url, 'GET', {
          success: function(json) {
            var result = store.loadMany(type, json['data']);
            self.set(cachedName, result.ids.map(function(id) {
              return type.find(id);
            }));
          }
        });
      }
    }
    
    return cachedModels;
  }).property('url', cachedName).cacheable();
};