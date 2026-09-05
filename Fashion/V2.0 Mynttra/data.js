// ============================================================
// NYKAA FASHION — DECIDE: Unified Multi-Category Product Catalog
// Source of truth: tail_sku_audit_filled_corrected_141.csv
// Real Catalog: 141 SKUs
// Deterministic image mapping: /product-images/<SKU>.jpg
// Zero mock/generated illustrations.
// ============================================================

const PRODUCTS = [
  {
    "id": "sku01",
    "skuId": "SKU01",
    "name": "Men White Solid Regular Fit Polo T-Shirt",
    "brand": "U.S. POLO ASSN.",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 1599,
    "originalPrice": 2158,
    "discount": "35% OFF",
    "rating": 4.5,
    "reviewCount": 1,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/u-s-polo-assn-men-white-embroidered-logo-compact-cotton-polo-t-shirt/p/7755296",
    "isPdpResolved": true,
    "image": "/product-images/SKU01.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "2ply compact cotton",
      "fit": "Regular",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "2ply compact cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Arvind Lifestyle Brands Limited-parent"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 1,
      "rating": 4.5,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 1,
      "summary": "1 customer rating available for this product with an average rating of 4.5\u2605.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for U.S. POLO ASSN. in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "2ply compact cotton, regular fit, half sleeves and machine wash ? everyday casual polo with a collar-neck construction."
    ],
    "whatWeDontKnow": [
      "No cotton percentage, garment measurements or fabric weight",
      "thickness, drape and exact fit cannot be quantified."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku02",
    "skuId": "SKU02",
    "name": "Men Classic Solid Regular Fit Half Sleeve Polo",
    "brand": "Tommy Hilfiger",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 2343,
    "originalPrice": 3163,
    "discount": "35% OFF",
    "rating": 4.4,
    "reviewCount": 1,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/tommy-hilfiger-yellow-cotton-half-sleeves-collar-neck-polo-t-shirt/p/24896154",
    "isPdpResolved": true,
    "image": "/product-images/SKU02.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Regular",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Pvh Arvind Fashion Private Limited"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 1,
      "rating": 4.4,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 1,
      "summary": "1 customer rating available for this product with an average rating of 4.4\u2605.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Tommy Hilfiger in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Cotton, regular fit, half sleeves, collar neck, button-fly and hand wash ? casual polo with a clearly stated construction."
    ],
    "whatWeDontKnow": [
      "No cotton percentage, garment measurements or GSM/fabric weight",
      "'timeless', 'stylish' and similar claims are not measurable."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku03",
    "skuId": "SKU03",
    "name": "Men Pure Cotton Chikankari Mandarin Collar Kurta",
    "brand": "Sojanya",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 4749,
    "originalPrice": 6411,
    "discount": "35% OFF",
    "rating": 4.5,
    "reviewCount": 2,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/sanwara-green-stylish-ethnic-chikankari-with-sequins-kurta-for-men/p/16346884",
    "isPdpResolved": true,
    "image": "/product-images/SKU03.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Regular",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Sanwara Fashions"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 2,
      "rating": 4.5,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 2,
      "summary": "2 customer ratings available for this product with an average rating of 4.5\u2605.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Sojanya in Ethnicwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Cotton, regular fit, mandarin neck, chikankari work, full sleeves and dry-clean-only care ? festive embroidered kurta."
    ],
    "whatWeDontKnow": [
      "No fabric weight or garment measurements",
      "softness, comfort and exact fit cannot be quantified from the listing."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku04",
    "skuId": "SKU04",
    "name": "Men Regular Fit Festive Embroidered Kurta",
    "brand": "Rajnandini",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 1408,
    "originalPrice": 1900,
    "discount": "35% OFF",
    "rating": 4.2,
    "reviewCount": 1,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/kraft-india-men-black-chikankari-cotton-kurta/p/13049127",
    "isPdpResolved": true,
    "image": "/product-images/SKU04.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Regular",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Aditya Global Inc"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 1,
      "rating": 4.2,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 1,
      "summary": "1 customer rating available for this product with an average rating of 4.2\u2605.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Rajnandini in Ethnicwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Cotton, regular fit, mandarin neck, chikankari work, full sleeves and machine wash ? festive embroidered kurta."
    ],
    "whatWeDontKnow": [
      "No garment measurements or fabric weight",
      "the listing does not quantify fit, thickness or fabric blend percentage."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku05",
    "skuId": "SKU05",
    "name": "Men Navy Two-Piece Notch Lapel Formal Suit",
    "brand": "Louis Philippe",
    "category": "Ethnicwear",
    "subCategory": "suit set",
    "price": 3000,
    "originalPrice": 4050,
    "discount": "35% OFF",
    "rating": 3.4,
    "reviewCount": 1,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/club-york-men-grey-full-sleeve-solid-notched-lapel-suit-set-set-of-2/p/16415887",
    "isPdpResolved": true,
    "image": "/product-images/SKU05.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "High-Quality Cotton",
      "fit": "Regular",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "High-Quality Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "York Exports Ltd"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 1,
      "rating": 3.4,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 1,
      "summary": "1 customer rating available for this product with an average rating of 3.4\u2605.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Louis Philippe in Ethnicwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Cotton, regular fit, two-piece set, notch lapel, straight leg, mid-waist trouser and gentle machine wash ? formal suit set."
    ],
    "whatWeDontKnow": [
      "No blazer/trouser garment measurements, fabric weight or size-specific fit dimensions",
      "'high-quality' is not measurable from the listing."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku06",
    "skuId": "SKU06",
    "name": "Men Relaxed Fit Straight Leg Trackpant",
    "brand": "Nykaa Man",
    "category": "Bottomwear",
    "subCategory": "bottom wear",
    "price": 1599,
    "originalPrice": 2158,
    "discount": "35% OFF",
    "rating": 3.1,
    "reviewCount": 1,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/snitch-beige-solid-relaxed-casual-track-pants-for-men/p/20961082",
    "isPdpResolved": true,
    "image": "/product-images/SKU06.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Nylon; durable nylon blend",
      "fit": "Relaxed",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Nylon; durable nylon blend"
        },
        {
          "label": "Fit Descriptor",
          "value": "Relaxed"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Snitch Apparels Private Limited_mp"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 1,
      "rating": 3.1,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 1,
      "summary": "1 customer rating available for this product with an average rating of 3.1\u2605.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Nylon, relaxed fit, drawstring closure, straight leg, mid waist and machine wash ? casual track pant with a relaxed silhouette."
    ],
    "whatWeDontKnow": [
      "No nylon percentage, fabric weight or garment measurements",
      "durability, comfort and flexibility are not quantified."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku07",
    "skuId": "SKU07",
    "name": "Men Textured Full Sleeve Formal Shirt",
    "brand": "Van Heusen",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 1475,
    "originalPrice": 1991,
    "discount": "35% OFF",
    "rating": 4.5,
    "reviewCount": 1,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/louis-philippe-men-purple-slim-fit-textured-full-sleeves-formal-shirt/p/16611347",
    "isPdpResolved": true,
    "image": "/product-images/SKU07.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Slim",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Slim"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Westbury Holdings Private Limited_parent"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 1,
      "rating": 4.5,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 1,
      "summary": "1 customer rating available for this product with an average rating of 4.5\u2605.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Van Heusen in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Cotton, slim fit, textured pattern, full sleeves, collar neck and machine wash ? formal shirt with a clearly stated construction."
    ],
    "whatWeDontKnow": [
      "No garment measurements or fabric weight",
      "'refined sartorial taste' is marketing language rather than a checkable product property."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku08",
    "skuId": "SKU08",
    "name": "Men Solid Slim Fit Classic Formal Shirt",
    "brand": "Louis Philippe",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 1265,
    "originalPrice": 1707,
    "discount": "35% OFF",
    "rating": 3.0,
    "reviewCount": 1,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/van-heusen-men-cream-slim-fit-solid-full-sleeves-formal-shirt/p/16877281",
    "isPdpResolved": true,
    "image": "/product-images/SKU08.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton; high quality cotton",
      "fit": "Slim",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton; high quality cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Slim"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Westbury Holdings Private Limited_parent"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 1,
      "rating": 3.0,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 1,
      "summary": "1 customer rating available for this product with an average rating of 3.0\u2605.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Louis Philippe in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Cotton, slim fit, solid pattern, full sleeves, front pocket and machine wash ? conventional formal shirt construction."
    ],
    "whatWeDontKnow": [
      "No cotton percentage, garment measurements or fabric weight",
      "'high quality' and 'chic' are not measurable listing facts."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku09",
    "skuId": "SKU09",
    "name": "Men Gym & Training Micro Polyester Active T-Shirt",
    "brand": "Puma",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 799,
    "originalPrice": 1078,
    "discount": "20% OFF",
    "rating": 4.0,
    "reviewCount": 9,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/jockey-lightweight-microfiber-solid-round-neck-t-shirt-green/p/16600010",
    "isPdpResolved": true,
    "image": "/product-images/SKU09.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "100% Micro Polyester",
      "fit": "Regular",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "100% Micro Polyester"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Page Industries Ltd_parent"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 9,
      "rating": 4.0,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 9,
      "summary": "9 customer ratings available for this product with an average rating of 4.0\u2605.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Puma in Activewear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "100% micro polyester, regular fit, pull-on closure, half sleeves, gym & training activity and 40\u00b0C gentle-wash instructions ? synthetic active T-shirt",
      "mesh and drying claims are explicitly stated."
    ],
    "whatWeDontKnow": [
      "No actual garment weight, GSM or garment measurements",
      "antimicrobial, drying and cooling performance is claimed but not quantified."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain."
    ]
  },
  {
    "id": "sku10",
    "skuId": "SKU10",
    "name": "Men Black Genuine Leather Belt",
    "brand": "SPYKAR",
    "category": "Bags & Accessories",
    "subCategory": "bags/accessories",
    "price": 520,
    "originalPrice": 702,
    "discount": "20% OFF",
    "rating": 4.4,
    "reviewCount": 1,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/spykar-black-genuine-leather-belt/p/6580269",
    "isPdpResolved": true,
    "image": "/product-images/SKU10.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Genuine Leather",
      "fit": "Not provided",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Genuine Leather"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Spykar Lifestyles Private Limited (bhiwandi)_parent"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 1,
      "rating": 4.4,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 1,
      "summary": "1 customer rating available for this product with an average rating of 4.4\u2605.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for SPYKAR in Bags & Accessories.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Leather, push-pin closure, non-reversible, not water resistant and wipe-clean care ? basic leather belt with clearly stated hardware/care attributes."
    ],
    "whatWeDontKnow": [
      "No belt length/width or leather grade is stated",
      "durability and exact sizing cannot be inferred."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bags & Accessories options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku11",
    "skuId": "SKU11",
    "name": "Men Classic Cotton Half Sleeve Polo",
    "brand": "Peter England",
    "category": "Topwear",
    "subCategory": "Polo shirt (men)",
    "price": 1120,
    "originalPrice": 1512,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/u-s-polo-assn-men-red-cotton-solid-polo-t-shirt/p/5952525",
    "isPdpResolved": true,
    "image": "/product-images/SKU11.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Regular",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Arvind Lifestyle Brands Ltd (mfr: Balu Exports)"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Cotton, collar neck, half sleeves, machine-washable, single-pack - confirms material class and cut."
    ],
    "whatWeDontKnow": [
      "No GSM or flat garment measurements stated - cannot confirm fabric weight or exact size against body."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku12",
    "skuId": "SKU12",
    "name": "Men Blended Mandarin Neck Festive Kurta",
    "brand": "SOJANYA",
    "category": "Ethnicwear",
    "subCategory": "Kurta for men",
    "price": 1599,
    "originalPrice": 2158,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/sojanya-cotton-blend-blue-checked-only-long-kurta/p/2369425",
    "isPdpResolved": true,
    "image": "/product-images/SKU12.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Blended Fabric",
      "fit": "Regular",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Blended Fabric"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Shri Ram Enterprises (mfr: Daulat Ram Om Prakash)"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for SOJANYA in Ethnicwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Blended fabric, mandarin neck, full sleeves, slant pocket, machine-washable - confirms cut and care routine."
    ],
    "whatWeDontKnow": [
      "No fibre percentage, GSM, or garment measurements - cannot confirm actual fabric weight or fit."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku13",
    "skuId": "SKU13",
    "name": "Men Cotton Chikankari Long Kurta",
    "brand": "KISAH",
    "category": "Ethnicwear",
    "subCategory": "Kurta for women",
    "price": 1680,
    "originalPrice": 2268,
    "discount": "35% OFF",
    "rating": 3.1,
    "reviewCount": 113,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/miravan-blue-cotton-embroidered-kurta-with-palazzo/p/26852992",
    "isPdpResolved": true,
    "image": "/product-images/SKU13.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Straight",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Straight"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Tirupati Alloys"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 113,
      "rating": 3.1,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 113,
      "summary": "113 customer ratings available for this product with an average rating of 3.1\u2605.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "HIGH",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Cotton, V-neck, three-quarter sleeves, wide-leg palazzo - confirms silhouette and neckline."
    ],
    "whatWeDontKnow": [
      "No fibre %, GSM, or measurements - cannot confirm fabric weight or actual garment fit."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain."
    ]
  },
  {
    "id": "sku14",
    "skuId": "SKU14", \"availability_status\": \"OUT_OF_STOCK\", "availability_status": "OUT_OF_STOCK",
    "name": "Men Cotton Blend Tapered Salwar Suit Set",
    "brand": "Sanwara",
    "category": "Ethnicwear",
    "subCategory": "Suit set for women",
    "price": 799,
    "originalPrice": 1078,
    "discount": "20% OFF",
    "rating": 3.3,
    "reviewCount": 22,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/rajnandini-green-cotton-blend-printed-ready-to-wear-kurta-with-salwar-and-dupatta/p/26184406",
    "isPdpResolved": true,
    "image": "/product-images/SKU14.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton Blend",
      "fit": "Regular",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton Blend"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Rajnandini Fashion India Ltd"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 22,
      "rating": 3.3,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 22,
      "summary": "22 customer ratings available for this product with an average rating of 3.3\u2605.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Ethnicwear.",
      "skuEvidence": "MEDIUM",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Cotton blend, round neck, tapered-leg salwar bottoms, hand-wash only - confirms cut and a real care constraint."
    ],
    "whatWeDontKnow": [
      "No GSM or flat measurements - cannot confirm fabric weight or exact size."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain."
    ]
  },
  {
    "id": "sku15",
    "skuId": "SKU15",
    "name": "Men 100% Cotton Non-Stretch Casual Trouser",
    "brand": "Arrow",
    "category": "Bottomwear",
    "subCategory": "Bottom wear for men",
    "price": 2999,
    "originalPrice": 4048,
    "discount": "35% OFF",
    "rating": 3.9,
    "reviewCount": 14,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/bene-kleed-men-cream-pure-cotton-rigid-denim-jeans/p/24997127",
    "isPdpResolved": true,
    "image": "/product-images/SKU15.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Loose",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Loose"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Shakti Brandz Pvt Ltd"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 14,
      "rating": 3.9,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 14,
      "summary": "14 customer ratings available for this product with an average rating of 3.9\u2605.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Bottomwear.",
      "skuEvidence": "MEDIUM",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "100% cotton, non-stretch, wide-leg, machine washable - confirms fabric type and fit category."
    ],
    "whatWeDontKnow": [
      "No denim weight/GSM or flat measurements - cannot tell how heavy/stiff the denim is or exact waist/inseam."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing."
    ]
  },
  {
    "id": "sku16",
    "skuId": "SKU16",
    "name": "Women Stretch Denim High-Rise Wide-Leg Jeans",
    "brand": "Rare Rabbit",
    "category": "Bottomwear",
    "subCategory": "Bottom wear for women",
    "price": 1155,
    "originalPrice": 1559,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/vbeauti-womens-washed-grey-wide-leg-streachable-high-rise-jeans/p/28439251",
    "isPdpResolved": true,
    "image": "/product-images/SKU16.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Denim",
      "fit": "Wide",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Denim"
        },
        {
          "label": "Fit Descriptor",
          "value": "Wide"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Smvd Enterprises"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Bottomwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Stretch denim, high-rise wide-leg, and an unusually detailed 7-step wash/care instruction - confirms fit category and care routine precisely."
    ],
    "whatWeDontKnow": [
      "No GSM or flat garment measurements - cannot confirm denim weight or exact waist/inseam size."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku17",
    "skuId": "SKU17",
    "name": "Men Textured Slim Fit Formal Shirt",
    "brand": "Snitch",
    "category": "Topwear",
    "subCategory": "Formal shirt for women",
    "price": 705,
    "originalPrice": 951,
    "discount": "20% OFF",
    "rating": 4.4,
    "reviewCount": 10,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/buynewtrend-yellow-women-striped-wrap-style-cotton-shirt/p/25737100",
    "isPdpResolved": true,
    "image": "/product-images/SKU17.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Regular",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Dimpy Garments"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 10,
      "rating": 4.4,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 10,
      "summary": "10 customer ratings available for this product with an average rating of 4.4\u2605.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Snitch in Topwear.",
      "skuEvidence": "MEDIUM",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "HIGH",
      "summary": "Strong match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Cotton, striped pattern, collar neck, cap sleeves, gentle wash - all from the spec table alone."
    ],
    "whatWeDontKnow": [
      "No GSM or measurements, and the free-text description adds ZERO new checkable facts beyond the spec table - it's a single unbroken run of ~20 adjectives with no numbers."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing."
    ]
  },
  {
    "id": "sku18",
    "skuId": "SKU18", \"availability_status\": \"OUT_OF_STOCK\", "availability_status": "OUT_OF_STOCK",
    "name": "Men Heavyweight II Sports & Fitness Active Tight",
    "brand": "Columbia",
    "category": "Activewear",
    "subCategory": "Activewear for men",
    "price": 4499,
    "originalPrice": 6073,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/columbia-men-black-na-heavyweight-ii-tight/p/9044405",
    "isPdpResolved": true,
    "image": "/product-images/SKU18.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Polyester",
      "fit": "Regular",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Polyester"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Chogori India Retail Ltd"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Columbia in Activewear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Polyester, skinny-leg tights, machine washable, built for Sports & Fitness activity - confirms material class and cut."
    ],
    "whatWeDontKnow": [
      "The product NAME invokes Columbia's 'Omni-Heat Reflective' thermal technology, but nothing in the actual listing explains what that means, what GSM the fabric is, or how warm it performs - the tech claim is completely unsubstantiated in the copy."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku19",
    "skuId": "SKU19",
    "name": "Women Cotton Spandex Halter Neck Athleisure Top",
    "brand": "Kica",
    "category": "Activewear",
    "subCategory": "Activewear for women",
    "price": 1258,
    "originalPrice": 1698,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/kica-float-green-jumpsuit-with-pockets/p/3234152",
    "isPdpResolved": true,
    "image": "/product-images/SKU19.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton-95%, Spandex-5%",
      "fit": "\"Stretchy without being saggy\" (informal, no structured Fit field)",
      "care": "Stated on listing",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton-95%, Spandex-5%"
        },
        {
          "label": "Fit Descriptor",
          "value": "\"Stretchy without being saggy\" (informal, no structured Fit field)"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Fashion Ltd (house brand Kica)"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Kica in Activewear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "95% cotton / 5% spandex is an exact, checkable fibre blend (rare on this platform)",
      "halter neck, sleeveless, cold hand-wash only, two pockets, back-neck button closure."
    ],
    "whatWeDontKnow": [
      "No GSM or flat body measurements - still cannot confirm fabric weight or exact fit against the body."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku20",
    "skuId": "SKU20",
    "name": "Men Structured Everyday Utility Bag",
    "brand": "Harissons",
    "category": "Bags & Accessories",
    "subCategory": "Bags/accessories for men",
    "price": 1999,
    "originalPrice": 2698,
    "discount": "35% OFF",
    "rating": 4.3,
    "reviewCount": 7,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/harissons-unisex-dexter-maroon-backpack/p/15717995",
    "isPdpResolved": true,
    "image": "/product-images/SKU20.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Polyester",
      "fit": "Not provided",
      "care": "Stated on listing",
      "measurements": "(H x L x W) 50 x 39 x 6 cm",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Polyester"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "(H x L x W) 50 x 39 x 6 cm"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Haridas Somchand And Sons (mfr: Harissons Bags Pvt Ltd)"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 7,
      "rating": 4.3,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 7,
      "summary": "7 customer ratings available for this product with an average rating of 4.3\u2605.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Harissons in Bags & Accessories.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "50x39x6cm, fits laptops up to 14 inches, water resistant, 1-year warranty, external USB port and audio-jack routing - all genuinely checkable claims a buyer could hold the seller to on arrival."
    ],
    "whatWeDontKnow": [
      "'Meticulously built to withstand the test of time' and 'endure various forms of abuse' are not backed by any durability rating, denier count, or load-test figure in the listing."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bags & Accessories options with verified attributes"
      ],
      "notSuitableFor": [
        "High performance heavy sports"
      ]
    },
    "regretCheck": []
  },
  {
    "id": "sku21",
    "skuId": "SKU21",
    "name": "Women Structured Daily Tote Handbag",
    "brand": "Miraggio",
    "category": "Bags & Accessories",
    "subCategory": "Bags/accessories for women",
    "price": 896,
    "originalPrice": 1209,
    "discount": "35% OFF",
    "rating": 4.1,
    "reviewCount": 104,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/yelloe-blue-heart-shaped-sling-bag/p/19029743",
    "isPdpResolved": true,
    "image": "/product-images/SKU21.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Table says \"Cotton\"; description says \"Premium synthetic leather\" (contradiction)",
      "fit": "Not provided",
      "care": "Stated on listing",
      "measurements": "(L x B x H): 15.2 x 5 x 13.2 cm",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Table says \"Cotton\"; description says \"Premium synthetic leather\" (contradiction)"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Stated on listing"
        },
        {
          "label": "Garment Measurements",
          "value": "(L x B x H): 15.2 x 5 x 13.2 cm"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Yelloe Lifestyle Pvt Ltd"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 104,
      "rating": 4.1,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 104,
      "summary": "104 customer ratings available for this product with an average rating of 4.1\u2605.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "HIGH",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "15.2 x 5 x 13.2cm, zip closure, detachable strap, 3-month warranty - real checkable dimensions and a stated warranty term."
    ],
    "whatWeDontKnow": [
      "The spec table says the material is 'Cotton'",
      "the free-text description says 'Premium synthetic leather.' The listing contradicts itself, so the tool cannot tell a buyer what the bag is actually made of."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bags & Accessories options with verified attributes"
      ],
      "notSuitableFor": [
        "High performance heavy sports"
      ]
    },
    "regretCheck": []
  },
  {
    "id": "sku22",
    "skuId": "SKU22",
    "name": "Men Sky Polo T-shirt",
    "brand": "Cantabil",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 615,
    "originalPrice": 830,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/cantabil-men-sky-polo-t-shirt/p/10915005",
    "isPdpResolved": true,
    "image": "/product-images/SKU22.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Cantabil",
      "product: Men Sky Polo T-shirt",
      "listed price: ?615."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku23",
    "skuId": "SKU23",
    "name": "Men's Rust Polo T-Shirt with Collar Tipping and Branding on Sleeve",
    "brand": "Louis Philippe",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 945,
    "originalPrice": 1275,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/louis-philippe-men-maroon-solid-polo-neck-t-shirt/p/12459727",
    "isPdpResolved": true,
    "image": "/product-images/SKU23.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Louis Philippe in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Louis Philippe",
      "product: Men's Rust Polo T-Shirt with Collar Tipping and Branding on Sleeve",
      "listed price: ?945."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku24",
    "skuId": "SKU24",
    "name": "Mens Onyx Black Cuboid-Stripe Polo T-Shirt",
    "brand": "CAHOOT",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 731,
    "originalPrice": 986,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/campus-sutra-mens-onyx-black-cuboid-stripe-polo-t-shirt/p/19083242",
    "isPdpResolved": true,
    "image": "/product-images/SKU24.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: CAHOOT",
      "product: Mens Onyx Black Cuboid-Stripe Polo T-Shirt",
      "listed price: ?731."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku25",
    "skuId": "SKU25",
    "name": "Brown Mens Pure Cotton Slim Fit Polo T-Shirt",
    "brand": "U.S. POLO ASSN.",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 1170,
    "originalPrice": 1579,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/u-s-polo-assn-brown-mens-pure-cotton-slim-fit-polo-shirt/p/21390358",
    "isPdpResolved": true,
    "image": "/product-images/SKU25.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Slim",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Slim"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for U.S. POLO ASSN. in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Brand: U.S. POLO ASSN.",
      "product: Brown Mens Pure Cotton Slim Fit Polo T-Shirt",
      "listed price: ?1170."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku26",
    "skuId": "SKU26",
    "name": "Red Cotton Half Sleeves Collar Neck Polo T-Shirt",
    "brand": "Tommy Hilfiger",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 2871,
    "originalPrice": 3875,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/tommy-hilfiger-red-cotton-half-sleeves-collar-neck-polo-t-shirt/p/24896157",
    "isPdpResolved": true,
    "image": "/product-images/SKU26.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Tommy Hilfiger in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Brand: Tommy Hilfiger",
      "product: Red Cotton Half Sleeves Collar Neck Polo T-Shirt",
      "listed price: ?2871."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku27",
    "skuId": "SKU27",
    "name": "Men's Brown Polo T-Shirt",
    "brand": "LEOTUDE",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 799,
    "originalPrice": 1078,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/topwear/polo-t-shirts/c/6827",
    "isPdpResolved": false,
    "image": "/product-images/SKU27.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: LEOTUDE",
      "product: Men's Brown Polo T-Shirt",
      "listed price: ?799."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku28",
    "skuId": "SKU28",
    "name": "Multi-Color Softstyle Adult Pique Polo T-shirt (Pack of 3)",
    "brand": "Gildan",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 882,
    "originalPrice": 1190,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/topwear/polo-t-shirts/c/6827",
    "isPdpResolved": false,
    "image": "/product-images/SKU28.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Gildan",
      "product: Multi-Color Softstyle Adult Pique Polo T-shirt (Pack of 3)",
      "listed price: ?882."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku29",
    "skuId": "SKU29",
    "name": "Men Colorblock Muscle Fit Polo T-Shirt White",
    "brand": "U.S. Polo Assn. Denim Co.",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 1320,
    "originalPrice": 1782,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/peter-england-men-off-white-plain-slim-fit-polo-t-shirt/p/19996777",
    "isPdpResolved": true,
    "image": "/product-images/SKU29.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for U.S. Polo Assn. Denim Co. in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: U.S. Polo Assn. Denim Co.",
      "product: Men Colorblock Muscle Fit Polo T-Shirt White",
      "listed price: ?1320."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku30",
    "skuId": "SKU30",
    "name": "Men Green Polo T-shirt",
    "brand": "Cantabil",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 615,
    "originalPrice": 830,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/campus-sutra-men-maroon-solid-polo-t-shirt/p/10914982",
    "isPdpResolved": true,
    "image": "/product-images/SKU30.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Cantabil",
      "product: Men Green Polo T-shirt",
      "listed price: ?615."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku31",
    "skuId": "SKU31",
    "name": "Men Slim Fit Striped Polo Collar T-Shirt",
    "brand": "The Indian Garage Co",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 546,
    "originalPrice": 737,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/the-indian-garage-co-men-slim-fit-striped-polo-collar-t-shirt/p/20056029",
    "isPdpResolved": true,
    "image": "/product-images/SKU31.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Slim",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Slim"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: The Indian Garage Co",
      "product: Men Slim Fit Striped Polo Collar T-Shirt",
      "listed price: ?546."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku32",
    "skuId": "SKU32",
    "name": "Teal Colorblock Regular Fit Polo T-Shirt",
    "brand": "RIGO",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 675,
    "originalPrice": 911,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/ether-women-blue-solid-polo-t-shirt/p/21020274",
    "isPdpResolved": true,
    "image": "/product-images/SKU32.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Regular",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: RIGO",
      "product: Teal Colorblock Regular Fit Polo T-Shirt",
      "listed price: ?675."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku33",
    "skuId": "SKU33",
    "name": "Camelia Brown Men Textured Polo T-Shirt",
    "brand": "The Souled Store",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 1549,
    "originalPrice": 2091,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/rare-rabbit-men-white-embroidered-polo-t-shirt/p/23521278",
    "isPdpResolved": true,
    "image": "/product-images/SKU33.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: The Souled Store",
      "product: Camelia Brown Men Textured Polo T-Shirt",
      "listed price: ?1549."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku34",
    "skuId": "SKU34",
    "name": "Brown Solid Collar Neck Slim Polo T-Shirt",
    "brand": "WROGN",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 1656,
    "originalPrice": 2235,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/topwear/polo-t-shirts/c/6827",
    "isPdpResolved": false,
    "image": "/product-images/SKU34.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: WROGN",
      "product: Brown Solid Collar Neck Slim Polo T-Shirt",
      "listed price: ?1656."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku35",
    "skuId": "SKU35",
    "name": "Textured Brown Polo T-Shirt",
    "brand": "max",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 352,
    "originalPrice": 475,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/topwear/polo-t-shirts/c/6827",
    "isPdpResolved": false,
    "image": "/product-images/SKU35.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: max",
      "product: Textured Brown Polo T-Shirt",
      "listed price: ?352."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku36",
    "skuId": "SKU36",
    "name": "Mens Logo Black Polo T-Shirt",
    "brand": "Puma",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 850,
    "originalPrice": 1147,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/puma-essentials-logo-mens-black-polo-t-shirt/p/17093577",
    "isPdpResolved": true,
    "image": "/product-images/SKU36.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Puma in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Puma",
      "product: Mens Logo Black Polo T-Shirt",
      "listed price: ?850."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku37",
    "skuId": "SKU37",
    "name": "Men Brown Regular Fit Cotton Rugby Polo T-Shirt",
    "brand": "H&M",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 2299,
    "originalPrice": 3103,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/topwear/polo-t-shirts/c/6827",
    "isPdpResolved": false,
    "image": "/product-images/SKU37.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Regular",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: H&M",
      "product: Men Brown Regular Fit Cotton Rugby Polo T-Shirt",
      "listed price: ?2299."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku38",
    "skuId": "SKU38",
    "name": "Carmelon Light Green Plain Regular Fit Polo T-Shirt",
    "brand": "Rare Rabbit",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 1665,
    "originalPrice": 2247,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/rare-rabbit-carmelon-light-green-plain-regular-fit-polo-t-shirt/p/19818340",
    "isPdpResolved": true,
    "image": "/product-images/SKU38.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Regular",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Rare Rabbit",
      "product: Carmelon Light Green Plain Regular Fit Polo T-Shirt",
      "listed price: ?1665."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku39",
    "skuId": "SKU39",
    "name": "Men Pink Embedded Textured Flat Knit Premium Polo T-Shirt",
    "brand": "GRITSTONES",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 990,
    "originalPrice": 1336,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/topwear/polo-t-shirts/c/6827",
    "isPdpResolved": false,
    "image": "/product-images/SKU39.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: GRITSTONES",
      "product: Men Pink Embedded Textured Flat Knit Premium Polo T-Shirt",
      "listed price: ?990."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku40",
    "skuId": "SKU40",
    "name": "Anti Stain & Anti Odor Cotton Polo with No - Curl Collar - GLA001 Forest Green",
    "brand": "GLOOT",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 390,
    "originalPrice": 526,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/gloot-men-s-cotton-polo-t-shirt-no-curl-collar-forest-green/p/5977753",
    "isPdpResolved": true,
    "image": "/product-images/SKU40.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: GLOOT",
      "product: Anti Stain & Anti Odor Cotton Polo with No - Curl Collar - GLA001 Forest Green",
      "listed price: ?390."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku41",
    "skuId": "SKU41",
    "name": "Black Solid/Plain Regular Fit Polo T-Shirt",
    "brand": "Crocodile",
    "category": "Topwear",
    "subCategory": "polo shirt",
    "price": 699,
    "originalPrice": 943,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/crocodile-black-solid-plain-regular-fit-polo-t-shirt/p/19540383",
    "isPdpResolved": true,
    "image": "/product-images/SKU41.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Regular",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Crocodile",
      "product: Black Solid/Plain Regular Fit Polo T-Shirt",
      "listed price: ?699."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku42",
    "skuId": "SKU42",
    "name": "Men Maroon & Black Textured Silk Blend Jacquard Kurta with Abstract Print",
    "brand": "KISAH",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 2000,
    "originalPrice": 2700,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/kisah-men-maroon-kurta/p/13012935",
    "isPdpResolved": true,
    "image": "/product-images/SKU42.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Silk",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Silk"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: KISAH",
      "product: Men Maroon & Black Textured Silk Blend Jacquard Kurta with Abstract Print",
      "listed price: ?2000."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku43",
    "skuId": "SKU43",
    "name": "Mens Yellow Embellished Kurta",
    "brand": "KISAH",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 3499,
    "originalPrice": 4723,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/ethnicwear/kurtas/c/6842",
    "isPdpResolved": false,
    "image": "/product-images/SKU43.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: KISAH",
      "product: Mens Yellow Embellished Kurta",
      "listed price: ?3499."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku44",
    "skuId": "SKU44",
    "name": "Men Lavender Embroidered Straight Kurta",
    "brand": "ETHNIC BAY",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 1176,
    "originalPrice": 1587,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/ethnic-bay-men-lavender-viscose-rayon-embroidered-straight-kurta/p/24091350",
    "isPdpResolved": true,
    "image": "/product-images/SKU44.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: ETHNIC BAY",
      "product: Men Lavender Embroidered Straight Kurta",
      "listed price: ?1176."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku45",
    "skuId": "SKU45",
    "name": "Maroon Embroidered Regular Kurta",
    "brand": "Vastramay",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 4899,
    "originalPrice": 6613,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/vastramay-maroon-embroidered-regular-kurta/p/25472646",
    "isPdpResolved": true,
    "image": "/product-images/SKU45.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Vastramay",
      "product: Maroon Embroidered Regular Kurta",
      "listed price: ?4899."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku46",
    "skuId": "SKU46",
    "name": "Men Mid Navy Blue Silk Blend Solid Textured Kurta",
    "brand": "KISAH",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 1999,
    "originalPrice": 2698,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/ethnicwear/kurtas/c/6842",
    "isPdpResolved": false,
    "image": "/product-images/SKU46.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Silk",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Silk"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: KISAH",
      "product: Men Mid Navy Blue Silk Blend Solid Textured Kurta",
      "listed price: ?1999."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku47",
    "skuId": "SKU47",
    "name": "White Embroidered Full Sleeves Kurta",
    "brand": "Jompers",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 900,
    "originalPrice": 1215,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/ethnicwear/kurtas/c/6842",
    "isPdpResolved": false,
    "image": "/product-images/SKU47.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Jompers",
      "product: White Embroidered Full Sleeves Kurta",
      "listed price: ?900."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku48",
    "skuId": "SKU48",
    "name": "Purple Dreams Kurta for Men",
    "brand": "Diwas by Manyavar",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 1899,
    "originalPrice": 2563,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/ethnicwear/kurtas/c/6842",
    "isPdpResolved": false,
    "image": "/product-images/SKU48.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Diwas by Manyavar",
      "product: Purple Dreams Kurta for Men",
      "listed price: ?1899."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku49",
    "skuId": "SKU49",
    "name": "Printed Royal Motifs Cotton Blend Beige Kurta",
    "brand": "Kraft India",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 1575,
    "originalPrice": 2126,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/ethnicwear/kurtas/c/6842",
    "isPdpResolved": false,
    "image": "/product-images/SKU49.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Ethnicwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Brand: Kraft India",
      "product: Printed Royal Motifs Cotton Blend Beige Kurta",
      "listed price: ?1575."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku50",
    "skuId": "SKU50",
    "name": "Men Black Cotton Silk Printed Kurta",
    "brand": "KISAH",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 1999,
    "originalPrice": 2698,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/kisah-black-abstract-kurta/p/1340599",
    "isPdpResolved": true,
    "image": "/product-images/SKU50.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: KISAH",
      "product: Men Black Cotton Silk Printed Kurta",
      "listed price: ?1999."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku51",
    "skuId": "SKU51",
    "name": "Green Cotton Ikat Slim Fit Long Kurta",
    "brand": "Fabindia",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 3299,
    "originalPrice": 4453,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/fabindia-green-cotton-ikat-slim-fit-long-kurta/p/14735578",
    "isPdpResolved": true,
    "image": "/product-images/SKU51.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Slim",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Slim"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Fabindia",
      "product: Green Cotton Ikat Slim Fit Long Kurta",
      "listed price: ?3299."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku52",
    "skuId": "SKU52",
    "name": "Men Warm White Linen Solid Kurta",
    "brand": "Manyavar",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 4999,
    "originalPrice": 6748,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/ethnicwear/kurtas/c/6842",
    "isPdpResolved": false,
    "image": "/product-images/SKU52.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Linen",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Linen"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Manyavar",
      "product: Men Warm White Linen Solid Kurta",
      "listed price: ?4999."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku53",
    "skuId": "SKU53",
    "name": "Cotton Silk Embroidered Festive Cream Kurta",
    "brand": "KRAFT INDIA LUXE",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 4736,
    "originalPrice": 6393,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/kraft-india-luxe-cotton-silk-embroidered-festive-cream-kurta/p/22792297",
    "isPdpResolved": true,
    "image": "/product-images/SKU53.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Ethnicwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Brand: KRAFT INDIA LUXE",
      "product: Cotton Silk Embroidered Festive Cream Kurta",
      "listed price: ?4736."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku54",
    "skuId": "SKU54",
    "name": "Mens Dark Green Art Silk Embroidered Kurta",
    "brand": "Gahan",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 766,
    "originalPrice": 1034,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/gahan-mens-dark-green-art-silk-embroidered-kurta-with-pyjama/p/25043544",
    "isPdpResolved": true,
    "image": "/product-images/SKU54.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Silk",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Silk"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Gahan",
      "product: Mens Dark Green Art Silk Embroidered Kurta",
      "listed price: ?766."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku55",
    "skuId": "SKU55",
    "name": "Men Beige Floral Embroidered Work Armani Silk Kurta",
    "brand": "Vedant Vastram",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 2399,
    "originalPrice": 3238,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/ethnicwear/kurtas/c/6842",
    "isPdpResolved": false,
    "image": "/product-images/SKU55.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Silk",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Silk"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Vedant Vastram",
      "product: Men Beige Floral Embroidered Work Armani Silk Kurta",
      "listed price: ?2399."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku56",
    "skuId": "SKU56",
    "name": "Beige Men\u0092s Linen Short Kurta",
    "brand": "Bonjour",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 981,
    "originalPrice": 1324,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/ethnicwear/kurtas/c/6842",
    "isPdpResolved": false,
    "image": "/product-images/SKU56.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Linen",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Linen"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Bonjour",
      "product: Beige Men\u0092s Linen Short Kurta",
      "listed price: ?981."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku57",
    "skuId": "SKU57",
    "name": "White Solid/Plain Regular Fit Kurta",
    "brand": "Sanwara",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 1699,
    "originalPrice": 2293,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/ethnicwear/kurtas/c/6842",
    "isPdpResolved": false,
    "image": "/product-images/SKU57.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Regular",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Ethnicwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Sanwara",
      "product: White Solid/Plain Regular Fit Kurta",
      "listed price: ?1699."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku58",
    "skuId": "SKU58",
    "name": "Men Black Printed Cotton Blend Kurta with Kantha Print",
    "brand": "KISAH",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 2000,
    "originalPrice": 2700,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/kisah-black-abstract-kurta/p/1340599",
    "isPdpResolved": true,
    "image": "/product-images/SKU58.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: KISAH",
      "product: Men Black Printed Cotton Blend Kurta with Kantha Print",
      "listed price: ?2000."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku59",
    "skuId": "SKU59",
    "name": "Mens Full Sleeves Chikankari Kurta",
    "brand": "TRYBUY.IN",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 2000,
    "originalPrice": 2700,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/ethnicwear/kurtas/c/6842",
    "isPdpResolved": false,
    "image": "/product-images/SKU59.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: TRYBUY.IN",
      "product: Mens Full Sleeves Chikankari Kurta",
      "listed price: ?2000."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku60",
    "skuId": "SKU60",
    "name": "Mens Black Denim Casual Short Kurta",
    "brand": "KUONS AVENUE",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 1300,
    "originalPrice": 1755,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/kuons-avenue-mens-black-denim-casual-short-kurta/p/18696485",
    "isPdpResolved": true,
    "image": "/product-images/SKU60.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: KUONS AVENUE",
      "product: Mens Black Denim Casual Short Kurta",
      "listed price: ?1300."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku61",
    "skuId": "SKU61",
    "name": "Cotton Printed Blue Ethnicwear Men Kurta",
    "brand": "TABARD",
    "category": "Ethnicwear",
    "subCategory": "kurta",
    "price": 1200,
    "originalPrice": 1620,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/tabard-cotton-printed-blue-ethnicwear-men-kurta/p/13159061",
    "isPdpResolved": true,
    "image": "/product-images/SKU61.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: TABARD",
      "product: Cotton Printed Blue Ethnicwear Men Kurta",
      "listed price: ?1200."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Ethnicwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku62",
    "skuId": "SKU62",
    "name": "Navy Blue Solid Slim Fit Cotton Shirt",
    "brand": "Calvin Klein",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 6999,
    "originalPrice": 9448,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/calvin-klein-navy-blue-solid-slim-fit-cotton-shirt/p/21971735",
    "isPdpResolved": true,
    "image": "/product-images/SKU62.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Slim",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Slim"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Calvin Klein",
      "product: Navy Blue Solid Slim Fit Cotton Shirt",
      "listed price: ?6999."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku63",
    "skuId": "SKU63",
    "name": "Men Blue Regular Fit Oxford Shirt",
    "brand": "H&M",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 1799,
    "originalPrice": 2428,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/h-m-men-blue-regular-fit-oxford-shirt/p/24304366",
    "isPdpResolved": true,
    "image": "/product-images/SKU63.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Regular",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: H&M",
      "product: Men Blue Regular Fit Oxford Shirt",
      "listed price: ?1799."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku64",
    "skuId": "SKU64",
    "name": "Mens Blue Solid Easy to Iron Cotton Slim fit Formal Shirt",
    "brand": "Louis Philippe",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 1475,
    "originalPrice": 1991,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/louis-philippe-men-blue-slim-fit-solid-full-sleeves-formal-shirt/p/16821348",
    "isPdpResolved": true,
    "image": "/product-images/SKU64.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Slim",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Slim"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Louis Philippe in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Brand: Louis Philippe",
      "product: Mens Blue Solid Easy to Iron Cotton Slim fit Formal Shirt",
      "listed price: ?1475."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku65",
    "skuId": "SKU65",
    "name": "White Men's Pure Cotton Tailored Fit Shirt",
    "brand": "U.S. POLO ASSN.",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 1728,
    "originalPrice": 2332,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/u-s-polo-assn-white-men-s-pure-cotton-tailored-fit-shirt/p/20178559",
    "isPdpResolved": true,
    "image": "/product-images/SKU65.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for U.S. POLO ASSN. in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Brand: U.S. POLO ASSN.",
      "product: White Men's Pure Cotton Tailored Fit Shirt",
      "listed price: ?1728."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku66",
    "skuId": "SKU66",
    "name": "Linux Light Beige Solid Shirt",
    "brand": "Rare Rabbit",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 1950,
    "originalPrice": 2632,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/rare-rabbit-linux-light-beige-solid-shirt/p/13029492",
    "isPdpResolved": true,
    "image": "/product-images/SKU66.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Rare Rabbit",
      "product: Linux Light Beige Solid Shirt",
      "listed price: ?1950."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku67",
    "skuId": "SKU67",
    "name": "Holand Dusky Purple Plain Regular Fit Shirt",
    "brand": "Rare Rabbit",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 1976,
    "originalPrice": 2667,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/topwear/formal-shirts/c/6828",
    "isPdpResolved": false,
    "image": "/product-images/SKU67.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Regular",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Rare Rabbit",
      "product: Holand Dusky Purple Plain Regular Fit Shirt",
      "listed price: ?1976."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku68",
    "skuId": "SKU68",
    "name": "Mens Vertical Striped Manhattan Slim Fit Velocity Shirt",
    "brand": "Arrow",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 1260,
    "originalPrice": 1701,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/arrow-mens-vertical-striped-manhattan-slim-fit-velocity-shirt/p/19925750",
    "isPdpResolved": true,
    "image": "/product-images/SKU68.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Slim",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Slim"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Arrow",
      "product: Mens Vertical Striped Manhattan Slim Fit Velocity Shirt",
      "listed price: ?1260."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku69",
    "skuId": "SKU69",
    "name": "Grey Cotton Blend Full Sleeves Cotton Blend Slim Fit Stripes Shirt",
    "brand": "Raymond",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 1196,
    "originalPrice": 1614,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/topwear/formal-shirts/c/6828",
    "isPdpResolved": false,
    "image": "/product-images/SKU69.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Slim",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Slim"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Raymond",
      "product: Grey Cotton Blend Full Sleeves Cotton Blend Slim Fit Stripes Shirt",
      "listed price: ?1196."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku70",
    "skuId": "SKU70",
    "name": "White Manhattan Slim Fit Cotton Textured Shirt",
    "brand": "Arrow",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 1380,
    "originalPrice": 1863,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/topwear/formal-shirts/c/6828",
    "isPdpResolved": false,
    "image": "/product-images/SKU70.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Slim",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Slim"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Brand: Arrow",
      "product: White Manhattan Slim Fit Cotton Textured Shirt",
      "listed price: ?1380."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku71",
    "skuId": "SKU71",
    "name": "Men Black Regular Fit Stripe Full Sleeves Formal Shirt",
    "brand": "Van Heusen",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 2581,
    "originalPrice": 3484,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/topwear/formal-shirts/c/6828",
    "isPdpResolved": false,
    "image": "/product-images/SKU71.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Regular",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Van Heusen in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Van Heusen",
      "product: Men Black Regular Fit Stripe Full Sleeves Formal Shirt",
      "listed price: ?2581."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku72",
    "skuId": "SKU72",
    "name": "Blue Cotton Full Sleeves Shirt",
    "brand": "Arrow",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 1035,
    "originalPrice": 1397,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/topwear/formal-shirts/c/6828",
    "isPdpResolved": false,
    "image": "/product-images/SKU72.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Brand: Arrow",
      "product: Blue Cotton Full Sleeves Shirt",
      "listed price: ?1035."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku73",
    "skuId": "SKU73",
    "name": "Mens Vertical Striped Manhattan Slim Fit Shirt",
    "brand": "Arrow Newyork",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 2275,
    "originalPrice": 3071,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/arrow-newyork-mens-vertical-striped-manhattan-slim-fit-shirt/p/23460271",
    "isPdpResolved": true,
    "image": "/product-images/SKU73.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Slim",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Slim"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Arrow Newyork",
      "product: Mens Vertical Striped Manhattan Slim Fit Shirt",
      "listed price: ?2275."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku74",
    "skuId": "SKU74",
    "name": "Men Beige Stripes Formal Shirt",
    "brand": "Greenfibre",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 984,
    "originalPrice": 1328,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/greenfibre-men-beige-stripes-formal-shirt/p/20160363",
    "isPdpResolved": true,
    "image": "/product-images/SKU74.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Greenfibre",
      "product: Men Beige Stripes Formal Shirt",
      "listed price: ?984."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku75",
    "skuId": "SKU75",
    "name": "Black Striped Regular Fit Hemp Shirt",
    "brand": "Tommy Hilfiger",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 3685,
    "originalPrice": 4974,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/topwear/formal-shirts/c/6828",
    "isPdpResolved": false,
    "image": "/product-images/SKU75.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Regular",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Tommy Hilfiger in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Tommy Hilfiger",
      "product: Black Striped Regular Fit Hemp Shirt",
      "listed price: ?3685."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku76",
    "skuId": "SKU76",
    "name": "Men Black Stripe Full Sleeves Formal Shirt",
    "brand": "Allen Solly",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 2224,
    "originalPrice": 3002,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/topwear/formal-shirts/c/6828",
    "isPdpResolved": false,
    "image": "/product-images/SKU76.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Allen Solly",
      "product: Men Black Stripe Full Sleeves Formal Shirt",
      "listed price: ?2224."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku77",
    "skuId": "SKU77",
    "name": "Men\u0092s Slim Fit Solid Cutaway Collar Formal Shirt",
    "brand": "The Indian Garage Co",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 741,
    "originalPrice": 1000,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/topwear/formal-shirts/c/6828",
    "isPdpResolved": false,
    "image": "/product-images/SKU77.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Slim",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Slim"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: The Indian Garage Co",
      "product: Men\u0092s Slim Fit Solid Cutaway Collar Formal Shirt",
      "listed price: ?741."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku78",
    "skuId": "SKU78",
    "name": "Green Stripes Regular Fit Shirt",
    "brand": "Van Heusen",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 1512,
    "originalPrice": 2041,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/topwear/formal-shirts/c/6828",
    "isPdpResolved": false,
    "image": "/product-images/SKU78.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Regular",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Van Heusen in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Van Heusen",
      "product: Green Stripes Regular Fit Shirt",
      "listed price: ?1512."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku79",
    "skuId": "SKU79",
    "name": "Maroon Regular Fit Full Sleeves Formal Shirt",
    "brand": "Peter England",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 1599,
    "originalPrice": 2158,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/peter-england-men-maroon-regular-fit-full-sleeves-formal-shirt/p/24073007",
    "isPdpResolved": true,
    "image": "/product-images/SKU79.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Regular",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Peter England",
      "product: Maroon Regular Fit Full Sleeves Formal Shirt",
      "listed price: ?1599."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku80",
    "skuId": "SKU80",
    "name": "Men Liberty Classic Fit Solid Shirt",
    "brand": "Arrow",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 1215,
    "originalPrice": 1640,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/topwear/formal-shirts/c/6828",
    "isPdpResolved": false,
    "image": "/product-images/SKU80.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Arrow",
      "product: Men Liberty Classic Fit Solid Shirt",
      "listed price: ?1215."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku81",
    "skuId": "SKU81",
    "name": "Men Grey Slim Fit Solid Flat Front Formal Trousers",
    "brand": "Louis Philippe",
    "category": "Topwear",
    "subCategory": "formal shirt",
    "price": 1612,
    "originalPrice": 2176,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/louis-philippe-men-grey-slim-fit-solid-flat-front-formal-trousers/p/21009840",
    "isPdpResolved": true,
    "image": "/product-images/SKU81.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Slim",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Slim"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Louis Philippe in Topwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Louis Philippe",
      "product: Men Grey Slim Fit Solid Flat Front Formal Trousers",
      "listed price: ?1612."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Topwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku82",
    "skuId": "SKU82",
    "name": "Cotton Stretch Balloon Fit Jeans",
    "brand": "Styli",
    "category": "Bottomwear",
    "subCategory": "bottomwear",
    "price": 1156,
    "originalPrice": 1560,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/bottomwear/c/6834",
    "isPdpResolved": false,
    "image": "/product-images/SKU82.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Styli",
      "product: Cotton Stretch Balloon Fit Jeans",
      "listed price: ?1156."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku83",
    "skuId": "SKU83",
    "name": "Stretchable Off White Loose Fit Solid Korean Trouser",
    "brand": "BROADSTAR",
    "category": "Bottomwear",
    "subCategory": "bottomwear",
    "price": 1260,
    "originalPrice": 1701,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/broadstar-stretchable-off-white-loose-fit-solid-korean-trouser/p/21126176",
    "isPdpResolved": true,
    "image": "/product-images/SKU83.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Loose",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Loose"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: BROADSTAR",
      "product: Stretchable Off White Loose Fit Solid Korean Trouser",
      "listed price: ?1260."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku84",
    "skuId": "SKU84",
    "name": "Men's Black Solid Wide Leg Cotton Casual Trousers with Drawstring",
    "brand": "Styli",
    "category": "Bottomwear",
    "subCategory": "bottomwear",
    "price": 830,
    "originalPrice": 1120,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/styli-men-s-black-solid-wide-leg-cotton-casual-trousers-with-drawstring/p/16175492",
    "isPdpResolved": true,
    "image": "/product-images/SKU84.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Styli",
      "product: Men's Black Solid Wide Leg Cotton Casual Trousers with Drawstring",
      "listed price: ?830."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku85",
    "skuId": "SKU85", \"availability_status\": \"OUT_OF_STOCK\", "availability_status": "OUT_OF_STOCK",
    "name": "Brown Mid Rise Cobain Loose Fit Cargo",
    "brand": "Flying Machine",
    "category": "Bottomwear",
    "subCategory": "bottomwear",
    "price": 1350,
    "originalPrice": 1822,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/bottomwear/c/6834",
    "isPdpResolved": false,
    "image": "/product-images/SKU85.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Loose",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Loose"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Flying Machine",
      "product: Brown Mid Rise Cobain Loose Fit Cargo",
      "listed price: ?1350."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku86",
    "skuId": "SKU86",
    "name": "Black Bootcut Jeans",
    "brand": "Jack & Jones",
    "category": "Bottomwear",
    "subCategory": "bottomwear",
    "price": 2499,
    "originalPrice": 3373,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/bottomwear/c/6834",
    "isPdpResolved": false,
    "image": "/product-images/SKU86.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Jack & Jones",
      "product: Black Bootcut Jeans",
      "listed price: ?2499."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku87",
    "skuId": "SKU87",
    "name": "Men Beige Solid Casual Trousers",
    "brand": "Allen Solly",
    "category": "Bottomwear",
    "subCategory": "bottomwear",
    "price": 1525,
    "originalPrice": 2058,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/allen-solly-men-beige-solid-casual-trousers/p/20460243",
    "isPdpResolved": true,
    "image": "/product-images/SKU87.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Allen Solly",
      "product: Men Beige Solid Casual Trousers",
      "listed price: ?1525."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku88",
    "skuId": "SKU88",
    "name": "Men Black Modal Solid Straight Trouser",
    "brand": "ETHNIC BAY",
    "category": "Bottomwear",
    "subCategory": "bottomwear",
    "price": 825,
    "originalPrice": 1113,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/bottomwear/c/6834",
    "isPdpResolved": false,
    "image": "/product-images/SKU88.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: ETHNIC BAY",
      "product: Men Black Modal Solid Straight Trouser",
      "listed price: ?825."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku89",
    "skuId": "SKU89",
    "name": "Men Light Brown Plain Relaxed Casual Trouser",
    "brand": "Snitch",
    "category": "Bottomwear",
    "subCategory": "bottomwear",
    "price": 1499,
    "originalPrice": 2023,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/snitch-men-light-brown-plain-relaxed-casual-trouser/p/20715643",
    "isPdpResolved": true,
    "image": "/product-images/SKU89.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Snitch in Bottomwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Snitch",
      "product: Men Light Brown Plain Relaxed Casual Trouser",
      "listed price: ?1499."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku90",
    "skuId": "SKU90",
    "name": "Men Light Blue Slim Straight Fit Stretchable Mid-Rise Jeans",
    "brand": "Bewakoof",
    "category": "Bottomwear",
    "subCategory": "bottomwear",
    "price": 1189,
    "originalPrice": 1605,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/bewakoof-men-light-blue-slim-straight-fit-stretchable-mid-rise-jeans/p/25141260",
    "isPdpResolved": true,
    "image": "/product-images/SKU90.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Bewakoof",
      "product: Men Light Blue Slim Straight Fit Stretchable Mid-Rise Jeans",
      "listed price: ?1189."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku91",
    "skuId": "SKU91",
    "name": "Black Men's Relaxed Fit Solid Mid-Rise Elasticated Cargo",
    "brand": "The Indian Garage Co",
    "category": "Bottomwear",
    "subCategory": "bottomwear",
    "price": 969,
    "originalPrice": 1308,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/bottomwear/c/6834",
    "isPdpResolved": false,
    "image": "/product-images/SKU91.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Relaxed",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Relaxed"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "MEDIUM",
      "brandTrustReason": "Active brand footprint with consistent platform ratings in Bottomwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: The Indian Garage Co",
      "product: Black Men's Relaxed Fit Solid Mid-Rise Elasticated Cargo",
      "listed price: ?969."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku92",
    "skuId": "SKU92",
    "name": "Men White Loose Fit Cargo Trousers",
    "brand": "H&M",
    "category": "Bottomwear",
    "subCategory": "bottomwear",
    "price": 2799,
    "originalPrice": 3778,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/bottomwear/c/6834",
    "isPdpResolved": false,
    "image": "/product-images/SKU92.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Loose",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Loose"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: H&M",
      "product: Men White Loose Fit Cargo Trousers",
      "listed price: ?2799."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku93",
    "skuId": "SKU93",
    "name": "Men Beige Solid Casual Trouser",
    "brand": "CAHOOT",
    "category": "Bottomwear",
    "subCategory": "bottomwear",
    "price": 1100,
    "originalPrice": 1485,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/campus-sutra-men-beige-solid-regular-fit-casual-trouser/p/16806777",
    "isPdpResolved": true,
    "image": "/product-images/SKU93.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: CAHOOT",
      "product: Men Beige Solid Casual Trouser",
      "listed price: ?1100."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku94",
    "skuId": "SKU94",
    "name": "Mens Picasso Purple Solid Regular Fit Casual Trousers",
    "brand": "Nite Flite",
    "category": "Bottomwear",
    "subCategory": "bottomwear",
    "price": 650,
    "originalPrice": 877,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/bottomwear/c/6834",
    "isPdpResolved": false,
    "image": "/product-images/SKU94.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Regular",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Nite Flite",
      "product: Mens Picasso Purple Solid Regular Fit Casual Trousers",
      "listed price: ?650."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku95",
    "skuId": "SKU95",
    "name": "Mens 555 Dark-Blue Loose Fit Mid Rise Jeans",
    "brand": "Levi's",
    "category": "Bottomwear",
    "subCategory": "bottomwear",
    "price": 2999,
    "originalPrice": 4048,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/bottomwear/c/6834",
    "isPdpResolved": false,
    "image": "/product-images/SKU95.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Loose",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Loose"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Levi's",
      "product: Mens 555 Dark-Blue Loose Fit Mid Rise Jeans",
      "listed price: ?2999."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku96",
    "skuId": "SKU96",
    "name": "Men Brown Solid Super Slim Fit Casual Trouser",
    "brand": "Peter England",
    "category": "Bottomwear",
    "subCategory": "bottomwear",
    "price": 1300,
    "originalPrice": 1755,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/peter-england-men-brown-solid-super-slim-fit-casual-trouser/p/11330084",
    "isPdpResolved": true,
    "image": "/product-images/SKU96.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Slim",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Slim"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Peter England",
      "product: Men Brown Solid Super Slim Fit Casual Trouser",
      "listed price: ?1300."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bottomwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Fabric weight / thickness is not stated on the listing.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku97",
    "skuId": "SKU97",
    "name": "Womens Silver Party Textured Sling Bag",
    "brand": "Inc.5",
    "category": "Bags & Accessories",
    "subCategory": "accessories",
    "price": 3490,
    "originalPrice": 4711,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/women/bags/c/89",
    "isPdpResolved": false,
    "image": "/product-images/SKU97.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Inc.5",
      "product: Womens Silver Party Textured Sling Bag",
      "listed price: ?3490."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bags & Accessories options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku98",
    "skuId": "SKU98",
    "name": "Sabrina Wine Top Handle Sling Bag With Detachable Chain Strap",
    "brand": "MIRAGGIO",
    "category": "Bags & Accessories",
    "subCategory": "accessories",
    "price": 2880,
    "originalPrice": 3888,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/miraggio-wine-sabrina-crossbody-bag/p/17263981",
    "isPdpResolved": true,
    "image": "/product-images/SKU98.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: MIRAGGIO",
      "product: Sabrina Wine Top Handle Sling Bag With Detachable Chain Strap",
      "listed price: ?2880."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bags & Accessories options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku99",
    "skuId": "SKU99",
    "name": "Black Solid Sling Bag with Detachable Strap",
    "brand": "Puma",
    "category": "Bags & Accessories",
    "subCategory": "accessories",
    "price": 600,
    "originalPrice": 810,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/women/bags/c/89",
    "isPdpResolved": false,
    "image": "/product-images/SKU99.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Puma in Bags & Accessories.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Puma",
      "product: Black Solid Sling Bag with Detachable Strap",
      "listed price: ?600."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bags & Accessories options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku100",
    "skuId": "SKU100",
    "name": "Unisex Urbana Polyester 14 Inch Laptop Backpack - Black",
    "brand": "Tommy Hilfiger",
    "category": "Bags & Accessories",
    "subCategory": "accessories",
    "price": 2100,
    "originalPrice": 2835,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/women/bags/c/89",
    "isPdpResolved": false,
    "image": "/product-images/SKU100.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Polyester",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Polyester"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Tommy Hilfiger in Bags & Accessories.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Brand: Tommy Hilfiger",
      "product: Unisex Urbana Polyester 14 Inch Laptop Backpack - Black",
      "listed price: ?2100."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bags & Accessories options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku101",
    "skuId": "SKU101",
    "name": "Women Black Leather Textured Sling Bag",
    "brand": "Inc.5",
    "category": "Bags & Accessories",
    "subCategory": "accessories",
    "price": 3290,
    "originalPrice": 4441,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/women/bags/c/89",
    "isPdpResolved": false,
    "image": "/product-images/SKU101.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Leather",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Leather"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Inc.5",
      "product: Women Black Leather Textured Sling Bag",
      "listed price: ?3290."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bags & Accessories options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku102",
    "skuId": "SKU102", \"availability_status\": \"OUT_OF_STOCK\", "availability_status": "OUT_OF_STOCK",
    "name": "Women Brown Shoulder Bag",
    "brand": "H&M",
    "category": "Bags & Accessories",
    "subCategory": "accessories",
    "price": 2299,
    "originalPrice": 3103,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/women/bags/c/89",
    "isPdpResolved": false,
    "image": "/product-images/SKU102.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: H&M",
      "product: Women Brown Shoulder Bag",
      "listed price: ?2299."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bags & Accessories options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku103",
    "skuId": "SKU103",
    "name": "White The Burg Sling Bag with Detachable Strap",
    "brand": "Haute Sauce",
    "category": "Bags & Accessories",
    "subCategory": "accessories",
    "price": 2255,
    "originalPrice": 3044,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/women/bags/c/89",
    "isPdpResolved": false,
    "image": "/product-images/SKU103.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Haute Sauce",
      "product: White The Burg Sling Bag with Detachable Strap",
      "listed price: ?2255."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bags & Accessories options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku104",
    "skuId": "SKU104",
    "name": "MARICAR Womens Beige Handbag",
    "brand": "Aldo",
    "category": "Bags & Accessories",
    "subCategory": "accessories",
    "price": 7999,
    "originalPrice": 10798,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/women/bags/c/89",
    "isPdpResolved": false,
    "image": "/product-images/SKU104.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Aldo",
      "product: MARICAR Womens Beige Handbag",
      "listed price: ?7999."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bags & Accessories options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku105",
    "skuId": "SKU105",
    "name": "Women Patent Party Tote Bag Fits Upto 14 Inch Laptop",
    "brand": "Fastrack",
    "category": "Bags & Accessories",
    "subCategory": "accessories",
    "price": 1008,
    "originalPrice": 1360,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/women/bags/c/89",
    "isPdpResolved": false,
    "image": "/product-images/SKU105.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Fastrack",
      "product: Women Patent Party Tote Bag Fits Upto 14 Inch Laptop",
      "listed price: ?1008."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bags & Accessories options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku106",
    "skuId": "SKU106",
    "name": "Women Casual Beige Shoulder Bag with Detachable Sling",
    "brand": "Mochi",
    "category": "Bags & Accessories",
    "subCategory": "accessories",
    "price": 1374,
    "originalPrice": 1854,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/women/bags/c/89",
    "isPdpResolved": false,
    "image": "/product-images/SKU106.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Mochi",
      "product: Women Casual Beige Shoulder Bag with Detachable Sling",
      "listed price: ?1374."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Bags & Accessories options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku107",
    "skuId": "SKU107",
    "name": "Mid-Impact Cotton Sports Bra with Hook & Eye & Removable Cups NYK904 Jet Black",
    "brand": "Nykd by Nykaa",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 799,
    "originalPrice": 1078,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/women/active-sports/c/13970",
    "isPdpResolved": false,
    "image": "/product-images/SKU107.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Nykd by Nykaa",
      "product: Mid-Impact Cotton Sports Bra with Hook & Eye & Removable Cups NYK904 Jet Black",
      "listed price: ?799."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku108",
    "skuId": "SKU108",
    "name": "Women The Ultimate Flare Pants - Lite with Hidden Back Pocket",
    "brand": "Blissclub",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 999,
    "originalPrice": 1348,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/blissclub-women-the-ultimate-flare-pants-lite-with-hidden-back-pocket/p/18107004",
    "isPdpResolved": true,
    "image": "/product-images/SKU108.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Blissclub",
      "product: Women The Ultimate Flare Pants - Lite with Hidden Back Pocket",
      "listed price: ?999."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku109",
    "skuId": "SKU109",
    "name": "Women Black Polyester Solid Tights",
    "brand": "COLOR CAPITAL",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 790,
    "originalPrice": 1066,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/color-capital-women-black-polyester-solid-tights/p/24167572",
    "isPdpResolved": true,
    "image": "/product-images/SKU109.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Polyester",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Polyester"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: COLOR CAPITAL",
      "product: Women Black Polyester Solid Tights",
      "listed price: ?790."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku110",
    "skuId": "SKU110",
    "name": "ESS Logo High-Waist Womens Black Trackpants",
    "brand": "Puma",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 2970,
    "originalPrice": 4009,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/puma-ess-logo-high-waist-womens-black-trackpants/p/18810714",
    "isPdpResolved": true,
    "image": "/product-images/SKU110.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Puma in Activewear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Puma",
      "product: ESS Logo High-Waist Womens Black Trackpants",
      "listed price: ?2970."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku111",
    "skuId": "SKU111",
    "name": "Cotton Terry Full Sleeve Round Neck Cozy Sweatshirt-NYLE703-Grape",
    "brand": "Nykd by Nykaa",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 678,
    "originalPrice": 915,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/women/active-sports/c/13970",
    "isPdpResolved": false,
    "image": "/product-images/SKU111.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Nykd by Nykaa",
      "product: Cotton Terry Full Sleeve Round Neck Cozy Sweatshirt-NYLE703-Grape",
      "listed price: ?678."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku112",
    "skuId": "SKU112",
    "name": "Women Black Wide Sports Leggings With Softmove",
    "brand": "H&M MOVE",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 2799,
    "originalPrice": 3778,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/women/active-sports/c/13970",
    "isPdpResolved": false,
    "image": "/product-images/SKU112.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: H&M MOVE",
      "product: Women Black Wide Sports Leggings With Softmove",
      "listed price: ?2799."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku113",
    "skuId": "SKU113",
    "name": "Obsidian Black Tall Hourglass Flared Leggings",
    "brand": "Cava Athleisure",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 1430,
    "originalPrice": 1930,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/cava-athleisure-bell-bottom-v-waist-long-leggings/p/14738243",
    "isPdpResolved": true,
    "image": "/product-images/SKU113.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Cava Athleisure",
      "product: Obsidian Black Tall Hourglass Flared Leggings",
      "listed price: ?1430."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku114",
    "skuId": "SKU114",
    "name": "Sportswear Women's Shorts",
    "brand": "Nike",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 2121,
    "originalPrice": 2863,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/women/active-sports/c/13970",
    "isPdpResolved": false,
    "image": "/product-images/SKU114.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Nike in Activewear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Nike",
      "product: Sportswear Women's Shorts",
      "listed price: ?2121."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku115",
    "skuId": "SKU115",
    "name": "Ultimate Cotton Flare Leggings with Anti-Slip Waist & Pockets NYAT503 Grape",
    "brand": "Nykd by Nykaa",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 1107,
    "originalPrice": 1494,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/nykd-by-nykaa-iconic-super-comfy-cotton-flare-leggings-with-pockets-nyat503-grape/p/16061292",
    "isPdpResolved": true,
    "image": "/product-images/SKU115.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Nykd by Nykaa",
      "product: Ultimate Cotton Flare Leggings with Anti-Slip Waist & Pockets NYAT503 Grape",
      "listed price: ?1107."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku116",
    "skuId": "SKU116",
    "name": "Grey Full Coverage Bras for Women Comfy No Underwire Plus Size Bra High Impact V-Neck",
    "brand": "BRACHY",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 660,
    "originalPrice": 891,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/women/active-sports/c/13970",
    "isPdpResolved": false,
    "image": "/product-images/SKU116.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: BRACHY",
      "product: Grey Full Coverage Bras for Women Comfy No Underwire Plus Size Bra High Impact V-Neck",
      "listed price: ?660."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku117",
    "skuId": "SKU117",
    "name": "Zesta 3.0 Sneaker Shoes with Premium Upper",
    "brand": "U.S. POLO ASSN.",
    "category": "Footwear",
    "subCategory": "footwear",
    "price": 2275,
    "originalPrice": 3071,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/women/footwear/sneakers/c/10626",
    "isPdpResolved": false,
    "image": "/product-images/SKU117.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for U.S. POLO ASSN. in Footwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: U.S. POLO ASSN.",
      "product: Zesta 3.0 Sneaker Shoes with Premium Upper",
      "listed price: ?2275."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Footwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku118",
    "skuId": "SKU118",
    "name": "Smashic Womens White Sneakers",
    "brand": "Puma",
    "category": "Footwear",
    "subCategory": "footwear",
    "price": 1575,
    "originalPrice": 2126,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/puma-smashic-womens-white-sneakers/p/9750193",
    "isPdpResolved": true,
    "image": "/product-images/SKU118.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Puma in Footwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Puma",
      "product: Smashic Womens White Sneakers",
      "listed price: ?1575."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Footwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku119",
    "skuId": "SKU119",
    "name": "Women's Air Max Sc Sneakers",
    "brand": "Nike",
    "category": "Footwear",
    "subCategory": "footwear",
    "price": 5995,
    "originalPrice": 8093,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/women/footwear/sneakers/c/10626",
    "isPdpResolved": false,
    "image": "/product-images/SKU119.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Nike in Footwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Nike",
      "product: Women's Air Max Sc Sneakers",
      "listed price: ?5995."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Footwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku120",
    "skuId": "SKU120",
    "name": "Women Brown Sneakers",
    "brand": "Shoetopia",
    "category": "Footwear",
    "subCategory": "footwear",
    "price": 850,
    "originalPrice": 1147,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/shoetopia-women-brown-sneakers/p/24826583",
    "isPdpResolved": true,
    "image": "/product-images/SKU120.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Shoetopia",
      "product: Women Brown Sneakers",
      "listed price: ?850."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Footwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku121",
    "skuId": "SKU121", \"availability_status\": \"OUT_OF_STOCK\", "availability_status": "OUT_OF_STOCK",
    "name": "Cordela 3.0 Beige Chunky Sneaker Shoes",
    "brand": "U.S. POLO ASSN.",
    "category": "Footwear",
    "subCategory": "footwear",
    "price": 2622,
    "originalPrice": 3539,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/u-s-polo-assn-women-beige-cordela-3-0-round-toe-lace-ups-sneakers/p/23335960",
    "isPdpResolved": true,
    "image": "/product-images/SKU121.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for U.S. POLO ASSN. in Footwear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: U.S. POLO ASSN.",
      "product: Cordela 3.0 Beige Chunky Sneaker Shoes",
      "listed price: ?2622."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating, detailed specifications and seller details were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Footwear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku122",
    "skuId": "SKU122",
    "name": "Men Beige Oversized Fit Long-Sleeved Jersey T-Shirt",
    "brand": "H&M",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 1499,
    "originalPrice": 2023,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/active-sports/c/13971",
    "isPdpResolved": false,
    "image": "/product-images/SKU122.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: H&M",
      "product: Men Beige Oversized Fit Long-Sleeved Jersey T-Shirt",
      "listed price: ?1499."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku123",
    "skuId": "SKU123",
    "name": "Performance Men Woven Track Pants",
    "brand": "Puma",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 1300,
    "originalPrice": 1755,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/active-sports/c/13971",
    "isPdpResolved": false,
    "image": "/product-images/SKU123.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Puma in Activewear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Puma",
      "product: Performance Men Woven Track Pants",
      "listed price: ?1300."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku124",
    "skuId": "SKU124",
    "name": "Men Light Grey Gym & Training Trackpant",
    "brand": "TURNFIT",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 589,
    "originalPrice": 795,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/turnfit-men-light-grey-gym-training-trackpant/p/19589437",
    "isPdpResolved": true,
    "image": "/product-images/SKU124.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: TURNFIT",
      "product: Men Light Grey Gym & Training Trackpant",
      "listed price: ?589."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku125",
    "skuId": "SKU125",
    "name": "Men Black 5-Pack Regular Fit T-Shirts",
    "brand": "H&M",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 2299,
    "originalPrice": 3103,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/h-m-men-black-5-pack-regular-fit-t-shirts/p/26878301",
    "isPdpResolved": true,
    "image": "/product-images/SKU125.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Regular",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: H&M",
      "product: Men Black 5-Pack Regular Fit T-Shirts",
      "listed price: ?2299."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku126",
    "skuId": "SKU126",
    "name": "MV40 Men Microfiber Fabric Active Wear Hoodie Jacket - Black",
    "brand": "Jockey",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 1729,
    "originalPrice": 2334,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/jockey-mv40-mens-microfiber-water-resistant-convertible-hoodie-jacket-black/p/12408332",
    "isPdpResolved": true,
    "image": "/product-images/SKU126.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Microfiber",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Microfiber"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Jockey in Activewear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Brand: Jockey",
      "product: MV40 Men Microfiber Fabric Active Wear Hoodie Jacket - Black",
      "listed price: ?1729."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku127",
    "skuId": "SKU127",
    "name": "Men Grey Stripe Joggers",
    "brand": "adidas",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 720,
    "originalPrice": 972,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/active-sports/c/13971",
    "isPdpResolved": false,
    "image": "/product-images/SKU127.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: adidas",
      "product: Men Grey Stripe Joggers",
      "listed price: ?720."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku128",
    "skuId": "SKU128",
    "name": "Off White Textured Mid Waist Trackpant",
    "brand": "Alcis",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 750,
    "originalPrice": 1012,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/active-sports/c/13971",
    "isPdpResolved": false,
    "image": "/product-images/SKU128.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Alcis",
      "product: Off White Textured Mid Waist Trackpant",
      "listed price: ?750."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku129",
    "skuId": "SKU129",
    "name": "Uspa Active Sports Men Solid Hooded Active Jacket",
    "brand": "U.S. POLO ASSN.",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 3654,
    "originalPrice": 4932,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/active-sports/c/13971",
    "isPdpResolved": false,
    "image": "/product-images/SKU129.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for U.S. POLO ASSN. in Activewear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: U.S. POLO ASSN.",
      "product: Uspa Active Sports Men Solid Hooded Active Jacket",
      "listed price: ?3654."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku130",
    "skuId": "SKU130",
    "name": "Sportswear Men Black Pant",
    "brand": "Nike",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 2772,
    "originalPrice": 3742,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/active-sports/c/13971",
    "isPdpResolved": false,
    "image": "/product-images/SKU130.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Nike in Activewear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Nike",
      "product: Sportswear Men Black Pant",
      "listed price: ?2772."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku131",
    "skuId": "SKU131", \"availability_status\": \"OUT_OF_STOCK\", "availability_status": "OUT_OF_STOCK",
    "name": "Men White Shorts",
    "brand": "Reebok",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 1584,
    "originalPrice": 2138,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/reebok-men-white-shorts/p/20833562",
    "isPdpResolved": true,
    "image": "/product-images/SKU131.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Reebok",
      "product: Men White Shorts",
      "listed price: ?1584."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku132",
    "skuId": "SKU132",
    "name": "MV52 Men Recycled Microfiber Straight Fit Active Wear Shorts - Black & Green",
    "brand": "Jockey",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 1049,
    "originalPrice": 1416,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/jockey-mv52-recycled-microfiber-straight-fit-shorts-green/p/24507483",
    "isPdpResolved": true,
    "image": "/product-images/SKU132.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Microfiber",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Microfiber"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Jockey in Activewear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Brand: Jockey",
      "product: MV52 Men Recycled Microfiber Straight Fit Active Wear Shorts - Black & Green",
      "listed price: ?1049."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku133",
    "skuId": "SKU133",
    "name": "Men Solid Slim Fit Sports Shorts with Duracool for Gym",
    "brand": "Technosport",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 549,
    "originalPrice": 741,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/active-sports/shorts/c/13977",
    "isPdpResolved": false,
    "image": "/product-images/SKU133.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Slim",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Slim"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Technosport",
      "product: Men Solid Slim Fit Sports Shorts with Duracool for Gym",
      "listed price: ?549."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku134",
    "skuId": "SKU134", \"availability_status\": \"OUT_OF_STOCK\", "availability_status": "OUT_OF_STOCK",
    "name": "Performance Men Side Pocket Gym Shorts",
    "brand": "Puma",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 1200,
    "originalPrice": 1620,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/puma-performance-men-side-pocket-gym-shorts/p/25509387",
    "isPdpResolved": true,
    "image": "/product-images/SKU134.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Puma in Activewear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Puma",
      "product: Performance Men Side Pocket Gym Shorts",
      "listed price: ?1200."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku135",
    "skuId": "SKU135",
    "name": "Grey Solid Regular Fit Shorts",
    "brand": "Tego",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 1694,
    "originalPrice": 2286,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/active-sports/shorts/c/13977",
    "isPdpResolved": false,
    "image": "/product-images/SKU135.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Regular",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Tego",
      "product: Grey Solid Regular Fit Shorts",
      "listed price: ?1694."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku136",
    "skuId": "SKU136",
    "name": "SP26 Men Super Combed Cotton Active Wear Shorts - Dark Khaki",
    "brand": "Jockey",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 1199,
    "originalPrice": 1618,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/jockey-sp26-men-super-combed-cotton-active-wear-shorts-dark-khaki/p/24833359",
    "isPdpResolved": true,
    "image": "/product-images/SKU136.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Cotton",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Cotton"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for Jockey in Activewear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "PARTIAL",
      "overallConfidence": "MEDIUM",
      "summary": "Good match based on your needs and available product evidence."
    },
    "whatWeKnow": [
      "Brand: Jockey",
      "product: SP26 Men Super Combed Cotton Active Wear Shorts - Dark Khaki",
      "listed price: ?1199."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku137",
    "skuId": "SKU137",
    "name": "Grey Printed Regular Fit Shorts",
    "brand": "TURNFIT",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 396,
    "originalPrice": 534,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/active-sports/shorts/c/13977",
    "isPdpResolved": false,
    "image": "/product-images/SKU137.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Regular",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: TURNFIT",
      "product: Grey Printed Regular Fit Shorts",
      "listed price: ?396."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku138",
    "skuId": "SKU138",
    "name": "Men All Day Blue Shorts",
    "brand": "Off Limits",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 703,
    "originalPrice": 949,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/active-sports/shorts/c/13977",
    "isPdpResolved": false,
    "image": "/product-images/SKU138.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Off Limits",
      "product: Men All Day Blue Shorts",
      "listed price: ?703."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku139",
    "skuId": "SKU139",
    "name": "Men Woven Shorts - Black",
    "brand": "Alcis",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 600,
    "originalPrice": 810,
    "discount": "20% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/active-sports/shorts/c/13977",
    "isPdpResolved": false,
    "image": "/product-images/SKU139.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Not provided",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Not provided"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Alcis",
      "product: Men Woven Shorts - Black",
      "listed price: ?600."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku140",
    "skuId": "SKU140",
    "name": "Beige Active Sports Mens Slim Fit Solid Active Shorts",
    "brand": "U.S. POLO ASSN.",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 1080,
    "originalPrice": 1458,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/u-s-polo-assn-beige-active-sports-mens-slim-fit-solid-active-shorts/p/20720612",
    "isPdpResolved": true,
    "image": "/product-images/SKU140.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Slim",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Slim"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "HIGH",
      "brandTrustReason": "Established category presence and high aggregate customer volume for U.S. POLO ASSN. in Activewear.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: U.S. POLO ASSN.",
      "product: Beige Active Sports Mens Slim Fit Solid Active Shorts",
      "listed price: ?1080."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  },
  {
    "id": "sku141",
    "skuId": "SKU141",
    "name": "Men's Navy Blue Regular Fit Activewear Sports Shorts",
    "brand": "Bonjour",
    "category": "Activewear",
    "subCategory": "activewear",
    "price": 941,
    "originalPrice": 1270,
    "discount": "35% OFF",
    "rating": null,
    "reviewCount": 0,
    "buyerPhotosCount": 0,
    "url": "https://www.nykaafashion.com/men/active-sports/shorts/c/13977",
    "isPdpResolved": false,
    "image": "/product-images/SKU141.jpg",
    "imageStatus": "IMAGE_REQUIRED",
    "specifications": {
      "fabric": "Not provided",
      "fit": "Regular",
      "care": "Not provided",
      "measurements": "Not provided",
      "gsm": "Not provided",
      "sellerAttributes": [
        {
          "label": "Fabric / Material",
          "value": "Not provided"
        },
        {
          "label": "Fit Descriptor",
          "value": "Regular"
        },
        {
          "label": "Care Instructions",
          "value": "Not provided"
        },
        {
          "label": "Garment Measurements",
          "value": "Not provided"
        },
        {
          "label": "Fabric Weight / GSM",
          "value": "Not provided"
        },
        {
          "label": "Seller",
          "value": "Nykaa Verified Seller"
        }
      ]
    },
    "reviewObservations": {
      "source": "Nykaa Fashion Customer Ratings",
      "totalReviews": 0,
      "rating": null,
      "hasWrittenReviews": false,
      "writtenReviewCount": 0,
      "verifiedReviewCount": 0,
      "summary": "No customer ratings or reviews recorded for this product yet.",
      "sampleQuotes": [],
      "writtenReviews": []
    },
    "confidenceModel": {
      "brandTrustLevel": "LIMITED",
      "brandTrustReason": "Niche brand presence on Nykaa with emerging category order history.",
      "skuEvidence": "LIMITED",
      "productUnderstanding": "LIMITED",
      "overallConfidence": "LOW",
      "summary": "Limited evidence means there is still some uncertainty."
    },
    "whatWeKnow": [
      "Brand: Bonjour",
      "product: Men's Navy Blue Regular Fit Activewear Sports Shorts",
      "listed price: ?941."
    ],
    "whatWeDontKnow": [
      "PDP-level review count, rating and detailed product specifications were not expanded in this listing-level scrape."
    ],
    "buyerSuitability": {
      "suitableFor": [
        "Shoppers looking for Activewear options with verified attributes"
      ],
      "notSuitableFor": [
        "Shoppers needing exact millimeter measurements before purchase"
      ]
    },
    "regretCheck": [
      "Exact garment measurements are not provided, making sizing less certain.",
      "Very few customer reviews are available to confirm long-term wash and wear durability."
    ]
  }
];

