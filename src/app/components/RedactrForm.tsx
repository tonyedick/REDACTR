'use client'

import { AiFillTrophy } from "react-icons/ai";
import Button from "./Button";
import Heading from "./Heading";
import TextArea from "./inputs/TextArea";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";

const RedactrForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [originalContent, setOriginalContent] = useState("");
  const [redactedContent, setRedactedContent] = useState("");
  const [stats, setStats] = useState<{ 
    wordsScanned: number; 
    matchedWords: number; 
    charactersScrambled: number } | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
  });

  useEffect(() => {
    const statsContainer = document.getElementById("stats-container");
    if (statsContainer) {
      statsContainer.scrollTop = statsContainer.scrollHeight;
    }
  }, [stats]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    
    const content = data.content || "";
    const wordsToRedact = (data.wordsToRedact || "").split(" ");
    const replacementChar = data.replacementChar || "*";

    const updatedContent = content
    .replace(/[\w'-]+|[^\w\s'-]/gi, (word: string) =>
        wordsToRedact.includes(word.toLowerCase())
          ? replacementChar.repeat(word.length)
          : word
      );

    setOriginalContent(content);
    setRedactedContent(updatedContent);

    const stats = {
      wordsScanned: content.split(/\s+/).length,
      matchedWords: wordsToRedact.length,
      charactersScrambled: updatedContent.length,
    };

    setStats(stats);

    toast.success("Redacting words now!");
    console.log("Stats:", stats);

    // Clear input fields
    setValue("content", "");
    setValue("wordsToRedact", "");
    setValue("replacementChar", "");

    setIsLoading(false);
  };

  return (
    <>
     <div id="stats-container" style={{ height: "30px", overflowY: "auto", border: "1px solid #ccc", padding: "5px" }}>
        {stats && (
          <p>
            Words Scanned: {stats.wordsScanned}, Matched Words: {stats.matchedWords}, Characters Scrambled:{" "}
            {stats.charactersScrambled}
          </p>
        )}
      </div>
      <Heading title="Scramble those words" />
      <AiFillTrophy size={32} />
      <hr className="bg-slate-300 w-full h-px" />

      <TextArea
        id="content"
        label="Paste the content here.."
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <TextArea
        id="wordsToRedact"
        label="Specify the words you wish to scramble, separate words with space"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <TextArea
        id="replacementChar"
        label="Specify the replacement character (e.g., *, ?, -)"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Button
        label={isLoading ? "Loading..." : "Redact Now"}
        onClick={handleSubmit(onSubmit)}
      />

      {/* Display the original and redacted content */}
      {originalContent && redactedContent && (
        <>
          <hr className="bg-slate-300 w-full h-px my-4" />
          <Heading title="Results" />

          <div className="mb-4">
            <strong>Original Content:</strong>
            <p>{originalContent}</p>
          </div>

          <div>
            <strong>Redacted Content:</strong>
            <p>{redactedContent}</p>
          </div>
        </>
      )}
    </>
  );
};

export default RedactrForm;