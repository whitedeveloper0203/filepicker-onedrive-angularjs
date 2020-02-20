angular.module("App",['main']);

var mainApp = angular.module("main",[]);

mainApp.service('oneDriveService', function($http) {
    /**
     * Retrieve All Files and Folders
     * @param {string} path -OneDrive Directory
     * @param {string} access_token -OneDrive Token
     */
    this.getAllChildren = function(path, access_token, callback) {
        var uri = `https://graph.microsoft.com/v1.0/me/drive/${path}/children`;
        var req = {
            method: 'GET',
            url: uri,
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        }
        $http(req).then(function(response) { 
            callback(response.data); 
        }).catch(function(error) {
            console.log(error);
        });
    }
    /**
     * Retrieve Parent ID from Item ID
     * @param {string} item_id -OneDrive Directory
     * @param {string} access_token -OneDrive Token
     */
    this.getParentId = function(item_id, access_token, callback) {
        var uri = `https://graph.microsoft.com/v1.0/me/drive/items/${item_id}`;
        var req = {
            method: 'GET',
            url: uri,
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        }
        $http(req).then(function(response) { 
            callback(response.data); 
        }).catch(function(error) {
            console.log(error);
        });
    }
    /**
     * Upload File to OneDrive
     * @param {string} item_id -OneDrive Directory
     * @param {string} access_token -OneDrive Token
     * @param {File} file
     */
    this.uploadFile = function(item_id, access_token, file, callback) {
        var uri = `https://graph.microsoft.com/v1.0/me/drive/items/${item_id}:/${file.name}:/content`;

        var formData = new FormData();
        formData.append('file', file);

        var req = {
            method: 'PUT',
            url: uri,
            data: formData,
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        }
        $http(req).then(function(response) { 
            callback(response); 
        }).catch(function(error) {
            console.log(error);
        });
    }
    /**
     * Parse onedrive data for showing on table
     * @param {*} data 
     */
    this.parseData = function(data) {
        var result = [];
        data.value.forEach(function(entry) {
            var type = entry.hasOwnProperty('folder') ? 'folder' : 'file';

            var obj = { name: entry['name'], 
                        type: type, 
                        created_date: entry['createdDateTime'], 
                        download: entry['@microsoft.graph.downloadUrl'],
                        item_id: entry['id']
                    };

            result.push(obj);
        })
        return result;
    }
});

angular.module("main").controller("mainController",function($scope){
    // Controller body

});