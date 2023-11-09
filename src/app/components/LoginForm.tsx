"use client";

import { AiFillTrophy } from "react-icons/ai";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import TextArea from "../components/inputs/TextArea";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
  });


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
  };

  return (
    <>
      <Heading title="Scramble those words" />
      <AiFillTrophy size={32} />
      <hr className="bg-slate-300 w-full h-px" />
      <TextArea
        id="description"
        label="Paste the content here.."
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Specify the words you wish to scramble, separate multiple words with space"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? "Loading..." : "Redact Now"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default LoginForm;