// ---- 7 Demonstrative User Profiles with Persistent Wishlists ----
const USER_PROFILES = [
  {
    "id": "user_1",
    "name": "Aarav",
    "avatar": "A",
    "tagline": "Corporate professional \u00b7 Smart casual",
    "description": "Looking for sharp work-appropriate shirts, versatile polos, and durable leather accessories.",
    "wishlistSkuIds": [
      "SKU01",
      "SKU07",
      "SKU08",
      "SKU02",
      "SKU06",
      "SKU15",
      "SKU87",
      "SKU10",
      "SKU100"
    ]
  },
  {
    "id": "user_2",
    "name": "Meera",
    "avatar": "M",
    "tagline": "Working professional \u00b7 Ethnicwear",
    "description": "Prefers breathable cotton Chikankari kurtas, coordinated palazzo suit sets, and structured bags.",
    "wishlistSkuIds": [
      "SKU03",
      "SKU04",
      "SKU12",
      "SKU13",
      "SKU14",
      "SKU21",
      "SKU98",
      "SKU102"
    ]
  },
  {
    "id": "user_3",
    "name": "Rohan",
    "avatar": "R",
    "tagline": "Fitness-focused \u00b7 Activewear",
    "description": "Prioritises sweat-wicking gym tees, lightweight training shorts, and compression tights.",
    "wishlistSkuIds": [
      "SKU09",
      "SKU18",
      "SKU126",
      "SKU131",
      "SKU134",
      "SKU117",
      "SKU121"
    ]
  },
  {
    "id": "user_4",
    "name": "Ananya",
    "avatar": "An",
    "tagline": "Young professional \u00b7 Everyday fashion",
    "description": "Mixes casual striped shirts, high-rise stretch denim, and practical everyday backpacks.",
    "wishlistSkuIds": [
      "SKU26",
      "SKU37",
      "SKU38",
      "SKU83",
      "SKU85",
      "SKU89",
      "SKU103",
      "SKU105"
    ]
  },
  {
    "id": "user_5",
    "name": "Kabir",
    "avatar": "K",
    "tagline": "Frequent shopper \u00b7 Workwear",
    "description": "Invests in formal business shirts, comfortable straight trousers, and polished accessories.",
    "wishlistSkuIds": [
      "SKU23",
      "SKU25",
      "SKU31",
      "SKU92",
      "SKU95",
      "SKU86",
      "SKU20",
      "SKU99"
    ]
  },
  {
    "id": "user_6",
    "name": "Ishita",
    "avatar": "I",
    "tagline": "Occasion-led shopper \u00b7 Ethnicwear",
    "description": "Curates festive embroidered ethnic sets, silk blend kurtas, and elegant celebratory footwear.",
    "wishlistSkuIds": [
      "SKU42",
      "SKU43",
      "SKU44",
      "SKU45",
      "SKU97",
      "SKU101",
      "SKU104"
    ]
  },
  {
    "id": "user_7",
    "name": "Aditya",
    "avatar": "Ad",
    "tagline": "Minimalist shopper \u00b7 Casualwear",
    "description": "Prefers solid cotton polos, clean straight denim, and reliable casualwear.",
    "wishlistSkuIds": [
      "SKU22",
      "SKU24",
      "SKU36",
      "SKU84",
      "SKU90",
      "SKU93",
      "SKU118",
      "SKU120"
    ]
  }
];

