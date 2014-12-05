(function(){
  'use strict';

  angular.module('hapi-auth')
      .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Note', function($rootScope, $scope, $state, Note){
        $scope.note = {};

        $scope.create = function(note){
          Note.create(note).then(function(response){
            console.log(response.data);
            $scope.note = {};
            all();
          }, function(){
            console.log('error');
          });
        };



        function all(){
          Note.all().then(function(response){
            $scope.notes = response.data;
          });
        }

        all();

        $scope.deleteNote = function(id, index){
          Note.deleteNote(id).then(function(response){
            $scope.notes.splice(index, 1);
          });
        };

      }]);
})();
