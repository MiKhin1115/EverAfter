import type { PackageIncludeRecord } from './base'
import { legacyPackages } from './records'

export const packageIncludes: PackageIncludeRecord[] = legacyPackages.flatMap((pkg) => {
  const groupedRecords: PackageIncludeRecord[] = []
  const seenItems = new Set<string>()

  ;(pkg.includesGroups ?? []).forEach((group, groupIndex) => {
    group.items.forEach((itemText, itemIndex) => {
      seenItems.add(itemText)
      groupedRecords.push({
        id: `${pkg.id}-include-${groupIndex + 1}-${itemIndex + 1}`,
        packageId: pkg.id,
        groupTitle: group.title,
        itemText,
        sortOrder: groupIndex * 100 + itemIndex,
      })
    })
  })

  const remainingRecords = (pkg.includes ?? [])
    .filter((itemText) => !seenItems.has(itemText))
    .map((itemText, itemIndex) => ({
      id: `${pkg.id}-include-extra-${itemIndex + 1}`,
      packageId: pkg.id,
      groupTitle: 'Included',
      itemText,
      sortOrder: 10_000 + itemIndex,
    }))

  if (groupedRecords.length === 0 && remainingRecords.length === 0) {
    return []
  }

  return [...groupedRecords, ...remainingRecords]
})
