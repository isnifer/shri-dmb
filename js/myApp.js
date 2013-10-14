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
        })

        // Список лекций
        .when('/lectures/', {
            templateUrl: 'templates/lectures.html',
            controller: 'Lectures'
        })

        // Карточка лекции
        .when('/lecture/:id', {
            templateUrl: 'templates/lecture_card.html',
            controller: 'Lectures'
        });;

});

/* О школе */
myApp.controller('School', function ($scope, $http) {

    $scope.title = 'Школа Разработки Интерфейсов';

});

/* Студенты */
myApp.controller('Students', function ($scope, $http, $routeParams) {

    $scope.title = 'Студенты';
    $scope.students = [];

    var callback = function (data) {
        // Если приходят данные с ID студента выставляем в заголовок его ФИ
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

/* Лекторы */
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
            // Определяем, что это за лектор
            $scope.lecturer = (function () {
                for (j; j < lecturersLength; j++) {
                    if (data[j].id === lecturerId) {
                        return data[j];
                    }
                }
            }());
            // В качестве заголовка его ФИ
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

/* Лекции */
myApp.controller('Lectures', function ($scope, $http, $routeParams) {

    // Заголовок страницы
    $scope.title = 'Лекции';
    
    $scope.lectures = [];

    /**
     * Связывает лекцию с лектором и выводит данные о нем
     * @param {Array} data Массив лекторов
     * 
     *  
     */
    var callback = function (data) {
        var lecturesLength = $scope.lectures.length,
            lecturersLength = data.length,
            lectureId = parseInt($routeParams.id),
            i = 0, j = 0;

        // Если приходит конкретный ID лекции
        if (lectureId) {
            // Определяем, что это за лекция
            $scope.lecture = (function () {
                for (i; i < lecturesLength; i++) {
                    if ($scope.lectures[i].id === lectureId) {
                        return $scope.lectures[i];
                    }
                }
            }());
            // Определяем автора лекции
            $scope.lecturer = (function () {
                for (j; j < lecturersLength; j++) {
                    if (data[j].id === $scope.lecture.lector_id) {
                        return data[j];
                    }
                }
            }());
            // В качестве тайтла выводим название лекции
            $scope.title = $scope.lecture.name;
        }
    };

    /**
     * Хелпер для вывода данных о каждом лекторе в списке лекций
     * @param {Number} id Идентификатор лектора
     * @param {String} prop Название свойства, которое необходимо вернуть 
     *
     * @example  
     * lecturer(lecture.lector_id, 'photo_url')
     *   
     */
    $scope.lecturer = function (id, prop) {
        var j = 0,
            lecturersLength = $scope.lecturers.length;

        for (j; j < lecturersLength; j++) {
            if ($scope.lecturers[j].id === id) {
                return $scope.lecturers[j][prop];
            }
        }
    };

    $http
        .get('data.json')
        .success(function (data) {
            $scope.lectures = data.lectures;
            $scope.lecturers = data.lecturers;
            callback($scope.lecturers);
        })
        .error(function (error) {
            console.log(error);
        });

});

/* Sidebar */
myApp.controller('Sidebar', function ($scope) {

    /**
     * Хелпер для вывода активного состояния ссылки на раздел
     * @param {String} path Хеш страницы раздела
     * @param {String} subpath Хеш страницы подраздела 
     *
     * @example  
     * getClass('#/lectures/', '#/lecture')
     *   
     * @returns {String}  
     */
    $scope.getClass = function(path, subpath) {
        if (location.hash === path || location.hash.substring(0, location.hash.indexOf('/', 3)) === subpath) {
            return "b-sidebar__link_state_active"
        } else {
            return ""
        }
    }

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