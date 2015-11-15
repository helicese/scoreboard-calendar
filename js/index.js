function $ (s) {
        return document.querySelector(s);
}

function formatNumber (number) {
    if (number <= 0) {
        number += 31;
    }
    if (number > 31) {
        number -= 31
    }
    if (number < 10) {
        return '0' + number;
    } else {
        return number;
    }

}

const WEEK_TEXT = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];

/*
    the constructor, which bind the dom and init some values
 */
var calendar = function () {
    //set dom
    this.dom = {};
    this.dom.root = $('#calendar');
    this.dom.cMonth = $('#calendar .month');
    this.dom.cDate = $('#calendar .date');
        this.dom.up = $('#calendar .up');
        this.dom.rotateBoard1 = $('#calendar .rotateBoard1');
        this.dom.rotateBoard2 = $('#calendar .rotateBoard2');
        this.dom.down = $('#calendar .down');
    this.dom.cDay = $('#calendar .day');
    this.dom.cLast = $('#calendar .last');
        this.dom.cLast1 = $('#calendar .last1');
        this.dom.cLast2 = $('#calendar .last2');

    //set variables and some initial values
    this.dates = document.getElementsByClassName('calendar-number');
    this.texts = document.getElementsByClassName('calendar-text');
    this.roundTime = 3;
    this.toggleLunar = 1;
    this.dom.root.style.opacity = 0;

    this.dom.rotateBoard1.style.webkitTransform = 'rotateX(180deg)';
    this.dom.rotateBoard2.style.webkitTransform = 'rotateX(0deg)';
    // this.dom.rotateBoard1.classList.add('mid1');
    // this.dom.rotateBoard2.classList.add('mid2');

}

/*
    initShow, init some values and use remove and add class to enable animation
 */
calendar.prototype.__initShow = function() {
    var self = this;
    self.roundTime = 0.3;
    self.dom.rotateBoard1.style.webkitTransitionDuration = self.roundTime+'s';
    self.dom.rotateBoard2.style.webkitTransitionDuration = self.roundTime+'s';
    if(self.dom.rotateBoard1.style.webkitTransition) {
        console.log('click again');
        self.__animationToggle(0);
        self.dom.rotateBoard1.offsetWidth = self.dom.rotateBoard1.offsetWidth;
    }
}

/*
    get the data to show
 */
calendar.prototype.__data = function() {

    var dateToShow = {
        up: '',      //month and year
        midBig: '',
        midBig2: '', //two date
        midMid: '',  //weekday
        down: '',
    };
    var result = {};
    var today = new Date();
    result.year = today.getFullYear();
    result.month = today.getMonth();
    result.date = today.getDate();
    result.day = today.getDay();
    dateToShow.up = result.year + '.' + (result.month + 1);
    dateToShow.midBig = formatNumber(result.date-4);
    dateToShow.midBig2 = formatNumber(result.date-5);
    dateToShow.midMid = WEEK_TEXT[result.day];
    this.__updateUI(dateToShow);
};

calendar.prototype.__updateUI = function(data) {
    //up
    this.texts[0].innerHTML = data.up;

    //mid
    this.dates[0].innerHTML = data.midBig;
    this.dates[1].innerHTML = data.midBig;
    this.dates[2].innerHTML = data.midBig2;
    this.dates[3].innerHTML = data.midBig2;
    this.texts[1].innerHTML = data.midMid;

    //down
    this.texts[5].innerHTML = 'hello world';
};
calendar.prototype.__animationToggle = function (check) {
    var self = this;
    if(check) {
        scene.dom.down.style.zIndex = -1;
        self.dom.cMonth.classList.add('zoomIn');
        self.dom.cDate.classList.add('zoomIn');
        self.dom.cDay.classList.add('zoomIn');
        self.dom.cLast.classList.add('zoomIn');
        // self.dom.rotateBoard1.classList.add('mid1');
        // self.dom.rotateBoard2.classList.add('mid2');
        // self.dom.rotateBoard1.style.webkitTransform = 'rotateX(180deg)';
        self.dom.rotateBoard1.style.webkitTransition = '-webkit-transform 0.1s';
        self.dom.rotateBoard2.style.webkitTransition = '-webkit-transform 0.1s';
        // setTimeout(function(){
                self.dom.rotateBoard1.style.webkitTransform = 'rotateX(0deg)';
                self.dom.rotateBoard2.style.webkitTransform = 'rotateX(-180deg)';
        // }, 0);
        // self.dom.rotateBoard1.style.webkitTransform = 'rotateX(0deg)';

        // self.dom.rotateBoard2.classList.add('mid2');
        // self.dom.rotateBoard2.style.webkitTransition = '-webkit-transform 2s';
        // self.dom.rotateBoard2.style.webkitTransform = 'rotateX(-180deg)';
    } else {
        self.dom.cMonth.classList.remove('zoomIn');
        self.dom.cDate.classList.remove('zoomIn');
        self.dom.cDay.classList.remove('zoomIn');
        self.dom.cLast.classList.remove('zoomIn');
        self.dom.rotateBoard1.style.webkitTransition = '';
        self.dom.rotateBoard2.style.webkitTransition = '';
        self.dom.rotateBoard1.style.webkitTransform = 'rotateX(180deg)';
        self.dom.rotateBoard2.style.webkitTransform = 'rotateX(0deg)';
        // self.dom.rotateBoard1.classList.remove('mid1');
        // self.dom.rotateBoard2.classList.remove('mid2');

    }

}
/*
    show the scene
 */
