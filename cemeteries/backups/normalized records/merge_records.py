import pandas as pd
import os

def merge_csv_files_in_directory(directory_path, primary_key, base_file_name, output_file_path):
    # Load the main base file (e.g., 'cemeteries.csv')
    base_df = pd.read_csv(os.path.join(directory_path, base_file_name))

    # Iterate over each file in the directory
    for filename in os.listdir(directory_path):
        if filename.endswith('.csv') and filename != base_file_name:
            file_path = os.path.join(directory_path, filename)
            try:
                # Load the current CSV file
                current_df = pd.read_csv(file_path)
                
                # Ensure primary key column is set for both DataFrames
                base_df.set_index(primary_key, inplace=True, drop=False)
                current_df.set_index(primary_key, inplace=True, drop=False)
                
                # Update the base DataFrame with the current DataFrame
                base_df.update(current_df)

            except Exception as e:
                print(f"Error processing {filename}: {e}")
            finally:
                # Reset index to turn the primary key back into a column
                base_df.reset_index(drop=True, inplace=True)

    # Save the merged DataFrame to a new CSV file
    base_df.to_csv(output_file_path, index=False)
    print(f'Merged file saved to {output_file_path}')

# Example usage
directory_path = '.'  # Current directory
primary_key = 'pkoakwood'
base_file_name = 'ahc-cemeteries.csv'
output_file_path = 'updated_cemeteries.csv'
merge_csv_files_in_directory(directory_path, primary_key, base_file_name, output_file_path)
