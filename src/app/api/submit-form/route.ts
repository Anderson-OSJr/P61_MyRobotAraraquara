import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nome, email, telefone } = body;

    if (!nome || !email || !telefone) {
      return NextResponse.json(
        { error: "Nome, email e telefone são obrigatórios" },
        { status: 400 }
      );
    }

    // Create a new user with the form data
    const user = await prisma.usuario.create({
      data: {
        nome,
        email,
        telefone,
      },
    });

    console.log("Created user:", user);

    // Fetch all users
    const allUsers = await prisma.usuario.findMany();

    return NextResponse.json(
      {
        message: "✓ Usuário criado com sucesso!",
        user,
        allUsers,
      },
      { status: 201 }
    );
  } catch (error) {
    let errorMessage = "Erro desconhecido";
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Mensagens mais amigáveis para erros comuns
      if (error.message.includes("Unique constraint failed")) {
        errorMessage = "Unique constraint failed on the fields: (`email`)";
      }
    }
    
    console.error("Erro ao criar usuário:", errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
