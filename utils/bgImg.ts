import bg0 from '../public/bg-image/bg0.jpeg'
import bg1 from '../public/bg-image/bg1.jpeg'
import bg2 from '../public/bg-image/bg2.jpeg'
import bg3 from '../public/bg-image/bg3.jpeg'
import bg4 from '../public/bg-image/bg4.jpeg'

const bgMap = new Map([
  [0, bg0],
  [1, bg1],
  [2, bg2],
  [3, bg3],
  [4, bg4],
])

export const getBgImg = (imageNumber: number) => {
  return bgMap.get(imageNumber)
}
