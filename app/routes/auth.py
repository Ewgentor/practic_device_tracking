from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_user
from app.models.device import Device
from app.extensions import db

bp = Blueprint('auth', __name__)


@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        device_id = request.form.get('device_id')
        device = Device.query.get(device_id)

        if device:
            login_user(device)
            if device.privilege == 'admin':
                return redirect(url_for('admin.dashboard'))
            elif device.privilege == 'teacher':
                return redirect(url_for('teacher.dashboard'))
            elif device.privilege == 'student':
                return redirect(url_for('student.dashboard'))
        else:
            flash('Устройство с таким ID не найдено', 'error')

    return render_template('login.html')

@bp.route('/')
def redir():
    return redirect('/login')
