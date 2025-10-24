from flask import Flask, request, jsonify
from flask_cors import CORS
import util

app = Flask(__name__,static_folder='../client', template_folder='../client')
CORS(app)  # ✅ Enable CORS for all routes

@app.route('/')
def index():
    return "✅ Flask backend is running successfully!"

@app.route('/get_location_names')
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    data = request.get_json()

    total_sqft = float(data['total_sqft'])
    location = data['location']
    bhk = int(data['bhk'])
    bath = int(data['bath'])

    estimated_price = util.get_estimated_price(location, total_sqft, bhk, bath)

    response = jsonify({
        'estimated_price': round(estimated_price, 2)
    })
    return response


if __name__ == "__main__":
    print("Starting Flask Server for Bangalore Home Price Prediction...")
    util.load_saved_artifacts()
    app.run(host='0.0.0.0', port=5002, debug=True)
