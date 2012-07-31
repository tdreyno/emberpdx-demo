Issues.issuesController = Em.ArrayController.create({
  contentBinding: "Issues.applicationController.focusedRepo.issues",
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
  }.property("@each.title", "filterString"),
  
  // Click event for focusIssue links
  focusIssue: function(evt) {
    Issues.applicationController.setPath('focusedIssue', evt.context);
  }
});