export declare function getThemeColors(color?: string, mode?: string): string[]
export declare function changeThemeColor(
  newColor: string,
  $theme: string
): string[]
export declare function modifyVars(color?: string): record<string>
export declare function loadLocalTheme(localSetting: record<string>): void
