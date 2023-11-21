import type { VersionsConfig } from '@/types/versionConfig'

const versionsConfig: VersionsConfig = {
  SINGLE_SIGN_ON_TRIAL: true,

  TRIAL_FORBID_ROUTES: false,

  NAV_TO_FISHING_FORT_OWE: true,

  FORBID_PAYMENT_FUNCTION: false,

  NO_CREATE_DATASOURCE: false,
  NO_DATASOURCE_UPDATE_TIME: false,
  NO_CONFIG_DATASOURCE: false,
  NO_CHECK_DATASOURCE: false,
  NO_DELETE_DATASOURCE: false,
  NO_CLONE_DATASOURCE: false,

  NO_RULE_DISCOVERY_IN_RULES: false,
  NO_RULE_DISCOVERY_CORES_NUM: true,

  NO_RULE_APPLY_CORES_NUM: true
}

export default versionsConfig
