Vue.config.devtools = true;

// add log info
var data = {
    logs: [
        {
            date: '1/1/2019',
            minutes: 60,
            code: {
                href: "https://app.pluralsight.com/library/courses/vuejs-fundamentals/table-of-contents",
                title: "Vue.js Fundamentals",
                author: "Jim Cooper"
            },
            cardio: {
                href: "https://www.strava.com/activities/2049428407",
                distance: "3.92 mi",
                type: "Treadmill"
            }
        },
        {
            date: '1/2/2019',
            minutes: 30,
            code: {
                href: "https://app.pluralsight.com/library/courses/vuejs-fundamentals/table-of-contents",
                title: "Vue.js Fundamentals",
                author: "Jim Cooper"
            },
            cardio: {
                href: "https://www.strava.com/activities/2051006605",
                distance: "2 mi",
                type: "Treadmill"
            }
        },
        {
            date: '1/3/2019',
            minutes: 45,
            code: {
                href: "https://app.pluralsight.com/library/courses/nodejs-dotnet-developers/table-of-contents",
                title: "Node.js for .NET Developers",
                author: "Shawn Wildermuth"
            },
            cardio: {
                href: "https://www.strava.com/activities/2053142561",
                distance: "",
                type: "Elliptical"
            }
        }
    ]
}


// add the rest of the days for the year
var allDays = getAllDaysInYear(2019);

// add missing days
allDays.forEach(day => {
    var logExists = data.logs.some(log => new Date(log.date).toLocaleDateString() == day.toLocaleDateString())
    if (!logExists) {
        data.logs.push({
            date: day.toLocaleDateString(),
            minutes: 0
        })
    }
})


Vue.use(VueSmoothScroll)
Vue.use(VTooltip)

var app = new Vue({
    el: "#app",
    data: data,
    computed: {
        byWeek: function () {
            var log = this.logs

            var weeks = []
            var week = []
            var curWeekNum = 1
            for (let i = 0; i < this.logs.length; i++) {
                const log = this.logs[i];

                // todo get week # of date
                const wkNum = getWeekNumber(new Date(log.date))
                //console.log(wkNum, log.date)

                if (wkNum != curWeekNum) {
                    curWeekNum = wkNum
                    weeks.push(week) // add old
                    week = [] // create new
                }

                week.push(log)
            }


            return weeks;
        }
    },
    methods: {},
    mounted: function () {
        this.$nextTick(function () {
          // if there's not a hash, default to today
          if (!window.location.hash) {
            window.location.hash = (new Date()).toLocaleDateString();
          }
        })
      }
});











// https://stackoverflow.com/a/19444023/1366033
function getAllDaysInYear(year) {
    var start = new Date(year, 0, 1);
    var end = new Date(year + 1, 0, 1);

    var array = [];
    while (start < end) {
        array.push(new Date(start));
        start.setDate(start.getDate() + 1)
    }
    return array;
}

// https://stackoverflow.com/a/6117889/1366033
function getWeekNumber(myDate) {
    var d = new Date(Date.UTC(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
};

//https://stackoverflow.com/a/35571753/1366033
window.addEventListener('scroll', function (ev) {

    var topElement
    var listItems = document.querySelectorAll(".id-wrapper")
    for (i = 0; i < listItems.length; i++) {
        var el = listItems[i]
        var height = el.getBoundingClientRect().top
        if (height >= -15) {
            topElement = el;
            break;
        }
    }

    document.querySelectorAll(".cell.active").forEach(function (el) { el.classList.remove('active') });
    document.querySelectorAll(".id-wrapper.active").forEach(function (el) { el.classList.remove('active') });

    document.querySelector(".cell[href='#" + topElement.id + "']").classList.add('active')
    topElement.classList.add('active')
});
