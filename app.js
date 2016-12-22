/**
 * Created by braydenlemke on 12/21/16.
 */
(function () {

    var app = angular.module("todoApp", ["ui.router"]);

    app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("home");

        /**
         * add a home state and a todo state using stateProvider
         */

        $stateProvider

            .state("home", {
                url: "/home",
                templateUrl: "views/home.html"               /**   add home template   */
            })

            .state("todo", {
                url: "/todo",
                templateUrl: "views/todo.html"               /**   add todo template   */
            })

    })

})();