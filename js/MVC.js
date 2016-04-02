'use strict';

 function UsersModel(userDataService) {
     
    this.userDataService = userDataService;
    this.userData = {};
    this.dataLoaded = new Event(this);
    this.keyword = "";
    this.pageNo = 1;
    this.pageSize = 50;
    this.sortField = "ReplyCount";
    this.sortDirection = 1;
    var that = this;
    function loadData() {
        //would eventually be asynch call
        that.userData = userDataService.searchData(that.keyword, that.pageNo, that.pageSize, that.sortField, that.sortDirection);
        that.dataLoaded.notify(this);
    }
    return {
        userData : that.userData,
        dataLoaded : this.dataLoaded,
        searchKeyword : function(keyword){
            that.keyword = keyword;
            loadData();
        },
        sort : function(sortField, sortDirection){
            that.sortField = sortField;
            that.sortDirection = sortDirection;
            loadData();
        }
    };
 }

/**
* A simple observer:
*/
function Event(sender) {
    this.sender = sender;
    this.listeners = [];
}

Event.prototype = {
    attach : function (listener) {
                this.listeners.push(listener);
            },
    notify : function (args) {
                var that = this;
                this.listeners.forEach(function(listener){
                    listener(that.sender, args);
                });
            }
};

function UsersView(model, el, template) {
    
    this.model = model;
    this.el = el;
    this.template = template;
    var that = this;    
    
    function showUsers(){
        
        $(that.el)
        .html(function(){
            return Mustache.render(that.template, that.model.userData);
        })
        
		$(that.el).find("td > input[type='checkbox']").on("click", function(){
			//e.preventDefault();
			var $this = $(this);
			if ($this.is(':checked')) {
				$this.parents("tr").addClass("selected-row");
		    }
		    else {
		    	$this.parents("tr").removeClass("selected-row");
			}
		});
		
        $(that.el).find("a.action-sort").on("click", function(e){
			e.preventDefault();
			model.sort($(this).attr("sortField"), parseInt($(this).attr("sortDirection")));
		});
    }

    this.model.dataLoaded.attach(function (model) {
        that.model = model;
        showUsers();
    });
    
    return {
        showUsers : showUsers           
    };
}


