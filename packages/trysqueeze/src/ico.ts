/**
 * High-performance binary encoder for standard multi-resolution Windows Icon (.ico) files.
 * Uses PNG-in-ICO container architecture for crisp 32-bit RGBA transparency and universal compatibility.
 */

export interface IcoFrame {
  width: number;
  height: number;
  pngData: Uint8Array;
}

/**
 * Builds a valid Windows .ico binary container from an array of PNG frames.
 * Standard resolutions typically include 16x16, 32x32, 48x48, 64x64, 128x128, and 256x256.
 *
 * @param frames Array of IcoFrame objects with width, height, and raw PNG bytes.
 * @returns Uint8Array containing the complete binary .ico container file.
 */
export function buildIcoFile(frames: IcoFrame[]): Uint8Array {
  if (!frames || frames.length === 0) {
    throw new Error('At least one frame is required to build an ICO file.');
  }

  const count = frames.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const directorySize = headerSize + count * dirEntrySize;

  let totalSize = directorySize;
  for (const f of frames) {
    totalSize += f.pngData.length;
  }

  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  // 1. ICO Header (6 bytes)
  view.setUint16(0, 0, true); // Reserved (must be 0)
  view.setUint16(2, 1, true); // Type (1 = Icon resource)
  view.setUint16(4, count, true); // Number of images

  // 2. Directory Entries (16 bytes each) & Image Data
  let currentOffset = directorySize;

  for (let i = 0; i < count; i++) {
    const frame = frames[i];
    const entryOffset = headerSize + i * dirEntrySize;

    const wByte = frame.width >= 256 ? 0 : frame.width;
    const hByte = frame.height >= 256 ? 0 : frame.height;
    const dataLen = frame.pngData.length;

    view.setUint8(entryOffset + 0, wByte); // Width (0 means 256)
    view.setUint8(entryOffset + 1, hByte); // Height (0 means 256)
    view.setUint8(entryOffset + 2, 0); // Palette count (0 for 32-bit truecolor)
    view.setUint8(entryOffset + 3, 0); // Reserved (must be 0)
    view.setUint16(entryOffset + 4, 1, true); // Color planes (1)
    view.setUint16(entryOffset + 6, 32, true); // Bits per pixel (32-bit RGBA)
    view.setUint32(entryOffset + 8, dataLen, true); // Image data size in bytes
    view.setUint32(entryOffset + 12, currentOffset, true); // File offset to image data

    // Copy PNG data bytes
    bytes.set(frame.pngData, currentOffset);
    currentOffset += dataLen;
  }

  return bytes;
}
