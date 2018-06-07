from .settings import *

DEBUG = False

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "build"),
]

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

ALLOWED_HOSTS = ['www.novunote.com', '.herokuapp.com', '127.0.0.1']

WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR+'/stats', 'webpack-stats.prod.json'),
        }
}