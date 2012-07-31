/**
 * The primary controller
 */
Issues.ApplicationController = Ember.Controller.extend({
  // Who's account we are logged in as
  user: null,

  // The focused org
  focusedOrg: null,
  
  // The focused repo
  focusedRepo: null,
  
  // The focused issue
  focusedIssue: null,
  
  // When the focused org changes, clear out it's dependent models.
  _focusedOrgDidChange: function() {
    this.set('focusedRepo', null);
  }.observes('focusedOrg'),
  
  // When the focused repo changes, clear out it's dependent models.
  _focusedRepoDidChange: function() {
    this.set('focusedIssue', null);
    Issues.issuesController.set('filterString', null);
  }.observes('focusedRepo')
});