from flask import Flask, request, jsonify

app = Flask(__name__)

# Пример ИИ-логики
def ai_response(question):
    # Пример простой логики, можно заменить на интеграцию с OpenAI, Hugging Face и т.д.
    if "привет" in question.lower():
        return "Привет! Как я могу помочь вам?"
    else:
        return "Интересный вопрос! Я пока не знаю ответа, но постараюсь узнать!"

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question", "")
    answer = ai_response(question)
    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)
