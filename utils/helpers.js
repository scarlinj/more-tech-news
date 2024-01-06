module.exports = {
format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
    date).getFullYear()}`;
},
sort_date: date => {
  fncompare = function(a,b) {
  // turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new date(b) - new date(a);
  }
object.keys(context).sort(fncompare).foreach(function(key) {
  ret = ret + options.fn({key: key, value: context[key]})
})},
format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
format_url: url => {
    return url
    .replace('http://', '')
    .replace('https://', '')
    .replace('www.', '')
    .split('/')[0]
    .split('?')[0];
}
}