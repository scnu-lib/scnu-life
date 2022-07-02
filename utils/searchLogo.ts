import baidu from '../public/search-logo/baidu-white.png'
import bing from '../public/search-logo/bing-white.png'
import google from '../public/search-logo/google-white.png'

const bgMap = new Map([
  ['baidu', baidu],
  ['bing', bing],
  ['google', google],
])

export const getSearchLogo = (searchEngine: string) => {
  return bgMap.get(searchEngine)
}
