const extensionWindow = document.createElement("div");
extensionWindow.style.width = "400px";
extensionWindow.style.height = "200px";
extensionWindow.style.backgroundColor = "#e1e1e2";
extensionWindow.style.color = "#111";
extensionWindow.textContent = "Hello omitURL";
extensionWindow.style.position = "fixed";
extensionWindow.style.top = "10px";
extensionWindow.style.right = "10px";
extensionWindow.style.display = "none";
extensionWindow.style.zIndex = "1000000000000000";
extensionWindow.style.borderRadius = "20px";
extensionWindow.style.padding = "20px";
extensionWindow.style.boxShadow = "0 0 20px #000";
const body = document.body;
body.append(extensionWindow);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "clicked_browser_action") {
    console.log("extension icon clicked");
    extensionWindow.style.display =
      extensionWindow.style.display === "none" ? "block" : "none";
  }
});
