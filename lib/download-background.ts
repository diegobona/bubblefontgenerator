export const DEFAULT_REMOVE_DOWNLOAD_BACKGROUND = false;

export function getDownloadBackgroundFill(
  removeBackgroundWhenDownloading: boolean,
  backgroundColor: string,
) {
  return removeBackgroundWhenDownloading ? null : backgroundColor;
}
