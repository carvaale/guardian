setup:
	@echo "1. Creating virtual environment with Python 3.11..."
	@py -3.11 -m venv venv

	@echo "2. Activating virtual environment..."
	@. venv\Scripts\activate

	@echo "3. Installing poetry..."
	@(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -

	@echo "4. Installing dependencies with poetry..."
	@poetry install

	@echo "5. Installing nous-hermes-llama2-13b model..."
	@Invoke-WebRequest -Uri "https://huggingface.co/TheBloke/Nous-Hermes-Llama2-GGUF/resolve/main/nous-hermes-llama2-13b.Q4_0.gguf?download=true" -OutFile "./backend/models/nous-hermes-llama2-13b.Q4_0.gguf"

	@echo "6. Installing frontend dependencies..."
	@(cd frontend && npm i)

	@echo "7. Copying .envrc.example to .envrc..."
	@(cd frontend && cp .envrc.example .envrc)

	@echo "Setup complete."
