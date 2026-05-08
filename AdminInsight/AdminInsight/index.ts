import { IInputs, IOutputs } from "./generated/ManifestTypes";

// ============================================================
// FULL DATASET — ATTEND_INSIGHTS_NEW.xlsx
// ============================================================
interface StudentRecord {
    roll_no: string;
    technology: string;
    sessions: number;
    attended: number;
    percentage: number;
    absent: number;
    daily: Record<string, string>;
}

const DATASET: StudentRecord[] = [
    { roll_no:"23P31A0509", technology:"CSE - AI & ML", sessions:203, attended:189, percentage:93.10, absent:14, daily:{"05-05-2025":"present","06-05-2025":"present","07-05-2025":"present","08-05-2025":"present","09-05-2025":"present","10-05-2025":"present","12-05-2025":"present","13-05-2025":"present","14-05-2025":"present","15-05-2025":"present","16-05-2025":"present","17-05-2025":"present","19-05-2025":"present","20-05-2025":"present","21-05-2025":"present","22-05-2025":"present","23-05-2025":"present","24-05-2025":"present","26-05-2025":"present","27-05-2025":"present","28-05-2025":"present","29-05-2025":"present","30-05-2025":"present","31-05-2025":"present","02-06-2025":"present","03-06-2025":"present","04-06-2025":"present","05-06-2025":"present","06-06-2025":"present","09-06-2025":"present","10-06-2025":"present","11-06-2025":"present","12-06-2025":"present","13-06-2025":"present","14-06-2025":"present","16-06-2025":"present","17-06-2025":"present","18-06-2025":"present","19-06-2025":"present","20-06-2025":"present","21-06-2025":"present","23-06-2025":"present","26-06-2025":"present","27-06-2025":"present","30-06-2025":"present","01-07-2025":"present","02-07-2025":"present","03-07-2025":"present","04-07-2025":"present","05-07-2025":"present","07-07-2025":"present","08-07-2025":"present","09-07-2025":"present","10-07-2025":"present","11-07-2025":"present","12-07-2025":"present","14-07-2025":"present","15-07-2025":"present","16-07-2025":"present","17-07-2025":"present","18-07-2025":"present","19-07-2025":"present","21-07-2025":"present","22-07-2025":"present","23-07-2025":"present","24-07-2025":"present","25-07-2025":"present","26-07-2025":"present","28-07-2025":"present","29-07-2025":"present","30-07-2025":"present","31-07-2025":"present","01-08-2025":"present","02-08-2025":"present","04-08-2025":"present","05-08-2025":"present","06-08-2025":"present","07-08-2025":"present","08-08-2025":"absent","09-08-2025":"present","11-08-2025":"present","12-08-2025":"present","13-08-2025":"present","14-08-2025":"present","25-08-2025":"present","26-08-2025":"present","29-08-2025":"present","28-08-2025":"present","30-08-2025":"present","01-09-2025":"present","02-09-2025":"absent","03-09-2025":"present","04-09-2025":"absent","06-09-2025":"present","08-09-2025":"present","09-09-2025":"present","10-09-2025":"present","11-09-2025":"present","12-09-2025":"present","13-09-2025":"present","17-09-2025":"present","18-09-2025":"present","19-09-2025":"present","20-09-2025":"present","22-09-2025":"present","23-09-2025":"present","24-09-2025":"present","25-09-2025":"present","26-09-2025":"present","27-09-2025":"present","06-10-2025":"present","07-10-2025":"present","08-10-2025":"present","09-10-2025":"present","10-10-2025":"present","11-10-2025":"present","13-10-2025":"present","14-10-2025":"present","15-10-2025":"present","16-10-2025":"present","17-10-2025":"present","18-10-2025":"present","21-10-2025":"present","22-10-2025":"present","23-10-2025":"present","24-10-2025":"present","25-10-2025":"present","30-10-2025":"present","31-10-2025":"present","01-11-2025":"absent","01-12-2025":"absent","02-12-2025":"present","03-12-2025":"present","04-12-2025":"present","05-12-2025":"present","06-12-2025":"present","15-12-2025":"present","16-12-2025":"present","17-12-2025":"present","18-12-2025":"present","19-12-2025":"present","20-12-2025":"present","22-12-2025":"absent","23-12-2025":"present","24-12-2025":"present","26-12-2025":"present","27-12-2025":"present","29-12-2025":"present","30-12-2025":"present","31-12-2025":"present","02-01-2026":"present","03-01-2026":"present","05-01-2026":"present","06-01-2026":"present","07-01-2026":"present","08-01-2026":"present","09-01-2026":"present","10-01-2026":"absent","19-01-2026":"absent","20-01-2026":"present","21-01-2026":"present","22-01-2026":"absent","23-01-2026":"present","24-01-2026":"present","27-01-2026":"present","28-01-2026":"present","29-01-2026":"present","30-01-2026":"present","31-01-2026":"present","16-02-2026":"present","17-02-2026":"present","18-02-2026":"absent","19-02-2026":"present","20-02-2026":"present","21-02-2026":"present","23-02-2026":"present","24-02-2026":"present","25-02-2026":"present","26-02-2026":"present","27-02-2026":"present","28-02-2026":"absent","02-03-2026":"absent","04-03-2026":"present","05-03-2026":"present","06-03-2026":"present","07-03-2026":"present","09-03-2026":"present","10-03-2026":"present","11-03-2026":"present","12-03-2026":"present","13-03-2026":"present","14-03-2026":"present","16-03-2026":"present","17-03-2026":"present","18-03-2026":"present","23-03-2026":"present","24-03-2026":"absent","25-03-2026":"absent","26-03-2026":"present"} },
    { roll_no:"23P31A0564", technology:"CSE - AI & ML", sessions:203, attended:187, percentage:92.12, absent:16, daily:{"05-05-2025":"present","06-05-2025":"present","07-05-2025":"present","08-05-2025":"present","09-05-2025":"present","10-05-2025":"present","12-05-2025":"present","13-05-2025":"present","14-05-2025":"present","15-05-2025":"present","16-05-2025":"present","17-05-2025":"present","19-05-2025":"present","20-05-2025":"present","21-05-2025":"present","22-05-2025":"present","23-05-2025":"present","24-05-2025":"present","26-05-2025":"present","27-05-2025":"present","28-05-2025":"present","29-05-2025":"present","30-05-2025":"present","31-05-2025":"present","02-06-2025":"present","03-06-2025":"present","04-06-2025":"present","05-06-2025":"present","06-06-2025":"present","09-06-2025":"present","10-06-2025":"present","11-06-2025":"present","12-06-2025":"present","13-06-2025":"present","14-06-2025":"present","16-06-2025":"present","17-06-2025":"present","18-06-2025":"present","19-06-2025":"present","20-06-2025":"present","21-06-2025":"present","23-06-2025":"present","26-06-2025":"present","27-06-2025":"present","30-06-2025":"present","01-07-2025":"present","02-07-2025":"present","03-07-2025":"present","04-07-2025":"present","05-07-2025":"present","07-07-2025":"present","08-07-2025":"present","09-07-2025":"present","10-07-2025":"present","11-07-2025":"present","12-07-2025":"present","14-07-2025":"present","15-07-2025":"present","16-07-2025":"present","17-07-2025":"present","18-07-2025":"present","19-07-2025":"present","21-07-2025":"present","22-07-2025":"present","23-07-2025":"present","24-07-2025":"present","25-07-2025":"present","26-07-2025":"present","28-07-2025":"present","29-07-2025":"present","30-07-2025":"present","31-07-2025":"present","01-08-2025":"present","02-08-2025":"present","04-08-2025":"present","05-08-2025":"present","06-08-2025":"present","07-08-2025":"present","08-08-2025":"present","09-08-2025":"present","11-08-2025":"present","12-08-2025":"present","13-08-2025":"present","14-08-2025":"present","25-08-2025":"present","26-08-2025":"present","29-08-2025":"present","28-08-2025":"absent","30-08-2025":"present","01-09-2025":"present","02-09-2025":"present","03-09-2025":"present","04-09-2025":"present","06-09-2025":"present","08-09-2025":"present","09-09-2025":"present","10-09-2025":"present","11-09-2025":"present","12-09-2025":"present","13-09-2025":"present","17-09-2025":"present","18-09-2025":"present","19-09-2025":"present","20-09-2025":"absent","22-09-2025":"present","23-09-2025":"present","24-09-2025":"present","25-09-2025":"present","26-09-2025":"present","27-09-2025":"present","06-10-2025":"present","07-10-2025":"present","08-10-2025":"present","09-10-2025":"present","10-10-2025":"absent","11-10-2025":"present","13-10-2025":"present","14-10-2025":"present","15-10-2025":"present","16-10-2025":"present","17-10-2025":"present","18-10-2025":"present","21-10-2025":"absent","22-10-2025":"present","23-10-2025":"present","24-10-2025":"present","25-10-2025":"present","30-10-2025":"present","31-10-2025":"present","01-11-2025":"absent","01-12-2025":"present","02-12-2025":"present","03-12-2025":"present","04-12-2025":"present","05-12-2025":"present","06-12-2025":"present","15-12-2025":"present","16-12-2025":"present","17-12-2025":"present","18-12-2025":"present","19-12-2025":"present","20-12-2025":"absent","22-12-2025":"absent","23-12-2025":"present","24-12-2025":"present","26-12-2025":"present","27-12-2025":"present","29-12-2025":"present","30-12-2025":"present","31-12-2025":"present","02-01-2026":"present","03-01-2026":"present","05-01-2026":"present","06-01-2026":"present","07-01-2026":"present","08-01-2026":"present","09-01-2026":"absent","10-01-2026":"absent","19-01-2026":"absent","20-01-2026":"present","21-01-2026":"present","22-01-2026":"present","23-01-2026":"present","24-01-2026":"present","27-01-2026":"present","28-01-2026":"present","29-01-2026":"present","30-01-2026":"present","31-01-2026":"present","16-02-2026":"present","17-02-2026":"present","18-02-2026":"present","19-02-2026":"present","20-02-2026":"present","21-02-2026":"absent","23-02-2026":"absent","24-02-2026":"present","25-02-2026":"present","26-02-2026":"present","27-02-2026":"present","28-02-2026":"absent","02-03-2026":"present","04-03-2026":"present","05-03-2026":"present","06-03-2026":"present","07-03-2026":"present","09-03-2026":"present","10-03-2026":"present","11-03-2026":"present","12-03-2026":"absent","13-03-2026":"present","14-03-2026":"present","16-03-2026":"present","17-03-2026":"present","18-03-2026":"present","23-03-2026":"present","24-03-2026":"absent","25-03-2026":"absent","26-03-2026":"present"} },
    { roll_no:"23P31A0575", technology:"CSE - AI & ML", sessions:203, attended:177, percentage:87.19, absent:26, daily:{"05-05-2025":"present","06-05-2025":"present","07-05-2025":"present","08-05-2025":"present","09-05-2025":"present","10-05-2025":"present","12-05-2025":"present","13-05-2025":"present","14-05-2025":"present","15-05-2025":"present","16-05-2025":"present","17-05-2025":"present","19-05-2025":"present","20-05-2025":"present","21-05-2025":"present","22-05-2025":"present","23-05-2025":"present","24-05-2025":"present","26-05-2025":"present","27-05-2025":"present","28-05-2025":"present","29-05-2025":"present","30-05-2025":"present","31-05-2025":"present","02-06-2025":"present","03-06-2025":"present","04-06-2025":"present","05-06-2025":"present","06-06-2025":"present","09-06-2025":"present","10-06-2025":"present","11-06-2025":"present","12-06-2025":"present","13-06-2025":"present","14-06-2025":"present","16-06-2025":"present","17-06-2025":"present","18-06-2025":"present","19-06-2025":"present","20-06-2025":"present","21-06-2025":"present","23-06-2025":"present","26-06-2025":"present","27-06-2025":"present","30-06-2025":"absent","01-07-2025":"present","02-07-2025":"present","03-07-2025":"present","04-07-2025":"present","05-07-2025":"present","07-07-2025":"present","08-07-2025":"present","09-07-2025":"present","10-07-2025":"present","11-07-2025":"present","12-07-2025":"present","14-07-2025":"present","15-07-2025":"present","16-07-2025":"present","17-07-2025":"present","18-07-2025":"present","19-07-2025":"present","21-07-2025":"present","22-07-2025":"present","23-07-2025":"absent","24-07-2025":"present","25-07-2025":"present","26-07-2025":"present","28-07-2025":"present","29-07-2025":"present","30-07-2025":"present","31-07-2025":"present","01-08-2025":"present","02-08-2025":"present","04-08-2025":"present","05-08-2025":"present","06-08-2025":"present","07-08-2025":"present","08-08-2025":"present","09-08-2025":"present","11-08-2025":"present","12-08-2025":"present","13-08-2025":"present","14-08-2025":"present","25-08-2025":"present","26-08-2025":"present","29-08-2025":"present","28-08-2025":"present","30-08-2025":"present","01-09-2025":"present","02-09-2025":"present","03-09-2025":"present","04-09-2025":"present","06-09-2025":"present","08-09-2025":"present","09-09-2025":"present","10-09-2025":"present","11-09-2025":"present","12-09-2025":"present","13-09-2025":"present","17-09-2025":"present","18-09-2025":"present","19-09-2025":"present","20-09-2025":"present","22-09-2025":"present","23-09-2025":"present","24-09-2025":"present","25-09-2025":"present","26-09-2025":"absent","27-09-2025":"absent","06-10-2025":"present","07-10-2025":"present","08-10-2025":"present","09-10-2025":"absent","10-10-2025":"absent","11-10-2025":"absent","13-10-2025":"present","14-10-2025":"present","15-10-2025":"present","16-10-2025":"present","17-10-2025":"present","18-10-2025":"absent","21-10-2025":"present","22-10-2025":"present","23-10-2025":"present","24-10-2025":"present","25-10-2025":"absent","30-10-2025":"present","31-10-2025":"present","01-11-2025":"absent","01-12-2025":"present","02-12-2025":"present","03-12-2025":"present","04-12-2025":"present","05-12-2025":"present","06-12-2025":"present","15-12-2025":"present","16-12-2025":"present","17-12-2025":"present","18-12-2025":"present","19-12-2025":"present","20-12-2025":"present","22-12-2025":"present","23-12-2025":"present","24-12-2025":"present","26-12-2025":"present","27-12-2025":"present","29-12-2025":"present","30-12-2025":"present","31-12-2025":"present","02-01-2026":"present","03-01-2026":"present","05-01-2026":"present","06-01-2026":"present","07-01-2026":"present","08-01-2026":"absent","09-01-2026":"absent","10-01-2026":"absent","19-01-2026":"absent","20-01-2026":"absent","21-01-2026":"absent","22-01-2026":"present","23-01-2026":"present","24-01-2026":"present","27-01-2026":"present","28-01-2026":"present","29-01-2026":"present","30-01-2026":"present","31-01-2026":"present","16-02-2026":"absent","17-02-2026":"present","18-02-2026":"present","19-02-2026":"present","20-02-2026":"absent","21-02-2026":"present","23-02-2026":"present","24-02-2026":"present","25-02-2026":"present","26-02-2026":"absent","27-02-2026":"present","28-02-2026":"absent","02-03-2026":"absent","04-03-2026":"present","05-03-2026":"present","06-03-2026":"present","07-03-2026":"absent","09-03-2026":"present","10-03-2026":"present","11-03-2026":"present","12-03-2026":"present","13-03-2026":"present","14-03-2026":"present","16-03-2026":"present","17-03-2026":"present","18-03-2026":"present","23-03-2026":"absent","24-03-2026":"absent","25-03-2026":"absent","26-03-2026":"absent"} },
    { roll_no:"23P31A4224", technology:"CSE - AI & ML", sessions:203, attended:179, percentage:88.18, absent:24, daily:{"05-05-2025":"present","06-05-2025":"present","07-05-2025":"present","08-05-2025":"present","09-05-2025":"present","10-05-2025":"present","12-05-2025":"present","13-05-2025":"present","14-05-2025":"present","15-05-2025":"present","16-05-2025":"present","17-05-2025":"present","19-05-2025":"present","20-05-2025":"present","21-05-2025":"present","22-05-2025":"present","23-05-2025":"present","24-05-2025":"present","26-05-2025":"present","27-05-2025":"present","28-05-2025":"present","29-05-2025":"present","30-05-2025":"present","31-05-2025":"present","02-06-2025":"present","03-06-2025":"present","04-06-2025":"present","05-06-2025":"present","06-06-2025":"present","09-06-2025":"present","10-06-2025":"present","11-06-2025":"present","12-06-2025":"present","13-06-2025":"present","14-06-2025":"present","16-06-2025":"present","17-06-2025":"present","18-06-2025":"present","19-06-2025":"present","20-06-2025":"present","21-06-2025":"present","23-06-2025":"present","26-06-2025":"present","27-06-2025":"present","30-06-2025":"present","01-07-2025":"present","02-07-2025":"present","03-07-2025":"present","04-07-2025":"present","05-07-2025":"present","07-07-2025":"present","08-07-2025":"present","09-07-2025":"present","10-07-2025":"present","11-07-2025":"present","12-07-2025":"present","14-07-2025":"present","15-07-2025":"present","16-07-2025":"present","17-07-2025":"present","18-07-2025":"present","19-07-2025":"present","21-07-2025":"present","22-07-2025":"present","23-07-2025":"present","24-07-2025":"present","25-07-2025":"present","26-07-2025":"present","28-07-2025":"present","29-07-2025":"present","30-07-2025":"present","31-07-2025":"present","01-08-2025":"present","02-08-2025":"present","04-08-2025":"present","05-08-2025":"present","06-08-2025":"present","07-08-2025":"present","08-08-2025":"absent","09-08-2025":"absent","11-08-2025":"present","12-08-2025":"present","13-08-2025":"present","14-08-2025":"present","25-08-2025":"present","26-08-2025":"present","29-08-2025":"present","28-08-2025":"present","30-08-2025":"absent","01-09-2025":"present","02-09-2025":"present","03-09-2025":"absent","04-09-2025":"absent","06-09-2025":"absent","08-09-2025":"present","09-09-2025":"present","10-09-2025":"present","11-09-2025":"present","12-09-2025":"present","13-09-2025":"present","17-09-2025":"present","18-09-2025":"present","19-09-2025":"present","20-09-2025":"present","22-09-2025":"present","23-09-2025":"present","24-09-2025":"present","25-09-2025":"present","26-09-2025":"present","27-09-2025":"present","06-10-2025":"present","07-10-2025":"present","08-10-2025":"present","09-10-2025":"present","10-10-2025":"present","11-10-2025":"present","13-10-2025":"present","14-10-2025":"present","15-10-2025":"present","16-10-2025":"present","17-10-2025":"present","18-10-2025":"present","21-10-2025":"absent","22-10-2025":"present","23-10-2025":"present","24-10-2025":"present","25-10-2025":"present","30-10-2025":"absent","31-10-2025":"present","01-11-2025":"absent","01-12-2025":"present","02-12-2025":"present","03-12-2025":"present","04-12-2025":"present","05-12-2025":"present","06-12-2025":"absent","15-12-2025":"absent","16-12-2025":"present","17-12-2025":"present","18-12-2025":"present","19-12-2025":"present","20-12-2025":"present","22-12-2025":"present","23-12-2025":"present","24-12-2025":"present","26-12-2025":"present","27-12-2025":"present","29-12-2025":"present","30-12-2025":"absent","31-12-2025":"absent","02-01-2026":"present","03-01-2026":"present","05-01-2026":"present","06-01-2026":"present","07-01-2026":"present","08-01-2026":"absent","09-01-2026":"present","10-01-2026":"absent","19-01-2026":"absent","20-01-2026":"absent","21-01-2026":"present","22-01-2026":"present","23-01-2026":"present","24-01-2026":"present","27-01-2026":"present","28-01-2026":"present","29-01-2026":"present","30-01-2026":"present","31-01-2026":"present","16-02-2026":"present","17-02-2026":"present","18-02-2026":"present","19-02-2026":"present","20-02-2026":"present","21-02-2026":"present","23-02-2026":"absent","24-02-2026":"present","25-02-2026":"present","26-02-2026":"present","27-02-2026":"present","28-02-2026":"present","02-03-2026":"absent","04-03-2026":"present","05-03-2026":"present","06-03-2026":"present","07-03-2026":"present","09-03-2026":"present","10-03-2026":"present","11-03-2026":"present","12-03-2026":"present","13-03-2026":"absent","14-03-2026":"present","16-03-2026":"present","17-03-2026":"present","18-03-2026":"absent","23-03-2026":"present","24-03-2026":"absent","25-03-2026":"absent","26-03-2026":"absent"} },
    { roll_no:"23P31A4241", technology:"CSE - AI & ML", sessions:203, attended:163, percentage:80.30, absent:40, daily:{"05-05-2025":"present","06-05-2025":"present","07-05-2025":"present","08-05-2025":"present","09-05-2025":"present","10-05-2025":"present","12-05-2025":"present","13-05-2025":"present","14-05-2025":"present","15-05-2025":"present","16-05-2025":"absent","17-05-2025":"present","19-05-2025":"absent","20-05-2025":"present","21-05-2025":"present","22-05-2025":"absent","23-05-2025":"absent","24-05-2025":"absent","26-05-2025":"absent","27-05-2025":"absent","28-05-2025":"absent","29-05-2025":"absent","30-05-2025":"absent","31-05-2025":"absent","02-06-2025":"absent","03-06-2025":"present","04-06-2025":"absent","05-06-2025":"absent","06-06-2025":"absent","09-06-2025":"absent","10-06-2025":"present","11-06-2025":"absent","12-06-2025":"absent","13-06-2025":"absent","14-06-2025":"present","16-06-2025":"absent","17-06-2025":"absent","18-06-2025":"absent","19-06-2025":"absent","20-06-2025":"absent","21-06-2025":"present","23-06-2025":"absent","26-06-2025":"absent","27-06-2025":"absent","30-06-2025":"absent","01-07-2025":"present","02-07-2025":"present","03-07-2025":"present","04-07-2025":"present","05-07-2025":"present","07-07-2025":"present","08-07-2025":"present","09-07-2025":"present","10-07-2025":"present","11-07-2025":"present","12-07-2025":"present","14-07-2025":"present","15-07-2025":"present","16-07-2025":"present","17-07-2025":"present","18-07-2025":"present","19-07-2025":"present","21-07-2025":"present","22-07-2025":"present","23-07-2025":"present","24-07-2025":"present","25-07-2025":"present","26-07-2025":"present","28-07-2025":"present","29-07-2025":"present","30-07-2025":"present","31-07-2025":"present","01-08-2025":"present","02-08-2025":"present","04-08-2025":"present","05-08-2025":"present","06-08-2025":"present","07-08-2025":"present","08-08-2025":"present","09-08-2025":"present","11-08-2025":"present","12-08-2025":"present","13-08-2025":"present","14-08-2025":"present","25-08-2025":"present","26-08-2025":"present","29-08-2025":"present","28-08-2025":"present","30-08-2025":"present","01-09-2025":"present","02-09-2025":"present","03-09-2025":"present","04-09-2025":"present","06-09-2025":"present","08-09-2025":"present","09-09-2025":"present","10-09-2025":"present","11-09-2025":"present","12-09-2025":"present","13-09-2025":"present","17-09-2025":"present","18-09-2025":"present","19-09-2025":"present","20-09-2025":"present","22-09-2025":"present","23-09-2025":"present","24-09-2025":"present","25-09-2025":"present","26-09-2025":"present","27-09-2025":"absent","06-10-2025":"present","07-10-2025":"present","08-10-2025":"present","09-10-2025":"present","10-10-2025":"present","11-10-2025":"present","13-10-2025":"present","14-10-2025":"present","15-10-2025":"present","16-10-2025":"present","17-10-2025":"present","18-10-2025":"present","21-10-2025":"present","22-10-2025":"present","23-10-2025":"present","24-10-2025":"present","25-10-2025":"present","30-10-2025":"present","31-10-2025":"present","01-11-2025":"present","01-12-2025":"present","02-12-2025":"present","03-12-2025":"present","04-12-2025":"present","05-12-2025":"present","06-12-2025":"present","15-12-2025":"present","16-12-2025":"present","17-12-2025":"present","18-12-2025":"present","19-12-2025":"absent","20-12-2025":"present","22-12-2025":"present","23-12-2025":"present","24-12-2025":"present","26-12-2025":"present","27-12-2025":"present","29-12-2025":"present","30-12-2025":"present","31-12-2025":"present","02-01-2026":"present","03-01-2026":"present","05-01-2026":"present","06-01-2026":"absent","07-01-2026":"absent","08-01-2026":"absent","09-01-2026":"absent","10-01-2026":"absent","19-01-2026":"absent","20-01-2026":"absent","21-01-2026":"present","22-01-2026":"present","23-01-2026":"present","24-01-2026":"present","27-01-2026":"present","28-01-2026":"present","29-01-2026":"present","30-01-2026":"absent","31-01-2026":"absent","16-02-2026":"absent","17-02-2026":"present","18-02-2026":"present","19-02-2026":"present","20-02-2026":"present","21-02-2026":"present","23-02-2026":"present","24-02-2026":"present","25-02-2026":"present","26-02-2026":"present","27-02-2026":"present","28-02-2026":"present","02-03-2026":"present","04-03-2026":"present","05-03-2026":"present","06-03-2026":"present","07-03-2026":"present","09-03-2026":"present","10-03-2026":"present","11-03-2026":"present","12-03-2026":"present","13-03-2026":"present","14-03-2026":"present","16-03-2026":"present","17-03-2026":"present","18-03-2026":"present","23-03-2026":"present","24-03-2026":"present","25-03-2026":"present","26-03-2026":"present"} },
    { roll_no:"23A91A1293", technology:"CSE - Data Science", sessions:203, attended:181, percentage:89.16, absent:22, daily:{"05-05-2025":"present","06-05-2025":"present","07-05-2025":"present","08-05-2025":"present","09-05-2025":"present","10-05-2025":"present","12-05-2025":"present","13-05-2025":"present","14-05-2025":"present","15-05-2025":"present","16-05-2025":"present","17-05-2025":"present","19-05-2025":"present","20-05-2025":"present","21-05-2025":"present","22-05-2025":"present","23-05-2025":"present","24-05-2025":"present","26-05-2025":"present","27-05-2025":"present","28-05-2025":"present","29-05-2025":"present","30-05-2025":"present","31-05-2025":"present","02-06-2025":"present","03-06-2025":"present","04-06-2025":"present","05-06-2025":"present","06-06-2025":"present","09-06-2025":"present","10-06-2025":"present","11-06-2025":"present","12-06-2025":"present","13-06-2025":"present","14-06-2025":"present","16-06-2025":"present","17-06-2025":"present","18-06-2025":"present","19-06-2025":"present","20-06-2025":"present","21-06-2025":"present","23-06-2025":"present","26-06-2025":"present","27-06-2025":"present","30-06-2025":"present","01-07-2025":"present","02-07-2025":"present","03-07-2025":"present","04-07-2025":"present","05-07-2025":"present","07-07-2025":"present","08-07-2025":"present","09-07-2025":"present","10-07-2025":"present","11-07-2025":"present","12-07-2025":"present","14-07-2025":"present","15-07-2025":"present","16-07-2025":"present","17-07-2025":"present","18-07-2025":"present","19-07-2025":"present","21-07-2025":"present","22-07-2025":"present","23-07-2025":"present","24-07-2025":"present","25-07-2025":"present","26-07-2025":"present","28-07-2025":"present","29-07-2025":"present","30-07-2025":"present","31-07-2025":"present","01-08-2025":"present","02-08-2025":"absent","04-08-2025":"present","05-08-2025":"present","06-08-2025":"present","07-08-2025":"present","08-08-2025":"present","09-08-2025":"present","11-08-2025":"present","12-08-2025":"absent","13-08-2025":"present","14-08-2025":"present","25-08-2025":"present","26-08-2025":"present","29-08-2025":"absent","28-08-2025":"present","30-08-2025":"present","01-09-2025":"present","02-09-2025":"present","03-09-2025":"present","04-09-2025":"present","06-09-2025":"present","08-09-2025":"present","09-09-2025":"present","10-09-2025":"present","11-09-2025":"present","12-09-2025":"present","13-09-2025":"present","17-09-2025":"present","18-09-2025":"present","19-09-2025":"present","20-09-2025":"absent","22-09-2025":"present","23-09-2025":"present","24-09-2025":"present","25-09-2025":"present","26-09-2025":"present","27-09-2025":"present","06-10-2025":"absent","07-10-2025":"present","08-10-2025":"present","09-10-2025":"present","10-10-2025":"present","11-10-2025":"present","13-10-2025":"present","14-10-2025":"present","15-10-2025":"present","16-10-2025":"present","17-10-2025":"present","18-10-2025":"present","21-10-2025":"present","22-10-2025":"present","23-10-2025":"present","24-10-2025":"present","25-10-2025":"present","30-10-2025":"present","31-10-2025":"present","01-11-2025":"present","01-12-2025":"present","02-12-2025":"present","03-12-2025":"present","04-12-2025":"present","05-12-2025":"present","06-12-2025":"present","15-12-2025":"present","16-12-2025":"present","17-12-2025":"present","18-12-2025":"present","19-12-2025":"present","20-12-2025":"present","22-12-2025":"present","23-12-2025":"present","24-12-2025":"present","26-12-2025":"present","27-12-2025":"present","29-12-2025":"present","30-12-2025":"absent","31-12-2025":"present","02-01-2026":"present","03-01-2026":"present","05-01-2026":"present","06-01-2026":"present","07-01-2026":"present","08-01-2026":"present","09-01-2026":"absent","10-01-2026":"absent","19-01-2026":"absent","20-01-2026":"absent","21-01-2026":"absent","22-01-2026":"absent","23-01-2026":"present","24-01-2026":"present","27-01-2026":"present","28-01-2026":"present","29-01-2026":"present","30-01-2026":"present","31-01-2026":"present","16-02-2026":"present","17-02-2026":"present","18-02-2026":"present","19-02-2026":"present","20-02-2026":"present","21-02-2026":"absent","23-02-2026":"present","24-02-2026":"present","25-02-2026":"present","26-02-2026":"present","27-02-2026":"present","28-02-2026":"absent","02-03-2026":"absent","04-03-2026":"present","05-03-2026":"absent","06-03-2026":"absent","07-03-2026":"absent","09-03-2026":"present","10-03-2026":"present","11-03-2026":"present","12-03-2026":"present","13-03-2026":"absent","14-03-2026":"present","16-03-2026":"present","17-03-2026":"present","18-03-2026":"present","23-03-2026":"present","24-03-2026":"absent","25-03-2026":"absent","26-03-2026":"absent"} }
];

