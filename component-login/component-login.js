/**
 * Created by braydenlemke on 1/30/17.
 */
(function () {

    angular.module("todoApp").component("componentLogin", {
        templateUrl: "component-login/login.html",
        controller: LoginController
    });

    function LoginController(todoService) {
        var vm = this;
        vm.loginEmail = null;
        vm.loginPassword = null;

        vm.loginUser = function(email, password) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(email)) {
                if(password.length > 5) {
                    todoService.loginUser(email, password);
                }
            }
        }
    }

})();