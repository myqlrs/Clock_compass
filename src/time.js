var monthText = []
for (var i = 1;i <= 12;i++) {
    if (i < 10) {
        monthText.push('0' + i + '月')
    } else {
        monthText.push(i + '月')
    }
}


var dayText = []
for (var i = 1;i <= 31;i++) {
    if (i < 10) {
        dayText.push('0' + i + '日')
    } else {
        dayText.push(i + '日')
    }
}

var weekText = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

var hourText = []
for (var i = 0;i <= 23;i++) {
    if (i < 10) {
        hourText.push('0' + i + '时')
    } else {
        hourText.push(i + '时')
    }
}

var minuteText = []
var secondsText = []
for (var i = 0;i <= 59;i++) {
    if (i < 10) {
        minuteText.push('0' + i + '分')
        secondsText.push('0' + i + '秒')
    } else {
        minuteText.push(i + '分')
        secondsText.push(i + '秒')
    }
}

var clock;
// 存放dom元素的数组   
var monthList = [];
var dayList = [];
var weekList = [];
var hourList = [];
var minuteList = [];
var secondsList = [];

// 当前展示是否为圆形
var isCircle = false;

//二维数组 存放文字内容及页面显示标签 
var textSet = [
    [monthText, monthList],
    [dayText, dayList],
    [weekText, weekList],
    [hourText, hourList],
    [minuteText, minuteList],
    [secondsText, secondsList]
];

window.onload = function () {
    init();
    // 每隔100ms获得 当前时间 更新页面时间显示
    setInterval(function () {
        runTime();
    }, 100);

    // 在变成圆形之前先进性修改定位
    changePosition();
    // 延迟2000ms变成圆形
    setTimeout(function () {
        changeCircle();
    }, 2000);
}
// 初始化函数
function init() {
    clock = document.getElementById('clock');
    // 生成标签 存放文字展示
    for (var i = 0; i < textSet.length; i++) {
        for (var j = 0; j < textSet[i][0].length; j++) {
            var temp = createLabel(textSet[i][0][j]);
            clock.appendChild(temp);
            // 将生成的标签存放在数组list中
            textSet[i][1].push(temp);
        }
    }
}

// 创建标签并将文字填充标签内 接收参数为文字内容  
function createLabel(text) {
    var div = document.createElement('div');
    div.classList.add('label');
    div.innerText = text;
    return div;
}

function runTime() {
    // 利用时间对象获得 当前 时间
    var now = new Date();
    // 获得月 日期 小时 分钟 秒钟
    var month = now.getMonth();
    var day = now.getDate();
    var week = now.getDay();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var seconds = now.getSeconds();

    // 初始化时间颜色 同时将走过时间设置为灰色
    initStyle();

    // 设置当前时间为白色
    // 将当前时间月份存放在数组中
    var nowValue = [month, day - 1, week, hour, minute, seconds];
    for (var i = 0; i < nowValue.length; i++) {
        var num = nowValue[i];
        textSet[i][1][num].style.color = '#ff2823';
    }

    // 变成圆形
    if (isCircle) {
        // 确定圆心
        var widthMid = document.body.clientWidth / 2;
        var heightMid = document.body.clientHeight / 2;
        // 将每一个dom元素确定到圆的位置
        for (var i = 0; i < textSet.length; i++) {
            for (var j = 0; j < textSet[i][0].length; j++) {
                // 加算出每一个元素的位置  x y 坐标
                // 每一个圆的半径与时分秒的位置有关
                var r = (i + 1) * 35 + 50 * i;
                // 计算每一个平均的角度  再将每一个单位对齐 然后转化成弧度
                var deg = 360 / textSet[i][1].length * (j - nowValue[i]) ;
                // 计算出每一个dom元素的坐标
                var x = r * Math.sin(deg * Math.PI / 180) + widthMid;
                var y = heightMid - r*Math.cos(deg * Math.PI / 180);
                // 设置样式
                var temp =  textSet[i][1][j];
                temp.style.transform = 'rotate(' + (-90 + deg ) + 'deg)';
                temp.style.left = x + 'px';
                temp.style.top = y + 'px';
            }
        }
    }
}

function initStyle() {
    // 将所有标签置为灰色 
    // 利用取出dom元素
    var label = document.getElementsByClassName('label');
    for (var i = 0; i < label.length; i++) {
        label[i].style.color = '#4d4d4d';
    }
    // 利用二维数组存放dom元素的数组
    // for (var i = 0 ; i < textSet.length ; i ++) {
    //     for (var j = 0 ; j < textSet[i][0].length ; j ++) {
    //         textSet[i][1][j].style.color = "#4d4d4d";
    //     }
    // }
}

// 修改position
function changePosition() {
    for (let i = 0; i < textSet.length; i++) {
        for (let j = 0; j < textSet[i][1].length; j++) {
            // 先获得原来的位置  再修改position 设置left top 
            let tempX = textSet[i][1][j].offsetLeft + "px";
            let tempY = textSet[i][1][j].offsetTop + "px";
            // console.log(textSet[i][1][j]);
            // 利用let 防止闭包
            setTimeout(function () {
                textSet[i][1][j].style.position = "absolute";
                textSet[i][1][j].style.left = tempX;
                textSet[i][1][j].style.top = tempY;
            }, 50);
        }
    }
}

function changeCircle() {
    isCircle = true;
    clock.style.transform = "rotate(90deg)";
}