from flask import Flask
from falcon import falcon
app = Flask(__name__)

@app.route("/")
def hello_world():
    sk = falcon.SecretKey(2)
    return str(sk.n)
