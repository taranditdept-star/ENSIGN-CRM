export type FieldConfig = {
  name: string
  label: string
  type: 'text' | 'number' | 'select' | 'date'
  required?: boolean
  options?: string[]
}

export type SubsidiarySchema = {
  id: string
  name: string
  fields: FieldConfig[]
}

export const mockSchemas: Record<string, SubsidiarySchema> = {
  "1": {
    id: "1",
    name: "Flora Gas Main Branch",
    fields: [
      { name: "cylinder_size", label: "Cylinder Size (kg)", type: "select", options: ["3kg", "4.5kg", "9kg", "14kg", "19kg", "48kg"], required: true },
      { name: "exchange_type", label: "Exchange Type", type: "select", options: ["Refill", "New Cylinder", "Exchange"], required: true },
      { name: "delivery_address", label: "Delivery Address", type: "text" }
    ]
  },
  "2": {
    id: "2",
    name: "Tarand IT Solutions",
    fields: [
      { name: "software_interest", label: "Primary Software Interest", type: "select", options: ["CRM", "ERP", "Custom App", "Hosting"], required: true },
      { name: "company_size", label: "Company Size", type: "select", options: ["1-10", "11-50", "50+"] },
      { name: "budget_range", label: "Estimated Budget ($)", type: "text" }
    ]
  }
}
