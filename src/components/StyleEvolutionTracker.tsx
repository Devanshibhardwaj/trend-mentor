
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';

const StyleEvolutionTracker = () => {
  // Mock data for style evolution over time
  const styleData = [
    { month: 'Jan', casual: 70, formal: 20, streetwear: 10 },
    { month: 'Feb', casual: 65, formal: 25, streetwear: 10 },
    { month: 'Mar', casual: 60, formal: 30, streetwear: 10 },
    { month: 'Apr', casual: 55, formal: 35, streetwear: 10 },
    { month: 'May', casual: 50, formal: 40, streetwear: 10 },
    { month: 'Jun', casual: 45, formal: 45, streetwear: 10 },
  ];
  
  const colorPalettes = [
    { month: 'Jan', warm: 65, cool: 20, neutral: 15 },
    { month: 'Feb', warm: 60, cool: 25, neutral: 15 },
    { month: 'Mar', warm: 55, cool: 30, neutral: 15 },
    { month: 'Apr', warm: 40, cool: 40, neutral: 20 },
    { month: 'May', warm: 35, cool: 45, neutral: 20 },
    { month: 'Jun', warm: 30, cool: 50, neutral: 20 },
  ];
  
  const styleInsights = [
    {
      title: "Style Evolution",
      description: "Your style has been evolving from primarily casual to incorporating more formal elements.",
      change: "+25% formal wear preference"
    },
    {
      title: "Color Shift",
      description: "You've been transitioning from warm colors to cooler tones over the past six months.",
      change: "+30% cool color palette"
    },
    {
      title: "Pattern Diversity",
      description: "Your pattern choices have become more diverse, with an increase in geometric and subtle prints.",
      change: "+15% pattern variety"
    }
  ];
  
  const currentPreferences = [
    { name: "Formal Wear", value: 45 },
    { name: "Casual Wear", value: 45 },
    { name: "Streetwear", value: 10 },
  ];
  
  const recentlyAdded = [
    { category: "Tops", label: "Blue Oxford Shirt" },
    { category: "Bottoms", label: "Gray Dress Pants" },
    { category: "Footwear", label: "Black Loafers" },
    { category: "Accessories", label: "Silver Watch" },
  ];
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Style Category Evolution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={styleData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="casual" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="formal" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="streetwear" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Current Style Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentPreferences.map((preference) => (
                <div key={preference.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{preference.name}</span>
                    <span className="text-sm text-muted-foreground">{preference.value}%</span>
                  </div>
                  <Progress value={preference.value} className="h-2" />
                </div>
              ))}
              
              <div className="pt-4">
                <h4 className="text-sm font-medium mb-3">Recently Added Items</h4>
                <div className="flex flex-wrap gap-2">
                  {recentlyAdded.map((item, index) => (
                    <Badge key={index} variant="outline" className="px-2 py-1">
                      <span className="text-xs text-muted-foreground mr-1">{item.category}:</span> {item.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Color Palette Evolution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={colorPalettes} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="warm" stroke="#f97316" strokeWidth={2} />
                <Line type="monotone" dataKey="cool" stroke="#0ea5e9" strokeWidth={2} />
                <Line type="monotone" dataKey="neutral" stroke="#8a898c" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {styleInsights.map((insight, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-base">{insight.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
              <Badge className="mt-4" variant="outline">{insight.change}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StyleEvolutionTracker;