calendar.prototype.show = function(argu) {
    var self = this;
    self.__data();
    self.__initShow();
    self.dom.root.style.opacity = 1;
    self.__animationToggle(1);
    self.dom.rotateBoard1.addEventListener('webkitTransitionEnd', handler, false);
};

/*
    hide the scene
 */
calendar.prototype.hide = function(argu) {
    var self = this;
    console.log(self);
    self.roundTime = 3;
    self.dom.rotateBoard1.style.webkitAnimationDuration = self.roundTime+'s';
    self.dom.rotateBoard2.style.webkitAnimationDuration = self.roundTime+'s';
    self.dom.root.style.webkitTransition = 'opacity 0.5s ease-out';
    self.dom.root.style.opacity = 0;
    setTimeout(function () {
        self.__animationToggle(0);
    }, 500);

    self.dom.rotateBoard1.removeEventListener('webkitTransitonEnd', handler, false);
};

//lunar function, left to do
// calendar.prototype.changeToLunar = function(argu) {
//     var self = this;
//     console.log(self.toggleLunar);
//     if (self.toggleLunar) {
//         self.dom.cMonth.innerHTML = '十一月';
//         self.dom.cMonth.id = 'lunarMonth';
//         self.dom.cDate.id = 'lunarDate';
//         self.dom.up.id = 'lunarUp';
//         self.dom.rotateBoard1.id = 'lunarBoard1';
//         self.dom.rotateBoard2.id = 'lunarBoard2';
//         self.dom.down.id = 'lunarDown';
//         self.dom.cDay.id = 'lunarDay';
//         self.dom.cLast.id = 'lunarLast';

//         self.dom.up.innerHTML = '廿二';
//         self.data[1].innerHTML = '廿二';
//         self.data[2].innerHTML = '廿一';
//         self.dom.down.innerHTML = '廿一';
//         self.toggleLunar = 0;
//     } else {
//         self.dom.cMonth.removeAttribute('id');
//         self.toggleLunar = 1;
//         console.log(self.toggleLunar);
//     }

// }



var handler = function () {
    console.log('handler');
    for (var i = 0; i < scene.dates.length; i++) {
        scene.dates[i].innerHTML = formatNumber(parseInt(scene.dates[i].innerHTML) + 1);
    }
    // roundTime = 0.2;
    scene.dom.rotateBoard1.style.webkitTransitionDuration = scene.roundTime+'s';
    scene.dom.rotateBoard2.style.webkitTransitionDuration = scene.roundTime+'s';
    //时间递增函数
    scene.roundTime *= 1.4;
    console.log(scene.roundTime);
    if (scene.roundTime < 1.2) {
        scene.dom.rotateBoard1.style.webkitTransition = '';
        scene.dom.rotateBoard2.style.webkitTransition = '';
        scene.dom.rotateBoard1.style.webkitTransform = 'rotateX(180deg)';
        scene.dom.rotateBoard2.style.webkitTransform = 'rotateX(0deg)';
        setTimeout(function(){
            scene.dom.rotateBoard1.style.webkitTransition = '-webkit-transform ' + scene.roundTime + 's';
            scene.dom.rotateBoard2.style.webkitTransition = '-webkit-transform ' + scene.roundTime + 's';
            scene.dom.rotateBoard1.style.webkitTransform = 'rotateX(0deg)';
            scene.dom.rotateBoard2.style.webkitTransform = 'rotateX(-180deg)';
        },0);
    } else {
        scene.dom.down.style.zIndex = 5;
    }
}

var scene = new calendar();

var bStart = $('.start');
var bHide = $('.stop');
bStart.addEventListener('click', function() {
    scene.show();
}, false);

bHide.addEventListener('click', function() {
    scene.hide();
}, false);

// bToLunar.addEventListener('click', function() {
//     scene.changeToLunar(this.toggleLunar);
// }, false);
