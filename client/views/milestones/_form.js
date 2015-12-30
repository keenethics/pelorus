Template._milestonesForm.onCreated(function(){
  this.type = new ReactiveVar(this.data.type || 'year');
});

Template._milestonesForm.helpers({
  parents: function() {
    var type = Template.instance().type.get();
    return type && Milestones.find({ type: Milestones.parentType(type), userId: Meteor.userId() });
  },
  periodTitle:     function() {
    var type = Template.instance().type.get();
    return type && s.capitalize(type)
  },
  periodInputType: function() {
    var type = Template.instance().type.get();
    return type && type == 'year' ? 'number' : type 
  },
  type: function(){
    return Template.instance().type.get();
  },
  types: function(){
    return ['year', 'month', 'week'];
  },
});

Template._milestonesForm.events({
  'click .js-insert-milestone': function(e, t) {
    var type = t.type.get();
    //TODO: Refactor validations and posting
    if(type != 'strategic' && !$('#parentId').val()) {
      return $('#parentId').parent('.form-group').addClass('has-error');
    }
    if(type != 'strategic' && !$('#period').val()) {
      return $('#period').parent('.form-group').addClass('has-error');
    }

    var period = t.$('#period').val();
    
    // TODO: pass date format to moment.js
    Milestones.insert(_.extend(Milestones.boundsFor(moment(period), type), {
      period:   period,
      parentId: t.$('#parentId').val(),
      type:     type,
      userId:   Meteor.userId()
    }));

    $('#formModal').modal('hide');
  },
  'change #type': function(e, t){
    var type = e.currentTarget.value;
    if (type){
      t.type.set(type)
    }
  }
});

