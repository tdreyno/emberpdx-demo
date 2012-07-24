/**
 * Primary view
 */
Issues.ApplicationView = Ember.View.extend({
  controllerBinding: 'Issues.applicationController',
  
  // Click event for focusOrg links
  focusOrg: function(evt) {
    this.setPath('controller.focusedOrg', evt.context);
  },
  
  // Click event for focusRepo links
  focusRepo: function(evt) {
    this.setPath('controller.focusedRepo', evt.context);
  },
  
  // Click event for focusIssue links
  focusIssue: function(evt) {
    this.setPath('controller.focusedIssue', evt.context);
  }
});