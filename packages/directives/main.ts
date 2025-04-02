import withDirectivesInstall from '../utils/withDirectivesInstall'
import drag from './drag/index'
import outsideclick from './outsideclick/index'

const VDrag = withDirectivesInstall('v-drag', drag)
const VOutsideclick = withDirectivesInstall('v-outsideclick', outsideclick)

export { VDrag, VOutsideclick }