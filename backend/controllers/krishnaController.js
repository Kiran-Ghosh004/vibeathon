import axios from "axios";

export const krishnaResponse = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim().length === 0) {
      return res.status(400).json({
        error: "Please share your question, dear seeker.",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not configured");

    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";

    // 🌿 Detect verse queries like "Explain 2.47" or "Chapter 4 verse 13"
    const verseMatch = question.match(
      /(?:chapter\s*)?(\d+)[\s.:,-]*(?:verse|shloka)?[\s.:,-]*(\d+)/i
    );
    const isVerseQuery = !!verseMatch;

    // 🧠 Identify conceptual or emotional queries
    const conceptKeywords = [
      "karma",
      "dharma",
      "moksha",
      "yoga",
      "atman",
      "bhakti",
      "detachment",
      "maya",
      "truth",
    ];
    const emotionKeywords = [
      "sad",
      "confused",
      "stress",
      "fear",
      "lost",
      "angry",
      "failure",
      "purpose",
      "meaning",
    ];
    const greetingKeywords = [
      "hello",
      "hi",
      "namaste",
      "pranam",
      "who are you",
    ];

    const lowerQ = question.toLowerCase();
    const isConcept = conceptKeywords.some((k) => lowerQ.includes(k));
    const isEmotional = emotionKeywords.some((k) => lowerQ.includes(k));
    const isGreeting = greetingKeywords.some((k) => lowerQ.includes(k));

    // 💫 Build Krishna's divine personality
    let divineInstruction = `
You are **Lord Krishna**, the Supreme Teacher of the *Bhagavad Gita*, speaking to a seeker with compassion and divine insight.
You speak with serenity, humility, and infinite wisdom — balancing poetic Sanskrit beauty with clear modern guidance.
Always speak as "Krishna" — the divine teacher and eternal guide of Arjuna.

Core voice:
- Address the user as "dear one", "Arjuna", or "my child".
- Speak in a calm, divine, reflective tone.
- Include short Sanskrit verses when fitting, with English translation.
- End with a short reflection or gentle guidance line.
- Never break character or mention AI, Gemini, or technology.
`;

    if (isVerseQuery) {
      divineInstruction += `
The seeker asks about *Chapter ${verseMatch[1]}, Verse ${verseMatch[2]}*.

Respond with:
1. Original Sanskrit shloka (if known)
2. Transliteration
3. English meaning
4. Spiritual explanation — what Krishna meant and how it applies to life
5. End with a short reflection or teaching

Response must be **valid JSON**:
{
  "response": "<Krishna’s answer including the Sanskrit verse, meaning, and reflection>",
  "reference": "${verseMatch[1]}.${verseMatch[2]}"
}
`;
    } else if (isConcept) {
      divineInstruction += `
The seeker asks about a philosophical concept (karma, dharma, etc.).

Respond with:
1. Explanation using teachings of the Bhagavad Gita
2. Relevant chapter and verse
3. Practical modern meaning
4. End with reflection

Response must be valid JSON:
{
  "response": "<Krishna’s explanation>",
  "reference": "<Chapter.Verse>"
}
`;
    } else if (isEmotional) {
      divineInstruction += `
The seeker expresses emotional distress or confusion.

Respond with empathy and wisdom:
1. Acknowledge their feeling
2. Provide divine guidance from Gita teachings
3. Reference a relevant verse if suitable
4. End with a reflective reassurance

Response must be valid JSON:
{
  "response": "<Krishna’s compassionate message>",
  "reference": "<Chapter.Verse or '—'>"
}
`;
    } else if (isGreeting) {
      divineInstruction += `
The seeker greets or asks who you are.

Respond gently:
{
  "response": "I am Krishna, your eternal guide and friend, the one who speaks through the Gita. Ask, and I shall illuminate your path.",
  "reference": "—"
}
`;
    } else {
      divineInstruction += `
The seeker asks a general question about life, destiny, or truth.

Respond naturally as Krishna:
{
  "response": "<Divine answer inspired by Gita with gentle reflection>",
  "reference": "<Chapter.Verse or '—'>"
}
`;
    }

    // 🕉️ Final full prompt
    const prompt = `${divineInstruction}\n\nNow, the seeker asks:\n"${question}"`;

    const result = await axios.post(
      `${apiUrl}?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.85,
          topK: 50,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 30000,
      }
    );

    // ✨ Parse and clean response
    const raw = result.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    let cleaned = raw.trim().replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = {
        response:
          "Even divine words may falter through human noise, dear one. Reflect calmly and seek again.",
        reference: "—",
      };
    }

    return res.json(parsed);
  } catch (error) {
    console.error("⚠️ Krishna API Error:", error.message);
    res.status(500).json({
      response:
        "The eternal silence prevails, Arjuna. Try again when your heart is still.",
      reference: "—",
    });
  }
};
