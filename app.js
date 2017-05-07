import unsplashBgs from './backgrounds.json';

const backgrounds = unsplashBgs.results;

function syncCashDays() {
  getOptions((options) => {
    const cashLeft = options.cashLeft;
    const cashMonthly = options.cashMonthly;
    const cashLeftDate = new Date(options.cashLeftDate);

    if (cashLeft && cashMonthly) {
      const cashDaysLeft = getCashDaysLeft(cashLeft, cashMonthly, cashLeftDate);
      document.getElementsByClassName('timeLeft')[0].innerHTML = cashDaysLeft + ' days';
      document.title = 'Cash Clock:' +  cashDaysLeft + ' days left';
    } else {
      document.getElementsByClassName('timeLeft')[0].innerHTML = '??? days';
      document.getElementsByClassName('timeLeftSubtitle')[0].innerHTML = 'please fill the parameters in the extension popup';
    }
  });
}

function syncBackground() {
  chrome.storage.sync.get('lastSyncedDate', (response) => {
    const dateToday = getTodayDateFormatted();

    if (!response || response.lastSyncedDate != dateToday) {
      const newBackground = loadNewBackground();
      changeBackground(newBackground);
      chrome.storage.sync.set({
        lastSyncedDate: dateToday,
        lastBackground: newBackground
      });
    } else {
      chrome.storage.sync.get('lastBackground', (bg) => {
        changeBackground(bg.lastBackground);
      });
    }
  });
}

function changeBackground(bg) {
  document.getElementsByClassName('container')[0].style.backgroundImage = 'url("' + bg.urls.regular + '")';
}

function loadNewBackground() {
  return backgrounds[getRandomInt()];
}
loadNewBackground();

function getRandomInt() {
  const min = 0;
  const max = backgrounds.length;
  return Math.floor(Math.random() * (max - min)) + min;
}

function getTodayDateFormatted() {
  var today = new Date();
  var hh = today.getHours();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
    dd='0'+dd
  }

  if(mm<10) {
    mm='0'+mm
  }

  return hh+':'+mm+'/'+dd+'/'+yyyy;
}

function getDaysBetweenDates(date1, date2) {
  console.log(date1, date2);
  var c = Math.abs(Math.round((date1 - date2)/86400000));
  console.log('days', c);
  return c;
}

function getCashDaysLeft(cashLeft, cashMonthly, cashLeftDate) {
  return cashLeft / cashMonthly * 30 - getDaysBetweenDates(cashLeftDate, new Date()) ;
}

function getOptions(callback) {
  chrome.storage.sync.get([
    'cashLeft',
    'cashMonthly',
    'cashLeftDate'
  ], (response) => {
    callback(response);
  });
}

syncBackground();
syncCashDays();
