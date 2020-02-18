var oneDriveAjax = {
    /**
     * Retrieve All Files and Folders
     * @param {string} path -OneDrive Directory
     * @param {string} access_token -OneDrive Token
     */
    getAllChildren: function(path, access_token, callback) {
        var Uri = `https://graph.microsoft.com/v1.0/me/drive/${path}/children`;
        $.ajax({
            url: Uri,
            headers: { 
                "Authorization": `Bearer ${access_token}`
            },
            method: 'GET',
            success : function(response) {
                callback(response);
            }
        })
    },
    /**
     * Retrieve All Files and Folders
     * @param {string} item_id -OneDrive Directory
     * @param {string} access_token -OneDrive Token
     */
    getParentId: function(item_id, access_token, callback) {
        var Uri = `https://graph.microsoft.com/v1.0/me/drive/items/${item_id}`;
        $.ajax({
            url: Uri,
            headers: { 
                "Authorization": `Bearer ${access_token}`
            },
            method: 'GET',
            success : function(response) {
                callback(response);
            }
        })
    },
    parseData: function(data) {
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
};