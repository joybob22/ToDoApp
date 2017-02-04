/**
 * Created by braydenlemke on 1/30/17.
 */
(function () {

    angular.module("todoApp").component("componentLogin", {
        templateUrl: "component-login/login.html",
        controller: LoginController
    });

    function LoginController(todoService, $mdToast) {
        var vm = this;
        vm.loginEmail = null;
        vm.loginPassword = null;

        vm.enterLoginUser = function(key, email, password) {
            if(key.keyCode === 13) {
                validateUserLogin(email, password);
            }
        };

        vm.loginUser = function(email, password) {
            validateUserLogin(email, password);
        };

        vm.makeGuest = function() {
            todoService.makeGuest();
        };

        function validateUserLogin(email, password) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(email) {
                if(re.test(email)) {
                    if(password) {
                        if(password.length > 5) {
                            todoService.loginUser(email, password);
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