function validateUrl(url) {
  const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
  return regex.test(url);
}

function shortenURL(url) {
  const body = { url, idToken: "0" };

  fetch("https://ou.tc/", {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      window.prompt("Your Shortened URL:", `ou.tc/${data.id}`);
    })
    .catch(console.log);
}

const CONTEXT_MENU_ID = "SHORTEN_URL";

function getword(info, tab) {
  if (info.menuItemId !== CONTEXT_MENU_ID) {
    return;
  }

  var isValid;
  var link;

  if (info.selectionText) {
    link = info.selectionText;
    isValid = validateUrl(link);
  } else if (info.linkUrl) {
    link = info.linkUrl;
    isValid = validateUrl(link);
  }

  console.log({ isValid, link });

  if (isValid) {
    shortenURL(link);
    console.log("url is valid");
  } else {
    alert("URL is invalid!");
  }
}

chrome.contextMenus.create({
  title: "Shorten with omitURL", // %s gives the selected text
  contexts: ["selection", "link"],
  id: CONTEXT_MENU_ID,
});

chrome.contextMenus.onClicked.addListener(getword);

chrome.browserAction.onClicked.addListener(function (tab) {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message: "clicked_browser_action",
    });
    chrome.tabs.create({ url: "https://omiturl.com" });
  });
});
