import sys
import io
import os
from langchain_community.document_loaders import YoutubeLoader
from langchain_community.document_loaders.youtube import TranscriptFormat

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

loader = YoutubeLoader.from_youtube_url(
    "https://www.youtube.com/watch?v=oUoxlF_s7wk",
    # add_video_info=True,                         # Include video metadata
    # transcript_format=TranscriptFormat.CHUNKS,   # Break transcript into chunks
    # chunk_size_seconds=30,                       # Chunk size (30 seconds)
)

# Append transcript chunks to a list
transcript_chunks = loader.load()

# Print the chunks joined by newlines and encode/decode
formatted_transcripts = "\n\n".join(map(repr, transcript_chunks)).encode('utf-8', errors='replace').decode('utf-8')

# Optionally, you can also print it
print(formatted_transcripts)


