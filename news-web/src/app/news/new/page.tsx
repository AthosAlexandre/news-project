"use client";
import { FormEvent, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";

export default function NewNewsPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("summary", summary);
    form.append("body", body);
    if (image) form.append("image", image);

    await api.post("/news", form, { headers: { "Content-Type": "multipart/form-data" } });
    router.push("/");
  }

  return (
    <main className="page flex flex-col items-center mx-auto p-4">

      <Header actionLabel="Voltar" actionHref="/"/>

      <h1 className="text-2xl font-bold">Nova notícia</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <input className="border p-2 w-full" placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Resumo" value={summary} onChange={e=>setSummary(e.target.value)} />
        <textarea className="border p-2 w-full min-h-[180px]" placeholder="Corpo" value={body} onChange={e=>setBody(e.target.value)} />
        <input type="file" onChange={e=>setImage(e.target.files?.[0] || null)} />
        <button className="border px-4 py-2 rounded">Salvar</button>
      </form>
    </main>
  );
}
