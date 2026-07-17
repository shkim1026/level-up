// TODO: Replace placeholder measurements for Jacket/Sweatshirt with real data.
// Currently they clone the T-Shirt chart so nothing breaks in the meantime.
const sizeCharts = {
  "T-Shirt": {
    headers: ["Size", "Length (in)", "Width (in)", "Chest (in)"],
    rows: [
      ["XS", "27", "16 1/2", "31-34"],
      ["S", "28", "18", "34-37"],
      ["M", "29", "20", "38-41"],
      ["L", "30", "22", "42-45"],
      ["XL", "31", "24", "46-49"],
      ["2XL", "32", "26", "50-53"],
      ["3XL", "33", "28", "54-57"],
      ["4XL", "34", "30", "58-61"],
      ["5XL", "35", "32", "62-65"],
    ],
  },
  "Hoodies": {
    headers: ["Size", "Length (in)", "Width (in)"],
    rows: [
      ["S", "27", "20"],
      ["M", "28", "21"],
      ["L", "29", "23"],
      ["XL", "30", "25"],
      ["2XL", "31", "26 1/2"],
      ["3XL", "32", "28"],
    ],
  },
};

// Fallback chart when a product's category has no entry above.
export const defaultSizeChart = sizeCharts["T-Shirt"];

export default sizeCharts;