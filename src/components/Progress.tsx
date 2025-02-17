
import { Card } from "./ui/card";
import type { FlashcardData } from "./Flashcard";

interface ProgressProps {
  cards: FlashcardData[];
}

const Progress = ({ cards }: ProgressProps) => {
  const totalCards = cards.length;
  const dueToday = cards.filter(
    (card) => new Date(card.nextReview) <= new Date()
  ).length;
  const boxCounts = cards.reduce((acc, card) => {
    acc[card.box] = (acc[card.box] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return (
    <Card className="p-6 w-full max-w-xl mx-auto bg-card">
      <h3 className="text-lg font-semibold mb-4">Progress Overview</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Total Cards:</span>
          <span className="font-medium">{totalCards}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Due Today:</span>
          <span className="font-medium">{dueToday}</span>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Cards by Box:
          </h4>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((box) => (
              <div
                key={box}
                className="flex flex-col items-center p-2 bg-muted rounded"
              >
                <span className="text-xs text-muted-foreground">Box {box}</span>
                <span className="font-medium">{boxCounts[box] || 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Progress;
