import backgrounds from './backgrounds.json';

function syncCashDays() {
  getOptions((options) => {
    const cashLeft = options.cashLeft;
    const cashMonthly = options.cashMonthly;
    const cashLeftDate = new Date(options.cashLeftDate);

    if (cashLeft && cashMonthly) {
      const cashDaysLeft = getCashDaysLeft(cashLeft, cashMonthly, cashLeftDate);

      if (cashDaysLeft > 0) {
        document.getElementsByClassName('timeLeft')[0].innerHTML = cashDaysLeft + ' days';
        document.title = 'Cash Clock:' +  cashDaysLeft + ' days left';
      } else {
        document.getElementsByClassName('timeLeft')[0].innerHTML = 'You died :(';
        document.getElementsByClassName('timeLeft')[0].style.color = 'red';
        document.getElementsByClassName('timeLeftSubtitle')[0].innerHTML = 'Find some cash or switch project !<br/><span style="color: lime">You\'ll do better next time :)</span>';
        document.title = 'Cash Clock: you died :(';
      }
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
  // Load the low quality image
  setBackground(bg.urls.small);

  // Load the medium resolution image
  const mediumImage = new Image();
  mediumImage.src = bg.urls.regular;
  mediumImage.onload = () => setBackground(bg.urls.regular);

  // Load the full resolution image
  const fullImage = new Image();
  fullImage.src = bg.urls.full;
  fullImage.onload = () => setBackground(bg.urls.full);
}

function setBackground(bgUrl) {
  document.getElementsByClassName('container')[0].style.backgroundImage = 'url("' + bgUrl + '")';
}

function loadNewBackground() {
  return backgrounds[getRandomInt()];
}

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
  return Math.abs(Math.round((date1 - date2)/86400000));
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
