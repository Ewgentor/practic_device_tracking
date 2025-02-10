from app import create_app, login_manager

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)