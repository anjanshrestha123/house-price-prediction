import pickle
from config import config

def read_model_output():
    with open(config.config.get('App', 'model.output.path'), 'rb') as f:
        model_output = pickle.load(f)
    return model_output

def predict_house_price(request):
    # Read model output
    model_output = read_model_output()

    # Store the values into different variables
    trained_model = model_output['trained_model']
    normalized_rmse = model_output['normalized_rmse']
    zip_encoder = model_output['zip_encoder']

    # Predict the house price using the trained model
    predicted_house_price = trained_model.predict([[request['year'], request['month'], request['day'], zip_encoder.transform([request['zipcode']])[0]]])[0]

    return (predicted_house_price, normalized_rmse)

def get_zipcode_list():
    # Read model output
    model_output = read_model_output()

    return model_output['zipcode_list']

