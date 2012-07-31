Issues.reposController = Em.ArrayController.create({
  contentBinding: "Issues.applicationController.focusedOrg.repos",
  sortProperties: 'issuesCount'.w(),
  sortAscending: false,
  
  sortAscendingName: function() {
    return this.get('sortAscending') ? 'asc' : 'desc';
  }.property('sortAscending'),
  
  toggleSortOrder: function() {
    this.set('sortAscending', !this.get('sortAscending'));
  },
  
  // Click event for focusRepo links
  focusRepo: function(evt) {
    Issues.applicationController.setPath('focusedRepo', evt.context);
  }
});