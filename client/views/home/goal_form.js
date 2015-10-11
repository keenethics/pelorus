Template.insertGoalForm.events({
	"submit #insertGoals": function (e) {
		e.preventDefault();
		data = {
			title: e.target.title.value,
			parentGoalId: e.target.parentGoalId.value,
			// milestoneId: e.target.milestoneId.value,
			userId: Meteor.userId(),
			// completedPct: parseInt(e.target.completedPct.value),
			// pctOfParentGoal: parseInt(e.target.pctOfParentGoal.value),
		}		
		Meteor.call('insertGoal',data);
	}
})
