describe('HomeController', function() {
	var httpBackend, $rootScope, createController, getRequestHandler, serviceMock, homeController;
	var scope;

	beforeEach(module('controllers'));

	beforeEach(function() {
		serviceMock = {
			getDataFromFile: function(file) {},
			checkIfReportIdExists: function(reportId) {return false;},
			removeAllRecords: function() {},
			getReportData: function() {},
			insertRecords: function() {}
		};
	});

	beforeEach(inject(function($injector, $rootScope) {

		
		$rootScope = $injector.get('$rootScope');

		var $controller = $injector.get('$controller');
		scope = $rootScope.$new();
		homeController = $controller('HomeController', {
			$scope: scope,
			DataService: serviceMock
		});

		createController = function() {
			return $controller('HomeController', {'$scope': $rootScope });
		};
	}));

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it('should remove reports', function() {
		
		scope.removeReports();
		expect(serviceMock.removeAllRecords).toHaveBeenCalled();
	});

	it('should generate report', function() {
		
		scope.generateReport();
		expect(serviceMock.getReportData).toHaveBeenCalled();
	});
});