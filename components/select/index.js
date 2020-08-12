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
            value: '请选择'
        }
    },
    data: {
        index: 0,
        array: ['美国', '中国', '巴西', '日本'],
        objectArray: [
            {
              id: 0,
              name: '美国'
            },
            {
              id: 1,
              name: '中国'
            },
            {
              id: 2,
              name: '巴西'
            },
            {
              id: 3,
              name: '日本'
            }
          ]
    },
    methods: {
        onLoad() {

        }
    },
    attached() {
        //console.log(this.data)
    }
});