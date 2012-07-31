Issues.orgsController = Em.ArrayController.create({
  contentBinding: "Issues.applicationController.user.orgs",

  // Click event for focusOrg links
  focusOrg: function(evt) {
    Issues.applicationController.setPath('focusedOrg', evt.context);
  }
});