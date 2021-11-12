window.onload = function () {
  document.getElementById("btnSave").onclick = function () {
    let value = document.getElementById("keyWord").value;
    console.log(value);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          value: value,
        },
        function (res) {
          console.log(res.farewell);
        }
      );
    });
    window.close();
  };
};
