import Papa from 'papaparse';
import { DATA_SOURCES } from '../config';

const processProduct = (product) => ({
  ...product,
  id: product.id.toString(),
  imageUrls: Array.isArray(product.imageUrls) ? product.imageUrls : product.imageUrls.split(','),
  keywords: Array.isArray(product.keywords) ? product.keywords : product.keywords.split(',').map(k => k.trim())
});

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const fetchJson = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.map(processProduct);
  } catch (error) {
    console.error(`Error fetching JSON from ${url}:`, error);
    return [];
  }
};

const fetchCsv = async (url) => {
  try {
    const response = await fetch(url);
    const csvData = await response.text();
    const parsedData = Papa.parse(csvData, { header: true }).data;
    return parsedData.map(processProduct);
  } catch (error) {
    console.error(`Error fetching CSV from ${url}:`, error);
    return [];
  }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchProducts = async (page = 0, limit = Infinity) => {
  const allProducts = [];
  const productsPerBatch = 2; // Number of files (JSON or CSV) to fetch per batch
  const batches = [];

  for (let i = 0; i < DATA_SOURCES.json.length || i < DATA_SOURCES.csv.length; i += productsPerBatch) {
    const jsonBatch = DATA_SOURCES.json.slice(i, i + productsPerBatch).map(url => fetchJson(url));
    const csvBatch = DATA_SOURCES.csv.slice(i, i + productsPerBatch).map(url => fetchCsv(url));

    const results = await Promise.all([...jsonBatch, ...csvBatch]);
    
    results.forEach(products => batches.push(...products));

    // Shuffle the batch of products
    const shuffledBatch = shuffleArray(batches);

    if (limit !== Infinity && allProducts.length + shuffledBatch.length > limit) {
      const remainingSpace = limit - allProducts.length;
      allProducts.push(...shuffledBatch.slice(0, remainingSpace));
      break;
    }

    allProducts.push(...shuffledBatch);

    if (i + productsPerBatch < DATA_SOURCES.json.length || i + productsPerBatch < DATA_SOURCES.csv.length) {
      await delay(2 * 60 * 1000); // Wait 2 minutes before fetching the next batch
    }
  }

  return allProducts;
};



export const fetchProductById = async (id) => {
  const allProducts = await fetchProducts();
  return allProducts.find(p => p.id === id.toString()) || null;
};
