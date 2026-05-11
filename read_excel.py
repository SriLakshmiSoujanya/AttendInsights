import pandas as pd
import json

# Read both Excel files
try:
    file1 = r'c:\Users\bonda\OneDrive\Documents\DR_2027_DATA_SPECIALIST (1).xlsx'
    file2 = r'c:\Users\bonda\Downloads\DRIVE READY TOTAL DATA (1) (1).xlsx'
    
    print("=" * 60)
    print("FILE 1: DR_2027_DATA_SPECIALIST")
    print("=" * 60)
    xls1 = pd.ExcelFile(file1)
    print(f"Sheet names: {xls1.sheet_names}\n")
    
    for sheet in xls1.sheet_names:
        df = pd.read_excel(file1, sheet_name=sheet)
        print(f"\nSheet: {sheet}")
        print(f"Shape: {df.shape}")
        print(f"Columns: {list(df.columns)}")
        print(f"First few rows:\n{df.head()}\n")
    
    print("\n" + "=" * 60)
    print("FILE 2: DRIVE READY TOTAL DATA")
    print("=" * 60)
    xls2 = pd.ExcelFile(file2)
    print(f"Sheet names: {xls2.sheet_names}\n")
    
    for sheet in xls2.sheet_names:
        df = pd.read_excel(file2, sheet_name=sheet)
        print(f"\nSheet: {sheet}")
        print(f"Shape: {df.shape}")
        print(f"Columns: {list(df.columns)}")
        print(f"First few rows:\n{df.head()}\n")
        
except Exception as e:
    print(f"Error: {e}")
