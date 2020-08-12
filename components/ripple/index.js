Component({
    properties: {
        width: { // 宽度
            type: Number,
            value: 300 //rpx
        },
        fullw: { // 宽度100%
            type: Number,
            value: 0 //rpx
        },
        height: { // 高度
            type: Number,
            value: 100
        },
        fullh: { // 高度100%
            type: Number,
            value: 0 //rpx
        },
        noshadow: { // 是否有阴影
            type: Number,
            value: 0
        },
        background: {
            type: String, //transparent
            value: "#dedede"
        },
        radius: { //圆角
            type: String,
            value: "4rpx"
        },
        light:{ //浅色
            type: Number,
            value: 0
        }
    },
    data: {
        clicked: '',
        top: 0,
        left: 0,
        ani: ''
    },
    methods: {
        onLoad() {

        },
        taped(e) {
            let t = e.currentTarget,
                d = e.detail,
                x = parseInt(d.x - t.offsetLeft) - (this.data.width / 2),
                y = parseInt(d.y - t.offsetTop) - (this.data.height / 2);

            this.setData({
                ani: "animate",
                left: x,
                top: y
            });
            setTimeout(() => {
                this.setData({
                    ani: ""
                });
            }, 4e2)
        }
    },
    attached() {}
});