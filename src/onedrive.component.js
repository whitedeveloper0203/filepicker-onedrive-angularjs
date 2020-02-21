/**
 * OneDrive Controller
 * @constructor
 * @param {Object} $scope - The title of the book.
 * @param {Object Array} $element - The author of the book.
 * @param {Object} $attrs - The author of the book.
 */
function OneDriveController($attrs, oneDriveService) {

    var vm = this;

    var params = getUrlParams(window.location.hash);

    if(params['access_token'] != '' && params['access_token'] != null)
    {
        vm.authorized = true;
        vm.access_token = params['access_token'];
        console.log(vm.access_token);
        vm.current_folder_id = 'root';
        getData('root');    
    }
    /**
     * Sign into OneDrive
     */
    vm.signIn = function() {
        var loginUri = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?';
        loginUri += 'client_id='+$attrs.attrClientId;
        loginUri += '&scope=files.readwrite offline_access';
        loginUri += '&response_type=token';
        loginUri += '&redirect_uri=http://localhost:3000';

        window.location.href = loginUri;
    }
    /**
     * Sign out OneDrive
     */
    vm.signOut = function() {
        vm.authorized = false;
        window.location.href = 'http://localhost:3000';
    }
    /**
     * Triggered after clicking folder with item id
     * @param {*} item_id
     */
    vm.openFolder = function(item_id) {
    
        vm.current_folder_id = item_id;

        if(item_id != 'root')
            item_id = 'items/'+item_id;

        oneDriveService.getAllChildren(item_id, vm.access_token, function(response) {
            vm.files = oneDriveService.parseData(response);
        });
    }
    /**
     * Triggered when clicked Go Back Button
     */
    vm.goBack = function() {
        oneDriveService.getParentId(vm.current_folder_id, vm.access_token, function(response) {
            if(response['parentReference']['path'] == '/drive/root:')
                vm.openFolder('root');
            else
                vm.openFolder(response['parentReference']['id']);
        })
    }
    /**
     * Upload to selected file to OneDrive
     */
    vm.uploadToDrive = function() {
        var f = document.getElementById('fileUploadControl').files[0];
        oneDriveService.uploadFile(vm.current_folder_id, vm.access_token, f, function(response) {
            if(response.status == '201')
            {
                alert('Created!');
                vm.openFolder(vm.current_folder_id);
            }
        });
    }
    /**
     * Parse queries in the URL
     * @param {*} hash 
     */
    function getUrlParams(hash) {
        hash = decodeURIComponent(decodeURIComponent(hash))
        var vars = {};
        var parts = hash.replace(/[#!#&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        
        return vars;
    }
    /**
     * Get OneDrive data with Path
     * @param {*} path
     */
    function getData(path) {
        oneDriveService.getAllChildren(path, vm.access_token, function(response) {
            vm.files = oneDriveService.parseData(response);
        });
    }
}

OneDriveController.$inject = [ '$attrs', 'oneDriveService' ];

angular.
  module('circularo.filepicker').
  component('onedrive', {
    // templateUrl: './../dist/onedrive.htm',
    template: '<div class="row">'+
                '  <div class="container">'+
                '    <div class="mb-2">'+
                '      <button class="btn btn-primary" ng-if="!vm.authorized" ng-click="vm.signIn()">OneDrive Login</button>'+
                '      <button class="btn btn-danger" ng-if="vm.authorized" ng-click="vm.signOut()">OneDrive Sign Out</button>'+
                '    </div>'+
                '    <div ng-if="vm.authorized">'+
                '      <input id="fileUploadControl" name="fileUploadControl" type="file" />'+
                '      <button class="btn btn-primary" ng-click="vm.uploadToDrive()">Save to OneDrive</button>'+
                '      <div>'+
                '        <button class="btn btn-primary" ng-click="vm.goBack()" ng-if="vm.current_folder_id!=\'root\'">Back</button>'+
                '      </div>'+
                '      <table class="table table-striped mt-2">'+
                '        <thead class="thead-dark">'+
                '          <tr>'+
                '            <th>Name</th>'+
                '            <th>Type</th>'+
                '            <th>Created Date</th>'+
                '            <th>Action</th>'+
                '          </tr>'+
                '        </thead>'+
                '        <tbody>'+
                '          <tr ng-repeat="file in vm.files">'+
                '            <td> {{file.name}}</td>'+
                '            <td> {{file.type}}</td>'+
                '            <td> {{file.created_date}}</td>'+
                '            <td>'+
                '              <a class="btn btn-primary" ng-if="file.type==\'file\'" target="_blank" href="{{file.download}}">Download</a>'+
                '              <a class="btn btn-primary" ng-if="file.type==\'folder\'" ng-click="openFolder(file.item_id)" href="javascript:void(0);">Open</a>'+
                '            </td>'+
                '          </tr>'+
                '        </tbody>'+
                '      </table>'+
                '    </div>'+
                '  </div>'+
                '</div>',
    controller: OneDriveController,
    controllerAs: 'vm'
});

