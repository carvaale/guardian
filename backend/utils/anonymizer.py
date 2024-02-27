import os

from gpt4all import GPT4All


class Anonymizer:
    def anonymize_input(self, prompt: str, max_tokens: int = 100) -> str:
        """Anonymize nouns within a given prompt.

        :param prompt: The prompt to anonymize.
        :type prompt: str
        :param max_tokens: The maximum number of tokens to generate.
            Defaults to 100.
        :type max_tokens: int
        :return: The anonymized prompt.
        :rtype: str
        """

        # Define the path to the models
        models_path = os.path.join(os.path.dirname(__file__), "../models/")

        # Initialize the model
        llm_model = GPT4All(
            model_name="nous-hermes-llama2-13b.Q4_0.gguf",
            model_path=models_path,
        )

        # Define the template schema
        system_template = [
            "A chat between a USER and a REPEATER. The REPEATER repeats what the USER says. REPEATER also generalizes nouns from USER input.",  # noqa
            "USER: What is the capital of Canada? \nREPEATER: What is the capital of Country1?",  # noqa
            "USER: Who are Justin and Timberlake? \nREPEATER: Who are Person1 and Person2?",  # noqa
            "USER: I like to ride my bike on the racetrack? \nREPEATER: I like to ride my Vehicle1 on the Place1?",  # noqa
            "USER: John works at Amazon in Spain and his manager is Sam. \nREPEATER: Person1 works at Place1 in Country1 and his Role1 is Person2.",  # noqa
        ]

        # Sync the input with the template
        synced_input = "".join(system_template) + f"USER: {prompt}\nREPEATER: "

        return llm_model.generate(prompt=synced_input, max_tokens=max_tokens)
