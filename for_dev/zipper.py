import os
import zipfile


class Zip:
    @staticmethod
    def _zip_directory(zipf, folder, base_folder: str, ignored_files: set):
        """ Recursively adds files and subfolders to the ZIP archive """
        for root, _, files in os.walk(folder):
            if any(ignored_item in root.split(os.sep) for ignored_item in ignored_files):
                continue  # Skip ignored folders

            for file in files:
                if file in ignored_files:
                    continue  # Skip ignored files

                full_path = os.path.join(root, file)
                arcname = os.path.relpath(full_path, base_folder)  # Maintain relative paths
                zipf.write(full_path, arcname)

    @classmethod
    def _zip_extension(cls, ignored_files, zip_output):
        with zipfile.ZipFile(zip_output, "w", zipfile.ZIP_DEFLATED) as zipf:
            items = os.listdir(".")

            for item in items:
                if item in ignored_files:
                    continue

                if os.path.isdir(item):
                    cls._zip_directory(zipf, item, ".", ignored_files=ignored_files)
                else:
                    zipf.write(item)

    @classmethod
    def zip(cls, ignored_files, zip_output):
        cls._zip_extension(ignored_files=ignored_files, zip_output=zip_output)
