// pages/multiSeletor.js
Page({
  data: {
    multiArray: [],
    multiIndex: [0, 0, 0, 0, 0],
    currentYear: 2019,
    currentMonth: 5,
    currentDate: 31
  },

  onLoad: function (options) {
    this.init()
  },
  init () {
    // new Promise((resolve, reject) => {
      let dateObj = {
        year: [],
        month: [],
        day: [],
        hour: [],
        minute: []
      }
      const date = new Date()
      let d = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() // 天数
      this.data.currentYear = date.getFullYear(),
        this.data.currentMonth = date.getMonth() + 1,
        this.data.currentDate = date.getDate()

      //*************当天初始日期时间************//
      for (let i = 0; i < 10; i++) { // 年
        dateObj.year.push(this.data.currentYear + i + '')
      }
      for (let i = 1; i <= 12; i++) { // 月
        if (i < 10) { i = '0' + i }
        dateObj.month.push(i + '')
      }
      for (let i = 1; i <= d; i++) {
        if (i < 10) { i = '0' + i }
        dateObj.day.push(i + '')
      }
      for (let i = 0; i <= 23; i++) { // 时
        if (i < 10) { i = '0' + i }
        dateObj.hour.push(i + '')
      }
      for (let i = 0; i <= 59; i++) { // 分
        if (i < 10) { i = '0' + i }
        dateObj.minute.push(i + '')
      }
      // resolve(dateObj)
    // }).then(({ year, month, day, hour, minute }) => {
      this.setData({
        multiArray: [dateObj.year, dateObj.month, dateObj.day, dateObj.hour, dateObj.minute], // 选择器二维数组
        multiIndex: [0, this.data.currentMonth - 1, this.data.currentDate - 1, 0, 0] // 初始日期时间
      })
    // })
  },

  bindMultiPickerColumnChange(e) {
    if (e.detail.column == 1 || e.detail.column == 0) { // 年份或月份改变
      this.data.currentYear = e.detail.column == 0 ? this.data.currentYear + e.detail.value : this.data.currentYear,
        this.data.currentMonth = e.detail.column == 1 ? e.detail.value + 1 : this.data.currentMonth
      this.data.multiArray[2] = []
      // new Promise((resolve, reject) => {
        for (let i = 1; i <= (new Date(this.data.currentYear, this.data.currentMonth, 0).getDate()); i++) {
          if (i < 10) { i = '0' + i }
          this.data.multiArray[2].push(i + '') // 动态改变“日”数组
        }
        // resolve(this.data.multiArray[2])
      // }).then(resArray => {
        this.setData({
          'multiArray[2]': this.data.multiArray[2]
        })
      // })
    }
  },

  // 确定
  bindMultiPickerChange(e) {
    const value = e.detail.value
    console.log('所选时间', this.data.currentYear + value[0], value[1] + 1, value[2] + 1, value[3], value[4])
    // this.setData({multiIndex: [value[0], value[1]+1, value[2]+1, value[3], value[4]]})
  },
})