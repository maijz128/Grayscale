
/**
 * Author: MaiJZ
 * Date: 2018-03-19
 * GitHub: https://github.com/maijz128
 */

var IMG_SIZE_WIDTH = 512;
var IMG_SIZE_HEIGHT = 512;
var CHANNEL_R = 0;
var CHANNEL_G = 1;
var CHANNEL_B = 2;

var OriginImageData = null;


drawOriginImage();

window.onload = function () {
    console.log('onload...');

    var inter = setInterval(function () {
        var originImgData = getOriginImageData();
        if (originImgData !== null) {
            clearInterval(inter);

            singleChannelsR(originImgData);
            singleChannelsG(originImgData);
            singleChannelsB(originImgData);

            handleMaxValueMethod(originImgData);
            handleAverageValueMethod(originImgData);
            handleWeightedAverageMethod(originImgData);
        }
    }, 100);
};


function drawOriginImage() {
    var elOriginImg = document.getElementById('origin-image');
    var elOriginCanvas = document.getElementById('origin-image-canvas');
    var ctx = elOriginCanvas.getContext("2d");
    elOriginImg.onload = function () {
        ctx.drawImage(elOriginImg, 0, 0);
        OriginImageData = ctx.getImageData(0, 0, IMG_SIZE_WIDTH, IMG_SIZE_HEIGHT);
    }
}

function getOriginImageData() {
    if (OriginImageData === null) {
        var elOriginCanvas = document.getElementById('origin-image-canvas');
        var ctx = elOriginCanvas.getContext("2d");
        OriginImageData = ctx.getImageData(0, 0, IMG_SIZE_WIDTH, IMG_SIZE_HEIGHT);
    }
    return OriginImageData;
}

/////////////////////////////////////////////////////////////////////////

function singleChannels(originImageData, targetImageData, channelIndex) {

    for (var i = 0; i < originImageData.data.length; i += 4) {
        var gray = 0;

        if (channelIndex === CHANNEL_R) {
            gray = originImageData.data[i + 0];
        } else if (channelIndex === CHANNEL_G) {
            gray = originImageData.data[i + 1];
        } else if (channelIndex === CHANNEL_B) {
            gray = originImageData.data[i + 2];
        }

        // R - 红色 (0-255)
        targetImageData.data[i + 0] = gray;
        // G - 绿色 (0-255)
        targetImageData.data[i + 1] = gray;
        // B - 蓝色 (0-255)
        targetImageData.data[i + 2] = gray;
        // A - alpha 通道 (0-255; 0 是透明的，255 是完全可见的)        
        targetImageData.data[i + 3] = originImageData.data[i + 3];
    }
    return targetImageData;
}

function handleSingleChannels(originImageData, elCanvas, channelIndex) {
    var elCanvasContext = elCanvas.getContext("2d");
    var targetImageData = elCanvasContext.createImageData(IMG_SIZE_WIDTH, IMG_SIZE_HEIGHT);

    targetImageData = singleChannels(originImageData, targetImageData, channelIndex);

    elCanvasContext.putImageData(targetImageData, 0, 0);
}

function singleChannelsR(originImageData) {
    var elCanvas = document.getElementById('single-channels-R');
    handleSingleChannels(originImageData, elCanvas, CHANNEL_R);
}

function singleChannelsG(originImageData) {
    var elCanvas = document.getElementById('single-channels-G');
    handleSingleChannels(originImageData, elCanvas, CHANNEL_G);
}

function singleChannelsB(originImageData) {
    var elCanvas = document.getElementById('single-channels-B');
    handleSingleChannels(originImageData, elCanvas, CHANNEL_B);
}

///////////////////////////////////////////////////////////////////////

function max(a, b, c) {
    var result = 0;
    if (a > b && a > c) {
        result = a;
    } else if (b > a && b > c) {
        result = b;
    } else {
        result = c;
    }
    return result;
}

