// pages/explore/explore.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        latitude: 30,
        longitude: 106,
        markers:[],
        mapId: "map",
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //从数据库中导入标记点数据
        var that = this
        wx.cloud.database().collection('list').get({
            success(res){
                var arr=res.data
                //console.log(arr)
                var arr2=[];
                for(var i=0;i<arr.length;i++){
                  var temp={
                    iconPath:"cloud://ac-project-6g67t2s1787ec30f.6163-ac-project-6g67t2s1787ec30f-1309467775/图标库/定位2.png",
                    id:arr[i].id,
                    latitude:arr[i].latitude,
                    longitude:arr[i].longitude,
                    title:arr[i].name,
                    width:34,
                    height:34
                  }
                  arr2.push(temp);
                  //console.log(arr2);
                }
                that.setData({
                    dataList:res.data,
                    markers:arr2,
                })
            }
        })
    },

    //跳转详情页面
    opendetail: function(event) {
      //console.log(event);
      var id = event.markerId;
      this.setData({
        id: id
      });
      wx.navigateTo({
          url: "/pages/details/details?id=" + id
        })
    },
    //显示对话框
    showModal: function(event){
      //console.log(event)
      wx.cloud.database().collection('list').where({
        id: event.markerId
      }).get()
      .then(res=>{
        //console.log(res)
        this.setData({
          myall: res.data[0]
        })
      })
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
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

