""" isort:skip_file
"""

from fastapi.routing import APIRoute, HTTPException, Request
from openai._exceptions import (
    APIConnectionError,
    APIError,
    AuthenticationError,
    RateLimitError,
)
from starlette.responses import JSONResponse

OPENAI_EXCEPTIONS = (
    APIError,
    APIConnectionError,
    RateLimitError,
    AuthenticationError,
)


class OpenAIRouteExceptionHandler(APIRoute):
    """
    This is a route class override for the OpenAI router. It is used to
    catch common exceptions that are raised by the OpenAI API and return an
    internal server error response with its associated error message.
    """

    def get_route_handler(self):
        original_route_handler = super().get_route_handler()

        async def exception_handler(request: Request) -> JSONResponse:
            """
            Catch OpenAI exceptions and return an internal server error response.

            :param request: The request object
            :type request: Request
            :return: Response or Internal server error response with error message
            :rtype: JSONResponse
            """
            try:
                response = await original_route_handler(request)
            except OPENAI_EXCEPTIONS as e:
                raise HTTPException(
                    status_code=500,
                    detail=str(e),
                )
            return response

        return exception_handler
