/**
 * OneDrive Controller
 * @constructor
 * @param {Object} $scope - The title of the book.
 * @param {Object Array} $element - The author of the book.
 * @param {Object} $attrs - The author of the book.
 */
function OneDriveController($scope, $element, $attrs) {
    
    // Get the modal
    var modal = document.getElementById('myModal');

    // When the user clicks anywhere outside of the modal, close it
    document.body.addEventListener('click',function(mEvent){
        if(mEvent.target == modal)
            modal.style.display = 'none';
    },true);

    // OneDrive Options
    var odOptions = {
        clientId: $attrs.attrClientId,
        sourceInputElementId: "fileUploadControl",
        openInNewWindow: true,
        action: '',
        success: function(files) { },
        progress: function(percent) { /* progress handler */ },
        cancel: function() { /* cancel handler */ },
        error: function(error) { /* error handler */ }
    }   

    /**
     * Open Modal
     * @constructor
     */
    $scope.openModal = function() {
    //   var modal = document.getElementById("myModal");
      modal.style.display = "block";
    };
    /**
     * Close Modal
     * @constructor
     */
    $scope.closeModal = function() {
        // var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
    /**
     * Launch OneDrive according to Action
     * @constructor
     * @param {string} action - Action for 'Save' or 'Download'
     */
    $scope.launchOneDrive = function(action) { 
        odOptions.action = action;

        if(action == 'save')
        {
            odOptions.success = function (files) { alert('success'); };
            odOptions.error = function (error) { alert(error.message); };
            OneDrive.save(odOptions);
        }
            
        else if(action == 'download')
        {
            odOptions.success = function (files) { 
                files.value.forEach(function(value) {
                    downloadFile(value['@microsoft.graph.downloadUrl'], value['name']);
                })
            };
            OneDrive.open(odOptions);
        }
    }
    /**
     * Download File
     * @constructor
     * @param {string} uri - Download File Url.
     * @param {string} filename - Filename.
     */
    function downloadFile(uri, filename) {
        var a = document.createElement("a");
        a.href = uri;
        a.setAttribute("download", filename);
        a.click();
    }
}

angular.
  module('main').
  component('onedriveButton', {  // This name is what AngularJS uses to match to the `<phone-list>` element.
    templateUrl: 'component/onedrive-modal.htm',
    controller: OneDriveController
});

