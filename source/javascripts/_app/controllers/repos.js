Issues.reposController = Em.ArrayController.create({
  contentBinding: "Issues.orgsController.selected.repos",
  sortProperties: 'issuesCount'.w(),
  sortAscending: false,
  selected: null,
  
  sortAscendingName: function() {
    return this.get('sortAscending') ? 'asc' : 'desc';
  }.property('sortAscending'),
  
  toggleSortOrder: function() {
    this.set('sortAscending', !this.get('sortAscending'));
  },
  
  // When the selected repo changes, clear out it's dependent models.
  _selectedRepoDidChange: function() {
    Issues.issuesController.set('selected', null);
  }.observes('selected'),
  
  // Click event for focusRepo links
  select: function(evt) {
    this.set('selected', evt.context);
  }
});