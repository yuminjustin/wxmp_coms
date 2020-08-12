Component({
    properties: {
        title:{
            type: String,
            value: ''
        },
        width: { // 宽度
            type: Number,
            value: 300 //rpx
        },
        fullw: { // 宽度100%
            type: Number,
            value: 0 //rpx
        },
        placeholder:{
            type: String,
            value: '请输入'
        }
    },
    data: {

    },
    methods: {
        onLoad() {

        }
    },
    attached() {
        //console.log(this.data)
    }
});