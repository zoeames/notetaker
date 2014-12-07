(function(){
  'use strict';

  angular.module('hapi-auth')
  .factory('Note', ['$http', function($http){

    function create(note){
      return $http.post('/notes', note);
    }

    function recent(){
      return $http.get('/notes?limit=10&offset=0');
    }

    function deleteNote(id){
      return $http.delete('/notes/'+ id);
    }

    return {create:create, recent:recent, deleteNote:deleteNote};
  }]);
})();
