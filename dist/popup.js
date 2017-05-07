document.getElementById('submit').addEventListener('click', saveOptions);

function saveOptions(e) {
  const cashLeft = parseInt(document.getElementsByClassName('cashLeft')[0].value, 10);
  const cashMonthly = parseInt(document.getElementsByClassName('cashMonthly')[0].value, 10);
  const now = new Date();

  chrome.storage.sync.set({
    cashLeft: cashLeft,
    cashMonthly: cashMonthly,
    cashLeftDate: now.toString()
  }, function() {
    document.getElementsByClassName('popup')[0].innerHTML = '<h3>Saved !</h3>';
  });
}