// ============================================================
// DATA QUERY HELPERS
// ============================================================
function getAbsenteesOnDate(date: string): StudentRecord[] {
    const norm = date.trim();
    return DATASET.filter(s => {
        const val = s.daily[norm];
        return val === "absent";
    });
}

function getPresentOnDate(date: string): StudentRecord[] {
    const norm = date.trim();
    return DATASET.filter(s => {
        const val = s.daily[norm];
        return val === "present";
    });
}

function getBelowThreshold(threshold: number = 75): StudentRecord[] {
    return DATASET.filter(s => s.percentage < threshold);
}

function getByTechnology(tech: string): StudentRecord[] {
    return DATASET.filter(s => s.technology.toLowerCase().includes(tech.toLowerCase()));
}

function buildDataSummary(): string {
    const totalStudents = DATASET.length;
    const avgPct = Math.round(DATASET.reduce((s, d) => s + d.percentage, 0) / totalStudents * 100) / 100;
    const below75 = getBelowThreshold(75);
    const below85 = getBelowThreshold(85).filter(s => s.percentage >= 75);
    const excellent = DATASET.filter(s => s.percentage >= 90);
    const allDates = [...new Set(DATASET.flatMap(s => Object.keys(s.daily)))].sort();
    const lastDate = allDates[allDates.length - 1] ?? "N/A";

    return `
ATTEND INSIGHTS — COMPLETE DATASET SUMMARY
===========================================
Total Students: ${totalStudents}
Total Sessions Tracked: ${DATASET[0]?.sessions ?? 203}
Date Range: 05-05-2025 to 26-03-2026 (${allDates.length} tracked dates)
Average Attendance: ${avgPct}%
Last Recorded Date: ${lastDate}

STUDENT ROSTER:
${DATASET.map(s => `  • ${s.roll_no} | ${s.technology} | ${s.attended}/${s.sessions} = ${s.percentage}% | Absent: ${s.absent} days`).join("\n")}

STATISTICS:
• Below 75% (at risk): ${below75.length} students → ${below75.map(s=>s.roll_no).join(", ") || "None"}
• Below 85% (warning): ${below85.length} students → ${below85.map(s=>s.roll_no).join(", ") || "None"}
• 90%+ (excellent): ${excellent.length} students → ${excellent.map(s=>s.roll_no).join(", ")}

TECHNOLOGY BREAKDOWN:
• CSE - AI & ML: ${DATASET.filter(s=>s.technology==="CSE - AI & ML").length} students
• CSE - Data Science: ${DATASET.filter(s=>s.technology==="CSE - Data Science").length} students
`.trim();
}

