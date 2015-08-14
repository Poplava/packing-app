var Immutable = require('immutable');
var __debug = 0;

var Figure = Immutable.Record({
  id: null,
  x: null,
  y: null,
  w: null,
  h: null,

  getSquare: function() {
    return this.w * this.h;
  },

  hasIntersection: function(figure) {
    var x = [
        [this.x, this.x + this.w],
        [figure.x, figure.x + figure.w]
      ].sort(function(a, b) {
          return a[0] - b[0];
        }),
      y = [
        [this.y, this.y + this.h],
        [figure.y, figure.y + figure.h]
      ].sort(function(a, b) {
          return a[0] - b[0];
        }),
      xr = [],
      yr = [];

    x.forEach(function(v) {
      v.forEach(function(_v) {
        xr.push(_v - x[0][0]);
      });
    });

    y.forEach(function(v) {
      v.forEach(function(_v) {
        yr.push(_v - y[0][0]);
      });
    });

    __debug++;

    return xr[1] > xr[2] && yr[1] > yr[2];
  }
});

var Point = Immutable.Record({
  x: null,
  y: null
});

var resultRectMap = Immutable.List();
var pointMap = Immutable.List([new Point({x: 0, y: 0})]);

function getRectMapSquare(rectMap) {
  var maxX = 0, maxY = 0;

  rectMap.forEach(function(figure) {
    var x, y;

    x = figure.x + figure.w;
    y = figure.y + figure.h;

    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  });

  return maxX * maxY;
}

function getRectMapUsefulSquare(rectMap) {
  return rectMap.reduce(function(r, figure) {
    return r + figure.getSquare();
  }, 0);
}

function pushToMap(figure) {
  var mapCollector = Immutable.List();

  pointMap.forEach(function(point) {
    var pointedFigure = createPointedFigure(figure, point);

    if (!checkFigureIntersection(pointedFigure)) {
      mapCollector = mapCollector.push(resultRectMap.push(pointedFigure));
    }
  });

  pointMap.forEach(function(point) {
    var pointedFigure = createPointedFigure(figure, {
      x: point.x,
      y: point.y - figure.h
    });

    if (pointedFigure.x >= 0 && pointedFigure.y >= 0 && !checkFigureIntersection(pointedFigure)) {
      mapCollector = mapCollector.push(resultRectMap.push(pointedFigure));
    }
  });

  pointMap.forEach(function(point) {
    var pointedFigure = createPointedFigure(figure, {
      x: point.x - figure.w,
      y: point.y
    });

    if (pointedFigure.x >= 0 && pointedFigure.y >= 0 && !checkFigureIntersection(pointedFigure)) {
      mapCollector = mapCollector.push(resultRectMap.push(pointedFigure));
    }
  });

  pointMap.forEach(function(point) {
    var pointedFigure = createPointedFigure(figure, {
      x: point.x - figure.w,
      y: point.y - figure.h
    });

    if (pointedFigure.x >= 0 && pointedFigure.y >= 0 && !checkFigureIntersection(pointedFigure)) {
      mapCollector = mapCollector.push(resultRectMap.push(pointedFigure));
    }
  });

  resultRectMap = mapCollector.max(function(map1, map2) {
    var u1 = getRectMapUsefulSquare(map1),
      s1 = getRectMapSquare(map1),
      u2 = getRectMapUsefulSquare(map2),
      s2 = getRectMapSquare(map2),
      c1 = 0, c2 = 0;

    if (s1 > 0) {
      c1 = u1 / s1;
    }

    if (s2 > 0) {
      c2 = u2 / s2;
    }

    return c2 < c1;
  });

  createNewPoints(resultRectMap.last());
}

function createNewPoints(figure) {
  var i,
    x1 = figure.x,
    x2 = x1 + figure.w,
    y1 = figure.y,
    y2 = y1 + figure.h;

  for (i = x1; i <= x2; i++) {
    pointMap = pointMap.push(new Point({x: i, y: y1}));
    pointMap = pointMap.push(new Point({x: i, y: y2}));
  }

  for (i = y1; i <= y2; i++) {
    pointMap = pointMap.push(new Point({x: x1, y: i}));
    pointMap = pointMap.push(new Point({x: x2, y: i}));
  }
}

function createPointedFigure(figure, point) {
  figure = figure.set('x', point.x);
  figure = figure.set('y', point.y);

  return figure;
}

function checkFigureIntersection(figure) {
  return resultRectMap.some(function(f) {
    return f.hasIntersection(figure);
  });
}

module.exports = function(rects) {
  __debug = 0;
  pointMap = Immutable.List([new Point({x: 0, y: 0})]);
  resultRectMap = resultRectMap.clear();
  rects = rects.sort(function(a, b) {
    return b.width * b.height - a.width * a.height;
  });

  rects.forEach(function(rect) {
    rect.w = rect.width;
    rect.h = rect.height;
    var f = new Figure(rect);
    pushToMap(f);
  });

  console.log(__debug);

  return resultRectMap.toJSON();
};