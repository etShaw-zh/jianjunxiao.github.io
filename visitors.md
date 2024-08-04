---
layout: page
title: Visitors
subtitle: Where People Are Visiting From
---

----------
<!-- <style>::-webkit-scrollbar{display:none;}html,body{overflow:hidden;height:100%;margin:0;}</style> -->
<div id="mountNode"></div>
<script>/*Fixing iframe window.innerHeight 0 issue in Safari*/document.body.clientHeight;</script>
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g2-3.5.1/dist/g2.min.js"></script>
<script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.data-set-0.10.1/dist/data-set.min.js"></script>
<script src="https://gw.alipayobjects.com/os/antv/assets/lib/jquery-3.2.1.min.js"></script>
<p style="position:absolute;bottom: 0;right: 0;font-size: 10px; -webkit-transform: scale(0.83);-webkit-transform-origin: 0% 50%;color:#545454">数据: <br> <span id="total"></span></p>
<script>
$.getJSON('https://gw.alipayobjects.com/os/antvdemo/assets/data/world.geo.json', function(mapData) {    $.getJSON('https://aicodingassistant.cn/wp-admin/admin-ajax.php?action=ipmap_get_geolocation_data', function(data) {
      var chart = new G2.Chart({
        container: 'mountNode',
        forceFit: true,
        height: window.innerHeight * 1 / 3,
        padding: [20, 0, 20, 0] 
      });
      // force sync scales
      chart.scale({
        x: {
          sync: true,
          nice: false
        },
        y: {
          sync: true,
          nice: false
        }
      });
      chart.coord().reflect();
      chart.legend(false);
      chart.axis(false);
      // style the tooltip
      chart.tooltip({
        showTitle: false,
        containerTpl: '<div class="g2-tooltip"><table class="g2-tooltip-list"></table></div>',
        itemTpl: '<tr data-index="{index}"><td style="padding:5px;background-color:#white;">{name}</td><td style="padding:5px;background-color:#fff;color:#000;">{value}</td></tr>',
        'g2-tooltip': {
          borderRadius: '2px',
          backgroundColor: '#DDDDDD',
          padding: 0,
          border: '1px solid #333'
        }
      });
      // data set
      var ds = new DataSet();
      // draw the map
      var dv = ds.createView('back').source(mapData, {
        type: 'GeoJSON'
      }).transform({
        type: 'geo.projection',
        projection: 'geoMercator',
        as: ['x', 'y', 'centroidX', 'centroidY']
      });
      var bgView = chart.view();
      bgView.source(dv);
      bgView.tooltip(false);
      bgView.polygon().position('x*y').style({
        fill: '#DDDDDD',
        stroke: '#b1b1b1',
        lineWidth: 0.5,
        fillOpacity: 0.85
      });
      // draw the bubble plot
      var userData = ds.createView().source(data);
      userData.transform({
        type: 'map',
        callback: function callback(obj) {
          var projectedCoord = dv.geoProjectPosition([obj.lng * 1, obj.lat * 1], 'geoMercator');
          obj.x = projectedCoord[0];
          obj.y = projectedCoord[1];
          obj.vistors = obj.vistors * 1;
          return obj;
        }
      });
      var pointView = chart.view();
      pointView.source(userData);
      pointView.point().position('x*y').size('vistors', [2, 30]).shape('circle').opacity(0.45).color('#FF2F29').tooltip('lastdate*location*vistors');
      // pointView.point().position('x*y').shape('circle').opacity(0.45).color('#FF2F29').tooltip('lastdate*location*lat*lng*vistors');
      chart.render();
      var total = 0;
      var cities = 0;
      data.forEach(function(item) {
        total += parseInt(item.vistors);
        cities += 1;
      });
      var totalText = total + ' visitors from ' + cities + ' cities';
      document.getElementById('total').innerText = totalText;
    });
  });
</script>