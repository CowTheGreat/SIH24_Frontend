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
video_path = "testVIdeo.mp4"  # Replace with the path to your video file
output_audio_path = "output_audio.mp3"  # The output audio file path (can also be .wav, .ogg, etc.)

extract_audio_from_video(video_path, output_audio_path)

print(f"Audio extracted and saved to {output_audio_path}")

import whisper

model = whisper.load_model("base")
result = model.transcribe("output_audio.mp3")
print(result["text"])