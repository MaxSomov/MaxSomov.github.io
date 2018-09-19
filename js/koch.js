function Koch(size, iterations) {
//todo Выбор цвета
//todo цвета зависит от отерации
//todo передача размеров в конструктор
//todo толщина линии

    var COS_60 = 0.5,
        SIN_60 = -0.866;

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");

    var startPoint = {},
        endPoint = {};

    var drawKoch = function (startPoint, endPoint, iterations) {
        var pointA = startPoint,
            pointB = {},
            pointC = {},
            pointD = {},
            pointE = endPoint;

        if (iterations === 0) {
            ctx.beginPath();
            ctx.moveTo(pointA.x, pointA.y);
            ctx.lineTo(pointE.x, pointE.y);
            ctx.stroke();
        } else {
            pointB.x = pointA.x + (pointE.x - pointA.x) / 3;
            pointB.y = pointA.y + (pointE.y - pointA.y) / 3;

            pointD.x = pointA.x + (pointE.x - pointA.x) * 2 / 3;
            pointD.y = pointA.y + (pointE.y - pointA.y) * 2 / 3;

            pointC.x = pointB.x + (pointD.x - pointB.x) * COS_60 - SIN_60 * (pointD.y - pointB.y);
            pointC.y = pointB.y + (pointD.x - pointB.x) * SIN_60 + COS_60 * (pointD.y - pointB.y);

            drawKoch(pointA, pointB, iterations - 1);
            drawKoch(pointB, pointC, iterations - 1);
            drawKoch(pointC, pointD, iterations - 1);
            drawKoch(pointD, pointE, iterations - 1);
        }
    }

    var updateSize = function () {
        startPoint = {
            x: 0,
            y: canvas.height - 1
        };
        endPoint = {
            x: canvas.width,
            y: canvas.height - 1
        };
    }

    this.draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawKoch(startPoint, endPoint, iterations);
    }

    this.iterations = function (i) {
        if (!arguments.length) {
            return iterations;
        } else {
            iterations = i;
        }
    }

    this.size = function (value) {
        if (!arguments.length) {
            return canvas.width;
        } else {
            canvas.width = value;
            canvas.height = value / 3;
            updateSize();
        }
    }

    //CONSTRUCTOR
    this.size(size);
}

var iterations = document.getElementById('iterations');
var width = document.getElementById('width');
var height = document.getElementById('height');
var size = document.getElementById('size');

var fractal = new Koch(+size.value, +iterations.value);
fractal.draw();

iterations.onchange = function () {
    fractal.iterations(+iterations.value);
    fractal.draw();
}

size.onchange = function () {
    fractal.size(+size.value);
    fractal.draw();
}

