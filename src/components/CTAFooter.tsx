
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";

const CTAFooter = () => {
  const { theme } = useTheme();
  const isLightTheme = theme === "sunset" || theme === "forest" || theme === "system";
  
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=2000)`,
          }}
        >
          <div className="absolute inset-0" style={{
            background: isLightTheme ? 
              'linear-gradient(to right, rgba(255,255,255,0.95), rgba(240,240,255,0.85))' : 
              'linear-gradient(to right, rgba(20,20,40,0.95), rgba(40,20,80,0.85))'
          }}></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className={`text-sm font-medium uppercase tracking-wider mb-3 ${isLightTheme ? 'text-indigo-600' : 'text-indigo-400'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Start Your Journey
          </motion.p>
          
          <motion.h2
            className={`text-3xl md:text-5xl font-bold mb-6 ${isLightTheme ? 'text-gray-800' : 'text-white'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ready to Meet Your Perfect Style Match?
          </motion.h2>
          
          <motion.p 
            className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands who have discovered their unique style identity with our AI-powered fashion assistant. It only takes a few minutes to start your transformation.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/auth?tab=register">
              <Button 
                className={`px-8 py-6 rounded-full text-lg ${
                  isLightTheme ?
                    'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600' :
                    'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                } text-white shadow-lg hover:shadow-xl group transition-all`}
              >
                Take the Style Quiz
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/gallery">
              <Button 
                variant="outline"
                className={`px-8 py-6 rounded-full text-lg border-2 ${
                  isLightTheme ?
                    'border-indigo-300 hover:border-indigo-400 text-indigo-700' :
                    'border-indigo-500 hover:border-indigo-400 text-white'
                } hover:shadow-lg transition-all`}
              >
                Explore Styles
              </Button>
            </Link>
          </motion.div>
          
          {/* Floating Elements for Visual Interest */}
          <motion.div 
            className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-30"
            animate={{ 
              y: [0, -15, 0], 
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity
            }}
            style={{
              background: isLightTheme ? 
                'linear-gradient(45deg, rgba(180,180,255,0.7), rgba(200,140,255,0.7))' : 
                'linear-gradient(45deg, rgba(80,80,180,0.7), rgba(140,80,200,0.7))',
              filter: 'blur(20px)'
            }}
          />
          
          <motion.div 
            className="absolute bottom-10 right-10 w-32 h-32 rounded-full opacity-30"
            animate={{ 
              y: [0, 20, 0], 
              rotate: [0, -15, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity
            }}
            style={{
              background: isLightTheme ? 
                'linear-gradient(45deg, rgba(140,210,200,0.7), rgba(170,200,230,0.7))' : 
                'linear-gradient(45deg, rgba(60,130,120,0.7), rgba(60,100,170,0.7))',
              filter: 'blur(20px)'
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default CTAFooter;
