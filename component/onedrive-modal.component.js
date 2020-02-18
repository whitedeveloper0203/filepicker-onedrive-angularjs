/**
 * OneDrive Controller
 * @constructor
 * @param {Object} $scope - The title of the book.
 * @param {Object Array} $element - The author of the book.
 * @param {Object} $attrs - The author of the book.
 */
function OneDriveController($scope, $location, $element, $attrs) {
    
    // Get the modal
    var modal = document.getElementById('myModal');

    var params = getUrlParams(window.location.hash);

    if(params['access_token'] != '' && params['access_token'] != null) {
        localStorage.setItem('__access_token', params['access_token']);
    }

    var access_token = localStorage.getItem('__access_token');
    $scope.authorized = false;
    $scope.files = [];

    if(access_token != null && access_token != '')
    {
        $scope.authorized = true;
        $scope.access_token = access_token;
        $scope.current_folder_id = 'root';
        getData('root');    
    }

    // // When the user clicks anywhere outside of the modal, close it
    // document.body.addEventListener('click',function(mEvent){
    //     if(mEvent.target == modal)
    //         modal.style.display = 'none';
    // },true);

    // // OneDrive Options
    // var odOptions = {
    //     clientId: $attrs.attrClientId,
    //     sourceInputElementId: "fileUploadControl",
    //     openInNewWindow: true,
    //     action: '',
    //     success: function(files) { },
    //     progress: function(percent) { /* progress handler */ },
    //     cancel: function() { /* cancel handler */ },
    //     error: function(error) { /* error handler */ }
    // }   

    // /**
    //  * Open Modal
    //  * @constructor
    //  */
    // $scope.openModal = function() {
    // //   var modal = document.getElementById("myModal");
    //   modal.style.display = "block";
    // };
    // /**
    //  * Close Modal
    //  * @constructor
    //  */
    // $scope.closeModal = function() {
    //     // var modal = document.getElementById("myModal");
    //     modal.style.display = "none";
    // }
    // /**
    //  * Launch OneDrive according to Action
    //  * @constructor
    //  * @param {string} action - Action for 'Save' or 'Download'
    //  */
    // $scope.launchOneDrive = function(action) { 
    //     odOptions.action = action;

    //     if(action == 'save')
    //     {
    //         odOptions.success = function (files) { alert('success'); };
    //         odOptions.error = function (error) { alert(error.message); };
    //         OneDrive.save(odOptions);
    //     }
            
    //     else if(action == 'download')
    //     {
    //         odOptions.success = function (files) { 
    //             files.value.forEach(function(value) {
    //                 downloadFile(value['@microsoft.graph.downloadUrl'], value['name']);
    //             })
    //         };
    //         OneDrive.open(odOptions);
    //     }
    // }
    /**
     * 
     */
    $scope.signIn = function() {
        var loginUri = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?';
        loginUri += `client_id=${$attrs.attrClientId}`;
        loginUri += '&scope=files.readwrite offline_access';
        loginUri += '&response_type=token';
        loginUri += '&redirect_uri=http://localhost:3000';

        window.location.href = loginUri;
    }
    /**
     * 
     */
    $scope.signOut = function() {
        localStorage.clear();
        $scope.authorized = false;
        window.location.href = 'http://localhost:3000';
    }
    /**
     * 
     */
    $scope.openFolder = function(item_id) {
    
        $scope.current_folder_id = item_id;

        if(item_id != 'root')
            item_id = `items/${item_id}`;

        oneDriveAjax.getAllChildren(item_id, $scope.access_token, function(response) {
            $scope.files = oneDriveAjax.parseData(response);
            $scope.$apply();
        });
    }
    /**
     * 
     */
    $scope.goBack = function() {
        oneDriveAjax.getParentId($scope.current_folder_id, $scope.access_token, function(response) {
            if(response['parentReference']['path'] == '/drive/root:')
                $scope.openFolder('root');
            else
                $scope.openFolder(response['parentReference']['id']);
        })
    }
    /**
     * 
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
     * 
     */
    function getData(path) {
        oneDriveAjax.getAllChildren(path, $scope.access_token, function(response) {
            $scope.files = oneDriveAjax.parseData(response);
            $scope.$apply();
        });
    }
}

angular.
  module('main').
  component('onedriveButton', {  // This name is what AngularJS uses to match to the `<phone-list>` element.
    templateUrl: 'component/onedrive-modal.htm',
    controller: OneDriveController
});

