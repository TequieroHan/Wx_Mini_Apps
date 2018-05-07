/**
 * 星星数
 */
function startCount(originStart) {
  var starNum = originStart / 10, stars = [], i = 0;
  do {
    if (starNum >= 1) {
      stars[i] = 'full';
    } else if (starNum >= 0.5) {
      stars[i] = 'half';
    } else {
      stars[i] = 'no';
    }
    starNum--;
    i++;
  } while (i < 5)
  return stars;
}

function http(url, callBack, method) {
  if (method === "") {
    method = "GET";
  }
  wx.request({
    url: url,
    method: method,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      // callBack(res.data) //若写这一句会有重复数据显示
    },
    fail: function (res) {
      callBack(res.data)
    },
    complete: function (res) {
      callBack(res.data)
    }
  });
}

module.exports = {
  startCount: startCount,
  http: http,
}