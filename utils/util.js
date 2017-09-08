const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getDays(epoch) {
  var today = new Date(),
    year = today.getFullYear(),
    month = today.getMonth(),
    date = today.getDate(),
    currDate = new Date(year, month, date),//结束日期为今日
    startArr = epoch.split('-'),
    startMonth = startArr[1] - 1,
    start = new Date(startArr[0], startMonth, startArr[2]),//开始日期
    mmSec = (currDate.getTime() - start.getTime()),//得到时间戳相减 得到以毫秒为单位的差
    days = Math.ceil(mmSec / 1000 / 3600 / 24);//单位转换为天并返回 
  return days;
}

module.exports = {
  formatTime: formatTime,
  getDays: getDays
}