import unittest
from unittest.mock import patch, MagicMock
import pandas as pd
from datetime import datetime

# Import backend module
# Need to mock the environment variables first so it doesn't fail on import
import os
os.environ["GROQ_API_KEY"] = "test_key"
os.environ["FROM_EMAIL"] = "test@example.com"
os.environ["APP_PASSWORD"] = "test_pass"

import Backend

class TestBackend(unittest.TestCase):

    def setUp(self):
        # Create sample dataframes for testing
        self.att_df = pd.DataFrame({
            "roll_no": ["123", "456"],
            "percentage": [80.0, 60.0],
            "attended": [8, 6],
            "sessions": [10, 10],
            "01-01-2023_lightmode": ["present", "absent"]
        })
        self.stu_df = pd.DataFrame({
            "ROLL NO": ["123", "456"],
            "TRAINEE NAME": ["Alice", "Bob"],
            "STUDENT MAIL ID": ["alice@test.com", "bob@test.com"],
            "TRAINEE MOBILE": ["9999999999", "8888888888"]
        })

    def test_get_date_cols(self):
        cols = Backend.get_date_cols(self.att_df)
        self.assertEqual(cols, ["01-01-2023_lightmode"])

    def test_get_todays_col(self):
        today_str = datetime.now().strftime("%d-%m-%Y")
        df = pd.DataFrame({
            f"{today_str}_lightmode": ["present"]
        })
        cols = Backend.get_date_cols(df)
        todays_col = Backend.get_todays_col(cols)
        self.assertEqual(todays_col, f"{today_str}_lightmode")

    @patch('Backend.send_email')
    @patch('Backend.generate_email')
    def test_flow2_daily_email_low_attendance(self, mock_gen, mock_send):
        mock_gen.return_value = "Test Warning Email"
        mock_send.return_value = True
        
        row = {
            "percentage": 60.0,
            "TRAINEE NAME": "Bob",
            "STUDENT MAIL ID": "bob@test.com",
            "roll_no": "456",
            "01-01-2023_lightmode": "absent",
            "attended": 6,
            "sessions": 10
        }
        
        result = Backend.flow2_daily_email(row, "01-01-2023_lightmode")
        
        self.assertIsNotNone(result)
        self.assertEqual(result["name"], "Bob")
        self.assertEqual(result["type"], "WARNING")
        mock_gen.assert_called_once()
        mock_send.assert_called_once_with("bob@test.com", "Attendance Warning — Bob", "Test Warning Email")

    @patch('Backend.send_email')
    @patch('Backend.generate_email')
    def test_flow2_daily_email_high_attendance_present(self, mock_gen, mock_send):
        row = {
            "percentage": 80.0,
            "TRAINEE NAME": "Alice",
            "STUDENT MAIL ID": "alice@test.com",
            "roll_no": "123",
            "01-01-2023_lightmode": "present",
            "attended": 8,
            "sessions": 10
        }
        
        result = Backend.flow2_daily_email(row, "01-01-2023_lightmode")
        
        self.assertIsNone(result)
        mock_gen.assert_not_called()
        mock_send.assert_not_called()

if __name__ == '__main__':
    unittest.main()
