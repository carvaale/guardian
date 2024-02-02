import re


class PIIScrubber:
    def scrub_input(self, prompt: str) -> str:
        """Remove all personal information from a given prompt.

        :param prompt: The prompt to scrub.
        :type prompt: str
        :return: The scrubbed prompt.
        :rtype: str
        """
        phone_pattern = re.compile(
            r"\b(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\b"
        )

        amex_pattern = re.compile(
            r"\b3[47][0-9]{2}([ -]?[0-9]{6}){1}([ -]?[0-9]{5}){1}\b"
        )
        visa_pattern = re.compile(r"\b4[0-9]{3}([ -]?[0-9]{4}){3}\b")
        visamaster_pattern = re.compile(
            r"\b(5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)([ -]?[0-9]{4}){3}\b"
        )

        email_pattern = re.compile(
            r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"
        )

        postal_pattern = re.compile(r"\b[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d\b")

        sin_pattern = re.compile(r"\b(\d{3})[-.\s]?(\d{2})[-.\s]?(\d{4})\b")

        # Phone Numbers
        prompt = phone_pattern.sub(" [REDACTED-PHONENUM]", prompt)

        # Credit Card Numbers
        prompt = amex_pattern.sub("[REDACTED-CREDITCARD]", prompt)
        prompt = visa_pattern.sub("[REDACTED-CREDITCARD]", prompt)
        prompt = visamaster_pattern.sub("[REDACTED-CREDITCARD]", prompt)

        # Email Addresses
        prompt = email_pattern.sub("[REDACTED-EMAIL]", prompt)

        # Postal Codes
        prompt = postal_pattern.sub("[REDACTED-POSTALCODE]", prompt)

        # SIN Numbers
        prompt = sin_pattern.sub("[REDACTED-SIN]", prompt)

        return prompt
