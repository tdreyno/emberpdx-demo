/**
 * Issue model
 */
Issues.Issue = DS.Model.extend({
  primaryKey: 'number',
  
  'url': DS.attr('string'),
  'state': DS.attr('string'),
  'title': DS.attr('string'),
  'body': DS.attr('string'),
  'updatedAt': DS.attr('date'),
  
  // Convert body contents into HTML using Markdown
  bodyHTML: function() {
    var body = this.get('body');
    
    if (Em.empty(body)) { return ""; }
    
    var converter = new Showdown.converter();
    return converter.makeHtml(body);
  }.property('body'),
  
  user: DS.belongsTo('Issues.User', { embedded: true }),
  assignee: DS.belongsTo('Issues.User', { embedded: true }),
  comments: DS.autoloadHasMany('Issues.Comment'),
  
  commentsCountBinding: 'comments.length'
});