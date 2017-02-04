/**
 * Created by braydenlemke on 1/3/17.
 */
(function () {

    angular.module("todoApp")

        .service("todoService", theService);

    function theService($mdToast) {
        var serve = this;
        serve.userId = null;
        var registered = false;
        var firebaseTodos;
        var pushTodos;
        serve.loginWords = "login";


        //---------------------------------------------------------------------------------------------------
        //  Registering and logging in a user
        //---------------------------------------------------------------------------------------------------

        serve.registerUser = function(email, password) {
            if(serve.userId !== null) {
                var credential = firebase.auth.EmailAuthProvider.credential(email, password);
                firebase.auth().currentUser.link(credential).then(function(user) {
                    serve.loginWords = "sign out";
                    $("#loginNav").text("Sign Out");
                    serve.userId = user.uid;
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Registration Successful! All work will now be saved.')
                            .position("top right")
                            .theme('success-toast')
                            .hideDelay(5000)
                    );
                }, function(error) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(error.message)
                            .position("top right")
                            .theme('error-toast')
                            .hideDelay(3000)
                    );
                });
            } else {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(registerSuccess, registerError);
                function registerSuccess(data) {
                    serve.userId = data.uid;
                    serve.loginWords = "sign out";
                    $("#loginNav").text("Sign Out");
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Registration Successful!')
                            .position("top right")
                            .theme('success-toast')
                            .hideDelay(3000)
                    );
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
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(error.message)
                            .position("top right")
                            .theme('error-toast')
                            .hideDelay(3000)
                    );
                }


            }

        };

        serve.loginUser = function(email, password) {
            firebase.auth().signInWithEmailAndPassword(email, password).then(loginSuccess, loginError);
            function loginSuccess(data) {
                serve.loginWords = "sign out";
                $("#loginNav").text("Sign Out");

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Login Successful!')
                        .position("top right")
                        .theme('success-toast')
                        .hideDelay(3000)
                );
                serve.userId = data.uid;
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
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(error.message)
                        .position("top right")
                        .theme('error-toast')
                        .hideDelay(3000)
                );
            }
        };

        serve.makeGuest = function() {
            firebase.auth().signInAnonymously().then(guestSuccess, guestError);
            function guestSuccess(user) {
                serve.userId = user.uid;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Guest login successful, if you would like to save any work changes at any time go to the register page to make an account.')
                        .position("top right")
                        .theme('success-toast')
                        .hideDelay(10000)
                );
            }
            function guestError(error) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(error.message)
                        .position("top right")
                        .theme('error-toast')
                        .hideDelay(3000)
                );
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

        serve.logout = function() {
                firebase.auth().signOut().then(function() {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Sign out successful!')
                            .position("top right")
                            .theme('success-toast')
                            .hideDelay(3000)
                    );
                    $("#loginNav").text("Login");
                    serve.theTodos = [];
                    serve.loginWords = "login";
                    serve.userId = null;
                }, function(error) {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('There was a problem signing out')
                            .position("top right")
                            .theme('error-toast')
                            .hideDelay(3000)
                    );
                });
        };



        //---------------------------------------------------------------------------------------------------
        //  The functionality
        //---------------------------------------------------------------------------------------------------

        serve.theTodos = [];

        serve.addList = function(input) {
            serve.theTodos.push({"name": input, "tasks": [], "tasksComplete": []});
            updateFirebase(serve.theTodos);
            console.log(serve.theTodos);
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
                firebase.database().ref('users/' + serve.userId).set({
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
                console.log(serve.userId);

                firebase.database().ref('users/' + serve.userId).set({
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