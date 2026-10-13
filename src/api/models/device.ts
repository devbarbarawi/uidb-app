/**
 * A UIDB device, reduced to what the UI shows. Only `id` is guaranteed by UIDB; the other
 * fields fall back to readable defaults when missing.
 */
export type Device = {
  id: string
  /** `product.name` */
  name: string
  /** `line.name`, the product line, e.g. "UniFi". */
  lineName: string
}
