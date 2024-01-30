# Guardian

## Installation and Setup

run `make setup`

or

1. Within `../guardian`, run `py -3.11 -m venv venv` to create a virtual environment with Python 3.11
2. Activate the virtual environment by running `venv\Scripts\activate`
3. Install poetry by running `(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -`
4. Install dependencies by running `poetry install`
6. Install `nous-hermes-llama2-13b` model by running `Invoke-WebRequest -Uri "https://huggingface.co/TheBloke/Nous-Hermes-Llama2-GGUF/resolve/main/nous-hermes-llama2-13b.Q4_0.gguf?download=true" -OutFile "./backend/models/nous-hermes-llama2-13b.Q4_0.gguf"` (This may take a while as the LLM model is about 7GB)
7. cd into `../guardian/frontend` and run `npm i`
8. Run `cp .envrc.example .envrc` and update with API secrets

## Running the app

### Backend

1. Activate the virtual environment by running `venv\Scripts\activate`
2. cd into `../guardian/backend`
3. Run `uvicorn backend.app:app --reload` to start the backend server

### Frontend

1. cd into `../guardian/frontend`
2. Run `npm run dev` to start the frontend server
