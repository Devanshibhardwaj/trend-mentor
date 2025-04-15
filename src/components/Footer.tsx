
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-secondary/30 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-medium tracking-tight">Trendsetter</h3>
          <p className="text-muted-foreground text-sm max-w-md">
            AI-powered outfit recommendations tailored to your unique style, preferences, and body type. Elevate your wardrobe with intelligent fashion suggestions.
          </p>
          <div className="flex space-x-4 pt-2">
            {['Twitter', 'Instagram', 'Facebook', 'Pinterest'].map((social) => (
              <Button key={social} variant="ghost" size="sm" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
                {social}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider">Product</h4>
          <ul className="space-y-2">
            {['Features', 'How It Works', 'Pricing', 'AI Technology', 'Updates'].map((item) => (
              <li key={item}>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider">Company</h4>
          <ul className="space-y-2">
            {['About Us', 'Blog', 'Careers', 'Press', 'Contact'].map((item) => (
              <li key={item}>
                <Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Trendsetter. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Button variant="link" className="p-0 h-auto text-xs text-muted-foreground hover:text-foreground">
            Privacy Policy
          </Button>
          <Button variant="link" className="p-0 h-auto text-xs text-muted-foreground hover:text-foreground">
            Terms of Service
          </Button>
          <Button variant="link" className="p-0 h-auto text-xs text-muted-foreground hover:text-foreground">
            Cookie Policy
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
