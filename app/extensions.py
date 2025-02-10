from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate

# Инициализация расширений
db = SQLAlchemy()
login_manager = LoginManager()
migrate = Migrate()

# Настройка страницы для входа
login_manager.login_view = 'auth.login'
login_manager.login_message = 'Пожалуйста, войдите для доступа к этой странице.'
login_manager.login_message_category = 'info'

# Функция для загрузки устройства
@login_manager.user_loader
def load_device(device_id):
    from app.models.device import Device  # Импортируем модель Device
    return Device.query.get(int(device_id))