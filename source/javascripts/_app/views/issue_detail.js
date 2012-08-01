/**
 * Issue detail view
 */
Issues.IssueDetailView = Ember.View.extend({
  templateName: 'issue_detail',
  
  isVisible: function() {
    return !!this.get('controller.content');
  }.property('controller.content')
});