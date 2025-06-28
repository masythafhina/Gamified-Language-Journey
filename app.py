import os

from cs50 import SQL
from datetime import datetime
from flask import Flask, request, url_for, render_template, redirect, session
from flask_session import Session
from helpers import login_required
from werkzeug.security import check_password_hash, generate_password_hash


#configure app
app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

#configure CS50 Library UMS to use the project database
db = SQL("sqlite:///finalProject.db")

@app.route("/")
@login_required
def index():
    loggedInUser = db.execute(
        "SELECT * FROM users WHERE id = :id", id=session["user_id"]
    )
    username = loggedInUser[0]["username"]
    return render_template("index.html", username = username)

@app.route("/login", methods=["GET", "POST"])
def login():
    # Forget any user_id
    session.clear()
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        # if username or password empty
        if not username or not password:
            return render_template("login.html", errorMessage = "ERROR 403: Username and Password is required")

        #query database for users
        users = db.execute(
            "SELECT * FROM users WHERE username = ?", username)

        # check if username exists
        if len(users) != 1:
            return render_template("login.html", errorMessage = "ERROR 403: User does not exist")

        # checks if the password is correct
        if not check_password_hash(users[0]["hashed_password"], password):
            return render_template("login.html", errorMessage = "ERROR 403: Incorrect password")

        # Remember which user has logged in
        session["user_id"] = users[0]["id"]

        # Redirect user to home page
        return redirect("/")

    return render_template("login.html")

@app.route("/signup", methods=["GET", "POST"])
def signup():
    # forget any user_id
    session.clear()

    username = request.form.get("username")
    password = request.form.get("password")
    passwordConfirm = request.form.get("passwordConfirm")

    if request.method == "POST":
        users = db.execute("SELECT username FROM users WHERE username = ?", username)
        if not username or not password:
            return render_template("signup.html", errorMessage = "ERROR 403: Username and Password is required")
        elif len(users) > 0:
            return render_template("signup.html", errorMessage = "ERROR 403: Username already exists`")
        elif password != passwordConfirm:
            return render_template("signup.html", errorMessage = "ERROR 403: Password does not match")
        db.execute(
            "INSERT INTO users (username, hashed_password) VALUES (?, ?)",
            username, generate_password_hash(password),
        )
        return redirect("login.html")

    return render_template("signup.html")

@app.route("/logout")
def logout():
    # log out any users
    session.clear()
    return redirect("/")

@app.route("/rainyDay.html", methods=["GET", "POST"])
def rainyDay():
    loggedInUser = db.execute("SELECT * FROM users WHERE id = :id", id=session["user_id"])
    username = loggedInUser[0]["username"]
    if request.method == "POST":
        input1 = request.form.get("unhappy");
        input2 = request.form.get("dislike");
        input3 = request.form.get("bigger");
        input4 = request.form.get("biggest");
        input5 = request.form.get("replay");
        input6 = request.form.get("wonderful");
        gameName = "rainyDay"
        now = datetime.now()
        date = now.strftime("%d/%m/%Y %H:%M:%S")
        db.execute(
            "INSERT INTO games(user, gameName, date, input1, input2, input3, input4, input5, input6) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            username,
            gameName,
            date,
            input1,
            input2,
            input3,
            input4,
            input5,
            input6,
        )
        gamedb = db.execute("SELECT * FROM games WHERE user = ?", username)
        lastPlayed = gamedb[len(gamedb)-2]["date"]
        print(lastPlayed)
        input1l = gamedb[len(gamedb)-2]["input1"]
        input2l = gamedb[len(gamedb)-2]["input2"]
        input3l = gamedb[len(gamedb)-2]["input3"]
        input4l = gamedb[len(gamedb)-2]["input4"]
        input5l = gamedb[len(gamedb)-2]["input5"]
        input6l = gamedb[len(gamedb)-2]["input6"]

        input1 = gamedb[len(gamedb)-1]["input1"]
        input2 = gamedb[len(gamedb)-1]["input2"]
        input3 = gamedb[len(gamedb)-1]["input3"]
        input4 = gamedb[len(gamedb)-1]["input4"]
        input5 = gamedb[len(gamedb)-1]["input5"]
        input6 = gamedb[len(gamedb)-1]["input6"]
        def lastcalcPercent():
            totalPoints = 0;
            if input1l == "un":
                totalPoints +=1
            if input2l == "dis":
                totalPoints +=1
            if input3l == "er":
                totalPoints +=1
            if input4l == "est":
                totalPoints +=1
            if input5l == "re":
                totalPoints +=1
            if input6l == "ful":
                totalPoints +=1
            return int(totalPoints / 6 * 100)
        lastscorePercent = lastcalcPercent()

        def calcPercent():
            totalPoints = 0;
            if input1 == "un":
                totalPoints +=1
            if input2 == "dis":
                totalPoints +=1
            if input3 == "er":
                totalPoints +=1
            if input4 == "est":
                totalPoints +=1
            if input5 == "re":
                totalPoints +=1
            if input6 == "ful":
                totalPoints +=1
            return int(totalPoints / 6 * 100)
        scorePercent = calcPercent()

        """ scorePercentage = scoreing / 6 * 100 """
        return render_template("profile.html", lastPlayed = lastPlayed, username = username, lastscore = lastscorePercent, score = scorePercent)

    return render_template("rainyDay.html" )


@app.route("/profile.html")
def profile():
    loggedInUser = db.execute("SELECT * FROM users WHERE id = :id", id=session["user_id"])
    username = loggedInUser[0]["username"]

    return render_template("profile.html", username = username)
if __name__ == "__main__":
    app.run(debug=True)
    
