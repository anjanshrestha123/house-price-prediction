import configparser
from flask import Flask
from controller.house_price_controller import house_price_controller_blueprint

# Read App configuration from a file
config = configparser.RawConfigParser()
config.read('app.properties')

# Configure flask app
app = Flask(__name__)
app.register_blueprint(house_price_controller_blueprint)
