const navLinks = [
  {
    id: "menu",
    title: "Menu",
  },
  {
    id: "about",
    title: "About Us",
  },
  {
    id: "story",
    title: "Our Story",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const burgerPopular = [
  {
    name: "Smoky Bacon",
    category: "Beef",
    detail: "BBQ, cheddar, grill-smoked",
    price: "$12",
  },
  {
    name: "Spicy Buffalo",
    category: "Chicken",
    detail: "Crispy chicken, mayo, lettuce",
    price: "$10",
  },
  {
    name: "Herb Grilled",
    category: "Chicken",
    detail: "Hot sauce, jalapeños, pepper jack",
    price: "$13",
  },
  {
    name: "Cheese Inferno",
    category: "Beef",
    detail: "Double cheddar, onions, sauce",
    price: "$11",
  },
];
const burgerSpecials = [
  {
    name: "Burger Platter",
    category: "Premium",
    detail: "Truffle aioli, swiss, mushrooms",
    price: "$16",
  },
  {
    name: "Violet Breeze",
    category: "Fusion",
    detail: "Pineapple, teriyaki, onion",
    price: "$14",
  },
  {
    name: "Green Garden",
    category: "Veggie",
    detail: "Veggie patty, greens, avocado",
    price: "$10",
  },
  {
    name: "Smash Double Stack",
    category: "Beef",
    detail: "Double patty, pickles, cheese",
    price: "$15",
  },
];
const featureLists = [
  "Flame-grilled to perfection",
  "Juicy layers of premium beef",
  "Crisp lettuce and fresh veggies",
  "Melted cheese that seals the flavor",
];

const goodLists = [
  "Handcrafted with passion",
  "Fresh ingredients sourced daily",
  "Signature sauces made in-house",
  "Cooked over real fire for authentic taste",
];
const allBurgers = [
  // Chicken Burgers
  {
    id: 1,
    category: "chicken",
    name: "Crispy Deluxe",
    image: "/images/menu/chicken/chicken2.png",
    title: "Golden Crunch, Tender",
    description: "Juicy fried chicken with cheddar, lettuce, tomato, and mayo on brioche bun.",
    price: "$15",
  },
  {
    id: 2,
    category: "chicken",
    name: "Spicy Buffalo",
    image: "/images/menu/chicken/chicken3.png",
    title: "Heat That Hits Right",
    description: "Crispy chicken in buffalo sauce, topped with ranch, lettuce, and pickles.",
    price: "$15",
  },
  {
    id: 3,
    category: "chicken",
    name: "Herb Grilled",
    image: "/images/menu/chicken/chicken1.png",
    title: "Fresh, Light, Flavor",
    description: "Grilled chicken with herbs, lettuce, tomato, and garlic aioli on bun.",
    price: "$15",
  },

  // Beef Burgers
  {
    id: 5,
    category: "beef",
    name: "Classic Royale",
    image: "/images/menu/beef/beef2.png",
    title: "Where It Began",
    description: "Thick beef patty with cheddar, lettuce, tomato, and signature sauce bun.",
    price: "$15",
  },
  {
    id: 6,
    category: "beef",
    name: "Smoky Bacon",
    image: "/images/menu/beef/beef3.png",
    title: "Smoked and Sauced",
    description: "Grilled beef with bacon, melted cheese, onions, and smoky BBQ sauce.",
    price: "$15",
  },
  {
    id: 7,
    category: "beef",
    name: "Cheese Inferno",
    image: "/images/menu/beef/beef1.png",
    title: "Stacked With Flavor",
    description: "Double beef patties with cheddar, jalapeños, and spicy chipotle mayo.",
    price: "$15",
  },

  // Meals
  {
    id: 9,
    category: "meals",
    name: "Family Box",
    image: "/images/menu/meals/meal2.png",
    title: "A Feast For All",
    description: "Two beef, two chicken burgers, large fries, onion rings, and four drinks.",
    price: "$15",
  },
  {
    id: 10,
    category: "meals",
    name: "Fries Supreme",
    image: "/images/menu/meals/meal3.png",
    title: "Overflowing Goodness",
    description: "Crispy fries with cheese, jalapeños, shredded beef, and ranch drizzle.",
    price: "$15",
  },
  {
    id: 11,
    category: "meals",
    name: "Burger Platter",
    image: "/images/menu/meals/meal1.png",
    title: "All Best in One",
    description: "Mini chicken and beef sliders with dips, fries, and coleslaw included.",
    price: "$15",
  },

  // Drinks
  {
    id: 13,
    category: "drinks",
    name: "Classic Mojito",
    image: "/images/menu/drinks/drink1.png",
    title: "Bold Simple Flavor",
    description: "Refreshing lime, mint, and soda with a hint of sweetness and ice.",
    price: "$15",
  },
  {
    id: 14,
    category: "drinks",
    name: "Violet Breeze",
    image: "/images/menu/drinks/drink3.png",
    title: "Cool Calm Colors",
    description: "Floral violet drink with lavender, lemon, and crushed ice finish.",
    price: "$15",
  },
  {
    id: 15,
    category: "drinks",
    name: "Curacao Mojito",
    image: "/images/menu/drinks/drink2.png",
    title: "Crafted With Love",
    description: "Blue mojito with mint, lime, and Curacao for tropical refreshment.",
    price: "$15",
  },
];

const storeInfo = {
  heading: "Where to Find Us",
  address: "456, Raq Blvd. #404, Los Angeles, CA 90210",
  contact: {
    phone: "(555) 333-2222",
    email: "hello@example.com",
  },
};

const openingHours = [
  { day: "Sat–Wed", time: "3:00pm – 12am" },
  { day: "Thu", time: "3:00pm – 3am" },
  { day: "Fri", time: "3:00pm – 2am" },
  { day: "Sun", time: "5:00pm – 1am" },
];

const socials = [
  {
    name: "Instagram",
    icon: "/images/instagram.png",
    url: "#",
  },
  {
    name: "TikTok",
    icon: "/images/tiktok.png",
    url: "#",
  },
  {
    name: "Facebook",
    icon: "/images/facebook.png",
    url: "#",
  },
];
export {
  navLinks,
  burgerPopular,
  burgerSpecials,
  featureLists,
  goodLists,
  allBurgers,
  storeInfo,
  openingHours,
  socials
};