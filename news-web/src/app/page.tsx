import Link from "next/link";
import { api } from "@/lib/api";
import { News } from "@/types/news";
import { absUrl } from "@/lib/img";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

async function getNews(): Promise<News[]> {
  
  const res = await api.get<News[]>("/news", { headers: { "Cache-Control": "no-store" } });
  return res.data;
}

export default async function HomePage() {
  const news = await getNews();

  return (
    <main className="page flex flex-col items-center mx-auto p-4">

      <Header actionLabel="Nova notícia" actionHref="/news/new"/>

      <section className="w-full mt-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="px-6 py-6 md:px-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Blog <span className="text-[#199BD7]">SohtaNews</span>
            </h2>
          </div>

          <div className="border-t border-gray-200" />

          <div className="px-6 py-4 md:px-8">
            <p className="text-gray-600">
              Bem-vindo ao nosso blog. Aqui você encontra as últimas notícias,
              análises e destaques do dia. Fique à vontade para explorar e saber mais!
            </p>
          </div>

          <div className="px-6 pb-8 md:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <article
                  key={item.id}
                  className="p-3 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
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

                  <div className="mt-2">
                    <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{item.summary}</p>

                    <div className="mt-4">
                      <Link
                        href={`/news/${item.id}`}
                        className="inline-flex items-center gap-2 rounded-md bg-[#199BD7] px-4 py-2.5 text-sm font-medium text-white
                             transition-colors hover:bg-[#157FB0] focus-visible:outline-none focus-visible:ring-2
                             focus-visible:ring-[#199BD7]/40 focus-visible:ring-offset-2"
                      >
                        Saiba mais
                      </Link>
                    </div>
                  </div>
                </article>
              ))}

            </div>
          </div>
        </div>
      </section>

      <Footer/>

    </main>
  );
}
