/**
 * Created by braydenlemke on 1/3/17.
 */
(function () {

    angular.module("todoApp")

        .service("todoService", theService);

    function theService() {
        var serve = this;
        var id = 1;

        serve.theTodos = [];

        serve.addList = function(input) {
            serve.theTodos.push({"name": input, "id": id});
            id++;
        };

        serve.removeList = function(index) {
            serve.theTodos.splice(index, 1);
        }
    }

})();