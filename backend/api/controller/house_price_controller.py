from flask import request, Blueprint
from service import house_price_service
import json

house_price_controller_blueprint = Blueprint('house_price_controller_blueprint', __name__)

@house_price_controller_blueprint.route('/api/predict-house-price', methods=['POST'])
def predict_house_price():
    return house_price_service.predict_house_price(json.loads(request.data))

@house_price_controller_blueprint.route('/api/get-zipcode-list')
def get_zipcode_list():
    return house_price_service.get_zipcode_list()
