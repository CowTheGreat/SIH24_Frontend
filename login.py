import mysql.connector
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# Database configuration
db_config = {
    'user': 'root',
    'password': 'CowTheGreat',
    'host': 'localhost',
    'database': 'sih'
}

# FastAPI app
app = FastAPI()

# Pydantic model for login request
class LoginRequest(BaseModel):
    email: str
    password: str

# Database query function to get the user by email
def get_user_by_email(email: str):
    try:
        # Establish a connection to the database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        # Query the database for the user by email
        query = "SELECT * FROM users WHERE email = %s"
        cursor.execute(query, (email,))
        user = cursor.fetchone()

        cursor.close()
        connection.close()
        
        return user
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

# Login endpoint
@app.post("/login")
async def login(request: LoginRequest):
    user = get_user_by_email(request.email)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # Check if the password provided matches the plain-text password in the database
    if request.password != user['password']:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return {"message": "Login successful"}
