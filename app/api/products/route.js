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

export async function GET() {
  const products = await readProducts();
  return Response.json(products);
}

export async function POST(req) {
  const body = await req.json();

  const products = await readProducts();
  const nextId = products.reduce((m, p) => Math.max(m, p.id || 0), 0) + 1;

  const product = {
    id: nextId,
    name: body.name,
    category: body.category,
    price: Number(body.price),
    originalPrice: Number(body.originalPrice),
    image: body.image,
    colors: Array.isArray(body.colors)
      ? body.colors
      : typeof body.colors === "string"
        ? body.colors
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    rating: Number(body.rating || 0),
    badge: body.badge,
  };

  products.push(product);
  await writeProducts(products);

  return Response.json(product, { status: 201 });
}

// Optional: allow full replacement via PUT /api/products (not used by UI)
export async function PUT(req) {
  const body = await req.json();
  return Response.json({ ok: true, received: body });
}


