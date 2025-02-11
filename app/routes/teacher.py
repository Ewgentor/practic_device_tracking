from datetime import datetime

from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import login_required, current_user

from app import db
from app.models.device import Device
from app.models.group import Group
from app.utils.decorators import role_required

bp = Blueprint('teacher', __name__)

@bp.route('/teacher/dashboard')
@login_required
@role_required('teacher')
def dashboard():
    group = Group.query.get_or_404(current_user.group_id)
    return render_template('teacher/dashboard.html', group=group)


@bp.route('/teacher/dashboard/change_status',  methods=['POST','GET'])
@login_required
@role_required('teacher')
def change_status():
    if request.method == "POST":
        comment = request.form.get('comment')
        device_id = request.form.get('id')
        device_status = request.form.get('status')
        device = Device.query.get(device_id)
        device.last_comment = comment
        device.status = device_status
        device.last_comment_time = datetime.now()
        db.session.commit()
    return redirect(url_for('teacher.dashboard'))
