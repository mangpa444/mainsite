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

export const fetchProducts = async (page = 0, limit = Infinity) => {
 
  const allProducts = [];

 
  const jsonPromises = DATA_SOURCES.json.map(url => fetchJson(url));
  const csvPromises = DATA_SOURCES.csv.map(url => fetchCsv(url));

 
  const allResults = await Promise.all([...jsonPromises, ...csvPromises]);

  allResults.forEach(products => {
    allProducts.push(...products);
  });

 

  // Shuffle the products
  const shuffledProducts = shuffleArray([...allProducts]);

  // If limit is Infinity, return all products
  if (limit === Infinity) {
  
    return shuffledProducts;
  }

  // Simple pagination
  const startIndex = page * limit;
  const endIndex = startIndex + limit;
  
  const paginatedProducts = shuffledProducts.slice(startIndex, endIndex);
 
  
  return paginatedProducts;
};

export const fetchProductById = async (id) => {
  const allProducts = await fetchProducts();
  return allProducts.find(p => p.id === id.toString()) || null;
};
