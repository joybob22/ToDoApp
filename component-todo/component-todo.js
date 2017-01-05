/**
 * Created by braydenlemke on 1/2/17.
 */
(function () {

    angular.module("todoApp").component("componentTodo", {
        templateUrl: "component-todo/todo.html",
        controller: todoController
    });

    function todoController(todoService) {
        var fun = this;
        fun.buttonWords = "Edit Lists";
        fun.information = todoService.theTodos;
        fun.editingLists = false;
        fun.selected = 0;
        fun.init = function() {
            $("#listItem" + fun.selected).addClass("selected");
        };

        fun.select = function(info) {
            $("#listItem" + fun.selected).removeClass("selected");
            fun.selected = info;
            $("#listItem" + info).addClass("selected");
        };

        fun.addList = function(key) {
            var input = $("#createInput").val();
            if(key.keyCode == 13 && input !== "") {
                todoService.addList(input);
                $("#createInput").val("");
            }
        };

        fun.removingListOptions = function() {
            if(fun.editingLists === false) {
                fun.editingLists = true;
                fun.buttonWords = "Close Editing";
            } else {
                fun.editingLists = false;
                fun.buttonWords = "Edit Lists";
            }
        };

        fun.removeList = function(index) {
            todoService.removeList(index);
            if(fun.selected === (index + 1)) {
                $("#listItem" + fun.selected).removeClass("selected");
                fun.selected--;
                $("#listItem" + fun.selected).addClass("selected");
            }
        };

        fun.addTask = function(key, index) {
            if(key.keyCode === 13) {
                var input = $(".taskInput").val();
                todoService.addTask(input, index);
            }
        }

    }

})();