export class AdminDashboard implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private chatHistory: { role: string; content: string }[] = [];
    private chatBox: HTMLDivElement | null = null;
    private inputEl: HTMLInputElement | null = null;
    private sendBtn: HTMLButtonElement | null = null;
    private apiKey: string = "";

    constructor() {}

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this.container = container;
        this.apiKey = context.parameters.ApiKey?.raw ?? "";
        this.renderAdmin(context);
    }

    // ============================================================
    // LOCAL ANSWER ENGINE — handles queries without API call
    // ============================================================
    private tryLocalAnswer(query: string): string | null {
        const q = query.toLowerCase();

        // Date-specific absentees
        const dateMatch = q.match(/absent.*?(\d{2}[-\/]\d{2}[-\/]\d{4})|(\d{2}[-\/]\d{2}[-\/]\d{4}).*?absent/);
        if (dateMatch) {
            const raw = dateMatch[1] || dateMatch[2];
            const normalized = raw.replace(/\//g, "-");
            const absentees = getAbsenteesOnDate(normalized);
            if (absentees.length === 0) return `No absentees found on ${normalized}. Either it's not a tracked date or all students were present.`;
            return `**Absentees on ${normalized}:**\n\n${absentees.map((s,i) => `${i+1}. **${s.roll_no}** — ${s.technology} | Overall: ${s.percentage}%`).join("\n")}\n\n*Total: ${absentees.length} student(s) absent.*`;
        }

        // Date-specific present
        const presentMatch = q.match(/present.*?(\d{2}[-\/]\d{2}[-\/]\d{4})|(\d{2}[-\/]\d{2}[-\/]\d{4}).*?present/);
        if (presentMatch) {
            const raw = presentMatch[1] || presentMatch[2];
            const normalized = raw.replace(/\//g, "-");
            const presentStudents = getPresentOnDate(normalized);
            if (presentStudents.length === 0) return `No present records found on ${normalized}.`;
            return `**Present on ${normalized}:**\n\n${presentStudents.map((s,i) => `${i+1}. **${s.roll_no}** — ${s.technology} | Overall: ${s.percentage}%`).join("\n")}\n\n*Total: ${presentStudents.length} student(s) present.*`;
        }

        // Below threshold
        if (q.includes("below 75") || q.includes("at risk") || q.includes("critical")) {
            const list = getBelowThreshold(75);
            if (list.length === 0) return "✅ No students are below 75% attendance. All students are safe!";
            return `**Students Below 75% (At Risk):**\n\n${list.map((s,i) => `${i+1}. **${s.roll_no}** — ${s.technology} | ${s.percentage}% | ${s.absent} absences`).join("\n")}\n\n*${list.length} student(s) need immediate attention.*`;
        }

        if (q.includes("below 85") || q.includes("warning")) {
            const list = getBelowThreshold(85);
            return `**Students Below 85%:**\n\n${list.map((s,i) => `${i+1}. **${s.roll_no}** — ${s.technology} | ${s.percentage}% | ${s.absent} absences`).join("\n")}`;
        }

        // Best/worst attendance
        if (q.includes("highest") || q.includes("best attendance") || q.includes("top student")) {
            const best = [...DATASET].sort((a,b) => b.percentage - a.percentage)[0];
            return `🏆 **Best Attendance:** ${best.roll_no} with **${best.percentage}%** (${best.attended}/${best.sessions} sessions) — ${best.technology}`;
        }
        if (q.includes("lowest") || q.includes("worst attendance") || q.includes("bottom")) {
            const worst = [...DATASET].sort((a,b) => a.percentage - b.percentage)[0];
            return `⚠️ **Lowest Attendance:** ${worst.roll_no} with **${worst.percentage}%** (${worst.attended}/${worst.sessions} sessions) — ${worst.technology}`;
        }

        // Technology filter
        if (q.includes("ai & ml") || q.includes("aiml") || q.includes("ai and ml")) {
            const list = getByTechnology("AI & ML");
            return `**CSE - AI & ML Students (${list.length}):**\n\n${list.map((s,i) => `${i+1}. **${s.roll_no}** | ${s.percentage}% | Absent: ${s.absent} days`).join("\n")}`;
        }
        if (q.includes("data science")) {
            const list = getByTechnology("Data Science");
            return `**CSE - Data Science Students (${list.length}):**\n\n${list.map((s,i) => `${i+1}. **${s.roll_no}** | ${s.percentage}% | Absent: ${s.absent} days`).join("\n")}`;
        }

        // All students summary
        if (q.includes("all students") || q.includes("full list") || q.includes("every student")) {
            return `**Complete Student Roster:**\n\n${DATASET.map((s,i) => `${i+1}. **${s.roll_no}** — ${s.technology} | ${s.percentage}% | Present: ${s.attended} | Absent: ${s.absent}`).join("\n")}\n\n**Class Average: ${Math.round(DATASET.reduce((sum,s)=>sum+s.percentage,0)/DATASET.length*100)/100}%**`;
        }

        // Average
        if (q.includes("average") || q.includes("class average")) {
            const avg = Math.round(DATASET.reduce((s,d)=>s+d.percentage,0)/DATASET.length*100)/100;
            return `📊 **Class Average Attendance: ${avg}%**\n\nBreakdown:\n${DATASET.map(s=>`• ${s.roll_no}: ${s.percentage}%`).join("\n")}`;
        }

        // Specific student
        for (const s of DATASET) {
            if (q.includes(s.roll_no.toLowerCase())) {
                const absentDates = Object.entries(s.daily).filter(([,v])=>v==="absent").map(([k])=>k).sort().slice(-10);
                return `**Student: ${s.roll_no}**\n• Technology: ${s.technology}\n• Attendance: **${s.percentage}%**\n• Sessions: ${s.attended}/${s.sessions}\n• Total Absent: ${s.absent} days\n• Recent Absences (last 10): ${absentDates.join(", ") || "None"}\n• Status: ${s.percentage>=90?"🟢 Excellent":s.percentage>=75?"🟡 Acceptable":"🔴 Critical"}`;
            }
        }

        return null; // Fall through to API
    }

    // ============================================================
    // AI API CALL
    // ============================================================
    private async callAI(userMessage: string): Promise<string> {
        // Try local first
        const local = this.tryLocalAnswer(userMessage);
        if (local) return local;

        // Fall back to Anthropic API if key available
        if (!this.apiKey || this.apiKey.trim() === "") {
            return "⚠️ No API key configured. Please bind your Anthropic API key to the `ApiKey` property in Power Apps.\n\nHowever, I can still answer many questions directly! Try:\n• Student names with roll numbers\n• Date queries like 'absentees on 08-08-2025'\n• 'students below 75%'\n• 'best attendance'";
        }

        try {
            const systemPrompt = `You are AttendInsights AI, an intelligent attendance assistant for Technical Hub college.
You have complete access to the attendance dataset. Answer ALL questions accurately based on this data.

${buildDataSummary()}

Rules:
- Always be concise, professional, and data-driven
- When listing students with roll numbers, also mention their technology stream
- For date queries, check the daily attendance records in the dataset summary
- Format your answers clearly with bold headers and bullet points
- You can generate downloadable report summaries in text format`;

            const messages = [
                ...this.chatHistory.slice(-8),
                { role: "user", content: userMessage }
            ];

            const resp = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "claude-sonnet-4-20250514",
                    max_tokens: 1000,
                    system: systemPrompt,
                    messages
                })
            });

            const data = await resp.json();
            if (data.content && data.content[0]?.text) {
                return data.content[0].text;
            }
            return "I couldn't get a response. Please try again.";
        } catch (e) {
            return `Error contacting AI: ${e}. Check your API key and network.`;
        }
    }

    // ============================================================
    // RENDER CHAT MESSAGE
    // ============================================================
    private appendMessage(role: string, content: string): void {
        if (!this.chatBox) return;
        const isUser = role === "user";
        const wrap = document.createElement("div");
        wrap.style.cssText = `display:flex;justify-content:${isUser?"flex-end":"flex-start"};margin-bottom:14px;`;

        const bubble = document.createElement("div");
        bubble.style.cssText = `
            max-width:75%;padding:14px 16px;border-radius:${isUser?"18px 18px 4px 18px":"18px 18px 18px 4px"};
            background:${isUser?"linear-gradient(135deg,#008F39,#005C23)":"#FFFFFF"};
            color:${isUser?"#fff":"#1A1A2E"};
            font-size:13px;line-height:1.6;box-shadow:0 2px 8px rgba(0,0,0,0.08);
        `;

        // Render markdown-like formatting
        const formatted = content
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n\n/g, "<br><br>")
            .replace(/\n/g, "<br>")
            .replace(/•/g, "•");
        bubble.innerHTML = formatted;
        wrap.appendChild(bubble);
        this.chatBox.appendChild(wrap);
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    }

    private showTyping(): HTMLElement {
        const wrap = document.createElement("div");
        wrap.id = "typing-indicator";
        wrap.style.cssText = "display:flex;justify-content:flex-start;margin-bottom:14px;";
        wrap.innerHTML = `<div style="background:#fff;padding:14px 18px;border-radius:18px 18px 18px 4px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
            <div style="display:flex;gap:4px;align-items:center;">
                <div style="width:7px;height:7px;background:#008F39;border-radius:50%;animation:bounce 0.6s infinite;"></div>
                <div style="width:7px;height:7px;background:#008F39;border-radius:50%;animation:bounce 0.6s 0.15s infinite;"></div>
                <div style="width:7px;height:7px;background:#008F39;border-radius:50%;animation:bounce 0.6s 0.3s infinite;"></div>
            </div>
        </div>`;
        if (this.chatBox) this.chatBox.appendChild(wrap);
        this.chatBox!.scrollTop = this.chatBox!.scrollHeight;
        return wrap;
    }

    private async handleSend(text?: string): Promise<void> {
        const msg = text ?? this.inputEl?.value.trim() ?? "";
        if (!msg) return;
        if (this.inputEl) this.inputEl.value = "";
        this.appendMessage("user", msg);
        this.chatHistory.push({ role: "user", content: msg });

        const typing = this.showTyping();
        const reply = await this.callAI(msg);
        typing.remove();
        this.appendMessage("assistant", reply);
        this.chatHistory.push({ role: "assistant", content: reply });
    }

    // ============================================================
    // MAIN RENDER
    // ============================================================
    private renderAdmin(context: ComponentFramework.Context<IInputs>): void {
        this.container.innerHTML = "";
        this.chatHistory = [];

        const adminName = context.parameters.AdminName?.raw ?? "Admin";
        this.apiKey = context.parameters.ApiKey?.raw ?? "";

        // Stats
        const totalStudents = DATASET.length;
        const avgPct = Math.round(DATASET.reduce((s,d)=>s+d.percentage,0)/totalStudents*100)/100;
        const below75 = getBelowThreshold(75).length;
        const excellent = DATASET.filter(s=>s.percentage>=90).length;

        // Inject animation keyframes
        const style = document.createElement("style");
        style.textContent = `
            @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
            @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        `;
        this.container.appendChild(style);

        // ── PAGE ─────────────────────────────────────────────
        const page = document.createElement("div");
        page.style.cssText = "display:flex;height:100vh;font-family:'Segoe UI',Poppins,sans-serif;background:#F0F2F5;overflow:hidden;";

        // ── SIDEBAR ──────────────────────────────────────────
        const sidebar = document.createElement("div");
        sidebar.style.cssText = "width:240px;min-width:240px;background:linear-gradient(180deg,#003D16 0%,#005C23 50%,#007A30 100%);display:flex;flex-direction:column;box-shadow:4px 0 15px rgba(0,0,0,0.2);";

        sidebar.innerHTML = `
            <div style="padding:26px 20px 20px;border-bottom:1px solid rgba(255,255,255,0.12);">
                <div style="color:#fff;font-size:17px;font-weight:900;letter-spacing:0.8px;">TECHNICAL HUB</div>
                <div style="color:rgba(255,255,255,0.55);font-size:11px;margin-top:3px;">Admin Control Panel</div>
            </div>
            <div style="margin:16px;background:rgba(255,255,255,0.1);border-radius:12px;padding:14px;text-align:center;">
                <div style="width:48px;height:48px;border-radius:50%;background:rgba(255,255,255,0.2);margin:0 auto 8px;display:flex;align-items:center;justify-content:center;font-size:20px;">👤</div>
                <div style="color:#fff;font-size:13px;font-weight:700;">${adminName}</div>
                <div style="color:rgba(255,255,255,0.55);font-size:10px;margin-top:2px;">Administrator</div>
            </div>
            <div style="padding:0 12px;flex:1;display:flex;flex-direction:column;gap:2px;">
                ${[
                    { icon:"📊", label:"Dashboard",  active:true  },
                    { icon:"👥", label:"Students",   active:false },
                    { icon:"🤖", label:"AI Chatbot", active:false },
                    { icon:"📈", label:"Analytics",  active:false },
                    { icon:"⚙️", label:"Settings",   active:false },
                    { icon:"🚪", label:"Logout",     active:false },
                ].map(n=>`
                    <div style="padding:11px 14px;border-radius:10px;color:${n.active?"#fff":"rgba(255,255,255,0.7)"};font-size:13px;font-weight:${n.active?"600":"400"};background:${n.active?"rgba(255,255,255,0.18)":"transparent"};cursor:pointer;">
                        ${n.icon} ${n.label}
                    </div>`).join("")}
            </div>
            <div style="padding:14px;border-top:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.35);font-size:10px;text-align:center;">© 2026 Technical Hub</div>
        `;

        // ── RIGHT PANEL ───────────────────────────────────────
        const right = document.createElement("div");
        right.style.cssText = "flex:1;display:flex;flex-direction:column;overflow:hidden;";

        // Top bar
        const topBar = document.createElement("div");
        topBar.style.cssText = "background:#fff;padding:16px 28px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 2px 8px rgba(0,0,0,0.05);flex-shrink:0;";
        topBar.innerHTML = `
            <div>
                <div style="font-size:20px;font-weight:800;color:#1A1A2E;">Admin Dashboard</div>
                <div style="font-size:12px;color:#888;margin-top:1px;">AttendInsights — Technical Hub · ${new Date().toLocaleDateString("en-IN",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
            </div>
            <div style="display:flex;gap:10px;align-items:center;">
                <div style="background:#F0FFF4;color:#008F39;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;">● Live</div>
                <div style="background:#F5F5F5;padding:8px 14px;border-radius:8px;font-size:12px;color:#555;">${totalStudents} Students</div>
            </div>
        `;

        // Scrollable content area
        const content = document.createElement("div");
        content.style.cssText = "flex:1;overflow-y:auto;padding:22px 28px;display:flex;flex-direction:column;gap:20px;";

        // ── METRIC CARDS ─────────────────────────────────────
        const metricsRow = document.createElement("div");
        metricsRow.style.cssText = "display:grid;grid-template-columns:repeat(4,1fr);gap:16px;";
        const metrics = [
            { icon:"👥", label:"Total Students", val:totalStudents.toString(), color:"#008F39", sub:"Enrolled" },
            { icon:"📊", label:"Class Average",  val:avgPct+"%",               color:"#008F39", sub:"Attendance" },
            { icon:"⚠️",  label:"At Risk (<75%)",val:below75.toString(),        color:"#DC3545", sub:"Need attention" },
            { icon:"🏆", label:"Excellent (≥90%)",val:excellent.toString(),     color:"#008F39", sub:"Top performers" },
        ];
        metrics.forEach(m => {
            const c = document.createElement("div");
            c.style.cssText = "background:#fff;border-radius:14px;padding:20px;box-shadow:0 2px 10px rgba(0,0,0,0.05);";
            c.innerHTML = `<div style="font-size:11px;color:#999;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">${m.label}</div><div style="font-size:30px;font-weight:800;color:${m.color};margin:8px 0 3px;">${m.val}</div><div style="font-size:11px;color:#aaa;">${m.sub}</div>`;
            metricsRow.appendChild(c);
        });

        // ── MAIN CONTENT: Table + Chatbot ─────────────────────
        const mainGrid = document.createElement("div");
        mainGrid.style.cssText = "display:grid;grid-template-columns:1fr 1.1fr;gap:20px;flex:1;min-height:0;";

        // Student Table
        const tableCard = document.createElement("div");
        tableCard.style.cssText = "background:#fff;border-radius:16px;padding:20px;box-shadow:0 2px 10px rgba(0,0,0,0.05);overflow-y:auto;";
        tableCard.innerHTML = `
            <div style="font-size:15px;font-weight:700;color:#1A1A2E;margin-bottom:14px;">All Students Overview</div>
            <table style="width:100%;border-collapse:collapse;font-size:12px;">
                <thead>
                    <tr style="background:#F8F9FA;">
                        <th style="padding:10px 8px;text-align:left;color:#666;font-weight:600;border-radius:4px 0 0 4px;">Roll No</th>
                        <th style="padding:10px 8px;text-align:left;color:#666;font-weight:600;">Technology</th>
                        <th style="padding:10px 8px;text-align:center;color:#666;font-weight:600;">Attended</th>
                        <th style="padding:10px 8px;text-align:center;color:#666;font-weight:600;">%</th>
                        <th style="padding:10px 8px;text-align:center;color:#666;font-weight:600;border-radius:0 4px 4px 0;">Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${DATASET.map((s,i) => {
                        const status = s.percentage>=90?"🟢 Excellent":s.percentage>=75?"🟡 Good":"🔴 Critical";
                        const pctColor = s.percentage>=90?"#008F39":s.percentage>=75?"#F4A100":"#DC3545";
                        return `<tr style="border-bottom:1px solid #F5F5F5;${i%2===0?"":"background:#FAFAFA"}">
                            <td style="padding:10px 8px;font-weight:700;color:#1A1A2E;">${s.roll_no}</td>
                            <td style="padding:10px 8px;color:#555;font-size:11px;">${s.technology}</td>
                            <td style="padding:10px 8px;text-align:center;color:#333;">${s.attended}/${s.sessions}</td>
                            <td style="padding:10px 8px;text-align:center;font-weight:700;color:${pctColor};">${s.percentage}%</td>
                            <td style="padding:10px 8px;text-align:center;font-size:11px;">${status}</td>
                        </tr>`;
                    }).join("")}
                </tbody>
            </table>
        `;

        // ── AI CHATBOT PANEL ──────────────────────────────────
        const chatPanel = document.createElement("div");
        chatPanel.style.cssText = "background:#fff;border-radius:16px;box-shadow:0 2px 10px rgba(0,0,0,0.05);display:flex;flex-direction:column;overflow:hidden;";

        // Chat header
        const chatHeader = document.createElement("div");
        chatHeader.style.cssText = "background:linear-gradient(135deg,#005C23,#008F39);padding:16px 20px;flex-shrink:0;";
        chatHeader.innerHTML = `
            <div style="display:flex;align-items:center;gap:12px;">
                <div style="width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;">🤖</div>
                <div>
                    <div style="color:#fff;font-size:14px;font-weight:700;">AttendInsights AI</div>
                    <div style="color:rgba(255,255,255,0.7);font-size:11px;">Powered by Claude · Knows all student data</div>
                </div>
                <div style="margin-left:auto;background:rgba(255,255,255,0.2);padding:4px 10px;border-radius:12px;color:#fff;font-size:10px;font-weight:600;">● ONLINE</div>
            </div>
        `;

        // Default question chips
        const chipsRow = document.createElement("div");
        chipsRow.style.cssText = "padding:12px 14px;background:#F8FFF8;border-bottom:1px solid #E8F5E9;display:flex;flex-wrap:wrap;gap:6px;flex-shrink:0;";

        const defaultQuestions = [
            "Who was absent today?",
            "Students below 75%",
            "Class average attendance",
            "Best attendance student",
            "AI & ML students list",
            "All students overview",
            "Who was absent on 08-08-2025?",
            "Other query...",
        ];

        defaultQuestions.forEach(q => {
            const chip = document.createElement("button");
            chip.style.cssText = "background:#E8F5E9;color:#005C23;border:1px solid #C8E6C9;padding:5px 10px;border-radius:16px;font-size:11px;cursor:pointer;font-weight:500;transition:all 0.15s;white-space:nowrap;";
            chip.innerText = q;
            chip.onmouseover = () => { chip.style.background="#008F39"; chip.style.color="#fff"; };
            chip.onmouseout  = () => { chip.style.background="#E8F5E9"; chip.style.color="#005C23"; };
            chip.onclick = () => {
                if (q === "Other query...") {
                    if (this.inputEl) { this.inputEl.focus(); }
                } else {
                    this.handleSend(q);
                }
            };
            chipsRow.appendChild(chip);
        });

        // Chat messages area
        this.chatBox = document.createElement("div");
        this.chatBox.style.cssText = "flex:1;overflow-y:auto;padding:16px;min-height:200px;";

        // Welcome message
        const welcomeWrap = document.createElement("div");
        welcomeWrap.style.cssText = "display:flex;justify-content:flex-start;margin-bottom:14px;";
        welcomeWrap.innerHTML = `
            <div style="max-width:85%;background:#F8FFF8;border:1px solid #C8E6C9;padding:14px 16px;border-radius:18px 18px 18px 4px;font-size:13px;color:#1A1A2E;line-height:1.6;">
                👋 <strong>Hello, ${adminName}!</strong><br><br>
                I'm AttendInsights AI. I have complete access to all <strong>${totalStudents} student records</strong> from your dataset (May 2025 – March 2026).<br><br>
                I can answer questions about:<br>
                • <strong>Daily attendance</strong> — absentees/present on any date<br>
                • <strong>Individual students</strong> — full attendance history<br>
                • <strong>At-risk students</strong> — below 75% threshold<br>
                • <strong>Class analytics</strong> — averages, trends, best/worst<br>
                • <strong>Technology-wise</strong> — AI & ML vs Data Science<br><br>
                Use the quick buttons above or type your question below!
            </div>
        `;
        this.chatBox.appendChild(welcomeWrap);

        // Input row
        const inputRow = document.createElement("div");
        inputRow.style.cssText = "padding:12px 14px;border-top:1px solid #F0F0F0;display:flex;gap:8px;flex-shrink:0;background:#fff;";

        this.inputEl = document.createElement("input");
        this.inputEl.type = "text";
        this.inputEl.placeholder = "Ask about attendance, students, dates...";
        this.inputEl.style.cssText = "flex:1;padding:10px 14px;border:1.5px solid #E0E0E0;border-radius:10px;font-size:13px;outline:none;font-family:'Segoe UI',sans-serif;";
        this.inputEl.onfocus = () => { this.inputEl!.style.borderColor = "#008F39"; };
        this.inputEl.onblur  = () => { this.inputEl!.style.borderColor = "#E0E0E0"; };
        this.inputEl.onkeydown = (e: KeyboardEvent) => { if (e.key === "Enter") this.handleSend(); };

        this.sendBtn = document.createElement("button");
        this.sendBtn.innerText = "Send";
        this.sendBtn.style.cssText = "background:linear-gradient(135deg,#008F39,#005C23);color:#fff;border:none;padding:10px 20px;border-radius:10px;font-size:13px;font-weight:600;cursor:pointer;";
        this.sendBtn.onclick = () => this.handleSend();

        inputRow.appendChild(this.inputEl);
        inputRow.appendChild(this.sendBtn);

        chatPanel.appendChild(chatHeader);
        chatPanel.appendChild(chipsRow);
        chatPanel.appendChild(this.chatBox);
        chatPanel.appendChild(inputRow);

        mainGrid.appendChild(tableCard);
        mainGrid.appendChild(chatPanel);

        content.appendChild(metricsRow);
        content.appendChild(mainGrid);

        right.appendChild(topBar);
        right.appendChild(content);

        page.appendChild(sidebar);
        page.appendChild(right);
        this.container.appendChild(page);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.apiKey = context.parameters.ApiKey?.raw ?? "";
    }
    public getOutputs(): IOutputs { return {}; }
    public destroy(): void {}
}