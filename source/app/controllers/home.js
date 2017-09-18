

angular.module('controllers').controller('HomeController', ['$scope', 'DataService', '$window', function ($scope, DataService, $window) {


    $scope.fileName = '';
    $scope.rawData = [];
    $scope.reportData = [];
    $scope.reportId = '';
    $scope.pay = {A : 20, B : 30};


    $scope.errorExist = false;

    $scope.removeReports = function() {
        $scope.errorExist = false;
        DataService.removeAllRecords();
    };

    $scope.generateReport = function() {
        $scope.errorExist = false;
        DataService.getReportData().then(function(data) {
            $scope.rawData = data;
            renderReport();
        });
    };

    $scope.uploadFile = function(event) {
    	
        $scope.reportData = [];
        $scope.rawData = [];
        var files = event.target.files;
        
    	$scope.errorExist = false;
        $scope.fileName = files[0];

    	DataService.getDataFromFile(files[0]).then(function(data) {
            //console.log(data);

            parseData(data);
            //console.log($scope.rawData);
            //DataService.removeAllRecords();

            DataService.checkIfReportIdExists($scope.reportId).then(function(ret) {
                if(ret) {
                    $scope.errorExist = true;
                    $scope.error = 'This report ID is exist already.';
                    console.log($scope.error);
                } else {
                    $scope.errorExist = false;
                    DataService.insertRecords($scope.rawData);

                    $scope.generateReport();
                }
            });
             

        }).catch(function(reason) {
            console.log(reason);
            $scope.errorExist = true;
        });
    };

    function parseData(data) {
        var lines = data.split('\n');
        lines = lines.splice(1);
        
        var reportId = lines[lines.length-2].split(',')[1];
        //console.log(reportId);
        $scope.reportId = reportId;

        lines = lines.splice(0,lines.length-2);
        //console.log(lines);
        _.each(lines, function(line) {
            //console.log(line);
            var row = line.split(',');
            //console.log(row);
            var temp = row[0].split('/');
            row[0] = new Date(temp[2], temp[1]-1, temp[0]).valueOf();
            $scope.rawData.push({workDate:row[0], workHours:row[1], employeeId:row[2], workGroup:row[3], reportId:$scope.reportId});
        });
    }

    function renderReport() {
    	
    	$scope.rawData = _.chain($scope.rawData).sortBy('workDate').sortBy('employeeId').value();
        //console.log($scope.rawData);
        var tempData = {};
        _.each($scope.rawData, function(row) {
            var payPeriod = '';
            var rowT = new Date(row.workDate);
            var day = rowT.getDate();
            var mon = rowT.getMonth()+1;
            var year = rowT.getFullYear();
            var lastDay = new Date(year, mon, 0).getDate();
            if(day > 15) {
                payPeriod = '16/'+mon+'/'+year+' - '+lastDay+'/'+mon+'/'+year;
                
            } else {
                payPeriod = '1/'+mon+'/'+year+' - '+'15'+'/'+mon+'/'+year;
            }
            var key = row.employeeId+payPeriod;
            var pay = row.workGroup==='A' ? $scope.pay.A*row.workHours : $scope.pay.B*row.workHours;
            if(key in tempData) {
                tempData[key].amountPaid += pay;
            } else {
                tempData[key] = {employeeId:row.employeeId, payPeriod:payPeriod, amountPaid:pay};
            }
        });
        $scope.tempData = _.toArray(tempData);
        $scope.tempData = _.filter($scope.tempData, function(row) { return row.amountPaid > 0;});
        _.each($scope.tempData, function(row) {
            row.amountPaid = '$'+parseFloat(Math.round(row.amountPaid * 100) / 100).toFixed(2);
        });
        $scope.reportData = $scope.tempData;
        //console.log($scope.reportData);

    }

    
}]);