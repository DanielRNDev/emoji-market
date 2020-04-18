
import { Dimensions } from 'react-native'
import VMasker from 'vanilla-masker'
import _ from 'lodash'

const { width } = Dimensions.get('window')
const getTimeline = (value) => `${value < 0 ? 'ago' : 'later'}`
const getFromNowText = (diff, text) => {
  if (Math.abs(diff) === 1) {
    return `A ${text} ${getTimeline(diff)}`
  } else {
    return `${Math.abs(diff)} ${text}s ${getTimeline(diff)}`
  }
}

const getDateFromNow = (date) => {
  const compareDate = new Date(date)
  const compareMonth = compareDate.getMonth()
  const compareYear = compareDate.getFullYear()
  const today = new Date()
  const month = today.getMonth()
  const year = today.getFullYear()

  if (compareYear === year) {
    if (compareMonth === month) {
      const diffDate = compareDate.getDate() - today.getDate()
      return getFromNowText(diffDate, 'day')
    } else {
      const diffMonth = compareMonth - month
      return getFromNowText(diffMonth, 'month')
    }
  } else {
    const diffYear = compareYear.getDate() - year.getDate()
    return getFromNowText(diffYear, 'year')
  }
}

const isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToTop = 250; // to improve the user's experience, we should always pre-emptively fetch the next batch of results in advance, making use of idle-time.  But they still should not be displayed until the user has scrolled to the bottom of the product grid.
  return contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y;
};

const formatCurrency = (value) => {
  const getNumber = VMasker.toNumber(Number(value).toFixed(2))
  const getMoney = VMasker.toMoney(getNumber, {
    precision: 2,
    delimiter: ',',
    separator: '.',
    zeroCents: false,
  })

  return `$${getMoney}`
}

const debounceEventHandler = (...args) => {
  const debounced = _.debounce(...args)
  return function(e) {
    e.persist()
    return debounced(e)
  }
}

const getItemWidth = () => {
  return (width - 30) / 2
}

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getAdURL = () => `http://localhost:3000/ads/?r=${randomInteger(1, 100)}`

const getArrayWithAds = (arr, alternate) => {
  const data = arr.reduce((acc, curr, i) => {
    if ((i + 1) % alternate === 0) {
      return [...acc, curr, { adUrl: getAdURL() }];
    }

    return [...acc, curr];
  }, []);
  return data
}

export {
  getDateFromNow,
  formatCurrency,
  isCloseToTop,
  debounceEventHandler,
  getItemWidth,
  randomInteger,
  getArrayWithAds
}
