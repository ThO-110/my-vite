import cloud from './cloud'
import common from './common'
import trial from './trial'
import standalone from './standalone'

import type { VersionsConfig } from '@/types/versionConfig'

function getVersionsConfig(param: string) {
  if (/:trial$/.test(param)) {
    return trial
  }
  if (/:cloud$/.test(param)) {
    return cloud
  }
  if (/:standalone$/.test(param)) {
    return standalone
  }
  return common
}

const versionsConfig: Readonly<VersionsConfig> = getVersionsConfig(
  // TODO:
  // process.env.VUE_APP_NPM_LIFECYCLE_EVENT
  ''
)

export default versionsConfig
