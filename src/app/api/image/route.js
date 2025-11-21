import { NextResponse } from "next/server";
import { put } from '@vercel/blob';
import { getStoreXTenant } from "../utils/getStoreXTenant"; 

export async function POST(request) {
  const xTenant = getStoreXTenant(request);
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder");

const folderPrefix = folder ? `${folder}/` : '';


  try {
    const form = await request.formData();
    const file = form.get("file"); 


    if (!file) {
      return NextResponse.json(
        { message: "Nenhum arquivo enviado" },
        { status: 400 } // Bad Request
      );
    }
    
    const originalFilename = file.name || '_file';

    const getFileExtension = (filename) => {
      const parts = filename.split('.');
      return parts.length > 1 ? '.' + parts.pop() : ''; 
    };

    const fileExtension = getFileExtension(originalFilename);
    const filename = `${folderPrefix}${xTenant.userId}_${new Date().getTime()}${fileExtension}`;

    const { url } = await put(filename, file, { 
      access: 'public',
      contentType: file.type
    });
    
    return NextResponse.json({
      url, 
      filename,
    }, { status: 200 });

  } catch (e) {
    // 6. Tratamento de Erro
    console.error("Erro no upload:", e); 
    return NextResponse.json(
      { message: "Falha no upload do arquivo. Tente novamente." }, 
      { status: 500 } // Internal Server Error
    );
  }
}