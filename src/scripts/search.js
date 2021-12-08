const button = document.getElementById('search')
const searchBox = document.getElementById('searchbox')
const searchInput = document.getElementById('searchInput')

searchBox.addEventListener('click', (e) => searchInput.focus())

button.addEventListener('click', () => {
  if (document.getElementById('searchInput').value != '') {
    search()
  }
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.activeElement.id === 'searchInput' && document.activeElement.value !== '') {
    search()
  }
})

async function search() {
  var tabID = await getCurrent()
  var search_input = document.getElementById('searchInput').value
  browser.search.search({
    query: search_input,
    tabId: tabID,
  })
}

async function getCurrent() {
  return (await browser.tabs.getCurrent()).id
}
