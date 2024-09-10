from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
import mysql.connector

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for now

CORS(app, origins=["http://localhost:5173"])


# MySQL configuration
db_config = {
    'user': 'root',
    'password': 'CowTheGreat',
    'host': 'localhost',
    'database': 'sih'
}

# Create a database connection
def get_db_connection():
    connection = mysql.connector.connect(**db_config)
    return connection

# Route to generate a new session ID
@app.route('/session', methods=['GET'])
def generate_session():
    session_id = str(uuid.uuid4())
    return jsonify({"session_id": session_id})

# Route to handle incoming messages and bot response
@app.route('/ai', methods=['POST'])
def receive_message():
    data = request.json
    session_id = data.get("session_id")
    session_title = data.get("session_title", "Default Title")  # Provide a default value if session_title is not provided
    query = data.get("query")

    if not session_id or not query:
        return jsonify({"error": "Session ID and query are required"}), 400

    connection = get_db_connection()
    if not connection:
        return jsonify({"error": "Failed to connect to the database"}), 500

    try:
        cursor = connection.cursor()

        # Insert the user's message into the database
        user_message_query = "INSERT INTO messages (session_id, session_title, sender, text) VALUES (%s, %s, %s, %s)"
        cursor.execute(user_message_query, (session_id, session_title, 'user', query))
        connection.commit()

        # Dummy bot response (you can replace this with AI response logic)
        bot_reply = f"Echo: {query}"

        # Insert the bot's response into the database
        bot_message_query = "INSERT INTO messages (session_id, session_title, sender, text) VALUES (%s, %s, %s, %s)"
        cursor.execute(bot_message_query, (session_id, session_title, 'bot', bot_reply))
        connection.commit()

    except Error as e:
        return jsonify({"error": f"Database error: {e}"}), 500
    finally:
        cursor.close()
        connection.close()

    # Return the bot's response
    return jsonify({"answer": bot_reply})

# Route to retrieve all messages for a session
@app.route('/messages/<session_id>', methods=['GET'])
def fetch_messages(session_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # Retrieve all messages for the session
    cursor.execute("SELECT sender, text FROM messages WHERE session_id = %s", (session_id,))
    messages = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify({"messages": messages})

@app.route('/sessions', methods=['GET'])
def fetch_unique_sessions():
    connection = get_db_connection()
    if not connection:
        return jsonify({"error": "Failed to connect to the database"}), 500

    try:
        cursor = connection.cursor(dictionary=True)
        # Fetch unique session titles
        cursor.execute("SELECT DISTINCT session_title FROM messages")
        sessions = cursor.fetchall()

    except Error as e:
        return jsonify({"error": f"Database error: {e}"}), 500
    finally:
        cursor.close()
        connection.close()

    return jsonify({"sessions": sessions})

@app.route('/update-session-title', methods=['PUT'])
def update_session_title():
    data = request.json
    session_id = data.get("session_id")
    new_title = data.get("new_title")

    if not session_id or not new_title:
        return jsonify({"error": "Session ID and new title are required"}), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    try:
        # Update the session title in the database
        update_query = "UPDATE messages SET session_title = %s WHERE session_id = %s"
        cursor.execute(update_query, (new_title, session_id))
        connection.commit()

    except mysql.connector.Error as err:
        return jsonify({"error": f"Error updating session title: {err}"}), 500

    finally:
        cursor.close()
        connection.close()

    return jsonify({"message": "Session title updated successfully"})

@app.route('/messages/title/<session_title>', methods=['GET'])
def fetch_messages_by_title(session_title):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    # Retrieve all messages for the session title
    cursor.execute("SELECT session_id, sender, text FROM messages WHERE session_title = %s", (session_title,))
    messages = cursor.fetchall()

    cursor.close()
    connection.close()

    return jsonify({"messages": messages})



if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)
