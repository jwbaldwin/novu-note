from .settings import *

DEBUG = False

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "build"),
]

WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR+'/stats', 'webpack-stats.prod.json'),
        }
}