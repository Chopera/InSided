'use strict';

var userDataService = (function(){
    var returnObject = {};
    var userData = [
                      {
                        "id": 1,
                        "Username": "Lucy Bennett",
                        "ImageUrl": "img/LucyBennett.png",
                        "Email": "helmer.waters@gmail.com",
                        "ReplyCount": 9815,
                        "TopicCount": 468,
                        "SolvedCount": 33,
                        "UserGroup": "Colonel",
                        "RegistrationDate": "01 Mar 2016",
                        "LastLogin": "01 Mar 2016"
                      },
                      {
                        "id": 2,
                        "Username": "Lula Fuller",
                        "ImageUrl": "img/LulaFuller.png",
                        "Email": "hahn.wilfred@hotmail.com",
                        "ReplyCount": 8724,
                        "TopicCount": 684,
                        "SolvedCount": 512,
                        "UserGroup": "Officer",
                        "RegistrationDate": "06 May 2016",
                        "LastLogin": "20 Jul 2016"
                      },
                      {
                        "id": 3,
                        "Username": "Sally Williams",
                        "ImageUrl": "img/SallyWilliams.png",
                        "Email": "tressie.prosacco@hotmail.com",
                        "ReplyCount": 7265,
                        "TopicCount": 442,
                        "SolvedCount": 784,
                        "UserGroup": "General",
                        "RegistrationDate": "06 May 2016",
                        "LastLogin": "29 Dec 2016"
                      },   
                      {
                        "id": 4,
                        "Username": "Roger Ortiz",
                        "ImageUrl": "img/RogerOrtiz.png",
                        "Email": "framie_kobe@little.me",
                        "ReplyCount": 6158,
                        "TopicCount": 443,
                        "SolvedCount": 49,
                        "UserGroup": "Colonel",
                        "RegistrationDate": "25 Dec 2016",
                        "LastLogin": "03 Dec 2016"
                      },  
                      {
                        "id": 5,
                        "Username": "Zachary Jensen",
                        "ImageUrl": "img/ZacharyJensen.png",
                        "Email": "ratke_kenyatta@hotmail.com",
                        "ReplyCount": 5627,
                        "TopicCount": 37,
                        "SolvedCount": 770,
                        "UserGroup": "Lieutenant",
                        "RegistrationDate": "18 Apr 2016",
                        "LastLogin": "03 Apr 2016"
                      }, 
                      {
                        "id": 6,
                        "Username": "Jane Morris",
                        "ImageUrl": "img/JaneMorris.png",
                        "Email": "schuppe.demarco@aurore.tv",
                        "ReplyCount": 4615,
                        "TopicCount": 104,
                        "SolvedCount": 155,
                        "UserGroup": "Lieutenant",
                        "RegistrationDate": "11 Sep 2016",
                        "LastLogin": "23 Nov 2016"
                      },
                      {
                        "id": 7,
                        "Username": "Jesus Cortez",
                        "ImageUrl": "img/JesusCortez.png",
                        "Email": "stephen_lesch@hotmail.com",
                        "ReplyCount": 3309,
                        "TopicCount": 631,
                        "SolvedCount": 444,
                        "UserGroup": "Lieutenant",
                        "RegistrationDate": "15 Dec 2016",
                        "LastLogin": "19 Oct 2016"
                      },
                      {
                        "id": 8,
                        "Username": "Rodney Gray",
                        "ImageUrl": "img/RodneyGray.png",
                        "Email": "dooley_leilani@hotmail.com",
                        "ReplyCount": 2888,
                        "TopicCount": 921,
                        "SolvedCount": 554,
                        "UserGroup": "Captain",
                        "RegistrationDate": "30 Sep 2016",
                        "LastLogin": "19 Feb 2016"
                      },
                      {
                        "id": 9,
                        "Username": "Norman Klein",
                        "ImageUrl": "img/NormanKlein.png",
                        "Email": "haylie_wilinson@murazik.us",
                        "ReplyCount": 1782,
                        "TopicCount": 754,
                        "SolvedCount": 133,
                        "UserGroup": "Lieutenant",
                        "RegistrationDate": "30 Dec 2016",
                        "LastLogin": "24 Jan 2016"
                      },
                      {
                        "id": 10,
                        "Username": "Mitchell Barton",
                        "ImageUrl": "img/MitchellBarton.png",
                        "Email": "john.daugherty@yahoo.com",
                        "ReplyCount": 999,
                        "TopicCount": 402,
                        "SolvedCount": 526,
                        "UserGroup": "Captain",
                        "RegistrationDate": "17 Jun 2016",
                        "LastLogin": "22 Feb 2016"
                      },
                      {
                        "id": 11,
                        "Username": "Lily Ferguson",
                        "ImageUrl": "img/LilyFerguson.png",
                        "Email": "evelyn.fahey@hansen.biz",
                        "ReplyCount": 411,
                        "TopicCount": 41,
                        "SolvedCount": 837,
                        "UserGroup": "General",
                        "RegistrationDate": "03 Jul 2016",
                        "LastLogin": "20 May 2016"
                      }                      
                    ];
    
    function searchKeyword(dataToBeSearched, keyword){
      
      var returnData = dataToBeSearched;
      
      if(keyword){
          returnData = dataToBeSearched.filter(function(value){
              return value.Username.toLowerCase().indexOf(keyword.toLowerCase()) > -1 || value.Email.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
          });
      }
        
      return returnData;
    }
    
    function sortData(dataToBeSorted, sort, sortDirection){
      
      var returnData = dataToBeSorted;
      
      if(sort){
          returnData.sort(function(a, b){
              var comp = 1;
              if(typeof a[sort] === "string"){
                  comp = a[sort].localeCompare(b[sort]);
              }
              else{
                  comp = a[sort] - b[sort];
              }
              if(typeof sortDirection === "number"){
                  comp *= sortDirection;
              }
              return comp;
          });
      }
        
      return returnData;
    }
    
    function paginateData(dataToBePaginated, pageNo, pageSize){
      
      if(!pageNo){
        pageNo = 1;
      }
      if(!pageSize){
        pageSize = 10;
      }
      var returnData = dataToBePaginated;
      var start = (pageNo * pageSize) - pageSize;
      var end = start + pageSize;
      return returnData.slice(start, end);
    }
    
    function createReturnDataObject(userData){
      return  {'users':userData};
    }
    
    returnObject.searchData = function(keyword, pageNo, pageSize, sort, sortDirection){
        
        var returnData = searchKeyword(userData, keyword);
        returnData = sortData(returnData, sort, sortDirection);
        returnData = paginateData(returnData, pageNo, pageSize);
        return  createReturnDataObject(returnData);
    };
    
    return returnObject;
}());