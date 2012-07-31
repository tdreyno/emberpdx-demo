Issues.userController = Ember.ObjectController.create({
  _isLoadedDidChange: function() {
    if (this.get('isLoaded')) {
      Issues.orgsController.set('content', this.get('orgs'));
    }
  }.observes('content.isLoaded')
});