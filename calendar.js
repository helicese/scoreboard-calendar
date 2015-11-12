(function(win, Rokid){
	function $ (s) {
		return document.querySelector(s);
	}

    const MONTH_TEXT = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        MONTH_LUNAR_TEXT = ['正月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
        WEEK_TEXT = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        ZODIAC_CH = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'],
        ZODIAC_EN = ['rat','ox','tiger','rabbit','dragon','snake','horse','sheep','monkey','rooster','dog','boar'],
        PATH_SHENGXIAO = '../images/calendar/shengxiao/',
        NUM_CH = ['一','二','三','四','五','六','七','八','九','十']

    function getLunarDay (argu) {
        console.dir(argu);
        var day = argu.lunarDay,
            ret = '十五';

        if (day <= 10) {
            ret = '初'+NUM_CH[day-1];
        }else if(day < 20){
            ret = '十'+NUM_CH[day-11];
        }else if(day === 20){
            ret = '二十';
        }else if(day < 30){
            ret = '廿'+NUM_CH[day-21];
        }else if(day === 30){
            ret = '三十';
        }else if(day <40){
            ret = '卅'+NUM_CH[day-31];
        }

        return ret;
    }


	var calendar = function () {
		this.dom = {};
		this.dom.root = $('#calendar');
        this.dom.blue = $('#calendar .blue');
        this.dom.yellow = $('#calendar .yellow');
            this.dom.yellowBg = $('#calendar .yellow .bg');
        this.dom.red = $('#calendar .red');
            this.dom.redBg = $('#calendar .red .bg');

        //doms to show date info
        this.dates = {};
        var texts = document.querySelectorAll('#calendar .text');
        this.dates.down = texts[0];
        this.dates.midBig = texts[1];
        this.dates.midMid = texts[2];
        this.dates.midSmall = texts[3];
        this.dates.up = texts[4];
	}

	calendar.prototype.show = function (argu) {
        console.dir(argu);
        var self = this;

        self.__data(argu);

        self.dom.blue.style.webkitTransition = 'opacity 0.6s ease-in, -webkit-transform 0.6s';
        self.dom.blue.style.opacity = 1;
        self.dom.blue.style.webkitTransform = 'scale(1)';

        self.dom.red.style.webkitTransition = 'opacity 0.6s, -webkit-transform 0.6s';
        self.dom.red.style.webkitTransform = 'translate(118px, 85px) scale(1)';

        self.dom.yellow.style.webkitTransition = '-webkit-transform 0.6s';
        self.dom.yellow.style.webkitTransform = 'translate(-97px, -87px) scale(1)';

        self.dates.up.style.webkitTransition = 'opacity 0.3s 0.2s';
        self.dates.up.style.opacity = 1;

        setTimeout(function () {
            self.dom.redBg.style.webkitAnimationPlayState = 'running';
            self.dom.yellowBg.style.webkitAnimationPlayState = 'running';
        }, 600);
    }

	calendar.prototype.hide = function () {
        var self = this;

        self.dom.redBg.style.webkitAnimationPlayState = 'paused';
        self.dom.yellowBg.style.webkitAnimationPlayState = 'paused';

        self.dom.blue.style.webkitTransition = 'opacity 0.4s ease-out, -webkit-transform 0.1s 0.4s';
        self.dom.blue.style.opacity = 0;
        self.dom.blue.style.webkitTransform = '';

        self.dom.red.style.webkitTransform = 'translate(0, 0) scale(0)';

        self.dom.yellow.style.webkitTransform = 'translate(0,0) scale(0)';

        self.dates.up.style.webkitTransition = 'opacity 0.3s';
        self.dates.up.style.opacity = 0;


	}

    calendar.prototype.__data = function (argu) {

        /*argu
            solarYear = resultJSON.date.year;
            solarMonth = resultJSON.date.month + 1;
            solarDay = resultJSON.date.day;
            solarWeekday = resultJSON.date.weekday;
            solarFestival = resultJSON.date.festival;

            lunarYear = resultJSON.lunar.year;
            lunarMonth = resultJSON.lunar.month + 1;
            lunarDay = resultJSON.lunar.day;
            lunarWeekday = resultJSON.lunar.weekday;
            lunarFestival = resultJSON.lunar.festival;

            var stem = resultJSON.lunar.stem;
            var zodiac = resultJSON.lunar.zodiac;
            var solarTerm = resultJSON.lunar.solarTerm;

        typ
            WHAT_WEEK_DAY

            WHAT_FESTIVAL_DAY

            WHAT_SOLAR_TERM_DAY//节气   没做

            WHAT_SOLAR_YEAR
            WHAT_LUNAR_YEAR

            WHAT_SOLAR_YEAR_WEEKDAY

            WHAT_SOLAR_DAY
            WHAT_LUNAR_DAY

        */

        var self = this,
            dType = argu.type || '',

            //up：str 样式相同， down：int 表示月份（1月=1）
            dateToShow = {up:'', midBig:'',midMid:'',midSmall:'',down:'十一月'};

        //lol deal with it!
        var resultJSON = argu.data;
        argu = {}
        argu.solarYear = resultJSON.date.year;
        argu.solarMonth = resultJSON.date.month + 1;
        argu.solarDay = resultJSON.date.day;
        argu.solarWeekday = resultJSON.date.weekday;
        argu.solarFestival = resultJSON.date.festival;

        argu.lunarYear = resultJSON.lunar.year;
        argu.lunarMonth = resultJSON.lunar.month + 1;
        argu.lunarDay = resultJSON.lunar.day;
        argu.lunarWeekday = resultJSON.lunar.weekday;
        argu.lunarFestival = resultJSON.lunar.festival;

        argu.stem = resultJSON.lunar.stem;
        argu.zodiac = resultJSON.lunar.zodiac;
        argu.solarTerm = resultJSON.lunar.solarTerm;
        //lol end


        console.dir(argu);
        ////my ui part
        dateToShow.down = MONTH_TEXT[argu.solarMonth-1];

        switch(dType) {
        case 'WHAT_WEEK_DAY':
            dateToShow.up = argu.solarYear;
            dateToShow.midBig = WEEK_TEXT[argu.solarWeekday];
            dateToShow.midMid = '';
            dateToShow.midSmall = '';
            break;
        case 'WHAT_LUNAR_YEAR_ZODIAC':
            dateToShow.up = argu.solarYear;
            dateToShow.midBig = '';
            dateToShow.midMid = argu.zodiac;
            dateToShow.midSmall = argu.stem+'年';
            break;
        case 'WHAT_SOLAR_YEAR':
        case 'WHAT_SOLAR_YEAR_WEEKDAY':
            dateToShow.up = WEEK_TEXT[argu.solarWeekday];
            dateToShow.midBig = argu.solarYear;
            dateToShow.midMid = '';
            dateToShow.midSmall = '';
            break;
        case 'WHAT_LUNAR_YEAR':
            dateToShow.up = argu.solarYear;
            dateToShow.midBig = '';
            dateToShow.midMid = argu.stem+'年';
            dateToShow.midSmall = argu.zodiac;
            break;
        case 'WHAT_SOLAR_DAY':
        case 'WHAT_SOLAR_FESTIVAL_DAY':
        case 'WHAT_SOLAR_TERM_DAY':
            dateToShow.up = argu.solarYear;
            dateToShow.midBig = argu.solarDay;
            dateToShow.midMid = '';
            dateToShow.midSmall = '';
            break;
        // case 'WHAT_SOLAR_YEAR_WEEKDAY':
        //     dateToShow.up = WEEK_TEXT[argu.solarWeekday];
        //     dateToShow.midBig = argu.solarDay;
        //     dateToShow.midMid = '';
        //     dateToShow.midSmall = '';
        //     break;
        case 'WHAT_LUNAR_DAY':
            dateToShow.up = argu.stem+'年';
            dateToShow.midBig = getLunarDay(argu);
            dateToShow.midMid = '';
            dateToShow.midSmall = '';
            dateToShow.down = MONTH_LUNAR_TEXT[argu.lunarMonth-1];
            break;
        case 'WHAT_SOLAR_DATE_WEEKDAY':
        case 'WHAT_SOLAR_YEAR_MONTH_DAY_WEEKDAY':
            dateToShow.up = argu.solarYear;
            dateToShow.midBig = '';
            dateToShow.midMid = argu.solarDay;
            dateToShow.midSmall = WEEK_TEXT[argu.solarWeekday];
            break;
        case 'WHAT_LUNAR_DATE_WEEKDAY':
            dateToShow.up = WEEK_TEXT[argu.solarWeekday];
            dateToShow.midBig = '';
            dateToShow.midMid = getLunarDay(argu);
            dateToShow.midSmall = argu.solarMonth+'月'+argu.solarDay+'日';
            dateToShow.down = MONTH_LUNAR_TEXT[argu.lunarMonth-1];
            break;
        case 'WHAT_LUNAR_FESTIVAL_DAY':
            dateToShow.up = argu.solarYear;
            dateToShow.midBig = '';
            dateToShow.midMid = getLunarDay(argu);
            dateToShow.midSmall = argu.solarMonth+'月'+argu.solarDay+'日';
            dateToShow.down = MONTH_LUNAR_TEXT[argu.lunarMonth-1];
            break;
        default:
        //beybye rokid. By: Lcp
            dateToShow.up = 'Rokid';
            dateToShow.midMid = '17';
            dateToShow.midSmall = '2015';
            dateToShow.down = '十月';
            break;
        }

        self.__updateUI(dateToShow);
    }

    calendar.prototype.__updateUI = function (date) {

        var _rPath;

        //init
        this.dates.midSmall.style.backgroundImage = '';
        this.dates.midMid.style.backgroundImage = '';

        //up
        this.dates.up.innerHTML = date.up;


        //down
        this.dates.down.innerHTML = date.down;
        if(date.down.length === 2){
            this.dates.down.className = 'text ch-2';
        }else{
            this.dates.down.className = 'text ch-3';
        }
        //mid
        //mid big
        //blue circle, the big text in the middle
        //can be: 3 ch chars, 2ch chars, nums <100 || >1000
        this.dates.midBig.innerHTML = date.midBig;
        if (typeof(date.midBig)==='number') {
            if (date.midBig < 100) {
                this.dates.midBig.className = 'text big-en-2';
            }else{
                this.dates.midBig.className = 'text big-en-4';
            }
        }else{
            if (date.midBig.length === 2) {
                this.dates.midBig.className = 'text big-ch-2';
            }else {
                this.dates.midBig.className = 'text big-ch-3';
            }
        }

        //mid middle
        this.dates.midMid.innerHTML = date.midMid;
        if (typeof(date.midMid)==='number') {
            this.dates.midMid.className = 'text mid-en-2';
        }else{
            //生肖
            if (ZODIAC_CH.indexOf(date.midMid) >= 0) {
                _rPath = ZODIAC_EN[ZODIAC_CH.indexOf(date.midMid)];
                this.dates.midMid.className = 'text up mid-pic';
                this.dates.midMid.style.backgroundImage = 'url('+PATH_SHENGXIAO+_rPath+'.png)';
                this.dates.midMid.innerHTML = '';
            }else if (date.midMid.length === 2) {
                this.dates.midMid.className = 'text up mid-ch-2';
            }else {
                this.dates.midMid.className = 'text up mid-ch-3';
            }
        }

        //mid small
        //蓝色圈内 下部小字    --生肖显示图片,其余显示字符串
        if (ZODIAC_CH.indexOf(date.midSmall) >= 0) {
            _rPath = ZODIAC_EN[ZODIAC_CH.indexOf(date.midSmall)];
            this.dates.midSmall.className = 'text down small-pic';
            this.dates.midSmall.style.backgroundImage = 'url('+PATH_SHENGXIAO+_rPath+'.png)';
            this.dates.midSmall.innerHTML = '';
        }else {
            this.dates.midSmall.className = 'text down small-ch-num';
            this.dates.midSmall.style.backgroundImage = '';
            this.dates.midSmall.innerHTML = date.midSmall;
        }

    }

    console.dir(calendar);
	Rokid.UI = Rokid.UI || {};
	Rokid.UI.calendar = calendar;

    test = new calendar();
})(window, window.Rokid || (window.Rokid = {}));