from email.policy import default

from sqlalchemy import func

from app.extensions import db
from flask_login import UserMixin

class Device(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)  # Тип устройства (компьютер, принтер, другое)
    last_comment = db.Column(db.String(500))  # Последний комментарий
    last_comment_time = db.Column(db.DateTime, default=func.now())
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=False)  # Связь с группой
    privilege = db.Column(db.String(50), nullable=False)  # Роль (admin, teacher, student)
    status = db.Column(db.String(20), nullable=False, default="working")

    # Flask-Login требует метод get_id
    def get_id(self):
        return str(self.id)