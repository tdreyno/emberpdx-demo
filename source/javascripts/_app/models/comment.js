/**
 * Comment model
 */
Issues.Comment = DS.Model.extend({
  'body': DS.attr('string'),
  'updatedAt': DS.attr('date'),
  
  // Convert body contents into HTML using Markdown
  bodyHTML: function() {
    var converter = new Showdown.converter();
    return converter.makeHtml(this.get('body'));
  }.property('body'),
  
  user: DS.belongsTo('Issues.User', { embedded: true })
});