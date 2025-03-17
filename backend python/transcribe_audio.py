#!/usr/bin/python3

from flask import Flask, request, jsonify
import whisper

app = Flask(__name__)

# Load Whisper model once (for performance)
model = whisper.load_model("base")

@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = "temp_audio.wav"
    file.save(file_path)

    # Transcribe using Whisper
    result = model.transcribe(file_path,language="ar")

    return jsonify({"transcription": result["text"]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)

