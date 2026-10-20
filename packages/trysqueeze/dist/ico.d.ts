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
export declare function buildIcoFile(frames: IcoFrame[]): Uint8Array;
//# sourceMappingURL=ico.d.ts.map