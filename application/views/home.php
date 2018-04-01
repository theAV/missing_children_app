<!doctype html>
<html lang="en" data-ng-app="MCWA" data-version="{{appVersion}}" data-name="{{appName}}">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <base href="<?php echo base_url(); ?>">
    
    <link rel="stylesheet" href="<?php echo base_url(); ?>app/assets/css/style.css">
    <title>Hello, world!</title>
    <?php $this->load->view('global_script_var');?> 
  </head>
  <body>
    
    <ui-view></ui-view>

    <!-- Optional JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.6.5/angular-sanitize.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.3/angular-ui-router.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/oclazyload/1.1.0/ocLazyLoad.min.js"></script>
    <script src="<?php echo base_url(); ?>app/js/app.js"></script>
    <script>
      // TODO add service worker code here
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
                .register('./service-worker.js')
                .then(function() { console.log('Service Worker Registered'); });
      }
    </script>
  </body>
</html>