import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = () => (
    <Helmet>
        {/* Basic Page Needs */}
        <meta charSet="UTF-8" />
        <title>Industrial Supplies Online Store | Tools, Chemicals, Safety & Electrical Equipment</title>
        <meta name="description" content="Your one-stop online shop for industrial tools, chemicals, safety equipment, electrical parts, and electronics. Quality products, fast shipping, and excellent customer service. Now in Bangladesh!" />
        <meta name="keywords" content="industrial supplies, tools, industrial chemicals, safety equipment, electrical equipment, electronic parts, online store, industrial tools, PPE, hand tools, power tools, industrial cleaning chemicals, Bangladesh, workplace safety products, electrical components, buy online" />
        <meta name="author" content="Trust Global" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content="Industrial Supplies Online Store | Tools, Chemicals, Safety & Electrical Equipment Bangladesh" />
        <meta property="og:description" content="Your one-stop online shop for industrial tools, chemicals, safety equipment, electrical parts, and electronics. Quality products, fast shipping, and excellent customer service. Now in Bangladesh!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="{window.location.href}" />
        <meta property="og:image" content="https://www.trustglobal.com.bd/images/og-image.jpg" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Industrial Supplies Online Store | Tools, Chemicals, Safety & Electrical Equipment" />
        <meta name="twitter:description" content="Your one-stop online shop for industrial tools, chemicals, safety equipment, electrical parts, and electronics. Quality products, fast shipping, and excellent customer service." />
        <meta name="twitter:image" content="https://www.trustglobal.com.bd/images/og-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="https://www.trustglobal.com.bd/favicon.ico" type="image/x-icon" />

        {/* Canonical URL */}
        <link rel="canonical" href="{window.location.href}" />

        {/* Robots Meta Tag */}
        <meta name="robots" content="index, follow" />

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
        <script>
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "nhegnrn92a");
        `}
      </script>
    </Helmet>
);

export default SEO;
