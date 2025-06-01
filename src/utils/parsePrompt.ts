
export interface ParsedPrompt {
  mood: "all" | "work" | "date" | "chill";
  style: "all" | "minimal" | "street" | "ethnic";
  budget: number;
}

export const parsePrompt = (prompt: string): ParsedPrompt => {
  const promptLower = prompt.toLowerCase();
  
  // Parse mood from prompt
  let mood: "all" | "work" | "date" | "chill" = 'all';
  if (promptLower.includes('work') || promptLower.includes('office')) {
    mood = 'work';
  } else if (promptLower.includes('date') || promptLower.includes('party')) {
    mood = 'date';
  } else if (promptLower.includes('casual') || promptLower.includes('relax') || promptLower.includes('chill')) {
    mood = 'chill';
  }
  
  // Parse style from prompt
  let style: "all" | "minimal" | "street" | "ethnic" = 'all';
  if (promptLower.includes('minimal') || promptLower.includes('clean')) {
    style = 'minimal';
  } else if (promptLower.includes('street') || promptLower.includes('urban')) {
    style = 'street';
  } else if (promptLower.includes('ethnic') || promptLower.includes('traditional')) {
    style = 'ethnic';
  }
  
  // Parse budget from prompt
  let budget = 100;
  const budgetMatch = promptLower.match(/(\d+)k|₹(\d+)/);
  if (budgetMatch) {
    if (budgetMatch[1]) {
      budget = parseInt(budgetMatch[1]) * 1000;
    } else if (budgetMatch[2]) {
      budget = parseInt(budgetMatch[2]);
    }
  }
  
  return {
    mood,
    style,
    budget
  };
};
