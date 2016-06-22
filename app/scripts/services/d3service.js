'use strict';

/**
 * @ngdoc service
 * @name tutD3AngApp.d3Service
 * @description
 * # d3Service
 * Factory in the tutD3AngApp.
 */
angular.module('tutD3AngApp')
  .factory('d3Service', function ($q, $rootScope, $document) {
    var d3;
    //code d3 here
    var d = $q.defer();
    function onScriptLoad(){
        $rootScope.$apply(function (){ d.resolve(window.d3); })
    }
    // Create a script tag with d3 as the source
    // and call our onScriptLoad callback when it
    // has been loaded
    var scriptTag = $document[0].createElement('script');
    scriptTag.type = 'text/javascript'; 
    scriptTag.async = true;
    scriptTag.src = 'bower_components/d3/d3.min.js';
    scriptTag.onreadystatechange = function () {
        if (this.readyState == 'complete') onScriptLoad();
    }
    scriptTag.onload = onScriptLoad;

    var s = $document[0].getElementsByTagName('body')[0];
    s.appendChild(scriptTag);

    return {
        d3: function() { return d.promise; }
    };
});
