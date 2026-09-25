from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from dotenv import load_dotenv

import os
import httpx


load_dotenv()

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


BOT_TOKEN = os.getenv("tg_key")
MY_TOKEN = os.getenv("my_chat_id")


class Info(BaseModel):
    date: int
    time: str
    place: str


@app.get("/")
def home():
    return FileResponse("index.html")


@app.post("/submit")
def get_info(info1: Info):
    text = (
        f"Уведомление!\n"
        f"День: {info1.date}\n"
        f"Время: {info1.time}\n"
        f"Место: {info1.place}"
    )

    return send_message(text)


def send_message(text: str):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

    response = httpx.post(
        url,
        params={
            "chat_id": MY_TOKEN,
            "text": text
        }
    )

    return response.json()