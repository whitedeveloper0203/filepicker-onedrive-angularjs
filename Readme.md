FilePicker / OneDrive
=====================

* [OneDrive Picker SDK Docs](https://docs.microsoft.com/en-us/onedrive/developer/controls/file-pickers/?view=odsp-graph-online)

# Installation

1. Using NPM

  ```Bash
  npm install
  ```

2. Run Server

  ```Bash
  npm start
  ```

  Or

  ```Bash
  serve -s -l port
  ```

# Usage
1. Include OneDrive refefence to SDK

  ```html
  <script type="text/javascript" src="https://js.live.net/v7.0/OneDrive.js"></script>
  ```

2. Include onedrive-modal.component.js to index.html
  ```html
  <script src="./component/onedrive-modal.component.js"></script>
  ```

3. Add onedrive-button component into your index.html
  ```html
  <onedrive-button attr-client-id="ff8253d6-56fe-435e-8bbb-00482af7cb48"></onedrive-button>
  ``` 
  
  It requires OneDrive App client-id