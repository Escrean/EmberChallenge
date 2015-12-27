import DS from 'ember-data';

var Task =  DS.Model.extend({
    name: DS.attr('string'),
    start: DS.attr('date'),
    end: DS.attr('date'),
    banding: DS.attr('string'),
   
    duration: Ember.computed('start','end',function(){
       
       
       var taskStartDate = new Date(this.get('start'));
       var taskEndDate = new Date(this.get('end'));
       
       
       var start = moment(taskStartDate.toISOString());
       var end   = moment(taskEndDate.toISOString());
       
       
       
       var diff  = end.diff(start,'day');
       
       return diff;
    })
    
    
    
    
});


export default Task;