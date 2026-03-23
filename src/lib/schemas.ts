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
      title: "HOUSEHOLD & USAGE",
      fields: [
        { id: "familySize", label: "FAMILY SIZE", type: "select", required: true, options: [{label: "1-2", value:"1-2"}, {label: "3-5", value:"3-5"}, {label: "6+", value:"6+"}], colSpan: 4 },
        { id: "cylinderSize", label: "CYLINDER SIZE", type: "select", required: true, options: [{label: "6kg", value: "6kg"}, {label: "9kg", value: "9kg"}, {label: "14kg", value: "14kg"}, {label: "19kg", value: "19kg"}, {label: "48kg", value: "48kg"}], colSpan: 4 },
        { id: "quantity", label: "QUANTITY", type: "number", required: true, placeholder: "e.g. 1", colSpan: 4 },
        { id: "usageFrequency", label: "GAS USAGE INTENSITY", type: "select", required: true, options: [
          {label: "Daily Cooking", value: "Daily"}, 
          {label: "Backup/Power Cuts", value: "Backup"}, 
          {label: "Heating/Seasonal", value: "Seasonal"}
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
      title: "ORDER SPECIFICATIONS",
      fields: [
        { id: "quantity", label: "QUANTITY (KG)", type: "number", required: true, placeholder: "e.g. 10", colSpan: 12 }
      ]
    }
  ],
  // Continental Treasures Mining - Gold
  "mining": [
    {
      title: "OPERATOR INFORMATION",
      fields: [
        { id: "firstName", label: "OPERATOR NAME", type: "text", required: true, colSpan: 6 },
        { id: "licenseNumber", label: "MINING LICENSE #", type: "text", required: true, colSpan: 6 },
        { id: "phone", label: "CONTACT PHONE", type: "text", required: true, colSpan: 12 }
      ]
    },
    {
      title: "PRODUCTION TRACKING",
      fields: [
        { id: "siteLocation", label: "SITE/SHAFT LOCATION", type: "text", required: true, colSpan: 12 },
        { id: "volumeGrams", label: "ESTIMATED VOLUME (GRAMS)", type: "number", colSpan: 6 },
        { id: "equipmentCount", label: "STAMP MILLS / EQUIPMENT", type: "number", colSpan: 6 }
      ]
    }
  ],
  // Granite Haven Bakery - Pies
  "bakery": [
    {
      title: "CUSTOMER INFO",
      fields: [
        { id: "firstName", label: "NAME", type: "text", required: true, colSpan: 6 },
        { id: "phone", label: "PHONE", type: "text", required: true, colSpan: 6 }
      ]
    },
    {
      title: "PIE SELECTION",
      fields: [
        { id: "pieType", label: "PIE FLAVOUR", type: "select", options: [{label: "Beef", value: "Beef"}, {label: "Chicken", value: "Chicken"}, {label: "Steak & Kidney", value: "Steak & Kidney"}], colSpan: 6 },
        { id: "quantity", label: "QTY", type: "number", colSpan: 4 }
      ]
    }
  ],
  // Global Energies Africa - Fuel
  "fuel": [
    {
      title: "ORDER INFO",
      fields: [
        { id: "firstName", label: "CLIENT NAME", type: "text", required: true, colSpan: 6 },
        { id: "phone", label: "PHONE", type: "text", required: true, colSpan: 6 }
      ]
    },
    {
      title: "FUEL SPECS",
      fields: [
        { id: "fuelType", label: "FUEL TYPE", type: "select", options: [{label: "Petrol (E50)", value: "Petrol"}, {label: "Diesel (50ppm)", value: "Diesel"}], colSpan: 6 },
        { id: "volumeLitres", label: "VOLUME (LITRES)", type: "number", required: true, colSpan: 6 },
        { id: "deliveryMethod", label: "METHOD", type: "select", options: [{label: "Bulk Delivery", value: "Delivery"}, {label: "Pump Pickup", value: "Pickup"}], colSpan: 12 }
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
