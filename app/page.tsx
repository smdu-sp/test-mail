"use client"

import { Button } from "@/components/ui/button";

export default function Home() {
  async function enviarEmail() {
    const res = await fetch(
      `${process.env.BASE_URL || 'http://localhost:3000'}/api/mail`
    );
    console.log(res)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button onClick={async () => { await enviarEmail() }}>Enviar email</Button>
    </div>
  );
}
