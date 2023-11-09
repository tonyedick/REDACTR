'use client'

import { AiFillTrophy } from "react-icons/ai";
import Button from "./Button";
import Heading from "./Heading";
import TextArea from "./inputs/TextArea";
import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";

const RedactrForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [redactedContent, setRedactedContent] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    
    const content = data.content || "";
    const wordsToRedact = (data.wordsToRedact || "").split(" ");
    const replacementChar = data.replacementChar || "*";

    const updatedContent = content
    .split(" ")
    .map((word: string) => (wordsToRedact.includes(word.toLowerCase()) ? replacementChar.repeat(word.length) : word))
    .join(" ");

    setRedactedContent(updatedContent);

    const stats = {
      wordsScanned: content.split(" ").length,
      matchedWords: wordsToRedact.length,
      charactersScrambled: updatedContent.length,
    };

    toast.success("Redacting words now!");
    console.log("Stats:", stats);

    setIsLoading(false);
  };

  return (
    <>
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
        label="Specify the words you wish to scramble, separate multiple words with space"
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
      {redactedContent && (
        <>
          <hr className="bg-slate-300 w-full h-px my-4" />
          <Heading title="Results" />

          <div className="mb-4">
            <strong>Original Content:</strong>
            <p>{redactedContent}</p>
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