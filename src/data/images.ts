export const STORE_IMAGES = {
  heroSky: '/src/assets/images/hero_twilight_sky_1794878869370.jpg',
  kitchenScene: '/src/assets/images/kitchen_counter_scene_1794878869832.jpg',
  yellowBox: '/src/assets/images/yellow_grocery_box_1794878869586.jpg',
  marketBasket: '/src/assets/images/market_basket_hero_1794878870701.jpg',
  storeInterior: '/src/assets/images/waco_store_interior_1794878875169.jpg',
  categories: {
    'rice-grains': '/src/assets/images/rice_grains_bowl_1794878868884.jpg',
    'beans-legumes': '/src/assets/images/beans_legumes_bowl_1794878871862.jpg',
    'garri-cassava': '/src/assets/images/garri_cassava_bowl_1794878870885.jpg',
    'yam-potatoes': '/src/assets/images/yam_potato_tubers_1794878872407.jpg',
    vegetables: '/src/assets/images/fresh_market_vegetables_1794878871558.jpg',
    fruits: '/src/assets/images/tropical_fruits_display_1794878871866.jpg',
    'meat-poultry': '/src/assets/images/butcher_meat_poultry_1794878871942.jpg',
    'fish-seafood': '/src/assets/images/fresh_smoked_seafood_1794878872182.jpg',
    'cooking-oils': '/src/assets/images/palm_vegetable_oils_1794878872885.jpg',
    'spices-seasonings': '/src/assets/images/nigerian_spices_bowls_1794878872470.jpg',
    'dairy-eggs': '/src/assets/images/farm_eggs_dairy_1794878872821.jpg',
    beverages: '/src/assets/images/chilled_market_beverages_1794878873935.jpg',
    'snacks-confectionery': '/src/assets/images/crispy_snacks_jars_1794878873746.jpg',
    breakfast: '/src/assets/images/breakfast_bread_oats_1794878873662.jpg',
    household: '/src/assets/images/household_care_bottles_1794878875214.jpg',
  } as Record<string, string>,
};

export function getCategoryImage(categoryId: string): string {
  return STORE_IMAGES.categories[categoryId] || STORE_IMAGES.yellowBox;
}
