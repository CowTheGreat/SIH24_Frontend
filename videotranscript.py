from moviepy.editor import VideoFileClip

# Function to extract audio from video
def extract_audio_from_video(video_path, output_audio_path):
    # Load the video file
    video_clip = VideoFileClip(video_path)

    # Extract the audio from the video
    audio_clip = video_clip.audio

    # Save the extracted audio to a file
    audio_clip.write_audiofile(output_audio_path)

    # Close the clips
    audio_clip.close()
    video_clip.close()

# Example usage
# video_path = "C:/Users/cowar/Downloads/transcribe_meet.mp4" 
video_path = "C:/Users/cowar/Downloads/tra.mp4"  # Replace with the path to your video file
output_audio_path = "output_audio.mp3"  # The output audio file path (can also be .wav, .ogg, etc.)

extract_audio_from_video(video_path, output_audio_path)

print(f"Audio extracted and saved to {output_audio_path}")

import torch
import whisper

device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

# Load Whisper model and move to GPU if available
model = whisper.load_model("base").to(device)

result = model.transcribe("output_audio.mp3", fp16=False)  # Ensure `fp16=False` if using CPU
print(result["text"])
