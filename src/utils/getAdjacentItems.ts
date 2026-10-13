/**
 * The items before and after the one with `id` in `items`; `undefined` at either end, or when
 * no item has that id.
 */
export const getAdjacentItems = <Item extends { id: string }>(
  items: ReadonlyArray<Item>,
  id: string | undefined,
): { previous: Item | undefined; next: Item | undefined } => {
  const index = items.findIndex((item) => item.id === id)

  if (index === -1) {
    return { previous: undefined, next: undefined }
  }

  return { previous: items[index - 1], next: items[index + 1] }
}
