import connectToDatabase from "@/app/libs/mongodb";
import Cart from "@/app/models/Cart";

// Correctly typing the request object
export async function GET() {
  await connectToDatabase();

  try {
    const cart = await Cart.find({});
    return new Response(JSON.stringify({ success: true, data: cart }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (_error) {
    // Ignore error since it's unused
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const cart = await Cart.create(body);
    return new Response(JSON.stringify({ success: true, data: cart }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (_error) {
    // Ignore error since it's unused
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
