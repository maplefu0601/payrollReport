describe('data service', function () {

    var service;
    var httpBackend, getRequestHandler;
    var $scope = {};
    var db = {
        shortName: 'payment',
        version: '1.0',
        displayName: 'payroll report',
        maxSizeInBytes: 65536
    };
    db.query = function() {};
    db.fetch = function() {};
    db.fetchAll = function() {};
    
    beforeEach(module('services'));

    beforeEach(inject(function (DataService, $httpBackend) {
        service = DataService;
        
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
        httpBackend.verifyNoOutstandingExpectation();
    });

    it('should return data from file', function() {

    });

    it('should return false if report id is not exist', function() {
        service.checkIfReportIdExists('4');
        expect(db.query).toHaveBeenCalled();
    });

});