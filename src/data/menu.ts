import type { MenuCategory, MenuItem } from "@/types";

const unsplash = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "signature",
    name: "Signature Plates",
    tagline: "The dishes we built our name on",
    image: unsplash("1528207776546-365bb710ee93"),
  },
  {
    id: "grills",
    name: "Grills & Skillets",
    tagline: "All-day savoury, straight off the fire",
    image: unsplash("1600891964092-4316c288032e"),
  },
  {
    id: "greens",
    name: "Greens & Bowls",
    tagline: "Farms-market freshness in every fork",
    image: unsplash("1512621776951-a57141f2eefd"),
  },
  {
    id: "comfort",
    name: "Comfort dinners",
    tagline: "Slow plates for the evening table",
    image: unsplash("1467003909585-2f8a72700288"),
  },
  {
    id: "bakery",
    name: "Bakery & Desserts",
    tagline: "Butter, sugar and serious patience",
    image: unsplash("1608198093002-ad4e005484ec"),
  },
  {
    id: "sips",
    name: "Coffee & Sips",
    tagline: "Latte art, fresh juice and bottomless mimosas",
    image: unsplash("1509042239860-f550ce710b93"),
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // ——— Signature plates ———
  {
    id: "legendary-banana-pancakes",
    name: "Legendary Banana Pancakes",
    description:
      "A tall stack of our buttermilk pancakes layered with fresh banana, toasted pecans and warm maple syrup — the plate that started it all.",
    price: 13.99,
    category: "signature",
    image: unsplash("1528207776546-365bb710ee93"),
    dietary: ["vegetarian"],
    calories: 780,
    featured: true,
    popular: true,
    customizations: [
      {
        id: "pancake-count",
        name: "Choose your stack",
        type: "choice",
        required: true,
        options: [
          { id: "three", name: "Classic three-stack", price: 0 },
          { id: "five", name: "The Big Short five-stack", price: 3.5 },
        ],
      },
      {
        id: "pancake-extras",
        name: "Make it yours",
        type: "extras",
        max: 4,
        options: [
          { id: "berries", name: "Fresh berry medley", price: 2.5 },
          { id: "chips", name: "Chocolate chips", price: 1.5 },
          { id: "cream", name: "Whipped cream", price: 1 },
          { id: "syrup-side", name: "Extra warm syrup", price: 0.75 },
        ],
      },
    ],
  },
  {
    id: "tall-order-french-toast",
    name: "Tall Order French Toast",
    description:
      "Thick-cut brioche dipped in vanilla custard, griddled golden and finished with caramelised banana, blueberries and a snowfall of powdered sugar.",
    price: 13.49,
    category: "signature",
    image: unsplash("1484723091739-30a097e8f929"),
    dietary: ["vegetarian"],
    calories: 720,
    featured: true,
    popular: true,
    customizations: [
      {
        id: "ft-extras",
        name: "Add-ons",
        type: "extras",
        max: 3,
        options: [
          { id: "bacon", name: "Crispy smoked bacon", price: 4.5 },
          { id: "sausage", name: "Maple sausage links", price: 4.0 },
          { id: "egg-side", name: "Two farm eggs any style", price: 3.5 },
        ],
      },
    ],
  },
  {
    id: "green-goddess-toast",
    name: "Green Goddess Breakfast Toast",
    description:
      "Sourdough slathered with bright pea-and-basil smash, crowned with a sunny egg, crushed chili and a drizzle of herb oil.",
    price: 12.99,
    category: "signature",
    image: unsplash("1525351484163-7529414344d8"),
    dietary: ["vegetarian"],
    calories: 430,
    popular: true,
  },
  {
    id: "sunrise-avo-toast",
    name: "Sunrise Avocado Toast",
    description:
      "Multigrain toast piled with sliced avocado, a seven-minute soft egg and toasted seeds — simple, honest and quietly perfect.",
    price: 12.49,
    category: "signature",
    image: unsplash("1541519227354-08fa5d50c44d"),
    dietary: ["vegetarian"],
    calories: 390,
  },

  // ——— Grills & skillets ———
  {
    id: "hangar-steak-frites",
    name: "Hangar Steak & Estate Fries",
    description:
      "Grilled hangar steak sliced over rosemary-tossed estate fries with a black-pepper au poivre jus. Brunch with a passport.",
    price: 23.99,
    category: "grills",
    image: unsplash("1600891964092-4316c288032e"),
    dietary: ["high-protein"],
    calories: 860,
    featured: true,
    customizations: [
      {
        id: "doneness",
        name: "Cooked to your liking",
        type: "choice",
        required: true,
        options: [
          { id: "med-rare", name: "Medium rare", price: 0 },
          { id: "medium", name: "Medium", price: 0 },
          { id: "med-well", name: "Medium well", price: 0 },
        ],
      },
      {
        id: "steak-egg",
        name: "Add an egg",
        type: "choice",
        options: [
          { id: "none", name: "No egg, thank you", price: 0 },
          { id: "sunny", name: "Sunny-side up egg", price: 3.5 },
        ],
      },
    ],
  },
  {
    id: "cider-half-chicken",
    name: "Cider-Lacquered Half Chicken",
    description:
      "Free-range half chicken roasted in a cast-iron skillet with a maple-cider glaze, fresh herbs and pan jus.",
    price: 21.99,
    category: "grills",
    image: unsplash("1598103442097-8b74394b95c6"),
    dietary: ["high-protein"],
    calories: 790,
  },
  {
    id: "smothered-pork-chop",
    name: "Applewood-Smoked Pork Chop",
    description:
      "Bone-in chop with griddled apples, charred broccolini and silky potato purée under a brown-butter glaze.",
    price: 22.49,
    category: "grills",
    image: unsplash("1432139555190-58524dae6a55"),
    dietary: ["high-protein"],
    calories: 820,
  },
  {
    id: "brunch-meatballs",
    name: "Sunday Meatball Skillet",
    description:
      "Slow-braised beef meatballs on herbed arugula with our house marinara for dipping. Repeat orders guaranteed.",
    price: 15.99,
    category: "grills",
    image: unsplash("1529042410759-befb1204b468"),
    dietary: ["high-protein"],
    calories: 620,
    popular: true,
  },
  {
    id: "smokehouse-burger",
    name: "Smokehouse Burger",
    description:
      " Dry-aged beef patty with smoked cheddar, crisp lettuce and burnt-end mayo on a toasted sesame bun, served with fries.",
    price: 16.99,
    category: "grills",
    image: unsplash("1571091718767-18b5b1457add"),
    dietary: [],
    calories: 910,
    customizations: [
      {
        id: "burger-doneness",
        name: "Cooked to your liking",
        type: "choice",
        required: true,
        options: [
          { id: "med-rare", name: "Medium rare", price: 0 },
          { id: "medium", name: "Medium", price: 0 },
          { id: "med-well", name: "Medium well", price: 0 },
        ],
      },
      {
        id: "burger-extras",
        name: "Stack it higher",
        type: "extras",
        max: 4,
        options: [
          { id: "extra-patty", name: "Second patty", price: 5 },
          { id: "bacon", name: "Maple bacon", price: 3 },
          { id: "egg", name: "Fried egg", price: 2.5 },
          { id: "avocado", name: "Avocado", price: 2.5 },
        ],
      },
    ],
  },

  // ——— Greens & bowls ———
  {
    id: "harvest-bowl",
    name: "Farm Harvest Bowl",
    description:
      "Roasted sweet potato, chickpeas, avocado, heirloom tomatoes and sprouts over greens with lemon-tahini dressing.",
    price: 14.99,
    category: "greens",
    image: unsplash("1512621776951-a57141f2eefd"),
    dietary: ["vegan", "gluten-free"],
    calories: 480,
    featured: true,
    customizations: [
      {
        id: "protein",
        name: "Add protein",
        type: "choice",
        options: [
          { id: "none", name: "Keep it plant-based", price: 0 },
          { id: "chicken", name: "Grilled chicken", price: 5 },
          { id: "salmon", name: "Salmon", price: 7 },
          { id: "halloumi", name: "Seared halloumi", price: 4.5 },
        ],
      },
    ],
  },
  {
    id: "garden-salad",
    name: "Citrus Garden Salad",
    description:
      "Crisp seasonal greens, shaved fennel, olives and candied walnuts with a citrus vinaigrette — reliably refreshing.",
    price: 12.99,
    category: "greens",
    image: unsplash("1540189549336-e6e99c3679fe"),
    dietary: ["vegetarian"],
    calories: 350,
  },
  {
    id: "tuna-egg-salad",
    name: "Protein Plate Al Fresco",
    description:
      "Seared tuna, jammy eggs, arugula and vine tomatoes over herbed grains — our nod to the Mediterranean lunch table.",
    price: 17.99,
    category: "greens",
    image: unsplash("1604909052743-94e838986d24"),
    dietary: ["high-protein", "gluten-free"],
    calories: 520,
  },
  {
    id: "market-salad-board",
    name: "Market Salad Board",
    description:
      "A garden of pan-prepared vegetables, grains and greens plated for sharing. Choose your dressings on the side.",
    price: 18.99,
    category: "greens",
    image: unsplash("1498837167922-ddd27525d352"),
    dietary: ["vegan"],
    calories: 410,
    seasonal: true,
  },

  // ——— Comfort dinners ———
  {
    id: "roasted-root-soup",
    name: "Velvet Squash Soup",
    description:
      "Slow-roasted butternut squash blended silky with cream, finished with feta crumbles, toasted seeds and paprika oil.",
    price: 9.99,
    category: "comfort",
    image: unsplash("1476718406336-bb5a9690ee2a"),
    dietary: ["vegetarian", "gluten-free"],
    calories: 320,
  },
  {
    id: "seared-salmon",
    name: "Bistro Seared Salmon",
    description:
      "Crisp-skinned salmon over wilted spinach and celeriac purée with a bright cucumber relish.",
    price: 24.99,
    category: "comfort",
    image: unsplash("1467003909585-2f8a72700288"),
    dietary: ["high-protein", "gluten-free"],
    calories: 640,
    popular: true,
    customizations: [
      {
        id: "salmon-side",
        name: "Choose your side",
        type: "choice",
        required: true,
        options: [
          { id: "seasonal-veg", name: "Seasonal vegetables", price: 0 },
          { id: "fries", name: "Estate fries", price: 0 },
          { id: "salad", name: "House salad", price: 0 },
        ],
      },
    ],
  },
  {
    id: "grilled-catch",
    name: "Chef's Grilled Catch",
    description:
      "A rotating white fish off the plancha with charred lemon, fresh herbs and roasted potato salad.",
    price: 23.49,
    category: "comfort",
    image: unsplash("1476224203421-9ac39bcb3327"),
    dietary: ["high-protein"],
    calories: 590,
    seasonal: true,
  },

  // ——— Bakery & desserts ———
  {
    id: "bread-basket",
    name: "Hearth Bread Basket",
    description:
      "Sourdough, multigrain and brioche baked in-house each morning with cultured butter and jam.",
    price: 8.99,
    category: "bakery",
    image: unsplash("1608198093002-ad4e005484ec"),
    dietary: ["vegetarian"],
    calories: 420,
  },
  {
    id: "berry-lattice-pie",
    name: "Berry Lattice Hand Pies",
    description:
      "Golden lattice pastry over blackberry and strawberry compote, best with a spoonful of cream.",
    price: 9.49,
    category: "bakery",
    image: unsplash("1464305795204-6f5bbfc7fb81"),
    dietary: ["vegetarian"],
    calories: 460,
  },
  {
    id: "fruit-plate",
    name: "Orchard Fruit Plate",
    description:
      "Cut fruit at its peak — melon, berries, citrus and banana — plated on chilled porcelain.",
    price: 10.99,
    category: "bakery",
    image: unsplash("1490474418585-ba9bad8fd0ea"),
    dietary: ["vegan", "gluten-free"],
    calories: 210,
  },

  // ——— Coffee & sips ———
  {
    id: "signature-latte",
    name: "Roastery Signature Latte",
    description:
      "Double-shot espresso under velvety microfoam, finished with the rosetta our baristas are proud of.",
    price: 5.49,
    category: "sips",
    image: unsplash("1509042239860-f550ce710b93"),
    dietary: [],
    calories: 120,
    popular: true,
    customizations: [
      {
        id: "latte-size",
        name: "Size",
        type: "choice",
        required: true,
        options: [
          { id: "small", name: "Small", price: 0 },
          { id: "medium", name: "Medium", price: 0.7 },
          { id: "large", name: "Large", price: 1.2 },
        ],
      },
      {
        id: "latte-milk",
        name: "Milk",
        type: "choice",
        required: true,
        options: [
          { id: "whole", name: "Whole milk", price: 0 },
          { id: "oat", name: "Oat milk", price: 0.6 },
          { id: "almond", name: "Almond milk", price: 0.6 },
        ],
      },
    ],
  },
  {
    id: "bottomless-mimosa",
    name: "Bottomless Mimosa ( Sunday Only )",
    description:
      "Fresh-pressed orange juice and sparkling wine, refilled without asking. The weekend's true headliner.",
    price: 19.99,
    category: "sips",
    image: unsplash("1470337458703-46ad1756a187"),
    dietary: [],
    calories: 210,
    seasonal: true,
  },
];

export function getFeaturedItems(): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.featured);
}

export function getCategoriesWithCounts(): Array<
  MenuCategory & { count: number }
> {
  return MENU_CATEGORIES.map((category) => ({
    ...category,
    count: MENU_ITEMS.filter((item) => item.category === category.id).length,
  }));
}

export function getItemById(id: string): MenuItem | undefined {
  return MENU_ITEMS.find((item) => item.id === id);
}
