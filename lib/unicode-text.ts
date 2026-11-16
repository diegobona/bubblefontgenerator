const smallCaps = [..."ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ"];
export const unicodeStyles = ["Circled", "Negative circled", "Squared", "Fullwidth", "Parenthesized", "Small caps"];

export function unicodeText(text: string, style: number) {
  return Array.from(text, (char) => {
    const code = char.codePointAt(0)!;
    if (style === 3 && code >= 33 && code <= 126) return String.fromCodePoint(code + 0xfee0);
    if (style === 0 && code >= 48 && code <= 57) return String.fromCodePoint(code === 48 ? 0x24ea : 0x2460 + code - 49);
    const lower = code >= 97 && code <= 122;
    const upper = code >= 65 && code <= 90;
    if (!lower && !upper) return char;
    const index = code - (lower ? 97 : 65);
    if (style === 5) return smallCaps[index];
    const base = [lower ? 0x24d0 : 0x24b6, 0x1f150, 0x1f130, 0, 0x249c][style];
    return base === undefined ? char : String.fromCodePoint(base + index);
  }).join("");
}
