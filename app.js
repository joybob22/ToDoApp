/**
 * Created by braydenlemke on 12/21/16.
 */
(function () {

    var app = angular.module("todoApp", ["ui.router", "firebase"]);

    app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("home");

        /**
         * add a home state and a todo state using stateProvider
         */

        $stateProvider

            .state("home", {
                url: "/home",
                template: "<component-home></component-home>"               /**   add home template   */
            })

            .state("todo", {
                url: "/todo",
                template: "<component-todo></component-todo>"               /**   add todo template   */
            })

            .state("login", {
                url: "/login",
                template: "<component-login></component-login>"
            })

            .state("register", {
                url: "/register",
                template: "<component-register></component-register>"
            });



    });



    $(".navItem").on("click", function() {
        $(this).addClass("navSelectedItem");
        $(this).siblings().removeClass("navSelectedItem");
    })

})();