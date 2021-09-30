(function () {
    var userInfoApi = "https://gw.300624.cn/users/authentication";

    /*
    {
        "status": 200,
        "message": "success",
        "data": {
            "@type": "type.googleapis.com/proto.AppUserDetailResponse",
            "wsId": "21000000",
            "name": "xxx",
            "empGrade": "T250",
            "mail": "xxx@300624.cn",
            "status": "正常",
            "depId": "0000",
            "depId1": "0000",
            "jobCName": "xxx",
            "depCName": "xxx",
            "postClassification": "",
            "reportTo": "21000000",
            "reportToName": "xxx",
            "joinDate": "2021-10-08",
            "avatar": "new_xxxx.png",
            "hrType": "",
            "motto": "",
            "mobileTelephone": "11111111111",
            "contact": "11111111111",
            "focusAgree": "",
            "avgHours": 10.00,
            "leaveHours": 0,
            "needAttend": 100.00,
            "attend": 105.00,
            "lateTimes": 1,
            "laterMinutes": 3,
            "annualLeave": 2,
            "haveLeave": 0,
            "totalLeave": 4,
            "oaSignTimes": 0,
            "inspectionPeriod": 0,
            "depNavigatorShow": "xxxx",
            "workPlaceId": 1,
            "genderId": 1,
            "workPlaceName": "深圳",
            "newEmployee": false,
            "depCode": "DP00000000",
            "depCode1": "DP00000000",
            "accessToken": "xxxxxx",
            "refreshToken": "xxxxxx"
        }
    }*/ 

    var userName = '';
    var password = '';

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

        var allTime = realWorkDays = 0;


        console.log(averageWorkTime);
        var content = grade = level = "";
        if (averageWorkTime < 8) {
            content = "你是灯塔，是自由之光。";
            grade = "站者";
            level = "D";
        } else if (averageWorkTime < 9) {
            content = "你他娘的真是个人才，躲过了堵车高峰！";
            grade = "蹲者";
            level = "C";
        } else if (averageWorkTime < 10) {
            content = "勤勤恳恳的社畜你好！";
            grade = "跪者";
            level = "B";
        } else if (averageWorkTime < 11) {
            content = "就是你们这帮拉高了时长！惭愧不？";
            grade = "撅者";
            level = "A";
        } else {
            if (averageWorkTime >= 12) {
                content = "明年的清明节我会很想念你!";
            } else {
                content = "爱护身体，拒绝猝死！";
            }
            grade = "撅者";
            level = "S";
        };

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