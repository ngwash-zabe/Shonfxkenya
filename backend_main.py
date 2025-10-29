import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from deriv_api import DerivAPI
import asyncio

app = Flask(__name__)
# IMPORTANT: In a real app, configure CORS more securely
CORS(app) 

# --- Your App Details ---
APP_ID = 109107 # Your App ID for shonfxkenya

@app.route('/')
def index():
    return "shonfxkenya Backend is running. Empowered by shon son of kazee."

@app.route('/api/login', methods=['POST'])
def login():
    # In a real app, you would use the received email/password to get a token.
    # For security and simplicity, we use the pre-generated API token from environment variables.
    api_token = os.environ.get('DERIV_API_TOKEN')

    if not api_token:
        return jsonify({"error": "Server configuration error: API token not found."}), 500

    try:
        # This function runs the async login logic
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        account_info = loop.run_until_complete(get_account_status(api_token))
        loop.close()

        if account_info and not 'error' in account_info:
            return jsonify({
                "message": "Authentication Successful!",
                "balance": account_info.get('balance'),
                "currency": account_info.get('currency'),
                "loginid": account_info.get('loginid')
            })
        else:
            return jsonify({"error": "Authentication Failed. Please check your API Token."}), 401

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

async def get_account_status(api_token):
    try:
        api = DerivAPI(app_id=APP_ID)
        authorize_response = await api.authorize(api_token)
        
        if 'error' in authorize_response:
            return {"error": authorize_response['error']['message']}

        account = await api.balance()
        await api.disconnect()

        return {
            "balance": account['balance']['balance'],
            "currency": account['balance']['currency'],
            "loginid": account['balance']['loginid']
        }
    except Exception as e:
        # Disconnect on error
        if 'api' in locals() and api.api_connection.is_open():
            await api.disconnect()
        return {"error": str(e)}

# This is where your bot logic would be triggered
@app.route('/api/bot/start', methods=['POST'])
def start_bot():
    # You would get the strategy from the request body
    # e.g., strategy = request.json.get('strategy')
    # For now, it's a placeholder
    return jsonify({"message": "Bot starting command received. Bot logic to be implemented here."})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))