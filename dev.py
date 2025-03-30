import shutil

browser =  "Chrome" # "Firefox"
# ======================================================================================================================
OUTPUT_MANIFEST_PATH = "manifest.json"

zip_output = f"{browser}.zip"
ignored_files = {
    ".github", ".idea", ".git", ".gitignore", "zipper.py", zip_output, 'manifests', 'for_dev', 'dev.py',
    '*.jpg', '*.tmp', '__pycache__', 'Chrome.zip', 'Firefox.zip'
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

