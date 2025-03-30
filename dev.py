import shutil

# Chrome
# Firefox


browser =  "Firefox"
# ======================================================================================================================
OUTPUT_MANIFEST_PATH = "manifest.json"

zip_output = f"{browser}.zip"
ignored_files = {
    # folders
    ".github",
    ".idea",
    ".git",
    'for_dev',

    # trash
    '__pycache__',
    '*.jpg',
    '*.tmp'

    # files
    ".gitignore",
    'dev.py',

    # zip archives
    "Firefox.zip",
    "Chrome.zip",

    # others
    'bin/audio',
    'bin/screenshots',
    'bin/video',
    'bin/intro',
}

if browser == 'Chrome':
    manifest_path = 'for_dev/manifests/manifest-chrome.json'
elif browser == 'Firefox':
    manifest_path = 'for_dev/manifests/manifest-firefox.json'

# ======================================================================================================================
from for_dev.zipper import Zip
from for_dev.manifest_generator import ManifestGenerator

try:
    shutil.rmtree("__pycache__")  # cleaning pycache
except FileNotFoundError:
    pass


ManifestGenerator.generate_manifest(manifest_path=manifest_path, output_manifest_path=OUTPUT_MANIFEST_PATH)
Zip.zip(ignored_files=ignored_files, zip_output=zip_output)