// ---- Category Decision Metadata & Language ----
const CATEGORY_DECISION_CONFIG = {
  "Topwear": {
    "headline": "Compare fit, fabric and buyer evidence.",
    "sub": "Review checkable material composition, collar construction and sizing certainty.",
    "attributes": ["Fit", "Fabric", "Comfort", "Care", "Customer Evidence"],
    "actionLabel": "Compare Topwear"
  },
  "Ethnicwear": {
    "headline": "Compare fabric, fit and occasion suitability.",
    "sub": "Evaluate embroidery work, garment care constraints and festive suitability.",
    "attributes": ["Fabric", "Fit", "Occasion", "Comfort", "Customer Evidence"],
    "actionLabel": "Compare Ethnicwear"
  },
  "Bottomwear": {
    "headline": "Compare fit, comfort and available evidence.",
    "sub": "Examine waist rise, leg silhouette and stretch performance.",
    "attributes": ["Fit", "Waist/Measurements", "Comfort", "Fabric", "Customer Evidence"],
    "actionLabel": "Compare Bottomwear"
  },
  "Activewear": {
    "headline": "Compare fit, comfort and material.",
    "sub": "Check breathable synthetic blends, stretch flexibility and activity relevance.",
    "attributes": ["Fit", "Stretch", "Material", "Comfort", "Activity Relevance"],
    "actionLabel": "Compare Activewear"
  },
  "Bags & Accessories": {
    "headline": "Compare material, durability and dimensions.",
    "sub": "Examine leather grade, compartment capacity and closure hardware.",
    "attributes": ["Material", "Durability", "Closure", "Capacity", "Customer Evidence"],
    "actionLabel": "Compare Accessories"
  },
  "Footwear": {
    "headline": "Compare sole comfort, fit and material.",
    "sub": "Evaluate cushioning, toe shape and outer sole construction.",
    "attributes": ["Sole / Cushion", "Material", "Fit", "Occasion", "Customer Evidence"],
    "actionLabel": "Compare Footwear"
  },
  "Eyewear": {
    "headline": "Compare frame material and face fit.",
    "sub": "Review UV rating, frame weight and hinge construction.",
    "attributes": ["UV Protection", "Frame Material", "Face Fit", "Durability", "Customer Evidence"],
    "actionLabel": "Compare Eyewear"
  }
};

