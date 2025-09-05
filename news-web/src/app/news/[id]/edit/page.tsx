"use client";
import { useEffect, useState, FormEvent } from "react";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { News } from "@/types/news";

export default function EditNewsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<News | null>(null);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    (async () => {
      const res = await api.get<News>(`/news/${params.id}`);
      setData(res.data);
    })();
  }, [params.id]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!data) return;

    const form = new FormData();
    if (data.title) form.append("title", data.title);
    if (data.summary) form.append("summary", data.summary);
    if (data.body) form.append("body", data.body);
    if (image) form.append("image", image);

    await api.put(`/news/${params.id}`, form, { headers: { "Content-Type": "multipart/form-data" }});
    router.push(`/news/${params.id}`);
  }

  if (!data) return <main className="max-w-3xl mx-auto p-4">Carregando…</main>;

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-4">
      <Link href={`/news/${params.id}`} className="underline">&larr; Voltar</Link>
      <h1 className="text-2xl font-bold">Editar notícia</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <input className="border p-2 w-full" value={data.title} onChange={e=>setData({...data, title: e.target.value})} />
        <input className="border p-2 w-full" value={data.summary} onChange={e=>setData({...data, summary: e.target.value})} />
        <textarea className="border p-2 w-full min-h-[180px]" value={data.body} onChange={e=>setData({...data, body: e.target.value})} />
        <input type="file" onChange={e=>setImage(e.target.files?.[0] || null)} />
        <button className="border px-4 py-2 rounded">Salvar</button>
      </form>
    </main>
  );
}
