const app = getApp(),
    screen = app.globalData.screen;

Component({
    properties: {
        title: { // 页面title
            type: String,
            value: '标题'
        },
        hasback: { // 是否有返回键
            type: Number,
            value: 1
        },
        background: { // 默认绿色
            type: String,
            value: 'rgb(51, 221, 51)'
        },
        light: { //浅色字
            type: Number,
            value: 1
        }
    },
    data: {
        style: `padding-top:${screen.safeArea.top*2}rpx;`
    },
    methods: {
        onLoad() {

        },
        goback() {
            wx.navigateBack({
                delta: 1,
                fail: () => {
                    wx.reLaunch({
                        url: '/pages/index/index'
                    });
                }
            })
        }
    },
    attached() {
        //console.log(this.data)
    }
});