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
            serve.theTodos.push({"name": input, "id": id, "tasks": [], "tasksComplete": []});
            id++;
        };

        serve.removeList = function(index) {
            serve.theTodos.splice(index, 1);
        };

        serve.addTask = function(input, index) {
            var index2 = serve.theTodos[index].tasks.length;
            serve.theTodos[index].tasks[index2] = input;
            serve.theTodos[index].tasksComplete[index2] = false;
        };

        serve.markComplete = function(index, parentIndex) {
            serve.theTodos[parentIndex].tasksComplete[index] = true;
        };

        serve.unMarkComplete = function(index, parentIndex) {
            serve.theTodos[parentIndex].tasksComplete[index] = false;
        };
    }

})();