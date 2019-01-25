/**
 * @class Класс фрактала
 *
 * @param size {number} Ширина изображения. Высота определяется автоматически.
 * @param iterations {number} Количество итераций
 * @param color {string} Цвет линии
 * @constructor
 */
function Koch(size, iterations, color) {

    var COS_60 = 0.5,
        SIN_60 = -0.866;

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");

    var startPoint = {},
        endPoint = {};

    /**
     * @description Рекурсивная функция рисования кривой
     *
     * @param startPoint {Object} Начальная точка отрезка
     * @param endPoint {Object} Конечная точка отрезка
     * @param iterations {number} Количество итераций
     */
    var drawKoch = function (startPoint, endPoint, iterations) {

        /**
         *
         * @type {Object} Точки кривой
         *
         *      C
         *     / \
         * A--B   D--E
         *
         */
        var pointA = startPoint,
            pointB = {},
            pointC = {},
            pointD = {},
            pointE = endPoint;

        ctx.strokeStyle = color;

        // Если количество итераций равно 0, рисуется прямая линия, иначе вычисляются значения промежуточных точек и рекурсивно вызывается функция для каждого отрезка с iteration-1
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
    };

    /**
     * @description Обновление координат начальной и конечной точек при изменении размера изображения
     */
    var updatePoints = function () {
        startPoint = {
            x: 0,
            y: canvas.height - 1
        };
        endPoint = {
            x: canvas.width,
            y: canvas.height - 1
        };
    };

    /**
     * @description Очищает канвас и рисует изображение
     */
    this.draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawKoch(startPoint, endPoint, iterations);
    };

    /**
     * @description Изменяет количество итераций
     *
     * @param i {number} Новое значение количества итераций
     * @returns {number} Возвращает текущее количество итераций, если в функцию не передавать аргументы
     */
    this.iterations = function (i) {
        if (!arguments.length) {
            return iterations;
        } else {
            iterations = i;
        }
    };


    /**
     * Изменение размеров изображения
     *
     * @param value {number} Новое значение ширины изображения.
     * @returns {number} Возвращает ширину изображения, если в функцию не передавать аргументы
     */
    this.size = function (value) {
        if (!arguments.length) {
            return canvas.width;
        } else {
            canvas.width = value;
            canvas.height = value / 3;
            updatePoints();
        }
    };

    /**
     * Изменяет цвет кривой
     *
     * @param value {string} Новое hex значение цвета
     * @returns {number} Возвращает текущий цвет кривой, если в функцию не передавать аргументы
     */
    this.color = function (value) {
        if(!arguments.length){
            return color;
        } else {
            color = value;
        }
    };



    this.size(size);
}

var iterations = document.getElementById('iterations');
var size = document.getElementById('size');
var color = document.getElementById('color');

var fractal = new Koch(+size.value, +iterations.value, color.value);
fractal.draw();

iterations.onchange = function () {
    fractal.iterations(+iterations.value);
    fractal.draw();
};

size.onchange = function () {
    fractal.size(+size.value);
    fractal.draw();
};

color.onchange = function () {
    fractal.color(color.value);
    fractal.draw();
};

