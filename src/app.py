from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

os.makedirs('files', exist_ok=True)
os.makedirs('videos', exist_ok=True)

@app.route('/upload-pdf', methods=['POST'])
def upload_pdf():
    if 'pdf' not in request.files or 'message' not in request.form:
        return jsonify({'error': 'Missing PDF file or message'}), 400

    pdf_file = request.files['pdf']
    message = request.form['message']
    
    if pdf_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the PDF file
    file_path = os.path.join('files', pdf_file.filename)
    pdf_file.save(file_path)

    return jsonify({'message': 'PDF file and message successfully received', 'file_path': file_path, 'received_message': message}), 200

@app.route('/summarize-video', methods=['POST'])
def summarize_video():
    if 'video' not in request.files or 'query' not in request.form:
        return jsonify({'error': 'Missing video file or query'}), 400

    video_file = request.files['video']
    query = request.form['query']
    
    if video_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the video file
    file_path = os.path.join('videos', video_file.filename)
    video_file.save(file_path)

    # You can process the video here and summarize based on the query
    # For now, we're just returning a success message

    return jsonify({'message': 'Video file and query successfully received', 'file_path': file_path, 'received_query': query}), 200

@app.route('/summarize-youtube', methods=['POST'])
def summarize_youtube():
    data = request.get_json()

    if not data or 'url' not in data or 'query' not in data:
        return jsonify({'error': 'Missing YouTube URL or query'}), 400

    youtube_url = data['url']
    query = data['query']

    # You can process the YouTube URL and query here
    # For now, we're just returning a success message

    return jsonify({'message': 'YouTube URL and query successfully received', 'url': youtube_url, 'query': query}), 200


if __name__ == '__main__':
    app.run(debug=True)
