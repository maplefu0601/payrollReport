angular.module('lists', []).directive('payList', function () {

    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
        	
        	
        },
        scope: {
            data: '='
            
        },
        
        templateUrl: 'views/pay-list.html'
    };

}).directive('fileChange', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var onChangeHandler = scope.$eval(attrs.fileChange);
            element.bind('change', onChangeHandler);
        }
    };
});
