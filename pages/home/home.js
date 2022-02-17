// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        wx.cloud.database().collection('list').get({
            success(res){
                that.setData({
                    dataList:res.data
                })
            }
        })
    },
    getInputValue(event){
        console.log(event.detail.value)
        this.setData({
            inputValue: event.detail.value
        })
    
    },
    search(){
        let searchKey = this.data.inputValue
        let db = wx.cloud.database()
        let _ = db.command
        db.collection('list').where(_.or([{
            name: db.RegExp({
                regexp: searchKey,
                options: 'i',
            }),
        },
        {
            address: db.RegExp({
                regexp: searchKey,
                options: 'i',
            }),
        }
    ])).get()
    .then(res => {
        console.log('查询成功', res)
        this.setData({
            searchRes: res.data,
            searched: true
        })
    })
    .catch(res => {
        console.log('查询失败', res)
    })
    },

    opendetail: function(event) {
        console.log(event);
        var id = event.markerId;
        this.setData({
          id: id
        });
        wx.navigateTo({
            url: "/pages/details/details?id=" + id
          })
      },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})