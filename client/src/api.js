// api.js
export async function askAI(question) {
    const response = await fetch("https://codebuddy-ai-backend.onrender.com/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });
  
    if (!response.ok) {
      throw new Error("Network response was not ok",response);
    }
  
    return await response.json();
  }
  