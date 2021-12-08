const searchBox = document.getElementById('searchbox')
const searchInput = document.getElementById('searchInput')

searchBox.addEventListener('click', (e) => searchInput.focus())

document.addEventListener('keydown', (e) => {
  if (
    e.key === 'Enter' &&
    document.activeElement.id === 'searchInput' &&
    document.activeElement.value !== ''
  ) {
    search()
  }
})

const getCurrent = async () => (await browser.tabs.getCurrent()).id

async function search() {
  const tabId = await getCurrent()
  const query = searchInput.value

  browser.search.search({
    query,
    tabId,
  })
}
