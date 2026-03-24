export type FieldDefinition = {
  id: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'select' | 'switch' | 'textarea';
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  colSpan?: 12 | 6 | 4; 
}

export type SectionDefinition = {
  title: string;
  fields: FieldDefinition[];
}

export const subsidiarySchemas: Record<string, SectionDefinition[]> = {
  // Flora Gas specific mapping per UX design (Image 5)
  "lpg": [
    {
      title: "PERSONAL INFORMATION",
      fields: [
        { id: "firstName", label: "FIRST NAME", type: "text", required: true, placeholder: "e.g. Nyasha", colSpan: 6 },
        { id: "surname", label: "SURNAME", type: "text", required: true, placeholder: "e.g. Zhou", colSpan: 6 },
        { id: "phone", label: "PHONE NUMBER", type: "text", required: true, placeholder: "e.g. 0774 555 666", colSpan: 12 }
      ]
    },
    {
      title: "GAS REFILL / PURCHASE",
      fields: [
        { id: "refillQuantityKg", label: "REFILL QUANTITY (KG)", type: "number", required: true, placeholder: "e.g. 1, 2.5, 77...", colSpan: 6 },
        { id: "totalPriceUSD", label: "TOTAL PRICE (USD)", type: "number", required: true, placeholder: "e.g. 25.00", colSpan: 6 },
        { id: "cylinderOwnership", label: "CYLINDER STATUS", type: "select", required: true, options: [
          {label: "Refill Own Cylinder", value: "Refill"}, 
          {label: "Exchange Empty", value: "Exchange"}, 
          {label: "New Purchase", value: "New"}
        ], colSpan: 12 }
      ]
    },
    {
      title: "CUSTOMER TYPE & PREFERENCES",
      fields: [
        { id: "customerType", label: "CUSTOMER TYPE", type: "select", required: true, options: [{label: "Domestic (Home)", value: "Domestic"}, {label: "Commercial (Business)", value: "Commercial"}], colSpan: 6 },
        { id: "paymentMethod", label: "PREFERRED PAYMENT METHOD", type: "select", required: true, options: [
          {label: "USD Cash", value: "USD"}, 
          {label: "ZIG / Ecocash", value: "ZIG"}, 
          {label: "Bank Transfer", value: "Bank"}
        ], colSpan: 6 },
        { id: "requiresDelivery", label: "Enable Home Delivery Service?", type: "switch", colSpan: 12 }
      ]
    },
    {
      title: "ADDITIONAL NOTES",
      fields: [
        { id: "additionalNotes", label: "INTERNAL REMARKS / SPECIAL INSTRUCTIONS", type: "textarea", placeholder: "e.g. Customer requested call before delivery, interested in 48kg commercial account...", colSpan: 12 }
      ]
    }
  ],
  // Sbali Roller Meal - Agriculture (Image 4)
  "sbali": [
    {
      title: "CUSTOMER IDENTIFICATION",
      fields: [
        { id: "firstName", label: "FIRST NAME", type: "text", required: true, placeholder: "e.g. Tendai", colSpan: 6 },
        { id: "surname", label: "SURNAME", type: "text", required: true, placeholder: "e.g. Chivasa", colSpan: 6 },
        { id: "phone", label: "PHONE NUMBER", type: "text", required: true, placeholder: "+263 772 123 456", colSpan: 12 }
      ]
    },
    {
      title: "LOCATION & CLASSIFICATION",
      fields: [
        { id: "location", label: "LOCATION / DEPOT", type: "select", required: true, options: [
          {label: "Harare Central", value: "Harare"},
          {label: "Bulawayo Depot", value: "Bulawayo"},
          {label: "Gweru Branch", value: "Gweru"},
          {label: "Mutare Depot", value: "Mutare"},
          {label: "Chinhoyi", value: "Chinhoyi"},
          {label: "Masvingo", value: "Masvingo"}
        ], colSpan: 6 },
        { id: "customerType", label: "CUSTOMER TYPE", type: "select", required: true, options: [
          {label: "Retail Consumer", value: "Retail"},
          {label: "Wholesale / Tuckshop", value: "Wholesale"},
          {label: "Corporate / NGO", value: "Corporate"}
        ], colSpan: 6 }
      ]
    },
    {
      title: "SALES & QUANTITY",
      fields: [
        { id: "quantityKg", label: "QUANTITY (KG)", type: "number", required: true, placeholder: "e.g. 10", colSpan: 6 },
        { id: "totalPriceUSD", label: "TOTAL PRICE (USD)", type: "number", required: true, placeholder: "e.g. 12.50", colSpan: 6 },
        { id: "paymentStatus", label: "PAYMENT STATUS", type: "select", required: true, options: [
          {label: "Paid In Full", value: "Paid"},
          {label: "On Credit", value: "Credit"},
          {label: "Pending Verification", value: "Pending"}
        ], colSpan: 12 }
      ]
    }
  ],
  // Continental Treasures Mining - Gold (Ref: Image inspiration)
  "mining": [
    {
      title: "OPERATOR IDENTIFICATION",
      fields: [
        { id: "operatorName", label: "SITE OPERATOR NAME", type: "text", required: true, placeholder: "e.g. Blessing Makore", colSpan: 6 },
        { id: "licenseNumber", label: "MINING LICENSE NUMBER", type: "text", required: true, placeholder: "e.g. ZW-MIN-2024-88", colSpan: 6 },
        { id: "phone", label: "OPERATOR PHONE", type: "text", required: true, placeholder: "+263 771 999 000", colSpan: 12 }
      ]
    },
    {
      title: "PRODUCTION & SITE DATA",
      fields: [
        { id: "siteLocation", label: "SHAFT / SITE LOCATION", type: "text", required: true, placeholder: "e.g. Kadoma West, Section B", colSpan: 12 },
        { id: "volumeGrams", label: "EST. MONTHLY VOLUME (GRAMS)", type: "number", placeholder: "e.g. 500", colSpan: 6 },
        { id: "equipmentCount", label: "STAMP MILLS / CONVEYORS", type: "number", placeholder: "e.g. 2", colSpan: 6 },
        { id: "oreGrade", label: "ORE GRADE ESTIMATE", type: "select", options: [{label: "High (Free Gold)", value: "High"}, {label: "Medium", value: "Medium"}, {label: "Low (Sulphide)", value: "Low"}], colSpan: 12 }
      ]
    }
  ],
  // Granite Haven Bakery - Fresh Produce
  "bakery": [
    {
      title: "CUSTOMER CONTACT",
      fields: [
        { id: "firstName", label: "CUSTOMER NAME", type: "text", required: true, placeholder: "e.g. Mrs. Chido", colSpan: 6 },
        { id: "phone", label: "CONTACT PHONE", type: "text", required: true, placeholder: "+263 711 222 333", colSpan: 6 }
      ]
    },
    {
      title: "ORDER SELECTION",
      fields: [
        { id: "productType", label: "PASTRY / PIE SELECTION", type: "select", required: true, options: [
          {label: "Prime Beef Pie", value: "Beef"}, 
          {label: "Chicken & Mushroom", value: "Chicken"}, 
          {label: "Sausage Roll (Bulk)", value: "SausageRoll"},
          {label: "Standard White Loaf", value: "Bread"}
        ], colSpan: 12 },
        { id: "quantity", label: "QUANTITY (UNITS)", type: "number", placeholder: "e.g. 12", colSpan: 6 },
        { id: "deliveryTime", label: "PREFFERED PICKUP TIME", type: "select", options: [{label: "Morning (08:00)", value: "Morning"}, {label: "Afternoon (13:00)", value: "Afternoon"}, {label: "Evening (17:00)", value: "Evening"}], colSpan: 6 }
      ]
    }
  ],
  // Global Energies Africa - Fuel Logistics
  "fuel": [
    {
      title: "VEHICLE & DRIVER INFO",
      fields: [
        { id: "vehicleReg", label: "VEHICLE REGISTRATION", type: "text", required: true, placeholder: "e.g. AGE 1234", colSpan: 6 },
        { id: "firstName", label: "DRIVER NAME", type: "text", required: true, placeholder: "e.g. Farai", colSpan: 6 },
        { id: "phone", label: "DRIVER PHONE", type: "text", placeholder: "+263 774 000 111", colSpan: 12 }
      ]
    },
    {
      title: "FUEL SPECIFICATIONS",
      fields: [
        { id: "fuelType", label: "FUEL TYPE", type: "select", required: true, options: [{label: "Diesel (50ppm)", value: "Diesel"}, {label: "Petrol (E50 Unltd)", value: "Petrol"}], colSpan: 6 },
        { id: "volumeLitres", label: "REFUEL VOLUME (LITRES)", type: "number", required: true, placeholder: "e.g. 60", colSpan: 6 },
        { id: "pumpNumber", label: "PUMP NUMBER", type: "select", options: [{label: "Pump 1", value: "1"}, {label: "Pump 2", value: "2"}, {label: "Pump 3", value: "3"}], colSpan: 12 }
      ]
    }
  ],
  // MountPlus / New Impetus - Branding & Design
  "branding": [
    {
      title: "PROJECT SCOPE & SERVICES",
      fields: [
        { id: "serviceCategory", label: "SERVICE CATEGORY", type: "select", required: true, options: [
          {label: "Embroidery / Apparels", value: "Embroidery"},
          {label: "Graphic Design", value: "Design"}, 
          {label: "Photography", value: "Photography"},
          {label: "Videography", value: "Videography"},
          {label: "Large Format Printing", value: "Printing"}, 
          {label: "Corporate Branding / Signs", value: "Branding"}
        ], colSpan: 12 },
        { id: "serviceDescription", label: "DETAILED PROJECT BRIEF / DESCRIPTION", type: "textarea", placeholder: "Describe the specific embroidery details, photography duration, or design requirements...", colSpan: 12 },
        { id: "totalPriceUSD", label: "ESTIMATED TOTAL PRICE (USD)", type: "number", required: true, colSpan: 12 }
      ]
    }
  ],
  // Flora Solar & Tech - Installations
  "solar": [
    {
      title: "SITE COMPLIANCE",
      fields: [
        { id: "firstName", label: "CLIENT NAME", type: "text", required: true, colSpan: 6 },
        { id: "phone", label: "CLIENT PHONE", type: "text", required: true, colSpan: 6 },
        { id: "siteAddress", label: "INSTALLATION ADDRESS", type: "text", required: true, colSpan: 12 }
      ]
    },
    {
      title: "PURCHASE & SYSTEM DETAILS",
      fields: [
        { id: "customerType", label: "TYPE OF CUSTOMER", type: "select", required: true, options: [
          {label: "Individual / Home", value: "Individual"},
          {label: "Corporate / Business", value: "Corporate"},
          {label: "NGO / Institutional", value: "NGO"}
        ], colSpan: 12 },
        { id: "purchaseDescription", label: "DESCRIPTION OF PURCHASE / SERVICES", type: "textarea", placeholder: "e.g. 5kVA Inverter, 4x Lithium batteries, Installation work, cables, etc.", colSpan: 12 },
        { id: "totalPriceUSD", label: "TOTAL ORDER VALUE (USD)", type: "number", required: true, colSpan: 12 }
      ]
    }
  ],
  // Continental Treasures Explosives
  "explosives": [
    {
      title: "REGULATORY COMPLIANCE",
      fields: [
        { id: "firstName", label: "PURCHASER NAME", type: "text", required: true, colSpan: 6 },
        { id: "permitNumber", label: "BLASTING PERMIT #", type: "text", required: true, placeholder: "e.g. ZW-BL-992", colSpan: 6 },
        { id: "phone", label: "CONTACT PHONE", type: "text", required: true, colSpan: 12 }
      ]
    },
    {
      title: "PRODUCT ALLOCATION",
      fields: [
        { id: "explosiveType", label: "EXPLOSIVE GRADE", type: "select", options: [
          {label: "Dynamite (Gelignite)", value: "Dynamite"}, 
          {label: "ANFO", value: "ANFO"}, 
          {label: "Detonators / Fuses", value: "Detonators"}
        ], colSpan: 12 },
        { id: "quantity", label: "QUANTITY (CASES/UNITS)", type: "number", required: true, colSpan: 6 },
        { id: "storageLocation", label: "CERTIFIED MAGAZINE LOCATION", type: "text", placeholder: "e.g. Shaft 4 Magazine", colSpan: 6 }
      ]
    }
  ],
  // Ecomatt Farm - Piggery & Crops
  "farming": [
    {
      title: "PRODUCE & LIVESTOCK",
      fields: [
        { id: "firstName", label: "BUYER / PARTNER NAME", type: "text", required: true, colSpan: 6 },
        { id: "phone", label: "CONTACT PHONE", type: "text", required: true, colSpan: 6 },
        { id: "produceCategory", label: "PRODUCE CATEGORY", type: "select", required: true, options: [
          {label: "Livestock (Pigs/Poultry)", value: "Livestock"}, 
          {label: "Crops (Maize/Grain)", value: "Crops"}, 
          {label: "Vegetables (Horticulture)", value: "Veg"}
        ], colSpan: 12 }
      ]
    },
    {
      title: "BATCH DETAILS",
      fields: [
        { id: "unitWeight", label: "EST. WEIGHT (KG)", type: "number", colSpan: 6 },
        { id: "batchNumber", label: "BATCH / LOT ID", type: "text", colSpan: 6 },
        { id: "grading", label: "QUALITY GRADING", type: "select", options: [{label: "Grade A (Export)", value: "A"}, {label: "Grade B (Local)", value: "B"}], colSpan: 12 }
      ]
    }
  ],
  // Ecomatt Butcheries
  "meat": [
    {
      title: "CUSTOMER IDENTIFICATION",
      fields: [
        { id: "firstName", label: "NAME", type: "text", required: true, colSpan: 6 },
        { id: "phone", label: "PHONE", type: "text", required: true, colSpan: 6 }
      ]
    },
    {
      title: "MEAT SELECTION & PREP",
      fields: [
        { id: "meatType", label: "MEAT CATEGORY", type: "select", required: true, options: [
          {label: "Beef (Commercial)", value: "Beef"}, 
          {label: "Pork", value: "Pork"}, 
          {label: "Poultry / Chicken", value: "Chicken"}
        ], colSpan: 12 },
        { id: "weightKg", label: "WEIGHT (KG)", type: "number", required: true, placeholder: "e.g. 5.5", colSpan: 6 },
        { id: "cutPreference", label: "CUT PREFERENCE", type: "select", options: [{label: "Steak", value: "Steak"}, {label: "Mince", value: "Mince"}, {label: "Stewing", value: "Stewing"}], colSpan: 6 }
      ]
    }
  ],
  // Granite Haven Groceries
  "retail": [
    {
      title: "SHOPPER INFO",
      fields: [
        { id: "firstName", label: "CUSTOMER NAME", type: "text", required: true, colSpan: 6 },
        { id: "phone", label: "PHONE NUMBER", type: "text", colSpan: 6 }
      ]
    },
    {
      title: "BASKET INSIGHTS",
      fields: [
        { id: "visitPurpose", label: "VISIT PURPOSE", type: "select", options: [{label: "Bulk Monthly Shop", value: "Bulk"}, {label: "Daily / Minor Items", value: "Daily"}], colSpan: 6 },
        { id: "paymentType", label: "PAYMENT USED", type: "select", options: [{label: "USD Cash", value: "USD"}, {label: "Debit Card", value: "Card"}, {label: "Mobile Money", value: "Mobile"}], colSpan: 6 },
        { id: "interestedInReward", label: "Interested in Loyalty Program?", type: "switch", colSpan: 12 }
      ]
    }
  ],
  // Fallback map format for any other branches
  "fallback": [
    {
      title: "PERSONAL INFORMATION",
      fields: [
        { id: "firstName", label: "FIRST NAME", type: "text", required: true, colSpan: 6 },
        { id: "surname", label: "SURNAME", type: "text", required: true, colSpan: 6 },
        { id: "phone", label: "PHONE NUMBER", type: "text", required: true, colSpan: 12 }
      ]
    }
  ]
}
