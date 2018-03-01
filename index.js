'use strict';

var angular = require('angular');

var map_test2 = angular.module('map_test2',[]);


map_test2.controller('MapCtrl', function($scope) {

  var map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: 'map',
    controls: ol.control.defaults({
      attributionOptions: {
        collapsible: false
      }
    }),
    view: new ol.View({
      center: [0, 0],
      zoom: 2
    })
  });

});