function maxValueMethod(originImageData, targetImageData) {

    for (var i = 0; i < originImageData.data.length; i += 4) {
        var r = originImageData.data[i + 0];
        var g = originImageData.data[i + 1];
        var b = originImageData.data[i + 2];

        var gray = max(r, g, b);
        // if (r > g && r > b) {
        //     gray = r;
        // } else if (g > r && g > b) {
        //     gray = g;
        // } else {
        //     gray = b;
        // }

        // R - 红色 (0-255)
        targetImageData.data[i + 0] = gray;
        // G - 绿色 (0-255)
        targetImageData.data[i + 1] = gray;
        // B - 蓝色 (0-255)
        targetImageData.data[i + 2] = gray;
        // A - alpha 通道 (0-255; 0 是透明的，255 是完全可见的)        
        targetImageData.data[i + 3] = originImageData.data[i + 3];
    }
    return targetImageData;
}

function handleMaxValueMethod(originImageData) {
    var elCanvas = document.getElementById('max-value');
    var elCanvasContext = elCanvas.getContext("2d");
    var targetImageData = elCanvasContext.createImageData(IMG_SIZE_WIDTH, IMG_SIZE_HEIGHT);

    targetImageData = maxValueMethod(originImageData, targetImageData);

    elCanvasContext.putImageData(targetImageData, 0, 0);
}

///////////////////////////////////////////////////////////////////////

function averageValueMethod(originImageData, targetImageData) {

    for (var i = 0; i < originImageData.data.length; i += 4) {
        var r = originImageData.data[i + 0];
        var g = originImageData.data[i + 1];
        var b = originImageData.data[i + 2];

        var gray = (r + g + b) / 3;

        // R - 红色 (0-255)
        targetImageData.data[i + 0] = gray;
        // G - 绿色 (0-255)
        targetImageData.data[i + 1] = gray;
        // B - 蓝色 (0-255)
        targetImageData.data[i + 2] = gray;
        // A - alpha 通道 (0-255; 0 是透明的，255 是完全可见的)        
        targetImageData.data[i + 3] = originImageData.data[i + 3];
    }
    return targetImageData;
}

function handleAverageValueMethod(originImageData) {
    var elCanvas = document.getElementById('average-value');
    var elCanvasContext = elCanvas.getContext("2d");
    var targetImageData = elCanvasContext.createImageData(IMG_SIZE_WIDTH, IMG_SIZE_HEIGHT);

    targetImageData = averageValueMethod(originImageData, targetImageData);

    elCanvasContext.putImageData(targetImageData, 0, 0);
}

////////////////////////////////////////////////////////////////////////

function weightedAverageMethod(originImageData, targetImageData) {

    for (var i = 0; i < originImageData.data.length; i += 4) {
        var r = originImageData.data[i + 0];
        var g = originImageData.data[i + 1];
        var b = originImageData.data[i + 2];

        var gray = 0.229 * r + 0.587 * g + 0.114 * b;

        // R - 红色 (0-255)
        targetImageData.data[i + 0] = gray;
        // G - 绿色 (0-255)
        targetImageData.data[i + 1] = gray;
        // B - 蓝色 (0-255)
        targetImageData.data[i + 2] = gray;
        // A - alpha 通道 (0-255; 0 是透明的，255 是完全可见的)        
        targetImageData.data[i + 3] = originImageData.data[i + 3];
    }
    return targetImageData;
}

function handleWeightedAverageMethod(originImageData) {
    var elCanvas = document.getElementById('weighted-average');
    var elCanvasContext = elCanvas.getContext("2d");
    var targetImageData = elCanvasContext.createImageData(IMG_SIZE_WIDTH, IMG_SIZE_HEIGHT);

    targetImageData = weightedAverageMethod(originImageData, targetImageData);

    elCanvasContext.putImageData(targetImageData, 0, 0);
}

/////////////////////////////////////////////////////////////////////////
