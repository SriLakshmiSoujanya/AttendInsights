import pandas as pd
import json
import os
from datetime import datetime

# Read both Excel files
attendance_file = r'c:\Users\bonda\OneDrive\Documents\DR_2027_DATA_SPECIALIST (1).xlsx'
data_file = r'c:\Users\bonda\Downloads\DRIVE READY TOTAL DATA (1) (1).xlsx'

# Read attendance data
attendance_df = pd.read_excel(attendance_file, sheet_name='Attendance')
student_data_df = pd.read_excel(data_file, sheet_name='Data')

# Create JSON format attendance data
attendance_data = []

for idx, row in attendance_df.iterrows():
    roll_no = row['roll_no']
    
    # Find matching student in data file
    student_info = student_data_df[student_data_df['ROLL NO'] == roll_no]
    
    if len(student_info) > 0:
        student = student_info.iloc[0]
        
        # Extract daily attendance
        daily_attendance = {}
        for col in attendance_df.columns[4:]:  # Skip first 4 columns
            daily_attendance[col] = str(row[col])
        
        attendance_record = {
            'rollNo': roll_no,
            'studentName': str(student.get('TRAINEE NAME', 'N/A')),
            'email': str(student.get('STUDENT MAIL ID', 'N/A')),
            'technology': str(student.get('TECHNOLOGY', 'N/A')),
            'college': str(student.get('COLLEGE', 'N/A')),
            'totalSessions': int(row['sessions']) if pd.notna(row['sessions']) else 0,
            'attendedSessions': int(row['attended']) if pd.notna(row['attended']) else 0,
            'attendancePercentage': float(row['percentage']) if pd.notna(row['percentage']) else 0,
            'dailyAttendance': daily_attendance
        }
        attendance_data.append(attendance_record)

# Save as JSON
output_path = r'c:\PS\attendance_data.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(attendance_data, f, indent=2, ensure_ascii=False)

print(f"✓ Attendance data exported to {output_path}")
print(f"✓ Total students: {len(attendance_data)}")

# Also export user credentials (dummy - for demo)
users_data = []
for record in attendance_data:
    users_data.append({
        'rollNo': record['rollNo'],
        'email': record['email'],
        'password': 'hashed_password_here',  # Will be hashed in backend
        'role': 'student',
        'studentName': record['studentName']
    })

# Add admin user
users_data.append({
    'rollNo': 'ADMIN001',
    'email': 'admin@institution.edu',
    'password': 'hashed_admin_password',
    'role': 'admin',
    'studentName': 'Administrator'
})

users_path = r'c:\PS\users_data.json'
with open(users_path, 'w', encoding='utf-8') as f:
    json.dump(users_data, f, indent=2, ensure_ascii=False)

print(f"✓ Users data exported to {users_path}")
print(f"✓ Total users: {len(users_data)}")
