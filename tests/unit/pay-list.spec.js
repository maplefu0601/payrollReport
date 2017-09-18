describe('directive weather lists', function() {

    var $compile;
    var $scope, directiveElement;

    beforeEach(module('lists'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
       
        directiveElement = getCompiledElement();
    }));

    function getCompiledElement() {
        var compiledDirective = compile(angular.element("<pay-list ng-hide='errorExist' ng-repeat='data in reportData' data="data"></pay-list>"))($scope);
        $scope.$digest();
        return compiledDirective;
    };

    it('should add pay-list elements', function() {
        var element = $compile(angular.element('<pay-list></pay-list>'))($scope);
        $scope.$digest();
        expect(element.html()).not.toEqual('');
    });

    

});