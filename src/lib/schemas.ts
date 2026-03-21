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
  // Flora Gas specific mapping per UX design
  "1": [
    {
      title: "PERSONAL INFORMATION",
      fields: [
        { id: "firstName", label: "FIRST NAME", type: "text", required: true, placeholder: "e.g. Tendai", colSpan: 6 },
        { id: "surname", label: "SURNAME", type: "text", required: true, placeholder: "e.g. Moyo", colSpan: 6 },
        { id: "phone", label: "PHONE NUMBER", type: "text", required: true, placeholder: "e.g. 0771234567", colSpan: 6 },
        { id: "gender", label: "GENDER", type: "select", required: true, options: [{label: "Male", value: "Male"}, {label: "Female", value: "Female"}, {label: "Other", value: "Other"}], colSpan: 6 },
        { id: "physicalAddress", label: "PHYSICAL ADDRESS", type: "text", required: true, placeholder: "e.g. 14 Baines Ave, Harare", colSpan: 12 }
      ]
    },
    {
      title: "HOUSEHOLD & USAGE",
      fields: [
        { id: "familySize", label: "FAMILY SIZE", type: "select", options: [{label: "1-2", value:"1-2"}, {label: "3-5", value:"3-5"}, {label: "6+", value:"6+"}], colSpan: 4 },
        { id: "cylinderSize", label: "CYLINDER SIZE", type: "select", required: true, options: [{label: "3kg", value: "3kg"}, {label: "5kg", value: "5kg"}, {label: "9kg", value: "9kg"}, {label: "14kg", value: "14kg"}, {label: "19kg", value: "19kg"}, {label: "48kg", value: "48kg"}], colSpan: 4 },
        { id: "quantity", label: "QUANTITY", type: "number", required: true, placeholder: "e.g. 2", colSpan: 4 },
        { id: "usageFrequency", label: "HOW OFTEN DO THEY USE GAS AT HOME?", type: "select", options: [{label: "Daily", value: "Daily"}, {label: "Weekly", value: "Weekly"}, {label: "Monthly", value: "Monthly"}], colSpan: 12 }
      ]
    },
    {
      title: "CUSTOMER TYPE & PREFERENCES",
      fields: [
        { id: "customerType", label: "CUSTOMER TYPE", type: "select", required: true, options: [{label: "Domestic", value: "Domestic"}, {label: "Commercial", value: "Commercial"}], colSpan: 6 },
        { id: "paymentMethod", label: "PREFERRED PAYMENT METHOD", type: "select", options: [{label: "Cash", value: "Cash"}, {label: "Ecocash", value: "Ecocash"}, {label: "Swipe", value: "Swipe"}], colSpan: 6 },
        { id: "requiresDelivery", label: "Requires Delivery?", type: "switch", colSpan: 12 }
      ]
    },
    {
      title: "ADDITIONAL NOTES",
      fields: [
        { id: "additionalNotes", label: "CAPTURE ANY ADDITIONAL CUSTOMER PREFERENCES OR REMARKS", type: "textarea", placeholder: "e.g. Prefers morning deliveries, interested in becoming a reseller in Kuwadzana...", colSpan: 12 }
      ]
    }
  ],
  // Ecomatt Foods (Sbali/Chitsano) - Roller Meal
  "sbali": [
    {
      title: "PERSONAL INFORMATION",
      fields: [
        { id: "firstName", label: "FIRST NAME", type: "text", required: true, colSpan: 6 },
        { id: "surname", label: "SURNAME", type: "text", required: true, colSpan: 6 },
        { id: "phone", label: "PHONE NUMBER", type: "text", required: true, colSpan: 6 },
        { id: "location", label: "LOCATION", type: "text", required: true, placeholder: "e.g. Mbare, Harare", colSpan: 6 }
      ]
    },
    {
      title: "ORDER DETAILS",
      fields: [
        { id: "quantityKg", label: "QUANTITY (KG)", type: "number", required: true, placeholder: "e.g. 50", colSpan: 6 },
        { id: "customerType", label: "USER TYPE", type: "select", options: [{label: "Retail", value: "Retail"}, {label: "Wholesale", value: "Wholesale"}], colSpan: 6 }
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