// ---- Decision Context Helper Functions ----
const DECISION_DATA = {
  getAllProducts() {
    return PRODUCTS;
  },

  getProduct(id) {
    const cleanId = (id || '').toLowerCase();
    return PRODUCTS.find(p => p.id === cleanId || p.skuId.toLowerCase() === cleanId) || null;
  },

  getProductsByCategory(category) {
    return PRODUCTS.filter(p => p.category === category);
  },

  getCategories() {
    return [...new Set(PRODUCTS.map(p => p.category))];
  },

  getCategoryConfig(category) {
    return CATEGORY_DECISION_CONFIG[category] || CATEGORY_DECISION_CONFIG["Topwear"];
  },

  findProducts(filters = {}) {
    return PRODUCTS.filter(p => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.brand && p.brand.toUpperCase() !== filters.brand.toUpperCase()) return false;
      if (filters.maxPrice && p.price > filters.maxPrice) return false;
      if (filters.minRating && (!p.rating || p.rating < filters.minRating)) return false;
      return true;
    });
  },

  compareProducts(skuIds = []) {
    return skuIds.map(id => this.getProduct(id)).filter(Boolean);
  }
};

// ---- V2 Roadmap Features ----
const V2_FEATURES = [
  {
    category: "TRUST",
    features: [
      {
        title: "Nykaa Verified / Nykaa Trust",
        description: "Physical inspection checkpoint badge verifying authentic sourcing and fabric composition via warehouse QC.",
        dependency: "Nykaa QC / fulfillment verification operations",
        icon: "shield"
      },
      {
        title: "SKU Video Walkthrough",
        description: "See it in real life: 360-degree drape, stretch recovery, opacity against light, and movement clips by catalog fit models.",
        dependency: "Catalog studio production pipeline",
        icon: "video"
      }
    ]
  },
  {
    category: "UNDERSTAND",
    features: [
      {
        title: "Specification Translator",
        description: "Translates technical specifications (e.g. 240 GSM, 2-ply compact cotton, TR90) into plain-English practical feel and seasonal warmth.",
        dependency: "Category textile taxonomy engine",
        icon: "translate"
      },
      {
        title: "Garment Fit Predictor",
        description: "Compares flat garment measurements against your past well-fitting Nykaa purchases to predict tightness or drape.",
        dependency: "User size profile integration",
        icon: "eye"
      }
    ]
  },
  {
    category: "PERSONALISE",
    features: [
      {
        title: "Will I Actually Use This?",
        description: "Calculates repeat utility score based on your saved wardrobe, climate context, and stated lifestyle occasions.",
        dependency: "Wardrobe intelligence model",
        icon: "user"
      }
    ]
  },
  {
    category: "EXPLAIN",
    features: [
      {
        title: "Explain My Choice",
        description: "Conversational explanation answering 'Why not B?', 'Which has lowest return risk?', and 'What is still uncertain?' using grounded evidence.",
        dependency: "Grounding LLM reasoning engine",
        icon: "message"
      }
    ]
  },
  {
    category: "VALIDATE",
    features: [
      {
        title: "Social Validation (Private Circles)",
        description: "Share 2-3 shortlisted SKUs with close friends or family for confidential one-tap voting on fit and color.",
        dependency: "Private link sharing infrastructure",
        icon: "people"
      }
    ]
  },
  {
    category: "STRUCTURE",
    features: [
      {
        title: "Attribute Importance Weighting",
        description: "Explicitly slide importance (Not Important / Somewhat / Critical) for Fabric, Fit, Care, Brand Trust, or Price.",
        dependency: "Multi-criteria decision solver",
        icon: "translate"
      }
    ]
  }
];
