/**
 * User model
 */
Issues.User = DS.Model.extend({
  primaryKey: 'login',
  url: DS.attr('string'),
  avatarUrl: DS.attr('string'),
  comments: DS.hasMany('Issues.Comment'),
  issues: DS.hasMany('Issues.Issue'),
  
  orgs: DS.autoloadHasMany('Issues.Org')
});