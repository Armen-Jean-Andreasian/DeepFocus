import json


class ManifestGenerator:
    @staticmethod
    def generate_manifest(manifest_path, output_manifest_path):
        with open(manifest_path, 'r') as json_file:
            manifest = json.load(json_file)
        with open(output_manifest_path, 'w') as outfile:
            json.dump(manifest, outfile, indent=4)
