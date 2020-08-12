/* 父级配置 */
/*
  data设置：
    w:app.globalData.screen.windowWidth * 2, // 手机屏幕等宽
    h:0
*/
/*
  method设置：
uploadTmp(params) {
    let context = wx.createCanvasContext('micro'),
        w = this.data.w;
    wx.getImageInfo({
        src: params[0], // 插件传来的图片
        success:(res2) => {
            let h = Math.floor(w * res2.height / res2.width);
            this.h = h * 2;
            context.drawImage(params[0], 0, 0, w, h);
            context.draw(true);
            setTimeout(() => {
                wx.canvasToTempFilePath({
                    quality: 1, //高质量
                    canvasId: 'micro',
                    destWidth: w,
                    destHeight: h,
                    success(res) {
                        params[1](res.tempFilePath); // 回传给插件
                        context.clearRect(0, 0, w, h); // 清空canvas
                        // _self.w = 0;
                        // _self.hh = 0;
                    },
                    fail(err) {
                        console.log(err)
                    }
                }, this);
            }, 5e2);
        }
    });
}
*/

const uploadHandler = (file, fn, err) => {
    wx.uploadFile({
        url: 'your_upload_url',
        /* header,*/
        filePath: file,
        name: 'file',
        success: re => fn(re),
        fail: e => err(e)
    });

    // uploadTask.onProgressUpdate(function(res) {
    // 	_self.percent = res.progress;
    // 	console.log('上传进度' + res.progress);
    // 	console.log('已经上传的数据长度' + res.totalBytesSent);
    // 	console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
    // });
}

Component({
    properties: {
        width: { // 宽度 rpx
            type: Number,
            value: 300
        },
        height: { // 高度 rpx
            type: Number,
            value: 150
        },
        title: {
            type: String,
            value: ''
        },
        sub: { // 说明
            type: String,
            value: ''
        },
        hasdel: { // 是否有删除
            type: Number,
            value: 0
        },
        src: { // 图片地址
            type: String,
            value: ''
        },
        idx: { // 多张图
            type: Number,
            default: 0
        }
    },
    data: {
        img: ''
    },
    methods: {
        onLoad() {

        },
        remove() {
            /* 多张图 */
            this.triggerEvent('remove', this.data.idx);
        },
        uploadimg() {
            wx.chooseImage({
                count: 1,
                sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], //从相册选择
                success: (res) => {
                    const tempFilePaths = res.tempFilePaths;
                    //传递给父级canvas
                    this.triggerEvent('tmp', [tempFilePaths[0], this.doUpload]);
                    //_self.$emit('tmp', [tempFilePaths[0], _self.name]);
                    wx.showLoading({
                        title: "正在上传",
                        mask: true
                    });
                },
                error: (e) => {
                    console.log(e);
                }
            });
        },
        doUpload(file) {
            uploadHandler(file, res => {
                wx.hideLoading();
                let _d = JSON.parse(res.data),
                    url = _d.data.static_domain + _d.data.filename;
                if (this.data.idx) {
                    this.triggerEvent('succ', [url, this.data.idx]);
                } else {
                    this.setData({
                        img: url
                    })
                    this.triggerEvent('succ', url);
                }
            }, err => {
                console.log(err);
                wx.hideLoading();
                wx.showToast({
                    title: '上传失败，请重试',
                    icon: 'none',
                    duration: 2000
                });
            })
        }
    },
    attached() {
        //console.log(this.data)
    }
});