
'use strict';

var angular = require('angular');

var map_openlayers = angular.module('map_openlayers',[]);


map_openlayers.controller('MapCtrl', function($scope) {
  var EPSG = 'EPSG:3031'; // EPSG:3031 - WGS 84 / Antarctic Polar Stereographic

  proj4.defs(EPSG, "+proj=stere +lat_0=-90 +lat_ts=-71 +lon_0=0 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs");

       var projection = ol.proj.get(EPSG);
       console.log(projection);

       //var projectionExtent = [-2623287.1531823575, -2623287.1531823575,  6623287.153182365, 6623287.153182365];
       var origin = [-28567900, 32567900];
    //   var resolutions = new Array(9);
    //   var matrixIds = new Array(9);
       var resolutions = [21674.7100160867,10837.35500804335,5418.677504021675,2709.3387520108377,1354.6693760054188,677.3346880027094,338.6673440013547,169.33367200067735,84.66683600033868,42.33341800016934];
        var matrixIds = [0,1,2,3,4,5,6,7,8,9]
    //   for (var z = 0; z < 9; ++z) {
         // generate resolutions and matrixIds arrays for this WMTS
    //     resolutions[z] = size / Math.pow(2, z);
    //     matrixIds[z] = z;
    //  }

  console.log(resolutions);

  var url = "http://vilhelm.npolar.no/arcgis/rest/services/Basisdata_Intern/NP_Antarktis_WMTS_3031/MapServer/WMTS";

  var layer = new ol.layer.Tile({
    source: new ol.source.WMTS({
      attributions: 'Tiles ©',
      url: url,
      layer: 'Basisdata_Intern_NP_Antarktis_WMTS_3031',
      matrixSet: 'default028mm',
      format: 'image%2Fjpgpng',
      projection: projection,
      tileGrid: new ol.tilegrid.WMTS({
        origin: origin,
        resolutions: resolutions,
        matrixIds: matrixIds
      }),
      style: 'default'
    })
  });

  var map = new ol.Map({
  layers:[layer],
  target: 'map',
  controls: ol.control.defaults({
    attributionOptions: {
      collapsible: false
    }
  }),
        view: new ol.View({
          center: ol.proj.transform([2.5333, -89.9999], 'EPSG:4326', EPSG),
          zoom: 4
        })
      });

});
