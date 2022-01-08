export interface OptionInput {
  [key: string]: string
}

export interface LineItemPatch {
  product_id: string
  quantity: number
  options?: OptionInput[]
}

export interface purchaseOption {
  price: number
  sale: boolean
  sale_price: number
}
export interface Product {
  [x: string]: any
  id: string
  description: string
  name: string
  slug: string
  currency: string
  price: number
  images: any[]
  options: ProductOption[]
  variants: Variant[]
  stock_status?: string
  stock_trackable?: boolean
  stock_level?: number
  stock_purchasable?: boolean
  sku?: string
  categories?: []
  tags?: string[]
  orig_price?: number
  purchase_options: {
    standard: purchaseOption
  }
}

interface VariantResults {
  results: Variant[]
}
export interface ProductResult {
  id: string
  description: string
  name: string
  slug: string
  currency: string
  price: number
  options: ProductOption[]
  images: any[]
  variants: VariantResults
  attributes?: {
    video?: {
      value?: string
    }
  }
  orig_price?: number
  purchase_options: {
    standard: purchaseOption
  }
}

export interface Variant {
  id: string
  option_value_ids: string[]
  name: string
  price?: number
  stock_status?: string
}


export type CartItem = {
  id: string
  product: Product
  price: number
  variant: {
    name?: string
    sku?: string
    id: string
  }
  quantity: number
}

export type Cart = {
  id: string
  account_id: number
  currency: string
  tax_included_total: number
  sub_total: number
  tax_total: number
  shipment_total: number
  grand_total: number
  discount_total: number
  quantity: number
  items: CartItem[]
  item_quantity: number
  checkout_url: string
  date_created: string
  discounts?: { id: number; amount: number }[] | null
}

export type Image = {
  file: {
    url: String
    height: Number
    width: Number
  }
  id: string
}

export type OptionValue = {
  id: string
  name: string
  value: string
}

export type ProductOption = {
  id: string
  name: string
  values: OptionValue[]
}

export type Categories = {
  id: string
  name: string
}

/*INTERFACE FOR HEADER */
export interface IsubCategory {
  name: string
  type: string
  value: {
    id: string
    name: string
    slug: string
  }
}

export interface IcolumnItem {
  items: IsubCategory[]
  type: string
}
export interface Item {
  items: IcolumnItem[]
  name: string
  type: string
  value?: {
    id: string
    description: string
    images?: string[]
    name: string
    slug: string
  }
}
export interface INavbar {
  id: string
  items: Item[]
  name: string
  theme_menu_id: string
}