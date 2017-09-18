

angular.module('services').factory('DataService', ['$http', '$q', function ($http, $q) {

    var db = {
        shortName: 'payment',
        version: '1.0',
        displayName: 'payroll report',
        maxSizeInBytes: 65536
    };
    db.db = openDatabase(db.shortName, db.version, db.displayName, db.maxSizeInBytes);

    db.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        db.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

    db.fetch = function(result) {
        //console.log(result);
        if(result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    };

    db.fetchAll = function(result) {
        var output = [];

        for(var i=0; i<result.rows.length; i++) {
            output.push(result.rows.item(i));
        }

        return output;
    };

    function createTableIfNotExists() {
        var sql = 'create table if not exists payroll(workDate datatime, workHours double, employeeId text, workGroup text, reportId text)';
        db.db.transaction(function(transaction) {
            transaction.executeSql(sql, []);
        });
    }



    return {

        getDataFromFile: function(fileName) {

            var deferred = $q.defer();
            var reader = new FileReader();

            reader.onload = function(event) {
                if(event.target.result) {
                    //console.log(event.target);
                    deferred.resolve(event.target.result);
                } else {
                    deferred.reject('error reading file');
                }
            };

            reader.readAsText(fileName);

            return deferred.promise;

        },

        checkIfReportIdExists: function(reportId) {
            var sql = 'select reportId from payroll where reportId=?';
            return db.query(sql, [reportId]).then(function(result) {
                var ret = db.fetch(result);
                if(ret) {
                    return true;
                }
                return false;
            });
        },

        getReportDataByReportId: function(reportId) {
            var sql = 'select * from payroll where reportId=?';
            return db.query(sql, [reportId]).then(function(result) {
                return db.fetchAll(result);
            });
        },

        getReportData: function() {
            var sql = 'select * from payroll order by employeeId,workDate';
            return db.query(sql, []).then(function(result) {
                return db.fetchAll(result);
            });
        },

        createTableIfNotExists: function() {
            var sql = 'create table if not exists payroll(workDate datatime, workHours double, employeeId text, workGroup text, reportId text)';
            db.db.transaction(function(transaction) {
                transaction.executeSql(sql, []);
            });
        },

        insertRecords: function(data) {
            createTableIfNotExists();
            //console.log(data);
            var sql = 'insert into payroll(workDate, workHours, employeeId, workGroup, reportId) values(?,?,?,?,?)';
            db.db.transaction(function(transaction) {
                _.each(data, function(row) {
                    //console.log(row);
                    transaction.executeSql(sql, [row.workDate, row.workHours, row.employeeId, row.workGroup, row.reportId]);
                });

                
            });
        },

        removeAllRecords: function() {
            createTableIfNotExists();
            var sql = 'delete from payroll;';
            db.db.transaction(function(transaction) {
                transaction.executeSql(sql, []);
            });
        }


    };

}]);