import Ember from 'ember';

export default Ember.Controller.extend({
    
    newTaskDuration: Ember.computed('newTaskStart','newTaskEnd',function(){
       var taskStartDate =  new Date(this.get('newTaskStart'));
       var taskEndDate = new Date(this.get('newTaskEnd'));
       
       var start = moment(taskStartDate);
       var end   = moment(taskEndDate);
       
       
       var diff  = end.diff(start,'day');
       
       if(!start.isValid() || !end.isValid()){
           return 0;
       }
       
       
       return diff;
       
       
      
       
    }),
    
    actions:{
        createTask: function(){
            
            var taskName = this.get('newTaskname');
            var taskStartDate = this.get('newTaskStart');
            var taskEndDate = this.get('newTaskEnd');
            
            var taskBanding = this.get('newTaskBanding');
            
            
            
            
            if(!taskName){alert('Please inform a Name to the task'); return false;}
            if(!taskStartDate){alert('Please inform a Start to the task'); return false;}
            if(!taskEndDate){alert('Please inform an End to the task'); return false;}
           
           /* if(!taskBanding){alert('Please a inform a banding to the task'); return false;}*/
            
           
            
            if(!taskName.trim()){alert('Please inform a Name to the task'); return;}
            
        
            
            
            
            if(this.get('newTaskDuration') < 0){alert('the end date should be after the start date!'); return false;};
            
            
            
            
            
            var task = this.store.createRecord('task',{
               name:taskName,
               start:  moment(taskStartDate)._d,
               end:  moment(taskEndDate)._d,
               banding: taskBanding
               
            });
            
            
            
            this.set('newTaskname','');
            this.set('newTaskStart','');
            this.set('newTaskEnd','');
            this.set('newTaskBanding','');
            
            task.save();
            
        },
        
        saveTask: function(task){
            
            
            if(task.get('name') === ""){alert('Please inform a Name to the task'); return false;}
            if(task.get('start') === ""){alert('Please inform a Start to the task'); return false;}
            if(task.get('end') === ""){alert('Please inform an End to the task'); return false;}
            if(task.get('duration') < 0){alert('the end date should be after the start date!'); return false;};
            
            
            
            task.save();
        },
        removeTask: function(task){
            task.deleteRecord();
            task.save();
        },
        clearNewTask: function(){
           this.set('newTaskname','');
           this.set('newTaskStart','');
           this.set('newTaskEnd','');
           this.set('newTaskBanding',''); 
        }
        
    }
});