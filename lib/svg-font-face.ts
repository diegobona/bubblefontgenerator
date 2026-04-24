type SvgFontFaceInput = {
  family: string;
  fontWeight: string;
};

type ExternalSvgFontFaceInput = SvgFontFaceInput & {
  filePath: string;
};

type EmbeddedSvgFontFaceInput = SvgFontFaceInput & {
  fontDataUrl: string;
};

function escapeCssString(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function buildSvgFontFaceCss({
  family,
  fontWeight,
  source,
}: SvgFontFaceInput & { source: string }) {
  return `@font-face{font-family:"${escapeCssString(
    family,
  )}";src:url("${source}") format("truetype");font-weight:${fontWeight};font-display:block;}`;
}

export function buildExternalSvgFontFaceCss({
  family,
  fontWeight,
  filePath,
}: ExternalSvgFontFaceInput) {
  return buildSvgFontFaceCss({
    family,
    fontWeight,
    source: filePath,
  });
}

export function buildEmbeddedSvgFontFaceCss({
  family,
  fontWeight,
  fontDataUrl,
}: EmbeddedSvgFontFaceInput) {
  return buildSvgFontFaceCss({
    family,
    fontWeight,
    source: fontDataUrl,
  });
}

export async function fetchFontDataUrl(filePath: string) {
  const response = await fetch(filePath);

  if (!response.ok) {
    throw new Error(`Failed to load font for PNG export: ${filePath}`);
  }

  const blob = await response.blob();

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to prepare font for PNG export."));
    reader.readAsDataURL(blob);
  });
}
