"use client";

import { FormEvent, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormField from "@/components/FormField";

export default function NewNewsPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("summary", summary);
      form.append("body", body);
      if (image) form.append("image", image);

      await api.post("/news", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      router.push("/");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page flex flex-col items-center mx-auto p-4">
      <Header actionLabel="Voltar" actionHref="/" />

      <section className="w-full mt-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">

          <div className="px-6 py-6 md:px-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Nova <span className="text-[#199BD7]">Notícia</span>
            </h2>
          </div>

          <div className="border-t border-gray-200" />

          <form onSubmit={onSubmit} className="px-6 py-6 md:px-8 space-y-6">
            <FormField
              id="title"
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <FormField
              id="summary"
              label="Resumo"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />

            <FormField
              as="textarea"
              id="body"
              label="Corpo"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={8}
            />

            <div className="flex flex-wrap items-center gap-4">
              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
              <label
                htmlFor="image"
                className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-[#199BD7] px-4 py-2.5 text-sm font-medium text-white
               transition-colors hover:bg-[#157FB0] focus-visible:outline-none focus-visible:ring-2
               focus-visible:ring-[#199BD7]/40 focus-visible:ring-offset-2"
              >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828l6.364-6.364a4 4 0 00-5.656-5.656L5.05 10.95a6 6 0 108.485 8.485l7.071-7.071"
                  />
                </svg>
                Selecionar imagem
              </label>
              <span className="text-sm text-gray-600">
                {image ? image.name : "Nenhum arquivo selecionado"}
              </span>
            </div>


            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="cursor-pointer inline-flex items-center justify-center rounded-md bg-[#199BD7] px-5 py-2.5 text-sm font-medium text-white
                           transition-colors hover:bg-[#157FB0] focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-[#199BD7]/40 focus-visible:ring-offset-2 disabled:opacity-60"
              >
                {submitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
