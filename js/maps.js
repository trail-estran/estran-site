/* ===================================
   maps.js — Leaflet + GPX
   Page épreuves uniquement
   =================================== */

(function () {
  'use strict';

  var RACES = {
    estran: {
      center: [48.825, -3.275], zoom: 12,
      color: '#d19572', gpx: 'gpx/estran.gpx',
      markers: {
        start:  { lat: 48.8244, lng: -3.2042, label: 'Départ — La Roche Jaune' },
        finish: { lat: 48.8211, lng: -3.3512, label: 'Arrivée — Plage de Trestel' }
      }
    },
    bernique: {
      center: [48.840, -3.300], zoom: 13,
      color: '#a2bdcc', gpx: 'gpx/bernique.gpx',
      markers: {
        start:  { lat: 48.8549, lng: -3.2472, label: 'Départ — Pors Scaff' },
        finish: { lat: 48.8211, lng: -3.3512, label: 'Arrivée — Plage de Trestel' }
      }
    },
    crevette: {
      center: [48.825, -3.365], zoom: 14,
      color: '#ebb4c5', gpx: 'gpx/crevette.gpx',
      markers: {
        start: { lat: 48.8211, lng: -3.3512, label: 'Départ & Arrivée — Plage de Trestel' }
      }
    }
  };

  function dot(color) {
    return L.divIcon({
      className: 'custom-marker',
      html: '<div style="width:14px;height:14px;border-radius:50%;background:' + color +
            ';border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4)"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  }

  function init(id, cfg) {
    var map = L.map(id, {
      center: cfg.center, zoom: cfg.zoom,
      scrollWheelZoom: false
    });

    /* Fond Plan IGN v2 (Géoplateforme) : gratuit, sans clé API */
    L.tileLayer('https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0' +
      '&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/png' +
      '&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
      attribution: '&copy; <a href="https://www.ign.fr/">IGN</a> Géoplateforme',
      minZoom: 2, maxZoom: 19
    }).addTo(map);

    if (cfg.markers) {
      Object.values(cfg.markers).forEach(function (m) {
        L.marker([m.lat, m.lng], { icon: dot(cfg.color) })
          .addTo(map).bindPopup('<strong>' + m.label + '</strong>');
      });
    }

    try {
      new L.GPX(cfg.gpx, {
        async: true,
        polyline_options: { color: cfg.color, weight: 5, opacity: 1, lineCap: 'round' },
        marker_options: { startIconUrl: null, endIconUrl: null, shadowUrl: null }
      }).on('loaded', function (e) {
        /* Contour foncé sous le tracé pour qu'il ressorte sur le fond de carte */
        (function addHalo(layer) {
          if (layer instanceof L.Polyline) {
            L.polyline(layer.getLatLngs(), {
              color: '#1f2d3d', weight: 8, opacity: 0.9, lineCap: 'round', interactive: false
            }).addTo(map).bringToBack();
          } else if (layer.eachLayer) {
            layer.eachLayer(addHalo);
          }
        })(e.target);
        map.fitBounds(e.target.getBounds().pad(0.1));
        var wrap = document.getElementById(id).closest('.race-map-wrap');
        if (wrap) { var lbl = wrap.querySelector('.map-overlay-label'); if (lbl) lbl.style.display = 'none'; }
      }).on('error', function () {}).addTo(map);
    } catch (e) {}

    map.on('click', function () { map.scrollWheelZoom.enable(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    Object.keys(RACES).forEach(function (k) { init('map-' + k, RACES[k]); });
  });
})();
