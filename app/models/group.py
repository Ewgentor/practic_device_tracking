from app.extensions import db

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)  # Название группы
    devices = db.relationship('Device', backref='group', lazy=True)  # Связь с устройствами