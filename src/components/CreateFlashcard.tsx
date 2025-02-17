
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface CreateFlashcardProps {
  onCreateCard: (question: string, answer: string) => void;
}

const CreateFlashcard = ({ onCreateCard }: CreateFlashcardProps) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both question and answer fields.",
        variant: "destructive",
      });
      return;
    }
    onCreateCard(question, answer);
    setQuestion("");
    setAnswer("");
    toast({
      title: "Success",
      description: "Flashcard created successfully!",
    });
  };

  return (
    <Card className="p-6 w-full max-w-xl mx-auto bg-card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="question"
            className="block text-sm font-medium text-muted-foreground mb-1"
          >
            Question
          </label>
          <Input
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
            className="w-full"
          />
        </div>
        <div>
          <label
            htmlFor="answer"
            className="block text-sm font-medium text-muted-foreground mb-1"
          >
            Answer
          </label>
          <Textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter the answer"
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full">
          Create Flashcard
        </Button>
      </form>
    </Card>
  );
};

export default CreateFlashcard;
