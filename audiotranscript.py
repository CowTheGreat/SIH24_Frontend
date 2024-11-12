output_audio_path = "C:/Users/cowar/Downloads/asds.mpeg"  

import torch
import whisper

device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

# Load Whisper model and move to GPU if available
model = whisper.load_model("base").to(device)

result = model.transcribe("output_audio.mp3", fp16=False)  # Ensure `fp16=False` if using CPU
print(result["text"])
