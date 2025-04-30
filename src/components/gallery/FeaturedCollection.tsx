
import { motion } from 'framer-motion';
import ExhibitFrame from './ExhibitFrame';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';
import { toast } from 'sonner';

interface CollectionItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface FeaturedCollectionProps {
  title: string;
  description: string;
  items: CollectionItem[];
}

const FeaturedCollection = ({
  title,
  description,
  items
}: FeaturedCollectionProps) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {items.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <ExhibitFrame
                image={item.image}
                title={item.title}
                description={item.description}
                onClick={() => toast.info(`View details for ${item.title} coming soon!`)}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            className="rounded-full px-8 border-black/20 hover:bg-black/5"
            onClick={() => toast.info("View all collection coming soon!")}
          >
            <Image className="h-4 w-4 mr-2" />
            View Full Collection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollection;
