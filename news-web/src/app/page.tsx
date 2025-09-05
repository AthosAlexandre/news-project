import Link from "next/link";
import { api } from "@/lib/api";
import { News } from "@/types/news";
import { absUrl } from "@/lib/img";

async function getNews(): Promise<News[]> {
  const res = await api.get<News[]>("/news", { headers: { "Cache-Control": "no-store" } });
  return res.data;
}

export default async function HomePage() {
  const news = await getNews();

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notícias</h1>
        <Link className="underline" href="/news/new">Nova notícia</Link>
      </div>

      <ul className="space-y-4">
        {news.map(item => (
          <li key={item.id} className="border rounded p-4">
            <Link href={`/news/${item.id}`}>
              <div className="space-y-2">
                {item.imageUrl && (
                  <img src={absUrl(item.imageUrl)} alt={item.title} className="w-full h-48 object-cover rounded" />
                )}
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
