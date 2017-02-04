/**
 * Created by braydenlemke on 2/1/17.
 */
(function () {

    angular.module("todoApp").component("componentRegister", {
        templateUrl: "component-register/register.html",
        controller: LoginController
    });

    function LoginController(todoService, $mdToast) {
        var vm = this;

        vm.registerEmailInput = null;
        vm.registerPasswordInput = null;

        vm.enterRegisterUser = function(key, email, password) {
            if(key.keyCode === 13) {
                validateRegister(email, password);
            }
        };

        vm.validateRegisterForm = function(email, password){
            validateRegister(email, password);
        };

        vm.makeGuest = function() {
            todoService.makeGuest();
        };

        function validateRegister(email, password) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(email) {
                if(re.test(email)) {
                    if(password) {
                        if(password.length > 5) {
                            todoService.registerUser(email, password);
                        } else {
                            $mdToast.show(
                                $mdToast.simple()
                                    .textContent("Password must be at least 6 characters long.")
                                    .position("top right")
                                    .theme('error-toast')
                                    .hideDelay(4000)
                            );
                        }
                    } else {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent("Password must be at least 6 characters long.")
                                .position("top right")
                                .theme('error-toast')
                                .hideDelay(4000)
                        );
                    }

                } else {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("Invalid email address.")
                            .position("top right")
                            .theme('error-toast')
                            .hideDelay(3000)
                    );
                }
            } else {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Invalid email address.")
                        .position("top right")
                        .theme('error-toast')
                        .hideDelay(3000)
                );
            }
        }
    }

})();