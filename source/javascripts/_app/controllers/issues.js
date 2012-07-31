//= require "_app/controllers/repos"

Issues.issuesController = Em.ArrayController.create({
  contentBinding: "Issues.reposController.selected.issues",
  sortProperties: 'title updatedAt'.w(),
  
  selected: null,
  
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
  }.property("@each.title", "filterString"),
  
  // Click event for focusIssue links
  select: function(evt) {
    this.set('selected', evt.context);
  }
});