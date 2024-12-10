import speech_recognition as sr

def real_time_transcription():
    recognizer = sr.Recognizer()
    mic = sr.Microphone()

    print("Adjusting for ambient noise... Please wait.")
    with mic as source:
        recognizer.adjust_for_ambient_noise(source, duration=1)
        print(f"Ambient noise level set to {recognizer.energy_threshold}")
        print("Start speaking. Press Ctrl+C to stop.")

    try:
        while True:
            with mic as source:
                print("Listening...")
                audio = recognizer.listen(source)

            try:
                print("Recognizing...")
                # Using Google's Web Speech API
                transcription = recognizer.recognize_google(audio)
                print(f"You said: {transcription}")
            except sr.UnknownValueError:
                print("Sorry, I didn't understand that.")
            except sr.RequestError as e:
                print(f"Could not request results; {e}")

    except KeyboardInterrupt:
        print("\nTranscription stopped.")

if __name__ == "__main__":
    real_time_transcription()
