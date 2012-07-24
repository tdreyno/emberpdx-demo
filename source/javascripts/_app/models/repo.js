/**
 * Repo model
 */
Issues.Repo = DS.Model.extend({
  'url': DS.attr('string'),
  'name': DS.attr('string'),
  'description': DS.attr('string'),
  owner: DS.belongsTo('Issues.User', { embedded: true }),
  issues: DS.autoloadHasMany('Issues.Issue')
});