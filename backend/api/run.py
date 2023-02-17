from config.config import app
from config.config import config

if __name__ == '__main__':
    app.run(port=config.get('App', 'server.port'))