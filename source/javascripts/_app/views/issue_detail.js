/**
 * Issue detail view
 */
Issues.IssueDetailView = Ember.View.extend({
  templateName: 'issue_detail',
  
  isVisible: function() {
    return !!this.getPath('controller.content');
  }.property('controller.content')
});