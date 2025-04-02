import withInstall from '../utils/withInstall'
import signBoard from './signBoard/index.vue'
import seamlessScroll from './seamlessScroll/index.vue'
import virtualInfiniteScroll from './virtualInfiniteScroll/index.vue'

const SignBoard = withInstall(signBoard)
const SeamlessScroll = withInstall(seamlessScroll)
const VirtualInfiniteScroll = withInstall(virtualInfiniteScroll)

export {
  SignBoard,
  SeamlessScroll,
  VirtualInfiniteScroll,
}