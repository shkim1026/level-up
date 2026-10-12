/**
 * Determines the variant color associated with a given product image.
 *
 * @param {Object} image - The image object containing { url, altText }
 * @param {Object} product - The product object containing variants and images
 * @returns {string|null} The color name if matched, or null
 */
export function getColorForImage(image, product) {
  if (!image || !product) return null;

  // 1. Direct match: check if any variant uses this exact image URL
  const matchingVariant = product.variants?.find((v) => v.image === image.url);
  if (matchingVariant) {
    const colorOpt = matchingVariant.options?.find(
      (o) => o.name?.toLowerCase() === "color"
    );
    if (colorOpt?.value) return colorOpt.value;
  }

  // 2. Collect all available colors for this product
  const allColors = [
    ...new Set(
      product.variants
        ?.map((v) => v.options?.find((o) => o.name?.toLowerCase() === "color")?.value)
        .filter(Boolean)
    ),
  ];

  if (allColors.length === 0) return null;

  const urlLower = image.url ? image.url.toLowerCase() : "";
  const altLower = image.altText ? image.altText.toLowerCase() : "";

  // Sort colors by length descending so longer compound names
  // (e.g. "Oxblood Black", "Athletic Heather") match before single words (e.g. "Black")
  const sortedColors = [...allColors].sort((a, b) => b.length - a.length);

  for (const color of sortedColors) {
    const colorSlug = color.toLowerCase().replace(/\s+/g, "-");

    // Match in image URL (e.g., "-black-front-", "/black-front-", etc.)
    if (
      urlLower.includes(`-${colorSlug}-`) ||
      urlLower.includes(`/${colorSlug}-`) ||
      urlLower.includes(`_${colorSlug}_`) ||
      urlLower.includes(`-${colorSlug}.`)
    ) {
      return color;
    }

    // Match in alt text as whole word(s)
    const colorLower = color.toLowerCase();
    if (altLower && new RegExp(`\\b${colorLower}\\b`, "i").test(altLower)) {
      return color;
    }
  }

  return null;
}
