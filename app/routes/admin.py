import os
from datetime import datetime

from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import login_required, current_user

from app import db
from app.models.device import Device
from app.models.group import Group
from app.utils.decorators import role_required

bp = Blueprint('admin', __name__)


@bp.route('/admin/dashboard')
@login_required
@role_required('admin')
def dashboard():
    groups = Group.query.all()  # Получаем все группы
    return render_template('admin/dashboard.html', groups=groups)


@bp.route('/admin/dashboard/add_group', methods=['POST', 'GET'])
@login_required
@role_required('admin')
def add_group():
    if request.method == "POST":
        group_name = request.form.get('card_input')
        new_group = Group(name=group_name)
        db.session.add(new_group)
        db.session.commit()
    return redirect('/admin/dashboard')


@bp.route('/admin/group/<int:group_id>')
@login_required
@role_required('admin')
def view_group(group_id):
    group = Group.query.get_or_404(group_id)
    return render_template('admin/group.html', group=group)


@bp.route('/admin/dashboard/<int:group_id>/delete', methods=['POST'])
@login_required
@role_required('admin')
def delete_group(group_id):
    group = Group.query.get_or_404(group_id)

    try:
        db.session.delete(group)
        db.session.commit()
    except Exception as e:
        db.session.rollback()

    return redirect('/admin/dashboard')


@bp.route('/admin/group/<int:group_id>/change_status', methods=['POST', 'GET'])
@login_required
@role_required('admin')
def change_status(group_id):
    if request.method == "POST":
        comment = request.form.get('comment')
        device_id = request.form.get('id')
        device_status = request.form.get('status')
        device = Device.query.get(device_id)
        device.last_comment = comment
        device.status = device_status
        device.last_comment_time = datetime.now()
        db.session.commit()
    group = Group.query.get_or_404(group_id)
    return redirect(location=f"/admin/group/{group.id}")


@bp.route('/admin/group/<int:group_id>/add_device', methods=['POST', 'GET'])
@login_required
@role_required('admin')
def add_device(group_id):
    group = Group.query.get_or_404(group_id)
    if request.method == "POST":
        device_type = request.form.get('device_type')
        device_role = request.form.get('device_role')
        new_id = int(''.join([str(c) for c in os.urandom(3)]))
        while db.session.query(Device.id).filter_by(id=new_id).first() is not None:
            new_id = int(''.join([str(c) for c in os.urandom(3)]))
        new_device = Device(id=new_id,type=device_type,privilege=device_role,last_comment="Новое устройство",group_id=group_id)
        db.session.add(new_device)
        db.session.commit()
    return redirect(location=f"/admin/group/{group.id}")


@bp.route('/admin/device/<int:device_id>/delete', methods=['POST'])
@login_required
@role_required('admin')
def delete_device(device_id):
    device = Device.query.get_or_404(device_id)
    try:
        db.session.delete(device)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
    return redirect(url_for('admin.view_group', group_id=device.group_id))