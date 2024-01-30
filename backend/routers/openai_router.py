from fastapi import FastAPI, HTTPException,APIRouter 
import requests
#did pip install requests in terminal
router = APIRouter(prefix="/openai")

@router.get("/generate")
async def generate_data():
    try:
        return {"status 200": "guardian is running"}
    
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))
