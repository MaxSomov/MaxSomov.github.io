function reset() {
    document.getElementById('width').value = 500;
    document.getElementById('height').value = 500;
    document.getElementById('cX').value = 0;
    document.getElementById('cY').value = 0;
    document.getElementById('cW').value = 2;
    document.getElementById('depth').value = 512;
    document.getElementById('function').value = 2;
    document.getElementById('factor').value = '1e0';
}

function increase() {
    var value = Number(document.getElementById('factor').value);
    var cW = document.getElementById('cW');
    cW.value = Number(cW.value) - value;
    drawFractal();
}

function decrease() {
    var value = Number(document.getElementById('factor').value);
    var cW = document.getElementById('cW');
    cW.value = Number(cW.value) + value;
    drawFractal();
}

function move(direction) {
    var step = Number(document.getElementById('factor').value);
    var cX, cY;
    switch (direction) {
        case 'right':
            cX = document.getElementById('cX');
            cX.value = Number(cX.value)+step;
            break;
        case 'left':
            cX = document.getElementById('cX');
            cX.value = Number(cX.value)-step;
            break;
        case 'up':
            cY = document.getElementById('cY');
            cY.value = Number(cY.value)-step;
            break;
        case 'down':
            cY = document.getElementById('cY');
            cY.value = Number(cY.value)+step;
            break;
    }
    drawFractal();
}

function drawFractal() {
    //canvas element & painting context
    var fractalCanvas = document.getElementById('canvas');
    var ctx = fractalCanvas.getContext('2d');

    //center coordinates & width
    var cX = Number(document.getElementById('cX').value);
    var cY = Number(document.getElementById('cY').value);
    var cW = Number(document.getElementById('cW').value);

    var Cre_start = cX - cW/2,
        Cre_finish = cX + cW/2,
        Cim_start = cY - cW/2,
        Cim_finish = cY + cW/2;

    //screen size
    var scr_x = 500,
        scr_y = 500;

    //iteration count
    var depth = 512;

    var tmp;

    tmp = document.getElementById('width').value;
    if (tmp !== '') {
        scr_x = Number(tmp);
        fractalCanvas.width = scr_x;
    }
    tmp = document.getElementById('height').value;
    if (tmp !== '') {
        scr_y = Number(tmp);
        fractalCanvas.height = scr_y;
    }

    tmp = document.getElementById('depth').value;
    if (tmp !== '') {
        depth = Number(tmp);
    }

    var step_x = (Cre_finish - Cre_start) / scr_x,
        step_y = (Cim_finish - Cim_start) / scr_y;

    var z, c, iteration, t;

    var Zr, Zi, Cr, Ci;

    var i, j;

    var R, G, B;

    for (i = 0; i < scr_x; i++) {
        for (j = 0; j < scr_y; j++) {
            z = 0;
            Zr = Zi = 0;
            c = (Cre_start + step_x * i) + (Cim_start + step_y * j);

            Cr = Cre_start + step_x * i;
            Ci = Cim_start + step_y * j;

            iteration = 0;

            while (iteration < depth) {
                t = Zr * Zr - Zi * Zi;
                Zi = 2 * Zr * Zi + Ci;

                Zr = t + Cr;

                if (Math.abs(Zr + Zi) > 2) {
                    break;
                }
                iteration++;
            }

            if (iteration === depth) {
                R = 23;
                G = 30;
                B = 76;
                ctx.fillStyle = "rgb(" + R + ", " + G + ", " + B + ")";
                ctx.fillRect(i, j, 1, 1);
            } else {
                R = (4 * iteration) % 255;
                G = (6 * + iteration) % 255;
                B = (8 * + iteration) % 255;
                ctx.fillStyle = "rgb(" + R + ", " + G + ", " + B + ")";
                ctx.fillRect(i, j, 1, 1);
            }
        }
    }
    if (document.getElementById('aim').checked === true){
        ctx.beginPath();
        ctx.moveTo(scr_x/2,0);
        ctx.lineTo(scr_x/2,scr_y);
        ctx.moveTo(0,scr_y/2);
        ctx.lineTo(scr_x,scr_y/2);
        ctx.stroke();
    }
}