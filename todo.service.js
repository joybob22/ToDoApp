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

        serve.deleteTask = function(index, parentIndex) {
            serve.theTodos[parentIndex].tasks.splice(index, 1);
            serve.theTodos[parentIndex].tasksComplete.splice(index, 1);
            serve.reapplyClasses(parentIndex);
        };



        serve.reapplyClasses = function(parentIndex) {
            var info = serve.theTodos[parentIndex];
            for(var i = 0; i < info.tasks.length; i++) {
                if(info.tasksComplete[i]) {
                    if(!($("#completeCheckbox" + i).hasClass("checkBoxComplete"))) {
                        $("#completeCheckbox" + i).addClass("checkBoxComplete");
                        $("#taskWords" + i).addClass("taskWordsComplete");
                    }
                } else {
                    if($("#completeCheckbox" + i).hasClass("checkBoxComplete")) {
                        $("#completeCheckbox" + i).removeClass("checkBoxComplete");
                        $("#taskWords" + i).removeClass("taskWordsComplete");
                    }
                }
            }
        }
    }

})();