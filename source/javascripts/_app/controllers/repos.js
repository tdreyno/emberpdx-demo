//= require "_app/controllers/orgs"

Issues.ReposController = Em.ArrayController.extend({
  sortProperties: 'issuesCount'.w(),
  sortAscending: false,
  
  sortAscendingName: function() {
    return this.get('sortAscending') ? 'asc' : 'desc';
  }.property('sortAscending'),
  
  toggleSortOrder: function() {
    this.set('sortAscending', !this.get('sortAscending'));
  }
});