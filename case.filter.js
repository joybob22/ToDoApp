(function() {

    angular.module("todoApp")
        .filter("case", function() {
            return function(input) {
                var output = input.toLowerCase();
                var temp;
                for(var i = 0; i < output.length; i++) {
                    if(i === 0) {
                        temp = output.slice(i,1);
                        console.log(temp);
                        console.log(output);
                        temp = temp.toUpperCase();
                        output = temp + output.slice(i + 1);
                    } else {
                        if(output[i] === " ") {
                            for(var j = i + 1; j < output.length; j++) {
                                if(output[j] !== " " && output[j] != "") {
                                    temp = output.slice(j, j + 1);
                                    temp = temp.toUpperCase();
                                    output = output.slice(0, j) + temp + output.slice(j + 1);
                                    break;
                                }
                            }
                        }
                    }
                }
                return output;
            }
        })

})();