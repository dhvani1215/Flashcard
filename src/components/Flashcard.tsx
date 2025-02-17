
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  box: number;
  nextReview: Date;
}

interface FlashcardProps {
  card: FlashcardData;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const Flashcard = ({ card, onCorrect, onIncorrect }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto perspective-1000">
      <motion.div
        className="relative w-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Card
          className={`p-8 min-h-[300px] flex flex-col items-center justify-center text-center bg-card shadow-lg transform-style-preserve-3d cursor-pointer ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          onClick={handleFlip}
        >
          <div
            className={`absolute inset-0 p-8 flex flex-col items-center justify-center backface-hidden ${
              isFlipped ? "hidden" : ""
            }`}
          >
            <span className="text-sm text-muted-foreground mb-2">Question</span>
            <h3 className="text-2xl font-semibold mb-4">{card.question}</h3>
            <p className="text-sm text-muted-foreground mt-4">
              Click to reveal answer
            </p>
          </div>
          <div
            className={`absolute inset-0 p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180 ${
              !isFlipped ? "hidden" : ""
            }`}
          >
            <span className="text-sm text-muted-foreground mb-2">Answer</span>
            <p className="text-xl mb-8">{card.answer}</p>
            <div className="flex gap-4 mt-auto">
              <Button
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onIncorrect();
                }}
              >
                Incorrect
              </Button>
              <Button
                variant="default"
                onClick={(e) => {
                  e.stopPropagation();
                  onCorrect();
                }}
              >
                Correct
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Flashcard;
