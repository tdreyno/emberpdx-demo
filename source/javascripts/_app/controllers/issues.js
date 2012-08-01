//= require "_app/controllers/repos"

Issues.IssuesController = Em.ArrayController.extend({
  sortProperties: 'title updatedAt'.w(),
  
  sortAscendingName: function() {
    return this.get('sortAscending') ? 'asc' : 'desc';
  }.property('sortAscending'),
  
  toggleSortOrder: function() {
    this.set('sortAscending', !this.get('sortAscending'));
  },
  
  filterString: null,
  
  filteredList: function() {
    var filterString = this.get('filterString');
    
    if (Em.empty(filterString)) { return this.get('arrangedContent'); }
    
    return this.get('arrangedContent').filter(function(issue) {
      return issue.get('title').toLowerCase().indexOf(filterString.toLowerCase()) >= 0;
    });
  }.property("@each.title", "filterString")
});