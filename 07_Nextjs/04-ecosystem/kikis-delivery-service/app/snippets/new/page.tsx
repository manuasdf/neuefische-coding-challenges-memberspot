"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addSnippet } from "@/app/actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormSnippet } from "@/lib/services/snippetsService";
import { useRouter } from "next/navigation";

// import Editor from '@monaco-editor/react';

export default function NewSnippetPage() {
  const router = useRouter();
  console.log(router);
  const { register, handleSubmit, formState: { errors } } = useForm<FormSnippet>();
  const onSubmit: SubmitHandler<FormSnippet> = async (data: FormSnippet) => {
    await addSnippet(data);
    router.push("/snippets");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-3">
      <Field>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input {...register("title", {
          required: "Please give your snippet a title."
        })} id="title" name="title" placeholder="Title" />
        {errors.title && <p>{errors.title.message}</p>}
      </Field>
      <Field>
        <FieldLabel htmlFor="language">Language</FieldLabel>
      <Input {...register("language", {
          required: "You can leave me blank, but my bugs wear tiny sunglasses and crash with style everywhere."
        })} id="language" name="language" placeholder="Language" />
        {errors.language && <p>{errors.language.message}</p>}
      </Field>
      <Field>
        <FieldLabel htmlFor="description">Description</FieldLabel>
      <Input {...register("description", {
          required: "How would you describe your code?"
        })} id="description" name="description" placeholder="Description" />
        {errors.description && <p>{errors.description.message}</p>}
      </Field>
      <Field>
        <FieldLabel htmlFor="code">Code</FieldLabel>
        {/* <Editor
        height="10vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
      /> */}
      <Input {...register("code", {
          required: "Oh no, there is no code in your snippet."
        })} id="code" name="code" placeholder="Code" />
        {errors.code && <p>{errors.code.message}</p>}
      </Field>
      <Button type="submit">Upload snippet</Button>
    </form>
  );
}
