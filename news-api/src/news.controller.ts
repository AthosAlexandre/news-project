import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createNewsSchema, updateNewsSchema } from "./news.schema";

const prisma = new PrismaClient();

export async function listNews(req: Request, res: Response) {
  const data = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(data);
}

export async function getNews(req: Request, res: Response) {
  const id = Number(req.params.id);
  const item = await prisma.news.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ message: "Notícia não encontrada" });
  res.json(item);
}

export async function createNews(req: Request, res: Response) {
  const parsed = createNewsSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const imageUrl = (req as any).file ? `/uploads/${(req as any).file.filename}` : null;

  const created = await prisma.news.create({
    data: { ...parsed.data, imageUrl },
  });
  res.status(201).json(created);
}

export async function updateNews(req: Request, res: Response) {
  const id = Number(req.params.id);
  const parsed = updateNewsSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const imageUrl = (req as any).file ? `/uploads/${(req as any).file.filename}` : undefined;

  const updated = await prisma.news.update({
    where: { id },
    data: { ...parsed.data, ...(imageUrl !== undefined ? { imageUrl } : {}) },
  });
  res.json(updated);
}
