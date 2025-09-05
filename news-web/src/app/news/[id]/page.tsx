import Link from "next/link";
import { api } from "@/lib/api";
import { News } from "@/types/news";
import { absUrl } from "@/lib/img";

async function getNews(id: string): Promise<News> {
  const res = await api.get<News>(`/news/${id}`, { headers: { "Cache-Control": "no-store" } });
  return res.data;
}

export default async function NewsDetail({ params }: { params: { id: string } }) {
  const item = await getNews(params.id);

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-4">
      <Link href="/" className="underline">&larr; Voltar</Link>
      <article className="space-y-4">
        <h1 className="text-3xl font-bold">{item.title}</h1>
        {item.imageUrl && (
          <img src={absUrl(item.imageUrl)} alt={item.title} className="w-full h-48 object-cover rounded" />
        )}
        <p className="text-gray-700">{item.summary}</p>
        <div className="prose max-w-none whitespace-pre-wrap">{item.body}</div>

        <Link href={`/news/${item.id}/edit`} className="inline-block underline">Editar</Link>
      </article>
    </main>
  );
}
