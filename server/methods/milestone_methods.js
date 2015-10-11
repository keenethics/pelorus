Meteor.methods({
	'insertGoal': function (data,a,b) {
		if (!data.userId) return
		check(data,Object)
		// we currently don`t have milestoneId field in new goal object to create 
		_.extend(data,{milestoneId: 'eqw213eqwe1213edas'})
		
		Goals.insert(data, function (err) {
			if (err) console.log("error"+ err);
		});
	}

	
})