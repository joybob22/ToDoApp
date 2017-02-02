/**
 * Created by braydenlemke on 1/3/17.
 */
(function () {

    angular.module("todoApp")

        .service("todoService", theService);

    function theService() {
        var serve = this;
        var id = 1;
        var userId = null;
        var registered = false;
        var firebaseTodos;
        var pushTodos;

        //---------------------------------------------------------------------------------------------------
        //  Registering and logging in a user
        //---------------------------------------------------------------------------------------------------

        serve.registerUser = function(email, password) {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(registerSuccess, registerError);
            function registerSuccess(data) {
                userId = data.uid;
                firebase.database().ref('users/' + data.uid).set({
                    firebaseTodos: [" "]
                });
                // var ref = firebase.database().ref().child(uid);
                // serve.firebaseTodos = $firebaseArray(ref);
                // serve.theTodos = serve.firebaseTodos;
                serve.theTodos = [];


                console.log(data);

                console.log('users/' + data.uid);

            }
            function registerError(error) {
                console.log(error.message);
            }
        };

        serve.loginUser = function(email, password) {
            firebase.auth().signInWithEmailAndPassword(email, password).then(loginSuccess, loginError);
            function loginSuccess(data) {
                userId = data.uid;
                console.log(data);
                console.log("Logged in!");
                firebase.database().ref('/users/' + data.uid).once('value').then(function(snapshot) {
                    console.log(snapshot.val().firebaseTodos);
                    firebaseTodos = snapshot.val().firebaseTodos;
                    takeOutSpaces(firebaseTodos);
                });
            }
            function loginError(error) {
                console.log(error.message);
            }
        };

        function takeOutSpaces(firebaseTodos) {
            serve.theTodos = firebaseTodos;
            if(firebaseTodos.length === 1 && firebaseTodos[0] === " ") {
                serve.theTodos = [];
            } else {
                for(var i = 0; i < firebaseTodos.length; i++) {
                    if(firebaseTodos[i].tasks.length === 1 && firebaseTodos[i].tasks[0] === " ") {
                        serve.theTodos[i].tasks = [];
                        serve.theTodos[i].tasksComplete = [];
                    }
                }
            }
        }



        //---------------------------------------------------------------------------------------------------
        //  The functionality
        //---------------------------------------------------------------------------------------------------

        serve.theTodos = [];

        serve.addList = function(input) {
            serve.theTodos.push({"name": input, "id": setId(), "tasks": [], "tasksComplete": []});
            updateFirebase(serve.theTodos);
            id++;
            console.log(serve.theTodos);
            function setId() {
                return serve.theTodos.length + 1;
            }
        };

        serve.removeList = function(index) {
            serve.theTodos.splice(index, 1);
            updateFirebase(serve.theTodos);
        };

        serve.addTask = function(input, index) {
            var index2 = serve.theTodos[index].tasks.length;
            serve.theTodos[index].tasks[index2] = input;
            serve.theTodos[index].tasksComplete[index2] = false;
            updateFirebase(serve.theTodos);
        };

        serve.markComplete = function(index, parentIndex) {
            serve.theTodos[parentIndex].tasksComplete[index] = true;
            updateFirebase(serve.theTodos);
        };

        serve.unMarkComplete = function(index, parentIndex) {
            serve.theTodos[parentIndex].tasksComplete[index] = false;
            updateFirebase(serve.theTodos);
        };

        serve.deleteTask = function(index, parentIndex) {
            serve.theTodos[parentIndex].tasks.splice(index, 1);
            serve.theTodos[parentIndex].tasksComplete.splice(index, 1);
            serve.reapplyClasses(parentIndex);
            updateFirebase(serve.theTodos);
        };

        serve.clearCompletedTasks = function(index) {
            var tasks = serve.theTodos[index].tasks;
            var tasksComplete = serve.theTodos[index].tasksComplete;
            for(var i = 0; i < tasks.length; i++) {
                if(tasksComplete[i]) {
                    tasks.splice(i, 1);
                    tasksComplete.splice(i, 1);
                    i--;
                }
            }
            updateFirebase(serve.theTodos);
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
        };
        function updateFirebase(info) {
            if(info.length === 0) {
                info[0] = " ";
                //push to firebase
                firebase.database().ref('users/' + userId).set({
                    firebaseTodos: info
                });
                //take out spaces
                return takeOutInfoSpaces(info);
            } else {
                for(var i = 0; i < info.length; i++) {
                    if(info[i].$$hashKey) {
                        delete info[i].$$hashKey;
                    }
                    if(info[i].tasks.length === 0) {
                        info[i].tasks[0] = " ";
                        info[i].tasksComplete[0] = " ";
                    }
                }

                //push to firebase
                console.log(info);
                console.log(userId);

                firebase.database().ref('users/' + userId).set({
                    firebaseTodos: info
                });
                //take out spaces
                return takeOutInfoSpaces(info);
            }
            function takeOutInfoSpaces(newInfo) {
                if(newInfo.length === 1 && newInfo[1] === " ") {
                    newInfo = [];
                    return newInfo;
                } else {
                    for(var i = 0; i < newInfo.length; i++) {
                        if(newInfo[i].tasks.length === 1 && newInfo[i].tasks[0] === " ") {
                            newInfo[i].tasks = [];
                            newInfo[i].tasksComplete = [];
                        }
                    }

                    return newInfo;
                }
            }

        }
    }



})();