import Papa from 'papaparse';
import { DATA_SOURCES } from '../config';

const processProduct = (product) => ({
  ...product,
  id: product.id.toString(),
  imageUrls: Array.isArray(product.imageUrls) ? product.imageUrls : product.imageUrls.split(','),
  keywords: Array.isArray(product.keywords) ? product.keywords : product.keywords.split(',').map(k => k.trim())
});

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

const getSourceUrl = (idNumber) => {
  if (idNumber >= 3350 && idNumber <= 4804) {
    return DATA_SOURCES.json[0];
  } else if (idNumber >= 4805 && idNumber <= 5514) {
    return DATA_SOURCES.json[1];
  } else if (idNumber >= 5515 && idNumber <= 6477) {
    return DATA_SOURCES.json[2];
  } else if (idNumber >= 6478 && idNumber <= 9091) {
    return DATA_SOURCES.json[3];
  } else {
    return DATA_SOURCES.csv[0];
  }
};

export const fetchProductById = async (id) => {
  const idNumber = parseInt(id, 10);
  const sourceUrl = getSourceUrl(idNumber);
  
  if (sourceUrl.endsWith('.json')) {
    const products = await fetchJson(sourceUrl);
    return products.find(p => p.id === id.toString()) || null;
  } else {
    const products = await fetchCsv(sourceUrl);
   
    return products.find(p => p.id === id.toString()) || null;
    
  }
};