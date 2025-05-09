
import { motion } from 'framer-motion';
import { Search, Heart, ShoppingCart } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const HowItWorks = () => {
  const { theme } = useTheme();
  const isLightTheme = theme === "sunset" || theme === "forest" || theme === "system";

  const steps = [
    {
      title: "Take the Style Quiz",
      description: "Answer fun questions about your preferences, body type, and style goals.",
      icon: <Search className="h-6 w-6" />,
      color: isLightTheme ? "from-violet-400 to-indigo-400" : "from-violet-500 to-indigo-500",
      image: "https://images.unsplash.com/photo-1596609548086-85bbf8ddb6b9?q=80&w=600"
    },
    {
      title: "See Matches",
      description: "Get personalized outfit recommendations tailored to your unique style.",
      icon: <Heart className="h-6 w-6" />,
      color: isLightTheme ? "from-fuchsia-400 to-purple-400" : "from-fuchsia-500 to-purple-500",
      image: "https://images.unsplash.com/photo-1619208382871-99bb268c8162?q=80&w=600"
    },
    {
      title: "Shop or Save",
      description: "Purchase items you love or save them to your virtual wardrobe for later.",
      icon: <ShoppingCart className="h-6 w-6" />,
      color: isLightTheme ? "from-teal-400 to-cyan-400" : "from-teal-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=600"
    }
  ];
  
  return (
    <section className={`py-20 ${isLightTheme ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            className={`text-sm font-medium uppercase tracking-wider mb-2 ${isLightTheme ? 'text-indigo-600' : 'text-indigo-400'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Simple Process
          </motion.p>
          <motion.h2 
            className={`text-3xl md:text-4xl font-bold mb-4 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className={`text-lg ${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Finding your perfect style has never been easier. In just three simple steps, you'll discover outfits that make you feel confident and look amazing.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className={`rounded-2xl overflow-hidden shadow-lg ${isLightTheme ? 'bg-white' : 'bg-gray-800'} hover:shadow-xl transition-shadow`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
              whileHover={{ y: -5 }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="p-6">
                <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center bg-gradient-to-r ${step.color} text-white`}>
                  {step.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
                  {step.title}
                </h3>
                <p className={`${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Progress Path - Visual connection between steps */}
        <div className="hidden md:block relative mt-8">
          <div className={`absolute top-[40px] left-[25%] right-[25%] h-0.5 ${isLightTheme ? 'bg-gray-200' : 'bg-gray-700'} z-0`}></div>
          <motion.div 
            className={`absolute top-[40px] left-[25%] h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 z-10`}
            initial={{ width: "0%" }}
            whileInView={{ width: "50%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          ></motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
