import { useState } from "react";
import { useGeminiCorrection } from "../hooks/useGeminiCorrection";
import toast from "react-hot-toast";

const CustomGrammarInput = ({ channel }) => {
  const [input, setInput] = useState("");
  const [corrected, setCorrected] = useState("");

  const { mutate, isPending } = useGeminiCorrection();

  const handleCorrect = () => {
    if (!input.trim()) return toast.error("Enter something to correct.");
    mutate(input, {
      onSuccess: (fixed) => {
        setCorrected(fixed);
        toast.success("Grammar corrected!");
      },
      onError: () => toast.error("Correction failed"),
    });
  };

  const handleSend = async () => {
    const message = corrected || input;
    if (!message.trim()) return;

    await channel.sendMessage({ text: message });

    setInput("");
    setCorrected("");
  };

  return (
    <div className="p-2 border-t bg-white space-y-2">
      <textarea
        rows={2}
        className="w-full border p-2 rounded resize-none"
        placeholder="Type your message..."
        value={corrected || input}
        onChange={(e) => {
          setInput(e.target.value);
          setCorrected("");
        }}
      />
      <div className="flex gap-2">
        <button
          onClick={handleCorrect}
          disabled={isPending}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          ✏️ Correct
        </button>
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          📤 Send
        </button>
      </div>
    </div>
  );
};

export default CustomGrammarInput;
