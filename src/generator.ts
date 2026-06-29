import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { getColorSVG, getMonoSVG } from './logos';

/**
 * Generate a PNG icon from SVG
 */
export async function generateIcon(
  svgString: string,
  outputPath: string,
  size: number
): Promise<void> {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await sharp(Buffer.from(svgString))
    .resize(size, size)
    .png()
    .toFile(outputPath);
}

/**
 * Generate all standard icons
 */
export async function generateAllIcons(outputDir: string = 'dist/icons'): Promise<void> {
  const colorSVG = getColorSVG();
  const monoSVG = getMonoSVG();

  // Standard sizes
  const sizes = [16, 32, 64, 128, 256, 512, 1024];

  console.log('Generating icons...');

  for (const size of sizes) {
    await generateIcon(colorSVG, path.join(outputDir, `zen-${size}.png`), size);
    await generateIcon(monoSVG, path.join(outputDir, `zen-mono-${size}.png`), size);
  }

  // Generate @2x versions for macOS
  const macSizes = [
    { base: 16, scale: 2 },
    { base: 32, scale: 2 },
    { base: 128, scale: 2 },
    { base: 256, scale: 2 },
    { base: 512, scale: 2 }
  ];

  for (const { base, scale } of macSizes) {
    await generateIcon(
      colorSVG,
      path.join(outputDir, `zen-${base}@${scale}x.png`),
      base * scale
    );
  }

  // Menu bar templates
  await generateIcon(monoSVG, path.join(outputDir, 'iconTemplate.png'), 16);
  await generateIcon(monoSVG, path.join(outputDir, 'iconTemplate@2x.png'), 32);
  await generateIcon(monoSVG, path.join(outputDir, 'iconTemplate@3x.png'), 48);

  console.log('✅ Icons generated successfully!');
}
