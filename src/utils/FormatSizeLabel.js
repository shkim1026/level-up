export default function formatSizeLabel(value) {
  if (!value) return "";

  const normalized = value.toLowerCase().trim();

  if (normalized === "small") return "S";
  if (normalized === "x small" || normalized === "x-small" || normalized === "xsmall") return "XS";
  if (normalized === "xx small" || normalized === "xx-small" || normalized === "xxsmall") return "XXS";
  if (normalized === "medium") return "M";
  if (normalized === "large") return "L";
  if (normalized === "extra large") return "XL";
  if (normalized === "x large" || normalized === "x-large" || normalized === "xlarge") return "XL";
  if (normalized === "xx large" || normalized === "xx-large" || normalized === "xxlarge") return "XXL";

  return value
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
}