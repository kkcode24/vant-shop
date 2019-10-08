<template>
  <div id="calendar">
    <!-- 年份 月份 -->
    <div class="month">
      <ul>
        <li class="arrow" @click="pickPre(currentYear,currentMonth)">&lt;</li>
        <li class="year-month">
          <span class="choose-year">{{ currentYear }}年</span><span class="choose-month">{{ currentMonth }}月</span>
        </li>
        <li class="arrow" @click="pickNext(currentYear,currentMonth)">&gt;</li>
      </ul>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
      <li>日</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
      <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
      <li v-for="(dayobject, index) in days" :key="dayobject.dateStr + 'date' + index">
        <!--本月-->
        <!--如果不是本月  改变类名加灰色-->
        <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="a other-month">{{ dayobject.day.getDate() }}</span>
        <!--如果是本月  还需要判断是不是这一天-->
        <span v-else style="cursor: pointer;">
          <!--今天  同年同月同日-->
          <span :class="{'isCurrent': dayobject.isCurrent,'active': dayobject.isActive}" @click="getDayTime(dayobject)">{{ dayobject.day.getDate() }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    selecteDays: {
      type: Array,
      default: function() {
        return []
      }
    },
    onlyShow:  {
      type: Boolean,
      default:false
    }
  },
  data() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: []
    }
  },
  created() {
    this.initData(null)
    console.log('日期',this.selecteDays)
  },
  watch: {
    selecteDays() {
      this.initData(null)
    }
  },
  methods: {
    initData: function(cur) {
      // var leftcount = 0 // 存放剩余数量
      var date
      if (cur) {
        date = new Date(cur)
      } else {
        var now = new Date()
        var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1))
        d.setDate(35)
        date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      }
      this.currentDay = date.getDate()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.currentWeek = date.getDay() // 1...6,0
      if (this.currentWeek === 0) {
        this.currentWeek = 7
      }
      var str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      )
      this.days.length = 0
      // 今天是周日，放在第一行第7个位置，前面6个
      // 初始化本周
      for (var i = this.currentWeek; i >= 0; i--) {
        var d2 = new Date(str)
        d2.setDate(d2.getDate() - i)
        var dayobjectSelf = {} // 用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobjectSelf.day = d2
        dayobjectSelf.dateStr = this.getDateStr(dayobjectSelf.day)
        if (dayobjectSelf.dateStr === this.getDateStr(new Date())) {
          dayobjectSelf.isCurrent = true
        }
        dayobjectSelf.isActive = false
        this.days.push(dayobjectSelf) // 将日期放入data 中的days数组 供页面渲染使用
      }
      // 其他周
      for (var j = 1; j <= 35 - this.currentWeek; j++) {
        var d3 = new Date(str)
        d3.setDate(d3.getDate() + j)
        var dayobjectOther = {}
        dayobjectOther.day = d3
        dayobjectOther.isActive = false
        dayobjectOther.dateStr = this.getDateStr(dayobjectOther.day)
        if (dayobjectOther.dateStr === this.getDateStr(new Date())) {
          dayobjectOther.isCurrent = true
        }
        this.days.push(dayobjectOther)
      }
      // 渲染已被选择的日期
      this.days.forEach(item => {
        if (this.selecteDays.includes(item.dateStr)) {
          item.isActive = true
        }
      })

    },
    // 选择的日期
    getDayTime(el) {
      if(this.onlyShow) {
        return
      }
      this.$set(el, 'isActive', !el.isActive)
      if (el.isActive) {
        this.selecteDays.push(el.dateStr)
      } else {
        this.selecteDays.forEach((item, index) => {
          if (item == el.dateStr) {
            this.selecteDays.splice(index, 1)
          }
        })
      }
      console.log(this.selecteDays)
      console.log(this.selecteDays)
      this.$emit('change', this.selecteDays)
    },
    // 上个月
    pickPre: function(year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      var d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    // 下个月
    pickNext: function(year, month) {
      var d = new Date(this.formatDate(year, month, 1))
      d.setDate(35)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function(year, month, day) {
      var y = year
      var m = month
      if (m < 10) m = '0' + m
      var d = day
      if (d < 10) d = '0' + d
      return y + '-' + m + '-' + d + ' 00:00:00'
    },
    // 获取日期字符串
    getDateStr(dateObj) {
      return this.formatDate(dateObj.getFullYear(), dateObj.getMonth() + 1, dateObj.getDate())
    }
  }
}
</script>
<style lang='scss' scoped>
  #calendar {
    font-size: 16px;
    width: 100%;
    margin: 0 auto;
  }
  .month {
    width: 100%;
    color: #333333;
    background: #409EFF;
  }
  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    height: 35px;
  }
  .year-month {
    height: 35px;
    text-align: center;
    line-height: 35px;
    font-weight: 600;
    color: #fff;
  }
  .choose-month {
    text-align: center;
    font-size: 16px;
  }

  .choose-year {
    font-size: 16px;
  }

  .month ul li {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 3px;
    height: 35px;
    &.arrow {
      text-align: center;
      width: 80px;
      line-height: 35px;
      color: #999999;
      font-size: 18px;
      font-weight: 800;
      cursor: pointer;
      color: #fff;
    }
  }
  .weekdays {
    margin: 0;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    color: #999;
    justify-content: space-around;
  }
  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
    cursor: pointer;
  }
  .days {
    padding: 10px;
    background: #ffffff;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
  }
  .days li {
    list-style-type: none;
    display: inline-block;
    width: 14.2%;
    text-align: center;
    padding-bottom: 4px;
    padding-top: 10px;
    font-size: 12px;
    color: #000;
  }
  .days li>span>span {
    &.active {
      padding: 6px 10px;
      background: #00b8ec!important;
      color: #fff;
    }
    &.isCurrent {
      padding: 6px 10px;
      border: 1px solid #00b8ec;
      
    }
  }
  .days li .other-month {
    padding: 5px;
    color: gainsboro;
  }
  .days li:hover>span>span {
    padding: 6px 10px;
    background: #e1e1e1;
    color: #fff;
  }
</style>
