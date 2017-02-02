/**
 * Created by braydenlemke on 2/1/17.
 */
(function () {

    angular.module("todoApp").component("componentRegister", {
        templateUrl: "component-register/register.html",
        controller: LoginController
    });

    function LoginController(todoService) {
        var vm = this;

        vm.registerEmailInput = null;
        vm.registerPasswordInput = null;

        vm.validateRegisterForm = function(email, password){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(email)) {
                if(password.length > 5) {
                    todoService.registerUser(email, password);
                }
            }
        }
    }

})();