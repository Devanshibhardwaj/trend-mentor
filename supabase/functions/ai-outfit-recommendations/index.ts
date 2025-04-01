
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { wardrobeItems, occasion } = await req.json();
    
    if (!wardrobeItems || !Array.isArray(wardrobeItems) || wardrobeItems.length < 2) {
      return new Response(
        JSON.stringify({ error: 'You need at least 2 wardrobe items to generate an outfit' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'API key for AI service is not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    // Format wardrobe items for the AI prompt
    const itemsByCategory: Record<string, any[]> = {};
    wardrobeItems.forEach(item => {
      if (!itemsByCategory[item.category]) {
        itemsByCategory[item.category] = [];
      }
      itemsByCategory[item.category].push(item);
    });

    // Create AI prompt
    const categoriesText = Object.entries(itemsByCategory)
      .map(([category, items]) => {
        return `${category}: ${items.map(item => item.name).join(', ')}`;
      })
      .join('\n');

    const prompt = `You are a fashion stylist assistant that creates trendy outfit combinations.
    
Current fashion trends include:
- Monochromatic outfits with one pop of color
- Smart casual combinations
- Sustainable and versatile pieces that can be mixed and matched
- Relaxed fits combined with structured pieces

Here are the available clothing items by category:
${categoriesText}

Based on these items, create a trendy ${occasion} outfit. Select one item from each available category that would create a cohesive, fashionable outfit. Explain why this combination works well and matches current trends.

Return your response as JSON in this format:
{
  "outfit": {
    "top": {"id": "item_id", "name": "item_name"},
    "bottom": {"id": "item_id", "name": "item_name"},
    "outerwear": {"id": "item_id", "name": "item_name"},
    "footwear": {"id": "item_id", "name": "item_name"},
    "accessories": {"id": "item_id", "name": "item_name"}
  },
  "explanation": "Explanation of why this outfit works and follows trends",
  "trend": "The specific trend this outfit follows"
}

Note: Only include categories that exist in the provided wardrobe items.`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a fashion stylist assistant that helps create trendy outfit combinations.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response from AI service');
    }

    // Parse the AI response
    let aiResponse;
    try {
      const responseText = data.choices[0].message.content;
      // Extract JSON from the response (in case the AI wraps it in markdown or adds additional text)
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || 
                       responseText.match(/```\n([\s\S]*?)\n```/) || 
                       responseText.match(/{[\s\S]*?}/);
      
      const jsonText = jsonMatch ? jsonMatch[0].replace(/```json\n|```\n|```/g, '') : responseText;
      aiResponse = JSON.parse(jsonText.trim());
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.log('Raw AI response:', data.choices[0].message.content);
      throw new Error('Could not parse AI response');
    }

    // Return the AI recommendation
    return new Response(JSON.stringify(aiResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in AI outfit recommendation function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
