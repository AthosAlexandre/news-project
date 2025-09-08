import Link from "next/link";
import { api } from "@/lib/api";
import { News } from "@/types/news";
import { absUrl } from "@/lib/img";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

async function getNews(id: string): Promise<News> {
  const res = await api.get<News>(`/news/${id}`, { headers: { "Cache-Control": "no-store" } });
  return res.data;
}

export default async function NewsDetail({ params }: { params: { id: string } }) {
  const item = await getNews(params.id);

  return (
    <main className="page flex flex-col items-center mx-auto p-4">
      
      <Header actionLabel="Voltar" actionHref="/" />

      <section className="w-full mt-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">

          <article className="px-6 py-6 md:px-8 space-y-6">
            <h1 className="text-3xl font-bold">{item.title}</h1>

            {item.imageUrl && (
              <img
                src={absUrl(item.imageUrl)}
                alt={item.title}
                className="w-full max-h-[400px] object-cover rounded"
              />
            )}

            <p className="text-lg text-gray-700">{item.summary}</p>

            <div className="prose max-w-none whitespace-pre-wrap text-gray-800">
              {item.body}
            </div>

            <div className="pt-6 flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-800
                           transition-colors hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-gray-400/40 focus-visible:ring-offset-2"
              >
                ← Voltar
              </Link>
              <Link
                href={`/news/${item.id}/edit`}
                className="inline-flex items-center gap-2 rounded-md bg-[#199BD7] px-4 py-2.5 text-sm font-medium text-white
                           transition-colors hover:bg-[#157FB0] focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-[#199BD7]/40 focus-visible:ring-offset-2"
              >
                Editar
              </Link>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
