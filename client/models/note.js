(function(){
  'use strict';

  angular.module('hapi-auth')
      .factory('Note', ['$http', function($http){

        function create(note){
          return $http.post('/notes', note);
        }

        function all(){
          return $http.get('/notes');
        }

        function deleteNote(id){
          return $http.post('/deleteNote', id);
        }

        return {create:create, all:all, deleteNote:deleteNote};
      }]);
})();
