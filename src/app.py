from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes



@app.route('/message', methods=['POST'])
def message():
    user_message = request.json.get('message')
    # Here you could implement some logic or AI to generate a response
    bot_message = f"{user_message}"  # Simply echoes the user's message back
    return jsonify({'message': bot_message})


if __name__ == '__main__':
    app.run(debug=True)
