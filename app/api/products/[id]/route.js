import fs from "node:fs/promises";
import path from "node:path";

const DATA_PATH = path.join(process.cwd(), "app", "data", "products.json");

async function readProducts() {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

async function writeProducts(products) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(products, null, 2));
}

export async function DELETE(_req, context) {
  const { id: idParam } = await context.params;
  const id = Number(idParam);


  const products = await readProducts();
  const idx = products.findIndex((p) => Number(p.id) === id);

  if (idx === -1) {
    return Response.json({ error: "Product not found", requestedId: idParam }, { status: 404 });
  }

  const removed = products[idx];
  products.splice(idx, 1);
  await writeProducts(products);

  return Response.json({ ok: true, removed });
}

export async function PUT(req, context) {
  const { id: idParam } = await context.params;
  const id = Number(idParam);
  const body = await req.json();


  const products = await readProducts();
  const idx = products.findIndex((p) => Number(p.id) === id);

  if (idx === -1) {
    return Response.json({ error: "Product not found", requestedId: idParam, availableIds: products.map((p) => p.id) }, { status: 404 });
  }

  const current = products[idx];

  const updated = {
    ...current,
    name: body.name ?? current.name,
    category: body.category ?? current.category,
    price: body.price !== undefined ? Number(body.price) : current.price,
    originalPrice:
      body.originalPrice !== undefined
        ? Number(body.originalPrice)
        : current.originalPrice,
    image: body.image ?? current.image,
    colors: Array.isArray(body.colors)
      ? body.colors
      : typeof body.colors === "string"
        ? body.colors
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : current.colors,
    rating: body.rating !== undefined ? Number(body.rating) : current.rating,
    badge: body.badge ?? current.badge,
  };

  products[idx] = updated;
  await writeProducts(products);

  return Response.json(updated, { status: 200 });
}

