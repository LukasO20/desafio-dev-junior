import { NextResponse } from "next/server";

//Capturar Produtos da fakestoreapi

export async function GET(req: Request) {
   try {
      const response = await fetch('https://fakestoreapi.com/products', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         }
      });

      const data = await response.json();
      return NextResponse.json(data);
   }
   catch (err: unknown) {
      let errorMessage = 'Failed to get products';

      if (err instanceof Error) {
         errorMessage = err.message;
      }

      return NextResponse.json({
         status: 500,
         error: errorMessage
      });
   }
}