const button = document.getElementById("search");

button.addEventListener("click", () => {
  if (document.getElementById("search-input").value != "") {
    search();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && document.activeElement.id === "search-input" && document.activeElement.value !== "") {
    search();
  }
});

async function search() {
  var tabID = await getCurrent();
  var search_input = document.getElementById("search-input").value;
  browser.search.search({
    query: search_input,
    tabId: tabID,
  });
}

async function getCurrent() {
  return (await browser.tabs.getCurrent()).id;
}
