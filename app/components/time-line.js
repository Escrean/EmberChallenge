import Ember from 'ember';



export default Ember.Component.extend({
  
  
  
  timelinearray:Ember.computed('tasks.@each.name','tasks.@each.start','tasks.@each.end','tasks.@each.banding',function(){
       
       var lambda  = 1;
       
       var arrayOrderedByStart = this.get('tasks').sortBy('start'); 
       var firstDate = arrayOrderedByStart.get('firstObject'); /*first date*/
       var arrayOrderedByEnd  = this.get('tasks').sortBy('end');
       var endDate =  arrayOrderedByEnd.get('lastObject'); /*last Date*/
       
       
       
       
       if(this.get('tasks.length') > 0) {
       
           firstDate = moment(firstDate.get('start')); 
           endDate = moment(endDate.get('end')); 
           
           
           /*using labda to create range of dates*/
           firstDate = firstDate.subtract(lambda,'day');
           endDate = endDate.add(lambda,'day');
           
           
          
           
           var arrayTimeLineDates = moment.range(firstDate._i, endDate._i);
           
           
           var arrayOfReturn = Ember.A([]);
           
           
           var color;
           var isMilestone;
           var name;
           var taskDate;
           var width;
           var size;
           
           var count = 0;
           
           arrayTimeLineDates.by('days',function(date){
               count = count + 1;
           });
           
           
            arrayTimeLineDates.by('days',function(date){
              
              color = "gray";
              isMilestone = false;
              name = "";
              taskDate = "";
              
              
              
              size = (1100 / count) / 2; 
               
                arrayOrderedByStart.forEach(function(task) {
                      
                      /*milestone*/
                     if(task.get('duration') === 0){
                        
                        if (date.isSame(new Date(task.get('start')))){
                            isMilestone = true;    
                            name= task.get('name');
                            taskDate = task.get('date');
                        }
                        
                        
                         
                     }/*phase*/
                     else{
                  
                          if (date.isSame(new Date(task.get('start')))){
                            color = task.get('banding'); 
                            name= task.get('name');
                          }else if(date.isSame(new Date(task.get('end')))){
                            color = task.get('banding');
                            name= task.get('name');
                          }else if((date.isBetween(new Date(task.get('start')),new Date(task.get('end'))))){
                            color = task.get('banding');       
                            name= task.get('name');
                          }
                     } 
                }, arrayOrderedByStart);
                
                width = new Ember.Handlebars.SafeString("padding: 0 " + size + "px;");
                
                var oneDayObject = Ember.Object.create();
                
                oneDayObject.set('timeLineDate',date.format("MM/DD/YYYY"));
                oneDayObject.set('name',name);
                oneDayObject.set('taskDate',taskDate);
                oneDayObject.set('color',color);
                oneDayObject.set('isMilestone',isMilestone);
                oneDayObject.set('width',width);
                
                arrayOfReturn.pushObject(oneDayObject);
            
            
            });
           
          
           
           
           return arrayOfReturn;
       }
  })
     
});