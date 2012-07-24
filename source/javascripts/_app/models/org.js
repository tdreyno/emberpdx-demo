/**
 * Org model
 */
Issues.Org = DS.Model.extend({
  primaryKey: 'login',
  'url': DS.attr('string'),
  'avatarUrl': DS.attr('string'),
  repos: DS.autoloadHasMany('Issues.Repo')
});