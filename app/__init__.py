from flask import Flask
from .extensions import db, login_manager, migrate
from app.models.device import Device  # Импортируем модель Device
from app.models.group import Group  # Импортируем модель Device

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)

    with app.app_context():
        from .routes import auth, admin, teacher, student
        app.register_blueprint(auth.bp)
        app.register_blueprint(admin.bp)
        app.register_blueprint(teacher.bp)
        app.register_blueprint(student.bp)

        db.create_all()

    return app