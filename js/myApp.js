var myApp = angular.module('shri', []);

myApp.config(function ($routeProvider) {

    $routeProvider

        // Страница школы
        .when('/', {
            templateUrl: 'templates/school.html',
            controller: 'School'
        })

        // Список студентов
        .when('/students/', {
            templateUrl: 'templates/students.html',
            controller: 'Students'
        })

        // Карточка студента
        .when('/student/:id', {
            templateUrl: 'templates/student_card.html',
            controller: 'Students'
        })

        // Список лекторов
        .when('/lecturers/', {
            templateUrl: 'templates/lecturers.html',
            controller: 'Lecturers'
        })

        // Карточка лектора
        .when('/lecturer/:id', {
            templateUrl: 'templates/lecturer_card.html',
            controller: 'Lecturers'
        });

});

myApp.controller('School', function ($scope, $http) {

    $scope.title = 'Школа Разработки Интерфейсов';

});

myApp.controller('Students', function ($scope, $http, $routeParams) {

    $scope.title = 'Студенты';
    $scope.students = [];

    var callback = function (data) {
        if ($routeParams.id) {
            $scope.student = $scope.students[$routeParams.id - 1];
            $scope.title = $scope.student.first_name + ' ' + $scope.student.last_name
        }
    };

    $http
        .get('data.json')
        .success(function (data) {
            $scope.students = data.students;
            callback($scope.students);
        })
        .error(function (error) {
            console.log(error);
        });

});

myApp.controller('Lecturers', function ($scope, $http, $routeParams) {

    // Заголовок страницы
    $scope.title = 'Лекторы';

    $scope.lecturers = [];

    var callback = function (data) {
        var j = 0,
            lecturersLength = data.length,
            lecturerId = parseInt($routeParams.id);
        
        // Если приходят данные с ID лектора
        if ($routeParams.id) {
            // Определяем, что это за лектора
            $scope.lecturer = (function () {
                for (j; j < lecturersLength; j++) {
                    if (data[j].id === lecturerId) {
                        return data[j];
                    }
                }
            }());
            // В качестве заголовка его ФИО
            $scope.title = $scope.lecturer.name;
        }
    };

    $http
        .get('data.json')
        .success(function (data) {
            $scope.lecturers = data.lecturers;
            callback($scope.lecturers);
        })
        .error(function (error) {
            console.log(error);
        });

});

/* Переключалка списка всех лекций автора */
myApp.directive('viewAllLectures', function () {

    return {
        restrict: 'C',
        link: function (scope, elem, attrs) {
            elem[0].addEventListener('click', function(e){
                var popUp = document.getElementsByClassName('b-lecturer__list_all')[0];
                if (popUp.classList.contains('b-lecturer__list_state_hidden')) {
                    popUp.classList.remove('b-lecturer__list_state_hidden');
                } else {
                    popUp.classList.add('b-lecturer__list_state_hidden');
                }
            }, false);
        }
    };

});