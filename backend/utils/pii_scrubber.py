import re


class PIIScrubber:
    _default_patterns = {
        "[REDACTED PHONE NUMBER]": r"(\+?\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}",  # noqa
        "[REDACTED CREDIT CARD]": r"\b(?:\d[ -\.]*?){13,16}\b",
        "[REDACTED EMAIL ADDRESS]": r"(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])",  # noqa
        "[REDACTED POSTAL CODE]": r"\b[A-Za-z][0-9][A-Za-z] ?[0-9][A-Za-z][0-9]\b",  # noqa
        "[REDACTED SIN NUMBER]": r"\b(?:\d[ -\.]*?){9}\b",
    }

    def scrub_input(self, prompt: str, user_defined_pii: str) -> str:
        """Remove all personal information from a given prompt.

        :param prompt: The prompt to scrub.
        :type prompt: str
        :param user_defined_pii: The user defined pii to scrub.
        :type user_defined_pii: str
        :return: The scrubbed prompt.
        :rtype: str
        """

        for replacement, pattern in self._default_patterns.items():
            prompt = re.sub(pattern, replacement, prompt)

        pii = [word.strip() for word in user_defined_pii.split(",")]
        pii_pattern = pattern = (
            r"\b(?:" + "|".join(map(re.escape, pii)) + r")\b"
        )

        prompt = re.sub(pii_pattern, "[REDACTED USER DEFINED PII]", prompt)

        return prompt
