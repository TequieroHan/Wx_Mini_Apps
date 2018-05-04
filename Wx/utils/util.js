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

module.exports = {
  startCount: startCount,
}