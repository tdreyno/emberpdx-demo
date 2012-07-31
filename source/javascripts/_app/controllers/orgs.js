Issues.orgsController = Em.ArrayController.create({
  // contentBinding: "Issues.userController.orgs",
  selected: null,
  
  // When the selected org changes, clear out it's dependent models.
  _selectedOrgDidChange: function() {
    Issues.reposController.set('selected', null);
  }.observes('selected'),
  
  // Click event for org links
  select: function(evt) {
    this.set('selected', evt.context);
  }
});