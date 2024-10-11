import connectToDatabase from "@/app/libs/mongodb";
import Category from "@/app/models/Category";

export async function GET() {
  await connectToDatabase();

  try {
    const category = await Category.find({});
    return new Response(JSON.stringify({ success: true, data: category }), {
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

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const category = await Category.create(body);
    return new Response(JSON.stringify({ success: true, data: category }), {
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
