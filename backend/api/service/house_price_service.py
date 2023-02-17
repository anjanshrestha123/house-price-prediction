from proxy import house_price_proxy

def predict_house_price(request):

    # Call proxy to get the predicted output
    predicted_output = house_price_proxy.predict_house_price(request)
    predicted_house_price = predicted_output[0]
    normalized_rmse = predicted_output[1]

    # Return the range of house price based on the predicted price and normalized rmse
    return {
        'predicted_house_price_min': round(predicted_house_price - predicted_house_price * normalized_rmse, 2),
        'predicted_house_price_max': round (predicted_house_price + predicted_house_price * normalized_rmse, 2)
    }

def get_zipcode_list():
    return {
        'zipcode_list': [int(x) for x in house_price_proxy.get_zipcode_list()]
    }