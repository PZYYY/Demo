// pages/multiSeletor.js
let currentYear, currentMonth, currentDate; // 当天日期
let year, month, date; // 所选日期

Page({
  data: {
    multiArray: [],
    multiIndex: [0, 0, 0, 0, 0]
  },

  onLoad: function (options) {
    this.init()
  },
  init() {
    const array = new Array(5).fill(1).map(e => []);
    year = currentYear = new Date().getFullYear();
    month = currentMonth = new Date().getMonth() + 1;
    date = currentDate = new Date().getDate();
    let d = new Date(currentYear, currentMonth, 0).getDate() // 天数

    array[0] = new Array(10).fill(1).map((e, i) => `${currentYear + i}`);
    array[1] = new Array(12).fill(1).map((e, i) => `${i + 1}`);
    array[2] = new Array(d).fill(1).map((e, i) => `${i + 1}`);
    array[3] = new Array(24).fill(1).map((e, i) => `${i}`);
    array[4] = new Array(60).fill(1).map((e, i) => `${i}`);
    this.setData({
      multiArray: array, // 选择器二维数组
      multiIndex: [0, currentMonth - 1, currentDate - 1, 0, 0] // 初始日期时间
    })
  },

  bindMultiPickerColumnChange(e) {
    const {
      column,
      value
    } = e.detail
    if (column === 0) year = this.data.multiArray[0][value];
    if (column === 1) month = this.data.multiArray[1][value];
    if (column === 2) date = this.data.multiArray[2][value];
    this.setData({
      [`multiIndex[${column}]`]: value // 初始日期时间
    })
    if (e.detail.column == 1 || e.detail.column == 0) {
      // 改当月最大日期
      const array = new Array(new Date(year, month, 0).getDate()).fill(1).map((e, i) => `${i + 1}`);
      this.setData({
        'multiArray[2]': array
      })
    }

    if (new Date(year, month, date).getTime() < new Date(currentYear, currentMonth, currentDate).getTime()) {
      this.setData({
        multiIndex: [0, currentMonth - 1, currentDate - 1, 0, 0] // 初始日期时间
      })
    }
  },

  // 确定
  bindMultiPickerChange(e) {
    const value = e.detail.value
    console.log('所选时间', currentYear + value[0], value[1] + 1, value[2] + 1, value[3], value[4])
    // this.setData({multiIndex: [value[0], value[1]+1, value[2]+1, value[3], value[4]]})
  },
})