import React from 'react';
import { Helmet } from 'react-helmet';

// Helper functions to truncate text and keywords
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const getOptimizedKeywords = (keywords, maxKeywords) => {
  return keywords.slice(0, maxKeywords).join(', ');
};

const countLetters = (str) => {
    // Remove non-letter characters and count the length
    return (str.match(/[a-zA-Z]/g) || []).length;
};

function calculateY(x, k = 0.1, x0 = 50) {
    // Normalize x using a sigmoid function
    const normalizedX = 1 / (1 + Math.exp(-k * (x - x0)));
    
    // Calculate y within the range 3.5 to 4.8
    let y = 3.5 + (normalizedX * 1.3);
    
    // Trim y to 2 decimal places
    y = Math.round(y * 100) / 100;
    
    return y;
}

const ProductSEO = ({ product }) => {
  const productURL = window.location.href;

  // Truncate the product name and description for SEO purposes
  const maxTitleLength = 60; // Max length for SEO title
  const maxDescriptionLength = 160; // Max length for SEO meta description
  const maxKeywords = 10; // Max number of keywords for SEO
  const cal = countLetters(product.name);
  const star = calculateY(cal);

  const title = truncateText(product.name, maxTitleLength);
  const description = truncateText(product.description, maxDescriptionLength);
  const optimizedKeywords = getOptimizedKeywords(product.keywords, maxKeywords);

  const ratingValue = star; // Random rating between 3 and 4.5
  const reviewCount = cal; // Random review count between 50 and 1050
 // Use the first image URL for SEO purposes
  const imageUrl = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : 'https://emg.trustglobal.eu.org/images/no-p.jpg';

  const schemaMarkup = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": title,
    "image": imageUrl,
    "description": description,
    "sku": product.sku || "N/A",
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Trust Global"
    },
    "offers": {
      "@type": "Offer",
      "url": productURL,
      "priceCurrency": "BDT",
      "price": product.price || "0.00",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "reviewCount": reviewCount
    }
  };

  return (
    <Helmet>
      {/* Title Tag */}
      <title>{`${title} - Trust Global`}</title>

      {/* Meta Description */}
      <meta name="description" content={description} />

      {/* Keywords */}
      <meta name="keywords" content={optimizedKeywords} />

      {/* Open Graph Meta Tags for Social Media */}
      <meta property="og:title" content={`${title} - Our Store`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="product" />
      <meta property="og:url" content={productURL} />
      <meta property="og:image" content={product.image} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} - Our Store`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={product.image} />

      {/* Favicon */}
      <link rel="icon" href="https://www.trustglobal.com.bd/favicon.ico" type="image/x-icon" />

      {/* Canonical URL */}
      <link rel="canonical" href={productURL} />
      
      {/* Google Analytics (Example) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-CHPRRG086V"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', 'G-CHPRRG086V');
        `}
      </script>

      {/* Microsoft Clarity (Example) */}
      <script>
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "nhegnrn92a");
        `}
      </script>

      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>
    </Helmet>
  );
};

export default ProductSEO;
