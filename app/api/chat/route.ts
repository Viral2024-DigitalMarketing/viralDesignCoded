import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();

        const response = await fetch(
            'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputs: { text: message } }),
            }
        );

        if (!response.ok) {
            return NextResponse.json({ reply: "Sorry, I couldn't get a response from the AI model." }, { status: 500 });
        }

        const data = await response.json();
        const botReply = data.generated_text || "Sorry, I couldn't understand that.";

        return NextResponse.json({ reply: botReply });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ reply: "An error occurred. Please try again later." }, { status: 500 });
    }
}
