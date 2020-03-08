(function () {
    //http://wos.wondershare.cn/sign/info?start=1583020800&end=1586649600
    var signInfoApi = "http://wos.wondershare.cn/sign/info";
    //http://wos.wondershare.cn/sign/monthsign
    var signMonthApi = "http://wos.wondershare.cn/sign/monthsign";

/*     var signInfo = '[[{"title":"休息日","start":"2020-03-01","backgroundColor":"#34495e","borderColor":"#34495e"},{"title":"签到:08:28","start":"2020-03-02","url":"#","backgroundColor":"#62cb31","borderColor":"#62cb31"},{"title":"签退:20:50","start":"2020-03-02","url":"#","backgroundColor":"#3498db","borderColor":"#3498db"},{"title":"签到:08:41","start":"2020-03-03","url":"#","backgroundColor":"#62cb31","borderColor":"#62cb31"},{"title":"签退:21:29","start":"2020-03-03","url":"#","backgroundColor":"#3498db","borderColor":"#3498db"},{"title":"签到:08:53","start":"2020-03-04","url":"#","backgroundColor":"#62cb31","borderColor":"#62cb31"},{"title":"签退:20:27","start":"2020-03-04","url":"#","backgroundColor":"#3498db","borderColor":"#3498db"},{"title":"签到:08:44","start":"2020-03-05","url":"#","backgroundColor":"#62cb31","borderColor":"#62cb31"},{"title":"签退:21:14","start":"2020-03-05","url":"#","backgroundColor":"#3498db","borderColor":"#3498db"},{"title":"签到:08:17","start":"2020-03-06","url":"#","backgroundColor":"#62cb31","borderColor":"#62cb31"},{"title":"签退:21:19","start":"2020-03-06","url":"#","backgroundColor":"#3498db","borderColor":"#3498db"},{"title":"签到:09:51","start":"2020-03-07","url":"#","backgroundColor":"#62cb31","borderColor":"#62cb31"},{"title":"休息日","start":"2020-03-07","backgroundColor":"#34495e","borderColor":"#34495e"},{"title":"休息日","start":"2020-03-08","backgroundColor":"#34495e","borderColor":"#34495e"},{"title":"休息日","start":"2020-03-14","backgroundColor":"#34495e","borderColor":"#34495e"},{"title":"休息日","start":"2020-03-15","backgroundColor":"#34495e","borderColor":"#34495e"},{"title":"休息日","start":"2020-03-21","backgroundColor":"#34495e","borderColor":"#34495e"},{"title":"休息日","start":"2020-03-22","backgroundColor":"#34495e","borderColor":"#34495e"},{"title":"休息日","start":"2020-03-28","backgroundColor":"#34495e","borderColor":"#34495e"},{"title":"休息日","start":"2020-03-29","backgroundColor":"#34495e","borderColor":"#34495e"}],"18093102","2020-03","刘冬冬",0]';
    var workTime = '{"month":["02-07","02-08","02-09","02-10","02-11","02-12","02-13","02-14","02-15","02-16","02-17","02-18","02-19","02-20","02-21","02-22","02-23","02-24","02-25","02-26","02-27","02-28","02-29","03-01","03-02","03-03","03-04","03-05","03-06","03-07"],"list":["7.32",0,0,"9.78","9.27","11.03","11.97","11.87","12.05","10.57","11.63","11.47","11.42","8.17","8.77","9.52",0,"11.07","9.70","9.23","9.20","9.05",0,0,"10.20","10.63","9.40","10.33","10.87",0]}';

    var signInfo = JSON.parse(signInfo);
    var workTime = JSON.parse(workTime); */

    
    //休息日
    var restDays = 0;
    var start = date = new Date();

    month = date.getMonth()+1;
    allDays = date.getDay();

    date.setHours(0, 0, 0, 0);

    start.setDate(1);
    start = start.getTime();

    $.ajax({
        url: signInfoApi,
        type: "GET",
        data: {'start':1583020800,
        'end' : 1586649600},
        success: function(result) {
            signInfo = result;
        }
    });

    $.ajax({
        url: signMonthApi,
        type: "GET",
        success: function(result) {
            workTime = result;
        }
    });

    signInfo[0].forEach(element => {
        todayStr = element.start + " 00:00:00:000";
        var signDay = new Date(todayStr);
        if(signDay.getTime() < date.getTime()){
            if(element.title == "休息日"){
                restDays ++;
            }
        }
    });

    //本月工作总时长
    workTime.month.some((element,i) =>{
        if(month == parseInt(element.slice(0,2))){
            key = i;
            return true;
        };
    })

    thisMonthTime = workTime.list.slice(23)

    var allTime = 0;
    thisMonthTime.forEach((val,index) => {
        allTime += parseFloat(val);
    })

    averageWorkTime = allTime/(allDays-restDays);

    averageWorkTime = averageWorkTime.toFixed(2);

    $("#list").append(`
    <li>
        <div class="date">
            ${averageWorkTime}
        </div>
    </li>
    `);

})(); 