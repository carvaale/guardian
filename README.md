# guardian



## Installation and Setup

1. Within `../guardian`, run `py -3.11 -m venv venv` to create a virtual environment with Python 3.11
2. Run `cp .envrc.example .envrc` and update with API secrets
2. Activate the virtual environment by running `venv\Scripts\activate`
3. Install poetry by running `(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -`
4. Install dependencies by running `poetry install`.
5. cd into `../guardian/frontend` and run `npm i`

## Running the app

### Backend

1. Activate the virtual environment by running `venv\Scripts\activate`
2. cd into `../guardian/backend`
3. Run `uvicorn app:app --reload` to start the backend server  

### Frontend

1. cd into `../guardian/frontend`
2. Run `npm run dev` to start the frontend server