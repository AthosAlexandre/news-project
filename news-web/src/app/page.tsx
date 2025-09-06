import Link from "next/link";
import { api } from "@/lib/api";
import { News } from "@/types/news";
import { absUrl } from "@/lib/img";
import Image from "next/image";

async function getNews(): Promise<News[]> {
  const res = await api.get<News[]>("/news", { headers: { "Cache-Control": "no-store" } });
  return res.data;
}

export default async function HomePage() {
  const news = await getNews();

  return (
    <main className="page flex flex-col items-center mx-auto p-4">
      <header className="flex bg-white h-20 w-full max-w-full items-center justify-between p-12">
        <Image
          src="/Logo.png"
          alt="Logo"
          width={120} // ajuste o tamanho que quiser
          height={40}
          priority
        />
        <Link
          href="/news/new"
          className="text-[#199BD7] no-underline visited:text-[#199BD7] hover:text-[#0F6DA0] hover:underline underline-offset-2 decoration-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#199BD7]/40 rounded-sm"
        >
          Nova notícia
        </Link>
      </header>


      <section className="w-full mt-8 max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {news.map((item) => (
          <article
            key={item.id}
            className="p-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
          >
            {item.imageUrl ? (
              <img
                src={absUrl(item.imageUrl)}
                alt={item.title}
                className="h-44 w-full object-cover"
              />
            ) : (
              <div className="h-44 w-full bg-gray-100" />
            )}

            {/* Conteúdo do card */}
            <div className="">
              <h2 className="text-lg font-semibold leading-tight">{item.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{item.summary}</p>

              <div className="mt-4">
                <Link
                  href={`/news/${item.id}`}
                  className="inline-flex items-center gap-2 rounded-md bg-[#199BD7] px-4 py-2.5 text-sm font-medium text-white
               transition-colors hover:bg-[#0F6DA0]
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#199BD7]/40 focus-visible:ring-offset-2"
                >
                  Saiba mais
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
