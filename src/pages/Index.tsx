
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Flashcard, { FlashcardData } from "@/components/Flashcard";
import CreateFlashcard from "@/components/CreateFlashcard";
import Progress from "@/components/Progress";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

// Leitner System intervals (in days)
const BOX_INTERVALS = {
  1: 1,
  2: 3,
  3: 7,
  4: 14,
  5: 30,
};

const Index = () => {
  const [cards, setCards] = useState<FlashcardData[]>([]);
  const [currentCard, setCurrentCard] = useState<FlashcardData | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedCards = localStorage.getItem("flashcards");
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(cards));
  }, [cards]);

  const getDueCards = () => {
    return cards.filter((card) => new Date(card.nextReview) <= new Date());
  };

  const updateCardBox = (card: FlashcardData, isCorrect: boolean) => {
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        const newBox = isCorrect ? Math.min(c.box + 1, 5) : 1;
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + BOX_INTERVALS[newBox]);
        return { ...c, box: newBox, nextReview };
      }
      return c;
    });
    setCards(newCards);
    const dueCards = getDueCards();
    setCurrentCard(dueCards.length > 0 ? dueCards[0] : null);
  };

  const handleCorrect = () => {
    if (currentCard) {
      updateCardBox(currentCard, true);
      toast({
        title: "Great job!",
        description: "Card moved to next box.",
      });
    }
  };

  const handleIncorrect = () => {
    if (currentCard) {
      updateCardBox(currentCard, false);
      toast({
        title: "Keep practicing",
        description: "Card moved back to box 1.",
      });
    }
  };

  const createCard = (question: string, answer: string) => {
    const newCard: FlashcardData = {
      id: crypto.randomUUID(),
      question,
      answer,
      box: 1,
      nextReview: new Date(),
    };
    setCards([...cards, newCard]);
  };

  useEffect(() => {
    const dueCards = getDueCards();
    if (dueCards.length > 0 && !currentCard) {
      setCurrentCard(dueCards[0]);
    }
  }, [cards, currentCard]);

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Flashcard Master</h1>
          <p className="text-muted-foreground">
            Master your knowledge with the Leitner System
          </p>
        </header>

        <Progress cards={cards} />

        <div className="flex justify-center space-x-4">
          <Button onClick={() => setShowCreate(!showCreate)}>
            {showCreate ? "Review Cards" : "Create New Card"}
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {showCreate ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <CreateFlashcard onCreateCard={createCard} />
            </motion.div>
          ) : currentCard ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Flashcard
                card={currentCard}
                onCorrect={handleCorrect}
                onIncorrect={handleIncorrect}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                No cards due for review! Create new cards or come back later.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
