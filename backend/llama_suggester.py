import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def get_taint_fix_suggestions(code):
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",

            messages=[
                {
                    "role": "system",
                    "content": """
You are a secure taint analysis assistant.

STRICT RULES:
- Return ONLY clean HTML.
- Do NOT use markdown symbols like **, #, *, or ``` .
- Identify the exact vulnerable line from the code.
- Mention the line number clearly.
- Highlight ONLY the vulnerable line using:
  <span style="color:red; font-weight:bold;">
- Use:
    <h3> for section titles
    <p> for explanation
    <pre> for code blocks
- Keep formatting clean and structured.
"""
                },
                {
                    "role": "user",
                    "content": f"""
Analyze the following code for taint vulnerabilities.

Requirements:
1. Identify the vulnerable line.
2. Mention its exact line number.
3. Show the vulnerable line highlighted in red bold.
4. Explain why it is dangerous.
5. Provide a fixed secure version.

Code:
{code}
"""
                }
            ],

            temperature=0.2,
            max_tokens=800
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print("LLaMA Error:", str(e))
        return """
<h3>Error</h3>
<p>AI suggestion generation failed.</p>
"""
