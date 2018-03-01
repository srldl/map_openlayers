'use strict';

var angular = require('angular');

var map_test2 = angular.module('map_test2',[]);


map_test2.controller('MapCtrl', function($scope) {

  var projection = ol.proj.get('EPSG:3857');
     var projectionExtent = projection.getExtent();
     var size = ol.extent.getWidth(projectionExtent) / 256;
     var resolutions = new Array(14);
     var matrixIds = new Array(14);
     for (var z = 0; z < 14; ++z) {
       // generate resolutions and matrixIds arrays for this WMTS
       resolutions[z] = size / Math.pow(2, z);
       matrixIds[z] = z;
     }

     var layer = new ol.layer.Tile({
       source: new ol.source.WMTS({
         attributions: 'Tiles ©',
         url: 'https://services.arcgisonline.com/arcgis/rest/' +
             'services/Demographics/USA_Population_Density/MapServer/WMTS/',
         layer: '0',
         matrixSet: 'EPSG:3857',
         format: 'image/png',
         projection: projection,
         tileGrid: new ol.tilegrid.WMTS({
           origin: ol.extent.getTopLeft(projectionExtent),
           resolutions: resolutions,
           matrixIds: matrixIds
         }),
         style: 'default'
       })
     });

     console.log("layer", layer);

    var map = new ol.Map({
       layers:[layer],
       target: 'map',
       controls: ol.control.defaults({
         attributionOptions: {
           collapsible: false
         }
       }),
       view: new ol.View({
         center: [-11158582, 4813697],
         zoom: 4
       })
     });

});
