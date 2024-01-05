import { type NextRequest, NextResponse } from "next/server";
import { parse } from 'node-html-parser';
export const runtime = "edge";


export async function GET() {
  const url = "https://www.factorio.com/download/archive/";
  const response = await fetch(url);
  const body = await response.text();
  const root = parse(body);
  let html_a = root.querySelectorAll('.slot-button-inline');
  let result = html_a.map((item, index) => {
    return {
      id: index,
      label: item.textContent.trim(),
      value: item.getAttribute("href")
    };
  });


  return NextResponse.json(
    { comments: result},
    {
      status: 200,
    }
  );
}
