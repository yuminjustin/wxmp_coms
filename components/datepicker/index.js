const date = new Date(),
    nowYear = date.getFullYear(),
    nowMonth = date.getMonth() + 1,
    nowDate = date.getDate(),
    minY = 1990,
    years = [],
    months = [],
    days = [],
    app = getApp(),
    sa = app.globalData.screen.safeArea,
    daysMaker = (m, y) => {
        let max, arr = [];
        switch (m) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                max = 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                max = 30;
                break;
            case 2:
                max = y % 4 == 0 ? 29 : 28;
                break;
        }
        for (let i = 1; i <= max; i++) {
            arr.push(i)
        }
        return arr
    };
let bottom = 0;
if (sa) {
    if (sa.bottom - sa.height > 20) bottom = sa.bottom - sa.height
}
bottom += "rpx";

for (let i = 1; i <= 12; i++) {
    months.push(i)
}

for (let i = minY; i <= nowYear; i++) {
    years.push(i)
}

Component({
    properties: {
        title:{
            type: String,
            value: '日期'
        },
        source: { // 页面title
            type: String,
            value: `${nowYear}-${nowMonth}-${nowDate}`
        }
    },
    data: {
        years,
        yearo: nowYear,
        yearn: nowYear,
        months: months,
        montho: nowMonth,
        monthn: nowMonth,
        days: daysMaker(nowMonth),
        dayo: nowDate,
        dayn: nowDate,
        value: [years.length - 1, nowMonth - 1, nowDate - 1],
        valueo: [years.length - 1, nowMonth - 1, nowDate - 1],
        bottom,
        visiable: false,
        ani: false
    },
    // pageLifetimes: {
    //     show() {
    //         if (this.data.source) {
    //             let date = new Date(this.data.source);
    //             this.makeData(date);
    //         }
    //     }
    // },
    observers: {
        source: function (date) {
            this.makeData(date);
        }
    },
    methods: {
        makeData(datestr) {

            let date = new Date(datestr),
                nowY = date.getFullYear(),
                nowM = date.getMonth() + 1,
                nowD = date.getDate();

            this.setData({
                yearo: nowY,
                yearn: nowY,
                months: months,
                montho: nowM,
                monthn: nowM,
                days: daysMaker(nowM, nowY),
                dayo: nowD,
                dayn: nowD,
                value: [nowY - minY, nowM - 1, nowD - 1],
                valueo: [nowY - minY, nowM - 1, nowD - 1],
            })
        },
        choose() {
            this.setData({
                visiable: true,
                ani: true
            });
        },
        close() {
            this.setData({
                ani: false
            });
            setTimeout(() => {
                this.setData({
                    visiable: false,
                    yearn: this.data.yearo,
                    monthn: this.data.montho,
                    dayn: this.data.dayo,
                    value: this.data.valueo
                });
                this.triggerEvent('change', this.data.yearo + "/" + this.data.montho + "/" + this.data.dayo)
            }, 5e2)
        },
        confirm() {
            this.setData({
                yearo: this.data.yearn,
                montho: this.data.monthn,
                dayo: this.data.dayn,
                valueo: this.data.value
            });
            this.close();
        },
        bindChange(e) {
            const val = e.detail.value;
            this.setData({
                value: val,
                days: daysMaker(this.data.months[val[1]], this.data.years[val[0]]),
                yearn: this.data.years[val[0]],
                monthn: this.data.months[val[1]],
                dayn: this.data.days[val[2]]
            });
        }
    }
})