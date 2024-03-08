# https://flask.palletsprojects.com/en/3.0.x/patterns/viewdecorators/
""" A decorator is a function that wraps and replaces another function.
 Use functools.wraps() to copy the original function’s information to the new function. """

from functools import wraps
from flask import g, request, redirect, url_for, session

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function
