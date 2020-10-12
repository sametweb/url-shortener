function validateUrl(url) {
  const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
  return regex.test(url);
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
    alert("URL is valid.");
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
