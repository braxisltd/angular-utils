function RepeaterCtrl($scope) {
    $scope.chars = [
        {"value":"a"},
        {"value":"b"},
        {"value":"c"},
        {"value":"d"},
        {"value":"e"},
        {"value":"f"},
        {"value":"g"}
    ];
    $scope.message = ""

    $scope.concat = function () {
        $scope.message = "";
        for (var i = 0; i < $scope.chars.length; i++) {
            $scope.message += $scope.chars[i].value;
        }
        $scope.message;
    }

}