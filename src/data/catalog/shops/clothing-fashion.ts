export const clothingFashionShops = [
  {
    id: 'silkaura',
    name: 'SilkAura',
    categoryId: 'clothing-fashion',
    vendorCategoryLabel: 'Clothing',
    verified: true,
    startingPriceMMK: 60000,
    location: 'Yangon',
    image: '/images/vendors/clothing-fashion-01.jpg',
    rating: 4.5,
    reviewCount: 48,
    serviceTypeText: 'Myanmar Ready-to-Wear Clothing',
    shortDescription:
      'Traditional and modern Myanmar ready-to-wear sets for women, men, and kids. Suitable for events, ceremonies, and daily wear.',
    payment: {
      inAppAllowed: false,
    },
    tags: ['Clothing', 'ReadyToWear', 'Myanmar Traditional', 'Festival'],
  },
  {
    id: 'lacelane',
    name: 'LaceLane',
    categoryId: 'clothing-fashion',
    vendorCategoryLabel: 'Clothing',
    verified: true,
    startingPriceMMK: 4000,
    location: 'Yangon',
    image: '/images/vendors/clothing-fashion-02.jpg',
    rating: 4.4,
    reviewCount: 37,
    serviceTypeText: 'Fabric Shop (Per Yard Pricing)',
    shortDescription:
      'Fabric-focused shop with lace, silk, cotton, brocade, and accessories. Most products are sold per yard for flexible tailoring.',
    payment: {
      inAppAllowed: false,
    },
    tags: ['Clothing', 'Fabric', 'Per Yard', 'Accessories'],
  },
  {
    id: 'vowstyle',
    name: 'VowStyle',
    categoryId: 'clothing-fashion',
    vendorCategoryLabel: 'Clothing',
    verified: true,
    startingPriceMMK: 250000,
    location: 'Yangon',
    image: '/images/vendors/clothing-fashion-03.jpg',
    rating: 4.8,
    reviewCount: 72,
    serviceTypeText: 'Wedding & Dinner Dress Collection',
    shortDescription:
      'Weddingwear collections for brides, grooms, and couples with customization and fitting options. Rental and purchase options available for selected styles.',
    payment: {
      inAppAllowed: false,
    },
    tags: ['Clothing', 'WeddingWear', 'Bridal', 'Suit', 'Rental'],
  },
] as const