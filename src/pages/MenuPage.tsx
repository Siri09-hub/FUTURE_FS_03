import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import coffeeArt from "@/assets/coffee-art.jpg";
import foodBurger from "@/assets/food-burger.jpg";
import mocktails from "@/assets/mocktails.jpg";
import desserts from "@/assets/desserts.jpg";
import foodPizza from "@/assets/food-pizza.jpg";

const menuCategories = [
  {
    title: "Coffee",
    image: coffeeArt,
    items: [
      { name: "Espresso", price: "₹99" },
      { name: "Cappuccino", price: "₹149" },
      { name: "Café Latte", price: "₹159" },
      { name: "Cold Brew", price: "₹179" },
      { name: "Mocha", price: "₹189" },
    ],
  },
  {
    title: "Mocktails & Juices",
    image: mocktails,
    items: [
      { name: "Blue Lagoon", price: "₹129" },
      { name: "Virgin Mojito", price: "₹139" },
      { name: "Mango Tango", price: "₹119" },
      { name: "Fresh Orange Juice", price: "₹99" },
      { name: "Berry Blast Smoothie", price: "₹149" },
    ],
  },
  {
    title: "Burgers & Sandwiches",
    image: foodBurger,
    items: [
      { name: "Classic Cheese Burger", price: "₹199" },
      { name: "BBQ Chicken Burger", price: "₹249" },
      { name: "Paneer Tikka Sandwich", price: "₹179" },
      { name: "Club Sandwich", price: "₹219" },
    ],
  },
  {
    title: "Pizza",
    image: foodPizza,
    items: [
      { name: "Margherita", price: "₹249" },
      { name: "Farmhouse Veggie", price: "₹299" },
      { name: "Chicken Tikka Pizza", price: "₹349" },
      { name: "BBQ Paneer", price: "₹319" },
    ],
  },
  {
    title: "Desserts",
    image: desserts,
    items: [
      { name: "Chocolate Brownie", price: "₹149" },
      { name: "Blueberry Cheesecake", price: "₹199" },
      { name: "Ice Cream Sundae", price: "₹129" },
      { name: "Tiramisu", price: "₹229" },
    ],
  },
];

const MenuPage = () => (
  <div className="min-h-screen pt-24 pb-20">
    <div className="container mx-auto px-6">
      <SectionHeading title="Our Menu" subtitle="Crafted with passion — every dish, every drink." />

      <div className="space-y-16">
        {menuCategories.map((cat, ci) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.1 }}
            className="grid gap-8 md:grid-cols-2 items-center"
          >
            <div className={`overflow-hidden rounded-xl ${ci % 2 === 1 ? "md:order-2" : ""}`}>
              <img src={cat.image} alt={cat.title} loading="lazy" width={800} height={800} className="h-72 w-full object-cover rounded-xl" />
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">{cat.title}</h3>
              <div className="space-y-4">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-foreground font-medium">{item.name}</span>
                    <span className="text-primary font-semibold">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default MenuPage;
