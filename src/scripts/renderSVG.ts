import { decodeImage } from '@nouns/sdk';

const PART = '0x0015171f093a0101000d0101000d0101000d0101000d0101000d0101000d0101000b01';

const decodedImage = decodeImage(PART);

console.log(decodedImage);

// const svg = buildSVG(RLE_PARTS, PALETTE_COLORS, BACKGROUND_COLOR);

// console.log(svg);