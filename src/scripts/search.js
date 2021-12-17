const defaultTopSites = [
  {
    favicon: 'https://avatars.githubusercontent.com/u/83148990?s=200&v=4',
    title: 'Fushra',
    url: 'https://fushra.com',
  },
  {
    favicon: 'https://duckduckgo.com/assets/common/dax-logo.svg',
    title: 'DuckDuckGo',
    url: 'https://duckduckgo.com/about',
  },
  {
    favicon: 'https://github.githubassets.com/pinned-octocat.svg',
    title: 'GitHub',
    url: 'https://github.com',
  },
  {
    favicon: 'https://static.figma.com/app/icon/1/favicon.svg',
    title: 'Figma',
    url: 'https://figma.com/',
  },
  {
    favicon:
      'https://www.ycombinator.com/assets/ycdc/ycombinator-logo-37cf030fbc255fc71d19aa21bd5b32076aa206e8fbd0121c9247db2adcbd7851.png',
    title: 'Hacker News',
    url: 'https://news.ycombinator.com/',
  },
  {
    favicon: 'https://www.redditinc.com/assets/images/site/logo01.svg',
    title: 'Libreddit',
    url: 'https://libredd.it/',
  },
  {
    favicon:
      'https://spee.ch/9/45245681a50082f7.jpg?quality=85&height=200&width=0',
    title: 'Odysee',
    url: 'https://odysee.com/',
  },
]

const searchBox = document.getElementById('searchbox')
const searchInput = document.getElementById('searchInput')
const topSitesContainer = document.getElementById('topSitesContainer')

searchBox.addEventListener('click', (e) => searchInput.focus())

document.addEventListener('keydown', (e) => {
  if (
    e.key === 'Enter' &&
    document.activeElement.id === 'searchInput' &&
    document.activeElement.value !== ''
  )
    search()
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

function renderTopSite(topSite) {
  const container = document.createElement('div')
  container.classList.add('cardContainer')

  const favicon = document.createElement('img')
  favicon.src = topSite.favicon
  favicon.classList.add('favicon')

  const title = document.createElement('div')
  title.classList.add('title')
  title.innerText = topSite.title

  container.addEventListener('click', () => (location.href = topSite.url))

  container.appendChild(favicon)
  container.appendChild(title)

  return container
}

async function topSites() {
  const browserTopSites = await browser.topSites.get({ includeFavicon: true })
  const topSites = [...browserTopSites, ...defaultTopSites].filter(
    (_val, index) => index < 8
  )

  console.log(topSites)

  for (const topSite of topSites) {
    topSitesContainer.append(renderTopSite(topSite))
  }
}

topSites()
