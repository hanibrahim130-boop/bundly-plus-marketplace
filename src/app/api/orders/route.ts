import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { productId, amount, paymentMethod, email } = body;

    if (!productId || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        productId,
        amount,
        paymentMethod,
        userEmail: email || session?.user?.email,
        userId: session?.user?.id,
        status: 'PENDING',
      },
      include: {
        product: true,
      }
    });

    if (order.userEmail) {
      await sendOrderConfirmationEmail(order.userEmail, order);
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
