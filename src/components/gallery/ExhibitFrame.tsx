
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ExhibitFrameProps {
  image: string;
  title: string;
  description: string;
  className?: string;
  spotlightEffect?: boolean;
  onClick?: () => void;
}

const ExhibitFrame = ({
  image,
  title,
  description,
  className,
  spotlightEffect = true,
  onClick
}: ExhibitFrameProps) => {
  return (
    <motion.div 
      className={cn(
        "group relative overflow-hidden cursor-pointer",
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      {/* Frame border */}
      <div className="absolute inset-0 border-[12px] border-[#f8f8f8] rounded-lg shadow-md z-10"></div>
      
      {/* Spotlight effect */}
      {spotlightEffect && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_60%)]"></div>
        </div>
      )}
      
      {/* Image */}
      <div className="aspect-[3/4] w-full">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-serif text-lg md:text-xl font-medium">{title}</h3>
        <p className="text-sm text-white/80 mt-1 line-clamp-2">{description}</p>
      </div>
    </motion.div>
  );
};

export default ExhibitFrame;
