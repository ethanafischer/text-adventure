from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

client = OpenAI()

app = Flask(__name__)
CORS(app)

with open('prompt.txt', 'r') as file:
    prompt = file.read()

messages = [ {"role": "system", "content": prompt} ]

@app.route('/chat-gpt', methods=['POST'])
def generate():
    data = request.get_json()
    user_input = data.get('input')
    messages.append({"role": "user", "content": user_input})

    try:
        generate = client.chat.completions.create(
                model="gpt-3.5-turbo-0125", messages=messages
        )
        
        answer = generate.choices[0].message.content
        return jsonify(answer)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/reset', methods=['POST'])
def reset_messages():
    global messages
    messages = [ {"role": "system", "content": prompt} ]
    return jsonify({"message": "Messages reset successfully."})
    

if __name__ == '__main__':
    app.run(debug=True)