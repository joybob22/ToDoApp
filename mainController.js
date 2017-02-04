(function() {

    angular.module("todoApp").controller("mainController", function(todoService) {
        var vm = this;

        vm.logout = function() {
            if(todoService.loginWords === "sign out") {
                todoService.logout();
            }
        }

    });

})();

