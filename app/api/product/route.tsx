import connectToDatabase from "@/app/libs/mongodb";
import Product from "@/app/models/Product";

export async function GET(req: any) {
  await connectToDatabase();

  try {
    const products = await Product.find({});
    return new Response(JSON.stringify({ success: true, data: products }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: any) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const product = await Product.create(body);
    return new Response(JSON.stringify({ success: true, data: product }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
