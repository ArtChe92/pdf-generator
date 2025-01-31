import { NextRequest, NextResponse } from "next/server";
// import { IData, setData } from "../data/route";
import puppeteer from "puppeteer";

export interface IData {
  id: number;
  name: string;
}

let storedData: IData[] | null = null;

export async function POST(req: NextRequest) {
  try {
    storedData = await req.json();

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/", {
      waitUntil: "domcontentloaded",
    });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": pdfBuffer.length.toString(),
        "Content-Disposition": 'inline; filename="document.pdf"',
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(storedData);
}
