import assert from "node:assert/strict";

import {
  DEFAULT_REMOVE_DOWNLOAD_BACKGROUND,
  getDownloadBackgroundFill,
} from "../lib/download-background";

assert.equal(
  DEFAULT_REMOVE_DOWNLOAD_BACKGROUND,
  false,
  "downloads should keep the canvas background by default",
);

assert.equal(
  getDownloadBackgroundFill(true, "#9b82c8"),
  null,
  "turning on remove background should not paint a background rect",
);

assert.equal(
  getDownloadBackgroundFill(false, "#9b82c8"),
  "#9b82c8",
  "turning off remove background should use the current canvas background",
);
