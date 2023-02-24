from flask import request, Blueprint
from flask_cors import cross_origin

from service import house_price_service
import json

house_price_controller_blueprint = Blueprint('house_price_controller_blueprint', __name__)

@house_price_controller_blueprint.route('/api/predict-house-price', methods=['POST'])
@cross_origin()
def predict_house_price():
    return house_price_service.predict_house_price(json.loads(request.data))

@house_price_controller_blueprint.route('/api/get-zipcode-list')
@cross_origin()
def get_zipcode_list():
    return house_price_service.get_zipcode_list()
