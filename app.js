/*
 * @Name:   RocketCut v1.0.0 
 * @Desc:   1D Optimization Tools
 * @Author: Aykut Kardaş
 *
 */


var app = angular.module('rocketCut', [])

.directive('materialSelect', function () {

  return {

    restrict: 'A',

    transclude: true,

    template: '<option ng-repeat="material in materialList" value="{{material.name}}">{{material.name}}</option>'

  }

})
.controller('materialList', function ($rootScope) {

  $scope = $rootScope;

  $scope.materialList = [];

  $scope.addMaterialInfo = {

    name: '',

    limit: 0,

    settings: {

      g: 15,

      kp: 4

    }

  };

  $scope.addMaterial = function () {

    var material = $scope.addMaterialInfo;

    if (material.name && material.limit) {

      $scope.materialList.push(material);

      $scope.addMaterialInfo = {
        name: '',

        limit: 0,

        settings: {

          g: 15,

          kp: 4

        }
      };

    }

  }

})
.controller('cutList', function ($rootScope) {

  $scope = $rootScope;

  $scope.l = [0];

  $scope.cutList = [];

  $scope.tempCutList = [];

  $scope.calc = function () {

    $scope.reportData = [];

    for (i = 0; i < $scope.materialList.length; i++) {

      $scope.reportData.push({
        name: $scope.materialList[i].name,
        data: OPT($scope.cutList[$scope.materialList[i].name], $scope.materialList[i].limit - ($scope.materialList[i].settings.kp * 2)),
      });

    }

  }

  $scope.addCutList = function () {

    for (i = 0; i < $scope.materialList.length; i++) {

      $scope.cutList[$scope.materialList[i].name] = [];

    }

    for (i = 0; i < $scope.tempCutList.length; i++) {

      $scope.cutList[$scope.tempCutList[i].type].push($scope.tempCutList[i]);

    }

    $scope.calc();

  }
  
  $scope.newInputControl = function () {

    var end = $scope.tempCutList[$scope.tempCutList.length - 1];
    if (end.type && end.len && end.q) {
      if ($scope.tempCutList.length == $scope.l.length) {
        $scope.l.push($scope.l.length);
      }
    }

  }

  $scope.cleanCutList = function () {
    $scope.tempCutList = [];
    $scope.l = [0];
  }

})
.controller('reportView', function ($rootScope) {

  $scope = $rootScope;
  
});
