const navLinks = [
    {
        id: "cocktails",
        title: "Cocktails",
    },
    {
        id: "about",
        title: "About Us",
    },
    {
        id: "work",
        title: "The Art",
    },
    {
        id: "contact",
        title: "Contact",
    },
];

const burgerPopular = [
    {
        name: "Smoky Flame Burger",
        country: "Beef",
        detail: "BBQ, cheddar, grill-smoked",
        price: "$12",
    },
    {
        name: "Crunchy Chicken Stack",
        country: "Chicken",
        detail: "Crispy chicken, mayo, lettuce",
        price: "$10",
    },
    {
        name: "Spicy Volcano",
        country: "Beef",
        detail: "Hot sauce, jalapeños, pepper jack",
        price: "$13",
    },
    {
        name: "Classic Cheese Melt",
        country: "Beef",
        detail: "Double cheddar, onions, sauce",
        price: "$11",
    },
];

const burgerSpecials = [
    {
        name: "Truffle Luxe",
        country: "Premium",
        detail: "Truffle aioli, swiss, mushrooms",
        price: "$16",
    },
    {
        name: "Tropical Pineapple",
        country: "Fusion",
        detail: "Pineapple, teriyaki, onion",
        price: "$14",
    },
    {
        name: "Green Garden",
        country: "Veggie",
        detail: "Veggie patty, greens, avocado",
        price: "$10",
    },
    {
        name: "Smash Double Stack",
        country: "Beef",
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
  },
  {
    id: 2,
    category: "chicken",
    name: "Spicy Buffalo",
    image: "/images/menu/chicken/chicken3.png",
    title: "Heat That Hits Right",
    description: "Crispy chicken in buffalo sauce, topped with ranch, lettuce, and pickles.",
  },
  {
    id: 3,
    category: "chicken",
    name: "Herb Grilled",
    image: "/images/menu/chicken/chicken1.png",
    title: "Fresh, Light, Flavor",
    description: "Grilled chicken with herbs, lettuce, tomato, and garlic aioli on bun.",
  },

  // Beef Burgers
  {
    id: 5,
    category: "beef",
    name: "Classic Royale",
    image: "/images/menu/beef/beef2.png",
    title: "Where It Began",
    description: "Thick beef patty with cheddar, lettuce, tomato, and signature sauce bun.",
  },
  {
    id: 6,
    category: "beef",
    name: "Smoky Bacon",
    image: "/images/menu/beef/beef3.png",
    title: "Smoked and Sauced",
    description: "Grilled beef with bacon, melted cheese, onions, and smoky BBQ sauce.",
  },
  {
    id: 7,
    category: "beef",
    name: "Cheese Inferno",
    image: "/images/menu/beef/beef1.png",
    title: "Stacked With Flavor",
    description: "Double beef patties with cheddar, jalapeños, and spicy chipotle mayo.",
  },

  // Meals
  {
    id: 9,
    category: "meals",
    name: "Family Box",
    image: "/images/menu/meals/meal2.png",
    title: "A Feast For All",
    description: "Two beef, two chicken burgers, large fries, onion rings, and four drinks.",
  },
  {
    id: 10,
    category: "meals",
    name: "Fries Supreme",
    image: "/images/menu/meals/meal3.png",
    title: "Overflowing Goodness",
    description: "Crispy fries with cheese, jalapeños, shredded beef, and ranch drizzle.",
  },
  {
    id: 11,
    category: "meals",
    name: "Burger Platter",
    image: "/images/menu/meals/meal1.png",
    title: "All Best in One",
    description: "Mini chicken and beef sliders with dips, fries, and coleslaw included.",
  },

  // Drinks
  {
    id: 13,
    category: "drinks",
    name: "Classic Mojito",
    image: "/images/menu/drinks/drink1.png",
    title: "Bold Simple Flavor",
    description: "Refreshing lime, mint, and soda with a hint of sweetness and ice.",
  },
  {
    id: 14,
    category: "drinks",
    name: "Violet Breeze",
    image: "/images/menu/drinks/drink3.png",
    title: "Cool Calm Colors",
    description: "Floral violet drink with lavender, lemon, and crushed ice finish.",
  },
  {
    id: 15,
    category: "drinks",
    name: "Curacao Mojito",
    image: "/images/menu/drinks/drink2.png",
    title: "Crafted With Love",
    description: "Blue mojito with mint, lime, and Curacao for tropical refreshment.",
  },
];


export {
    navLinks,
    burgerPopular,
    burgerSpecials,
    featureLists,
    goodLists,
    allBurgers
};