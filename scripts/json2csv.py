import json
import csv

# Define the fields expected by the Feeds importer
expected_fields = ["nid", "uid", "path", "title", "body", "field_images", "field_main_image", "field_main_image_alt", "langcode", "changed", "field_image_attribution_ahc", "field_slideshow_ahc", "field_pdf"]

# Load the JSON data
with open('../ahc_pages.json', encoding='utf-8') as json_file:
    data = json.load(json_file)

# Function to escape line breaks in string fields
def escape_line_breaks(text):
    if isinstance(text, str):
        return text.replace('\n', '\\n').replace('\r', '\\r')
    return text

# Open a CSV file for writing
with open('../ahc_pages.csv', mode='w', newline='', encoding='utf-8') as csv_file:
    writer = csv.DictWriter(csv_file, fieldnames=expected_fields)

    # Write the header
    writer.writeheader()

    # Write each JSON record as a row in the CSV
    for record in data:
        csv_record = {field: escape_line_breaks(record.get(field, '')) for field in expected_fields}
        writer.writerow(csv_record)

print("Conversion completed successfully.")
