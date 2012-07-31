//= require "_app/controllers/issues"

Issues.issueController = Em.ObjectController.create({
  contentBinding: "Issues.issuesController.selected"
});