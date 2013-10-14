var myApp = angular.module('shri', []);

myApp.config(function ($routeProvider) {

    $routeProvider

        // Страница школы
        .when('/', {
            templateUrl: '../templates/school.html',
            controller: 'School'
        })

        .when('/students/', {
            templateUrl: '../templates/students.html',
            controller: 'Students'
        })

        .when('/profile/:id', {
            templateUrl: '../templates/student_card.html',
            controller: 'Students'
        });

});

myApp.controller('School', function ($scope, $http) {

    $scope.title = 'Школа Разработки Интерфейсов';

});

myApp.controller('Students', function ($scope, $http, $routeParams) {

    $scope.title = 'Студенты',
    $scope.students = [];

    var callback = function (data) {
        if ($routeParams.id) {
            $scope.student = $scope.students[$routeParams.id - 1];
            $scope.title = $scope.student.first_name + ' ' + $scope.student.last_name
        }
    };

    $http
        .get('students.json')
        .success(function (data) {
            $scope.students = data;
            callback($scope.students);
            console.log($scope.students);
        })
        .error(function (error) {
            console.log(error);
        });

});