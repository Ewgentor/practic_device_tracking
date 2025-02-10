from datetime import datetime

from flask import Blueprint, render_template, redirect, url_for, request
from flask_login import login_required, current_user

from app import db
from app.models.device import Device
from app.models.group import Group
from app.utils.decorators import role_required

bp = Blueprint('student', __name__)

@bp.route('/student/dashboard')
@login_required
@role_required('student')
def dashboard():
    group = Group.query.get_or_404(current_user.group_id)
    return render_template('student/dashboard.html', device=current_user, group=group)

@bp.route('/student/dashboard/change_status', methods=['POST'])
@login_required
@role_required('student')
def change_status():
    if request.method == "POST":
        comment = request.form.get('comment')
        device_id = current_user.id
        device = Device.query.get(device_id)
        device.last_comment = comment
        device.status = 'problem'
        device.last_comment_time = datetime.now()
        db.session.commit()
    return redirect(url_for('student.dashboard'))