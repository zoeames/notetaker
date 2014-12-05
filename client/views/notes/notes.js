(function(){
  'use strict';

  angular.module('hapi-auth')
      .controller('NotesCtrl', ['$rootScope', '$scope', '$state', 'Note', function($rootScope, $scope, $state, Note){
        $scope.note = {};

        $scope.create = function(note){
          Note.create(note).then(function(response){
            console.log(response.data);
            $scope.note = {};
          }, function(){
            console.log('error');
          });
        };


        Note.all().then(function(res){
          $scope.notes = res.data;
        });

        Note.deleteNote().then(function(res){
          Note.all();
        });

      }]);
})();
