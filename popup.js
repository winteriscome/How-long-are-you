(function () {
    var brandName = ['4','2','6','0','0','3'].reverse().join('');
    var signInfoApi = "http://wos." + brandName +  ".cn/sign/info";
    var signMonthApi = "http://wos." + brandName +  ".cn/sign/monthsign";

    // var sampleSignInfo = '[[{"title":"\u4f11\u606f\u65e5","start":"2020-03-01","backgroundColor":"#34495e","borderColor":"#34495e"},{"title":"\u7b7e\u5230:08:32","start":"2020-03-02","url":"#","backgroundColor":"#62cb31","borderColor":"#62cb31"},{"title":"\u7b7e\u9000:19:33","start":"2020-03-02","url":"#","backgroundColor":"#3498db","borderColor":"#3498db"},{"title":"\u5e74\u5047:09:00","start":"2020-03-03","url":"#","backgroundColor":"#e67e22","borderColor":"#e67e22"},{"title":"\u5e74\u5047:18:00","start":"2020-03-03","url":"#","backgroundColor":"#e67e22","borderColor":"#e67e22"},{"title":"\u7b7e\u5230:08:39","start":"2020-03-04","url":"#","backgroundColor":"#62cb31","borderColor":"#62cb31"},{"title":"\u7b7e\u9000:20:32","start":"2020-03-04","url":"#","backgroundColor":"#3498db","borderColor":"#3498db"},{"title":"\u7b7e\u5230:12:48","start":"2020-03-05","url":"#","backgroundColor":"#62cb31","borderColor":"#62cb31"},{"title":"\u7b7e\u9000:20:12","start":"2020-03-05","url":"#","backgroundColor":"#3498db","borderColor":"#3498db"},{"title":"\u4e8b\u5047:09:00","start":"2020-03-05","url":"#","backgroundColor":"#e67e22","borderColor":"#e67e22"},{"title":"\u4e8b\u5047:12:00","start":"2020-03-05","url":"#","backgroundColor":"#e67e22","borderColor":"#e67e22"},{"title":"\u7b7e\u5230:08:37","start":"2020-03-06","url":"#","backgroundColor":"#62cb31","borderColor":"#62cb31"},{"title":"\u7b7e\u9000:20:04","start":"2020-03-06","url":"#","backgroundColor":"#3498db","borderColor":"#3498db"},{"title":"\u7b7e\u5230:09:02","start":"2020-03-07","url":"#","backgroundColor":"#62cb31","borderColor":"#62cb31"},{"title":"\u7b7e\u9000:17:37","start":"2020-03-07","url":"#","backgroundColor":"#3498db","borderColor":"#3498db"},{"title":"\u4f11\u606f\u65e5","start":"2020-03-07","backgroundColor":"#34495e","borderColor":"#34495e"},{"title":"\u4f11\u606f\u65e5","start":"2020-03-08","backgroundColor":"#34495e","borderColor":"#34495e"},{"title":"\u7b7e\u5230:08:35","start":"2020-03-09","url":"#","backgroundColor":"#62cb31","borderColor":"#62cb31"},{"title":"\u7b7e\u9000:20:21","start":"2020-03-09","url":"#","backgroundColor":"#3498db","borderColor":"#3498db"},{"title":"\u7b7e\u5230:08:40","start":"2020-03-10","url":"#","backgroundColor":"#62cb31","borderColor":"#62cb31"},{"title":"\u4f11\u606f\u65e5","start":"2020-03-14","backgroundColor":"#34495e","borderColor":"#34495e"},{"title":"\u4f11\u606f\u65e5","start":"2020-03-15","backgroundColor":"#34495e","borderColor":"#34495e"},{"title":"\u4f11\u606f\u65e5","start":"2020-03-21","backgroundColor":"#34495e","borderColor":"#34495e"},{"title":"\u4f11\u606f\u65e5","start":"2020-03-22","backgroundColor":"#34495e","borderColor":"#34495e"},{"title":"\u4f11\u606f\u65e5","start":"2020-03-28","backgroundColor":"#34495e","borderColor":"#34495e"},{"title":"\u4f11\u606f\u65e5","start":"2020-03-29","backgroundColor":"#34495e","borderColor":"#34495e"}],"10086","2020-03","xxxx",0]';
    // var sampleWorkTime = '{"month":["02-10","02-11","02-12","02-13","02-14","02-15","02-16","02-17","02-18","02-19","02-20","02-21","02-22","02-23","02-24","02-25","02-26","02-27","02-28","02-29","03-01","03-02","03-03","03-04","03-05","03-06","03-07","03-08","03-09","03-10"],"list":[0,0,0,0,0,0,0,0,0,0,"8.73","9.20","9.48",0,"9.22","9.67","9.22","9.18","9.42",0,0,"8.85",0,"9.72","6.03","9.28","8.58",0,"9.60",0]}';

    // sampleSignInfo = JSON.parse(sampleSignInfo);
    // sampleWorkTime = JSON.parse(sampleWorkTime);

    var sampleSignInfo = '';
    var sampleWorkTime = '';

    var workTime;
    var signInfo;
    //休息日
    var restDays = 0;
    var date = new Date();
    var start = new Date();

    month = date.getMonth() + 1;
    allDays = date.getDate() - 1; //不包含当天

    date.setHours(0, 0, 0, 0);
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    start = parseInt(start.getTime() / 1000) + 3600 * 8;
    async function getSignInfo() {
        return axios({
            method: 'get',
            url: signInfoApi + "?start=" + start,
        }).then(res => {
            return sampleSignInfo || res.data;
        })
    }
    async function getWorkTime() {
        return axios({
            url: signMonthApi,
        }).then(res => {
            return sampleWorkTime || res.data;
        })
    }

    async function ajaxInit() {
        workTime = await getWorkTime()
        signInfo = await getSignInfo()
        console.log(workTime, signInfo)
        for (var element, nextElement, i = 0, l = signInfo[0].length; i < l; i++) {
            element = signInfo[0][i], nextElement = signInfo[0][i+1];
            todayStr = element.start + " 00:00:00:000";
            var signDay = new Date(todayStr);
            if (signDay.getTime() < date.getTime()) {
                if (element.title == "休息日") {
                    restDays++;
                }

                if (-1 !== element.title.indexOf("假:09:00") && nextElement) {
                    if (-1 !== nextElement.title.indexOf("假:18:00")) {
                        i++;
                        restDays++;
                    } else if (-1 !== nextElement.title.indexOf("假:")) {
                        if (nextElement.title.substr(1) >= "假:14:30") {
                            i++;
                            restDays += 0.5;
                        }
                    }
                }
            }
        }

        //本月工作总时长
        workTime.month.some((element, i) => {
            if (month == parseInt(element.slice(0, 2))) {
                key = i;
                return true;
            };
        })

        thisMonthTime = workTime.list.slice(key)

        var allTime = realWorkDays = 0;
        thisMonthTime.forEach((val) => {
            val = parseFloat(val);
            if (isNaN(val)) {
                val = 0.0;
            }
            if (val > 0.0) {
                realWorkDays++;
            }

            allTime += val;
        })

        console.log(allDays, restDays);
        workDays = allDays - restDays;
        averageWorkTime = allTime / workDays;
        allTime = allTime.toFixed(2);
        averageWorkTime = averageWorkTime.toFixed(2);

        console.log(averageWorkTime);
        var content = "";
        if (averageWorkTime < 8) {
            content = "你是灯塔，是自由之光。";
        } else if (averageWorkTime < 9) {
            content = "你他娘的真是个人才，躲过了堵车高峰！";
        } else if (averageWorkTime < 10) {
            content = "勤勤恳恳的社畜你好！";
        } else if (averageWorkTime < 11) {
            content = "就是你们这帮拉高了时长！惭愧不？";
        } else if (averageWorkTime < 12) {
            content = "爱护身体，拒绝猝死！";
        } else {
            content = "明年的清明节我会很想念你!";
        };

        var grade = level = "";
        if (averageWorkTime < 8) {
            grade = "旁观者";
            level = "D";
        } else if (averageWorkTime < 9) {
            grade = "思考者";
            level = "C";
        } else if (averageWorkTime < 11) {
            grade = "实践者";
            level = "B";
        } else if (averageWorkTime < 12) {
            grade = "推动者";
            level = "A";
        } else {
            grade = "引领者";
            level = "S";
        }

        setTimeout(() => {
            $("#time").html(`
                <li>
                        <strong> ${grade} ${level} </strong> <br>
                </li>
                <li>
                        本月当前总计时长：${allTime} <br>
                </li>
                <li>
                        官方工作天数（不包含今日）： ${workDays} <br>
                </li>
                <li>
                        实际出勤天数（不包含今日）： ${realWorkDays} <br>
                </li>
                <li>
                        平均时长：${averageWorkTime} <br>
                </li>
                <li>
                        评语：${content} <br>
                </li>
            `);
        }, 600);
    }

    var interval, length = 0;
    $("#time").html(`<li id="msg"> 客官别急，让我看看你有多长.</li>`);
    interval = setInterval(function() {
        length++;
        if (length >= 8) {
            clearInterval(interval);
            return;
        }
        $("#msg").append('.');
    }, 300);

    ajaxInit()
})();