This script processes a CSV file to standardize and normalize burial location names, making the data more consistent and easier to analyze. Here's a breakdown of its functionality:

1. **Import Libraries**:
   - The `csv` library is used for handling CSV files, and the `re` library for regular expressions.

2. **Define Substitutions**:
   - A list of tuples is created, each containing a regex pattern and its replacement. These patterns target specific variations in burial location names to ensure consistency.

3. **Open Files**:
   - The script opens an input CSV file named `combined.csv` and an output CSV file named `normalized_cemetery.csv`.

4. **Initialize CSV Reader and Writer**:
   - A `csv.DictReader` reads the input file, allowing access to each row as a dictionary.
   - A `csv.writer` writes rows to the output file, using a comma as the delimiter.

5. **Debugging Information**:
   - The script prints the headers from the input CSV file for debugging purposes.

6. **Write Headers**:
   - The script writes headers `['pkoakwood', 'whereburied']` to the output CSV file.

7. **Process Each Row**:
   - The script iterates through each row in the input file.
   - It stores the original value of the `whereburied` column.
   - Each substitution pattern is applied to the `whereburied` value to normalize it.
   - If the `whereburied` value changes after applying the substitutions, the modified row is written to the output file.

### Summary

This script ensures burial location names in the input CSV are standardized, enhancing data consistency and usability. By replacing various synonyms and abbreviations with standardized terms, the script improves the clarity and reliability of the data.

By focusing on these improvements, the script makes data processing more user-friendly, accessible, and consistent.