import { IInputs, IOutputs } from "./generated/ManifestTypes";

// ============================================================
// FULL DATASET — extracted from ATTEND_INSIGHTS_NEW.xlsx
// Used for: daily calendar, trend charts, AI insights
// ============================================================
const DATASET: Record<string, { technology: string; daily: Record<string, string> }> = {
  "23P31A0509": { technology: "CSE - AI & ML", daily: {"05-05-2025":"present","06-05-2025":"present","07-05-2025":"present","08-05-2025":"present","09-05-2025":"present","10-05-2025":"present","12-05-2025":"present","13-05-2025":"present","14-05-2025":"present","15-05-2025":"present","16-05-2025":"present","17-05-2025":"present","19-05-2025":"present","20-05-2025":"present","21-05-2025":"present","22-05-2025":"present","23-05-2025":"present","24-05-2025":"present","26-05-2025":"present","27-05-2025":"present","28-05-2025":"present","29-05-2025":"present","30-05-2025":"present","31-05-2025":"present","02-06-2025":"present","03-06-2025":"present","04-06-2025":"present","05-06-2025":"present","06-06-2025":"present","09-06-2025":"present","10-06-2025":"present","11-06-2025":"present","12-06-2025":"present","13-06-2025":"present","14-06-2025":"present","16-06-2025":"present","17-06-2025":"present","18-06-2025":"present","19-06-2025":"present","20-06-2025":"present","21-06-2025":"present","23-06-2025":"present","26-06-2025":"present","27-06-2025":"present","30-06-2025":"present","01-07-2025":"present","02-07-2025":"present","03-07-2025":"present","04-07-2025":"present","05-07-2025":"present","07-07-2025":"present","08-07-2025":"present","09-07-2025":"present","10-07-2025":"present","11-07-2025":"present","12-07-2025":"present","14-07-2025":"present","15-07-2025":"present","16-07-2025":"present","17-07-2025":"present","18-07-2025":"present","19-07-2025":"present","21-07-2025":"present","22-07-2025":"present","23-07-2025":"present","24-07-2025":"present","25-07-2025":"present","26-07-2025":"present","28-07-2025":"present","29-07-2025":"present","30-07-2025":"present","31-07-2025":"present","01-08-2025":"present","02-08-2025":"present","04-08-2025":"present","05-08-2025":"present","06-08-2025":"present","07-08-2025":"present","08-08-2025":"absent","09-08-2025":"present","11-08-2025":"present","12-08-2025":"present","13-08-2025":"present","14-08-2025":"present","25-08-2025":"present","26-08-2025":"present","29-08-2025":"present","28-08-2025":"present","30-08-2025":"present","01-09-2025":"present","02-09-2025":"absent","03-09-2025":"present","04-09-2025":"absent","06-09-2025":"present","08-09-2025":"present","09-09-2025":"present","10-09-2025":"present","11-09-2025":"present","12-09-2025":"present","13-09-2025":"present","17-09-2025":"present","18-09-2025":"present","19-09-2025":"present","20-09-2025":"present","22-09-2025":"present","23-09-2025":"present","24-09-2025":"present","25-09-2025":"present","26-09-2025":"present","27-09-2025":"present","06-10-2025":"present","07-10-2025":"present","08-10-2025":"present","09-10-2025":"present","10-10-2025":"present","11-10-2025":"present","13-10-2025":"present","14-10-2025":"present","15-10-2025":"present","16-10-2025":"present","17-10-2025":"present","18-10-2025":"present","21-10-2025":"present","22-10-2025":"present","23-10-2025":"present","24-10-2025":"present","25-10-2025":"present","30-10-2025":"present","31-10-2025":"present","01-11-2025":"absent","01-12-2025":"absent","02-12-2025":"present","03-12-2025":"present","04-12-2025":"present","05-12-2025":"present","06-12-2025":"present","15-12-2025":"present","16-12-2025":"present","17-12-2025":"present","18-12-2025":"present","19-12-2025":"present","20-12-2025":"present","22-12-2025":"absent","23-12-2025":"present","24-12-2025":"present","26-12-2025":"present","27-12-2025":"present","29-12-2025":"present","30-12-2025":"present","31-12-2025":"present","02-01-2026":"present","03-01-2026":"present","05-01-2026":"present","06-01-2026":"present","07-01-2026":"present","08-01-2026":"present","09-01-2026":"present","10-01-2026":"absent","19-01-2026":"absent","20-01-2026":"present","21-01-2026":"present","22-01-2026":"absent","23-01-2026":"present","24-01-2026":"present","27-01-2026":"present","28-01-2026":"present","29-01-2026":"present","30-01-2026":"present","31-01-2026":"present","16-02-2026":"present","17-02-2026":"present","18-02-2026":"absent","19-02-2026":"present","20-02-2026":"present","21-02-2026":"present","23-02-2026":"present","24-02-2026":"present","25-02-2026":"present","26-02-2026":"present","27-02-2026":"present","28-02-2026":"absent","02-03-2026":"absent","04-03-2026":"present","05-03-2026":"present","06-03-2026":"present","07-03-2026":"present","09-03-2026":"present","10-03-2026":"present","11-03-2026":"present","12-03-2026":"present","13-03-2026":"present","14-03-2026":"present","16-03-2026":"present","17-03-2026":"present","18-03-2026":"present","23-03-2026":"present","24-03-2026":"absent","25-03-2026":"absent","26-03-2026":"present"} },
  "23P31A0564": { technology: "CSE - AI & ML", daily: {"05-05-2025":"present","06-05-2025":"present","07-05-2025":"present","08-05-2025":"present","09-05-2025":"present","10-05-2025":"present","12-05-2025":"present","13-05-2025":"present","14-05-2025":"present","15-05-2025":"present","16-05-2025":"present","17-05-2025":"present","19-05-2025":"present","20-05-2025":"present","21-05-2025":"present","22-05-2025":"present","23-05-2025":"present","24-05-2025":"present","26-05-2025":"present","27-05-2025":"present","28-05-2025":"present","29-05-2025":"present","30-05-2025":"present","31-05-2025":"present","02-06-2025":"present","03-06-2025":"present","04-06-2025":"present","05-06-2025":"present","06-06-2025":"present","09-06-2025":"present","10-06-2025":"present","11-06-2025":"present","12-06-2025":"present","13-06-2025":"present","14-06-2025":"present","16-06-2025":"present","17-06-2025":"present","18-06-2025":"present","19-06-2025":"present","20-06-2025":"present","21-06-2025":"present","23-06-2025":"present","26-06-2025":"present","27-06-2025":"present","30-06-2025":"present","01-07-2025":"present","02-07-2025":"present","03-07-2025":"present","04-07-2025":"present","05-07-2025":"present","07-07-2025":"present","08-07-2025":"present","09-07-2025":"present","10-07-2025":"present","11-07-2025":"present","12-07-2025":"present","14-07-2025":"present","15-07-2025":"present","16-07-2025":"present","17-07-2025":"present","18-07-2025":"present","19-07-2025":"present","21-07-2025":"present","22-07-2025":"present","23-07-2025":"present","24-07-2025":"present","25-07-2025":"present","26-07-2025":"present","28-07-2025":"present","29-07-2025":"present","30-07-2025":"present","31-07-2025":"present","01-08-2025":"present","02-08-2025":"present","04-08-2025":"present","05-08-2025":"present","06-08-2025":"present","07-08-2025":"present","08-08-2025":"present","09-08-2025":"present","11-08-2025":"present","12-08-2025":"present","13-08-2025":"present","14-08-2025":"present","25-08-2025":"present","26-08-2025":"present","29-08-2025":"present","28-08-2025":"absent","30-08-2025":"present","01-09-2025":"present","02-09-2025":"present","03-09-2025":"present","04-09-2025":"present","06-09-2025":"present","08-09-2025":"present","09-09-2025":"present","10-09-2025":"present","11-09-2025":"present","12-09-2025":"present","13-09-2025":"present","17-09-2025":"present","18-09-2025":"present","19-09-2025":"present","20-09-2025":"absent","22-09-2025":"present","23-09-2025":"present","24-09-2025":"present","25-09-2025":"present","26-09-2025":"present","27-09-2025":"present","06-10-2025":"present","07-10-2025":"present","08-10-2025":"present","09-10-2025":"present","10-10-2025":"absent","11-10-2025":"present","13-10-2025":"present","14-10-2025":"present","15-10-2025":"present","16-10-2025":"present","17-10-2025":"present","18-10-2025":"present","21-10-2025":"absent","22-10-2025":"present","23-10-2025":"present","24-10-2025":"present","25-10-2025":"present","30-10-2025":"present","31-10-2025":"present","01-11-2025":"absent","01-12-2025":"present","02-12-2025":"present","03-12-2025":"present","04-12-2025":"present","05-12-2025":"present","06-12-2025":"present","15-12-2025":"present","16-12-2025":"present","17-12-2025":"present","18-12-2025":"present","19-12-2025":"present","20-12-2025":"absent","22-12-2025":"absent","23-12-2025":"present","24-12-2025":"present","26-12-2025":"present","27-12-2025":"present","29-12-2025":"present","30-12-2025":"present","31-12-2025":"present","02-01-2026":"present","03-01-2026":"present","05-01-2026":"present","06-01-2026":"present","07-01-2026":"present","08-01-2026":"present","09-01-2026":"absent","10-01-2026":"absent","19-01-2026":"absent","20-01-2026":"present","21-01-2026":"present","22-01-2026":"present","23-01-2026":"present","24-01-2026":"present","27-01-2026":"present","28-01-2026":"present","29-01-2026":"present","30-01-2026":"present","31-01-2026":"present","16-02-2026":"present","17-02-2026":"present","18-02-2026":"present","19-02-2026":"present","20-02-2026":"present","21-02-2026":"absent","23-02-2026":"absent","24-02-2026":"present","25-02-2026":"present","26-02-2026":"present","27-02-2026":"present","28-02-2026":"absent","02-03-2026":"present","04-03-2026":"present","05-03-2026":"present","06-03-2026":"present","07-03-2026":"present","09-03-2026":"present","10-03-2026":"present","11-03-2026":"present","12-03-2026":"absent","13-03-2026":"present","14-03-2026":"present","16-03-2026":"present","17-03-2026":"present","18-03-2026":"present","23-03-2026":"present","24-03-2026":"absent","25-03-2026":"absent","26-03-2026":"present"} },
  "23P31A0575": { technology: "CSE - AI & ML", daily: {"05-05-2025":"present","06-05-2025":"present","07-05-2025":"present","08-05-2025":"present","09-05-2025":"present","10-05-2025":"present","12-05-2025":"present","13-05-2025":"present","14-05-2025":"present","15-05-2025":"present","16-05-2025":"present","17-05-2025":"present","19-05-2025":"present","20-05-2025":"present","21-05-2025":"present","22-05-2025":"present","23-05-2025":"present","24-05-2025":"present","26-05-2025":"present","27-05-2025":"present","28-05-2025":"present","29-05-2025":"present","30-05-2025":"present","31-05-2025":"present","02-06-2025":"present","03-06-2025":"present","04-06-2025":"present","05-06-2025":"present","06-06-2025":"present","09-06-2025":"present","10-06-2025":"present","11-06-2025":"present","12-06-2025":"present","13-06-2025":"present","14-06-2025":"present","16-06-2025":"present","17-06-2025":"present","18-06-2025":"present","19-06-2025":"present","20-06-2025":"present","21-06-2025":"present","23-06-2025":"present","26-06-2025":"present","27-06-2025":"present","30-06-2025":"absent","01-07-2025":"present","02-07-2025":"present","03-07-2025":"present","04-07-2025":"present","05-07-2025":"present","07-07-2025":"present","08-07-2025":"present","09-07-2025":"present","10-07-2025":"present","11-07-2025":"present","12-07-2025":"present","14-07-2025":"present","15-07-2025":"present","16-07-2025":"present","17-07-2025":"present","18-07-2025":"present","19-07-2025":"present","21-07-2025":"present","22-07-2025":"present","23-07-2025":"absent","24-07-2025":"present","25-07-2025":"present","26-07-2025":"present","28-07-2025":"present","29-07-2025":"present","30-07-2025":"present","31-07-2025":"present","01-08-2025":"present","02-08-2025":"present","04-08-2025":"present","05-08-2025":"present","06-08-2025":"present","07-08-2025":"present","08-08-2025":"present","09-08-2025":"present","11-08-2025":"present","12-08-2025":"present","13-08-2025":"present","14-08-2025":"present","25-08-2025":"present","26-08-2025":"present","29-08-2025":"present","28-08-2025":"present","30-08-2025":"present","01-09-2025":"present","02-09-2025":"present","03-09-2025":"present","04-09-2025":"present","06-09-2025":"present","08-09-2025":"present","09-09-2025":"present","10-09-2025":"present","11-09-2025":"present","12-09-2025":"present","13-09-2025":"present","17-09-2025":"present","18-09-2025":"present","19-09-2025":"present","20-09-2025":"present","22-09-2025":"present","23-09-2025":"present","24-09-2025":"present","25-09-2025":"present","26-09-2025":"absent","27-09-2025":"absent","06-10-2025":"present","07-10-2025":"present","08-10-2025":"present","09-10-2025":"absent","10-10-2025":"absent","11-10-2025":"absent","13-10-2025":"present","14-10-2025":"present","15-10-2025":"present","16-10-2025":"present","17-10-2025":"present","18-10-2025":"absent","21-10-2025":"present","22-10-2025":"present","23-10-2025":"present","24-10-2025":"present","25-10-2025":"absent","30-10-2025":"present","31-10-2025":"present","01-11-2025":"absent","01-12-2025":"present","02-12-2025":"present","03-12-2025":"present","04-12-2025":"present","05-12-2025":"present","06-12-2025":"present","15-12-2025":"present","16-12-2025":"present","17-12-2025":"present","18-12-2025":"present","19-12-2025":"present","20-12-2025":"present","22-12-2025":"present","23-12-2025":"present","24-12-2025":"present","26-12-2025":"present","27-12-2025":"present","29-12-2025":"present","30-12-2025":"present","31-12-2025":"present","02-01-2026":"present","03-01-2026":"present","05-01-2026":"present","06-01-2026":"present","07-01-2026":"present","08-01-2026":"absent","09-01-2026":"absent","10-01-2026":"absent","19-01-2026":"absent","20-01-2026":"absent","21-01-2026":"absent","22-01-2026":"present","23-01-2026":"present","24-01-2026":"present","27-01-2026":"present","28-01-2026":"present","29-01-2026":"present","30-01-2026":"present","31-01-2026":"present","16-02-2026":"absent","17-02-2026":"present","18-02-2026":"present","19-02-2026":"present","20-02-2026":"absent","21-02-2026":"present","23-02-2026":"present","24-02-2026":"present","25-02-2026":"present","26-02-2026":"absent","27-02-2026":"present","28-02-2026":"absent","02-03-2026":"absent","04-03-2026":"present","05-03-2026":"present","06-03-2026":"present","07-03-2026":"absent","09-03-2026":"present","10-03-2026":"present","11-03-2026":"present","12-03-2026":"present","13-03-2026":"present","14-03-2026":"present","16-03-2026":"present","17-03-2026":"present","18-03-2026":"present","23-03-2026":"absent","24-03-2026":"absent","25-03-2026":"absent","26-03-2026":"absent"} },
  "23P31A4224": { technology: "CSE - AI & ML", daily: {"05-05-2025":"present","06-05-2025":"present","07-05-2025":"present","08-05-2025":"present","09-05-2025":"present","10-05-2025":"present","12-05-2025":"present","13-05-2025":"present","14-05-2025":"present","15-05-2025":"present","16-05-2025":"present","17-05-2025":"present","19-05-2025":"present","20-05-2025":"present","21-05-2025":"present","22-05-2025":"present","23-05-2025":"present","24-05-2025":"present","26-05-2025":"present","27-05-2025":"present","28-05-2025":"present","29-05-2025":"present","30-05-2025":"present","31-05-2025":"present","02-06-2025":"present","03-06-2025":"present","04-06-2025":"present","05-06-2025":"present","06-06-2025":"present","09-06-2025":"present","10-06-2025":"present","11-06-2025":"present","12-06-2025":"present","13-06-2025":"present","14-06-2025":"present","16-06-2025":"present","17-06-2025":"present","18-06-2025":"present","19-06-2025":"present","20-06-2025":"present","21-06-2025":"present","23-06-2025":"present","26-06-2025":"present","27-06-2025":"present","30-06-2025":"present","01-07-2025":"present","02-07-2025":"present","03-07-2025":"present","04-07-2025":"present","05-07-2025":"present","07-07-2025":"present","08-07-2025":"present","09-07-2025":"present","10-07-2025":"present","11-07-2025":"present","12-07-2025":"present","14-07-2025":"present","15-07-2025":"present","16-07-2025":"present","17-07-2025":"present","18-07-2025":"present","19-07-2025":"present","21-07-2025":"present","22-07-2025":"present","23-07-2025":"present","24-07-2025":"present","25-07-2025":"present","26-07-2025":"present","28-07-2025":"present","29-07-2025":"present","30-07-2025":"present","31-07-2025":"present","01-08-2025":"present","02-08-2025":"present","04-08-2025":"present","05-08-2025":"present","06-08-2025":"present","07-08-2025":"present","08-08-2025":"absent","09-08-2025":"absent","11-08-2025":"present","12-08-2025":"present","13-08-2025":"present","14-08-2025":"present","25-08-2025":"present","26-08-2025":"present","29-08-2025":"present","28-08-2025":"present","30-08-2025":"absent","01-09-2025":"present","02-09-2025":"present","03-09-2025":"absent","04-09-2025":"absent","06-09-2025":"absent","08-09-2025":"present","09-09-2025":"present","10-09-2025":"present","11-09-2025":"present","12-09-2025":"present","13-09-2025":"present","17-09-2025":"present","18-09-2025":"present","19-09-2025":"present","20-09-2025":"present","22-09-2025":"present","23-09-2025":"present","24-09-2025":"present","25-09-2025":"present","26-09-2025":"present","27-09-2025":"present","06-10-2025":"present","07-10-2025":"present","08-10-2025":"present","09-10-2025":"present","10-10-2025":"present","11-10-2025":"present","13-10-2025":"present","14-10-2025":"present","15-10-2025":"present","16-10-2025":"present","17-10-2025":"present","18-10-2025":"present","21-10-2025":"absent","22-10-2025":"present","23-10-2025":"present","24-10-2025":"present","25-10-2025":"present","30-10-2025":"absent","31-10-2025":"present","01-11-2025":"absent","01-12-2025":"present","02-12-2025":"present","03-12-2025":"present","04-12-2025":"present","05-12-2025":"present","06-12-2025":"absent","15-12-2025":"absent","16-12-2025":"present","17-12-2025":"present","18-12-2025":"present","19-12-2025":"present","20-12-2025":"present","22-12-2025":"present","23-12-2025":"present","24-12-2025":"present","26-12-2025":"present","27-12-2025":"present","29-12-2025":"present","30-12-2025":"absent","31-12-2025":"absent","02-01-2026":"present","03-01-2026":"present","05-01-2026":"present","06-01-2026":"present","07-01-2026":"present","08-01-2026":"absent","09-01-2026":"present","10-01-2026":"absent","19-01-2026":"absent","20-01-2026":"absent","21-01-2026":"present","22-01-2026":"present","23-01-2026":"present","24-01-2026":"present","27-01-2026":"present","28-01-2026":"present","29-01-2026":"present","30-01-2026":"present","31-01-2026":"present","16-02-2026":"present","17-02-2026":"present","18-02-2026":"present","19-02-2026":"present","20-02-2026":"present","21-02-2026":"present","23-02-2026":"absent","24-02-2026":"present","25-02-2026":"present","26-02-2026":"present","27-02-2026":"present","28-02-2026":"present","02-03-2026":"absent","04-03-2026":"present","05-03-2026":"present","06-03-2026":"present","07-03-2026":"present","09-03-2026":"present","10-03-2026":"present","11-03-2026":"present","12-03-2026":"present","13-03-2026":"absent","14-03-2026":"present","16-03-2026":"present","17-03-2026":"present","18-03-2026":"absent","23-03-2026":"present","24-03-2026":"absent","25-03-2026":"absent","26-03-2026":"absent"} },
  "23P31A4241": { technology: "CSE - AI & ML", daily: {"05-05-2025":"present","06-05-2025":"present","07-05-2025":"present","08-05-2025":"present","09-05-2025":"present","10-05-2025":"present","12-05-2025":"present","13-05-2025":"present","14-05-2025":"present","15-05-2025":"present","16-05-2025":"absent","17-05-2025":"present","19-05-2025":"absent","20-05-2025":"present","21-05-2025":"present","22-05-2025":"absent","23-05-2025":"absent","24-05-2025":"absent","26-05-2025":"absent","27-05-2025":"absent","28-05-2025":"absent","29-05-2025":"absent","30-05-2025":"absent","31-05-2025":"absent","02-06-2025":"absent","03-06-2025":"present","04-06-2025":"absent","05-06-2025":"absent","06-06-2025":"absent","09-06-2025":"absent","10-06-2025":"present","11-06-2025":"absent","12-06-2025":"absent","13-06-2025":"absent","14-06-2025":"present","16-06-2025":"absent","17-06-2025":"absent","18-06-2025":"absent","19-06-2025":"absent","20-06-2025":"absent","21-06-2025":"present","23-06-2025":"absent","26-06-2025":"absent","27-06-2025":"absent","30-06-2025":"absent","01-07-2025":"present","02-07-2025":"present","03-07-2025":"present","04-07-2025":"present","05-07-2025":"present","07-07-2025":"present","08-07-2025":"present","09-07-2025":"present","10-07-2025":"present","11-07-2025":"present","12-07-2025":"present","14-07-2025":"present","15-07-2025":"present","16-07-2025":"present","17-07-2025":"present","18-07-2025":"present","19-07-2025":"present","21-07-2025":"present","22-07-2025":"present","23-07-2025":"present","24-07-2025":"present","25-07-2025":"present","26-07-2025":"present","28-07-2025":"present","29-07-2025":"present","30-07-2025":"present","31-07-2025":"present","01-08-2025":"present","02-08-2025":"present","04-08-2025":"present","05-08-2025":"present","06-08-2025":"present","07-08-2025":"present","08-08-2025":"present","09-08-2025":"present","11-08-2025":"present","12-08-2025":"present","13-08-2025":"present","14-08-2025":"present","25-08-2025":"present","26-08-2025":"present","29-08-2025":"present","28-08-2025":"present","30-08-2025":"present","01-09-2025":"present","02-09-2025":"present","03-09-2025":"present","04-09-2025":"present","06-09-2025":"present","08-09-2025":"present","09-09-2025":"present","10-09-2025":"present","11-09-2025":"present","12-09-2025":"present","13-09-2025":"present","17-09-2025":"present","18-09-2025":"present","19-09-2025":"present","20-09-2025":"present","22-09-2025":"present","23-09-2025":"present","24-09-2025":"present","25-09-2025":"present","26-09-2025":"present","27-09-2025":"absent","06-10-2025":"present","07-10-2025":"present","08-10-2025":"present","09-10-2025":"present","10-10-2025":"present","11-10-2025":"present","13-10-2025":"present","14-10-2025":"present","15-10-2025":"present","16-10-2025":"present","17-10-2025":"present","18-10-2025":"present","21-10-2025":"present","22-10-2025":"present","23-10-2025":"present","24-10-2025":"present","25-10-2025":"present","30-10-2025":"present","31-10-2025":"present","01-11-2025":"present","01-12-2025":"present","02-12-2025":"present","03-12-2025":"present","04-12-2025":"present","05-12-2025":"present","06-12-2025":"present","15-12-2025":"present","16-12-2025":"present","17-12-2025":"present","18-12-2025":"present","19-12-2025":"absent","20-12-2025":"present","22-12-2025":"present","23-12-2025":"present","24-12-2025":"present","26-12-2025":"present","27-12-2025":"present","29-12-2025":"present","30-12-2025":"present","31-12-2025":"present","02-01-2026":"present","03-01-2026":"present","05-01-2026":"present","06-01-2026":"absent","07-01-2026":"absent","08-01-2026":"absent","09-01-2026":"absent","10-01-2026":"absent","19-01-2026":"absent","20-01-2026":"absent","21-01-2026":"present","22-01-2026":"present","23-01-2026":"present","24-01-2026":"present","27-01-2026":"present","28-01-2026":"present","29-01-2026":"present","30-01-2026":"absent","31-01-2026":"absent","16-02-2026":"absent","17-02-2026":"present","18-02-2026":"present","19-02-2026":"present","20-02-2026":"present","21-02-2026":"present","23-02-2026":"present","24-02-2026":"present","25-02-2026":"present","26-02-2026":"present","27-02-2026":"present","28-02-2026":"present","02-03-2026":"present","04-03-2026":"present","05-03-2026":"present","06-03-2026":"present","07-03-2026":"present","09-03-2026":"present","10-03-2026":"present","11-03-2026":"present","12-03-2026":"present","13-03-2026":"present","14-03-2026":"present","16-03-2026":"present","17-03-2026":"present","18-03-2026":"present","23-03-2026":"present","24-03-2026":"present","25-03-2026":"present","26-03-2026":"present"} },
  "23A91A1293": { technology: "CSE - Data Science", daily: {"05-05-2025":"present","06-05-2025":"present","07-05-2025":"present","08-05-2025":"present","09-05-2025":"present","10-05-2025":"present","12-05-2025":"present","13-05-2025":"present","14-05-2025":"present","15-05-2025":"present","16-05-2025":"present","17-05-2025":"present","19-05-2025":"present","20-05-2025":"present","21-05-2025":"present","22-05-2025":"present","23-05-2025":"present","24-05-2025":"present","26-05-2025":"present","27-05-2025":"present","28-05-2025":"present","29-05-2025":"present","30-05-2025":"present","31-05-2025":"present","02-06-2025":"present","03-06-2025":"present","04-06-2025":"present","05-06-2025":"present","06-06-2025":"present","09-06-2025":"present","10-06-2025":"present","11-06-2025":"present","12-06-2025":"present","13-06-2025":"present","14-06-2025":"present","16-06-2025":"present","17-06-2025":"present","18-06-2025":"present","19-06-2025":"present","20-06-2025":"present","21-06-2025":"present","23-06-2025":"present","26-06-2025":"present","27-06-2025":"present","30-06-2025":"present","01-07-2025":"present","02-07-2025":"present","03-07-2025":"present","04-07-2025":"present","05-07-2025":"present","07-07-2025":"present","08-07-2025":"present","09-07-2025":"present","10-07-2025":"present","11-07-2025":"present","12-07-2025":"present","14-07-2025":"present","15-07-2025":"present","16-07-2025":"present","17-07-2025":"present","18-07-2025":"present","19-07-2025":"present","21-07-2025":"present","22-07-2025":"present","23-07-2025":"present","24-07-2025":"present","25-07-2025":"present","26-07-2025":"present","28-07-2025":"present","29-07-2025":"present","30-07-2025":"present","31-07-2025":"present","01-08-2025":"present","02-08-2025":"absent","04-08-2025":"present","05-08-2025":"present","06-08-2025":"present","07-08-2025":"present","08-08-2025":"present","09-08-2025":"present","11-08-2025":"present","12-08-2025":"absent","13-08-2025":"present","14-08-2025":"present","25-08-2025":"present","26-08-2025":"present","29-08-2025":"absent","28-08-2025":"present","30-08-2025":"present","01-09-2025":"present","02-09-2025":"present","03-09-2025":"present","04-09-2025":"present","06-09-2025":"present","08-09-2025":"present","09-09-2025":"present","10-09-2025":"present","11-09-2025":"present","12-09-2025":"present","13-09-2025":"present","17-09-2025":"present","18-09-2025":"present","19-09-2025":"present","20-09-2025":"absent","22-09-2025":"present","23-09-2025":"present","24-09-2025":"present","25-09-2025":"present","26-09-2025":"present","27-09-2025":"present","06-10-2025":"absent","07-10-2025":"present","08-10-2025":"present","09-10-2025":"present","10-10-2025":"present","11-10-2025":"present","13-10-2025":"present","14-10-2025":"present","15-10-2025":"present","16-10-2025":"present","17-10-2025":"present","18-10-2025":"present","21-10-2025":"present","22-10-2025":"present","23-10-2025":"present","24-10-2025":"present","25-10-2025":"present","30-10-2025":"present","31-10-2025":"present","01-11-2025":"present","01-12-2025":"present","02-12-2025":"present","03-12-2025":"present","04-12-2025":"present","05-12-2025":"present","06-12-2025":"present","15-12-2025":"present","16-12-2025":"present","17-12-2025":"present","18-12-2025":"present","19-12-2025":"present","20-12-2025":"present","22-12-2025":"present","23-12-2025":"present","24-12-2025":"present","26-12-2025":"present","27-12-2025":"present","29-12-2025":"present","30-12-2025":"absent","31-12-2025":"present","02-01-2026":"present","03-01-2026":"present","05-01-2026":"present","06-01-2026":"present","07-01-2026":"present","08-01-2026":"present","09-01-2026":"absent","10-01-2026":"absent","19-01-2026":"absent","20-01-2026":"absent","21-01-2026":"absent","22-01-2026":"absent","23-01-2026":"present","24-01-2026":"present","27-01-2026":"present","28-01-2026":"present","29-01-2026":"present","30-01-2026":"present","31-01-2026":"present","16-02-2026":"present","17-02-2026":"present","18-02-2026":"present","19-02-2026":"present","20-02-2026":"present","21-02-2026":"absent","23-02-2026":"present","24-02-2026":"present","25-02-2026":"present","26-02-2026":"present","27-02-2026":"present","28-02-2026":"absent","02-03-2026":"absent","04-03-2026":"present","05-03-2026":"absent","06-03-2026":"absent","07-03-2026":"absent","09-03-2026":"present","10-03-2026":"present","11-03-2026":"present","12-03-2026":"present","13-03-2026":"absent","14-03-2026":"present","16-03-2026":"present","17-03-2026":"present","18-03-2026":"present","23-03-2026":"present","24-03-2026":"absent","25-03-2026":"absent","26-03-2026":"absent"} }
};

export class StudentDashboard implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private container: HTMLDivElement;
    private activeTab: string = "overview";

    constructor() {}

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        this.container = container;
        this.renderDashboard(context);
    }

    // ============================================================
    // HELPERS
    // ============================================================
    private getMonthlyTrend(daily: Record<string, string>): { month: string; pct: number }[] {
        const months: Record<string, { p: number; t: number }> = {};
        for (const [date, status] of Object.entries(daily)) {
            const parts = date.split("-");
            if (parts.length < 3) continue;
            const key = `${parts[2]}-${parts[1]}`;
            if (!months[key]) months[key] = { p: 0, t: 0 };
            months[key].t++;
            if (status === "present") months[key].p++;
        }
        return Object.entries(months)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([key, v]) => ({
                month: (() => {
                    const [yr, mo] = key.split("-");
                    const names = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                    return `${names[parseInt(mo)]} ${yr.slice(2)}`;
                })(),
                pct: Math.round((v.p / v.t) * 100)
            }));
    }

    private getConsecutiveAbsences(daily: Record<string, string>): number {
        const dates = Object.keys(daily).sort();
        let max = 0, cur = 0;
        for (const d of dates) {
            if (daily[d] === "absent") { cur++; max = Math.max(max, cur); }
            else cur = 0;
        }
        return max;
    }

    private getRecentAbsences(daily: Record<string, string>, days: number = 30): string[] {
        const entries = Object.entries(daily)
            .sort(([a], [b]) => b.localeCompare(a))
            .slice(0, days);
        return entries.filter(([, v]) => v === "absent").map(([k]) => k);
    }

    private renderTrendChart(trends: { month: string; pct: number }[]): HTMLElement {
        const wrap = document.createElement("div");
        wrap.style.cssText = "width:100%;height:140px;display:flex;align-items:flex-end;gap:6px;padding:8px 0 24px 0;position:relative;overflow:hidden;";
        const maxH = 110;
        trends.forEach(t => {
            const col = document.createElement("div");
            col.style.cssText = "display:flex;flex-direction:column;align-items:center;flex:1;gap:3px;";
            const bar = document.createElement("div");
            const h = Math.max(8, Math.round((t.pct / 100) * maxH));
            const color = t.pct >= 90 ? "#008F39" : t.pct >= 75 ? "#F4A100" : "#DC3545";
            bar.style.cssText = `height:${h}px;width:100%;background:${color};border-radius:4px 4px 0 0;transition:height 0.3s;`;
            bar.title = `${t.month}: ${t.pct}%`;
            const lbl = document.createElement("div");
            lbl.style.cssText = "font-size:9px;color:#999;text-align:center;white-space:nowrap;overflow:hidden;max-width:100%;";
            lbl.innerText = t.month;
            col.appendChild(bar);
            col.appendChild(lbl);
            wrap.appendChild(col);
        });
        // 75% guideline
        const line = document.createElement("div");
        const lineY = Math.round((75 / 100) * maxH);
        line.style.cssText = `position:absolute;left:0;right:0;bottom:${lineY + 24}px;height:1px;background:rgba(220,53,69,0.3);border-top:1px dashed #DC3545;`;
        wrap.appendChild(line);
        return wrap;
    }

    // ============================================================
    // MAIN RENDER
    // ============================================================
    private renderDashboard(context: ComponentFramework.Context<IInputs>): void {
        this.container.innerHTML = "";

        const rollNumber = (context.parameters.RollNumber.raw ?? "N/A").toString().trim();
        const sessions   = Number(context.parameters.Sessions.raw) || 0;
        const attended   = Number(context.parameters.Attended.raw) || 0;
        const absentDays = sessions - attended;
        const rawPct     = String(context.parameters.Percentage.raw ?? "0").replace("%", "");
        const percentage = isNaN(Number(rawPct)) ? 0 : Math.round(Number(rawPct) * 100) / 100;

        const studentData = DATASET[rollNumber];
        const technology  = studentData?.technology ?? "CSE";
        const daily       = studentData?.daily ?? {};
        const trends      = this.getMonthlyTrend(daily);
        const maxConsec   = this.getConsecutiveAbsences(daily);
        const recentAbs   = this.getRecentAbsences(daily, 60);

        // Status
        let statusLabel = "Excellent", statusColor = "#008F39", pctColor = "#008F39", metricNote = "Outstanding!";
        if (percentage < 75)      { statusLabel = "Critical";  statusColor = "#DC3545"; pctColor = "#DC3545"; metricNote = "Immediate action needed!"; }
        else if (percentage < 85) { statusLabel = "Good";      statusColor = "#F4A100"; pctColor = "#F4A100"; metricNote = "Keep improving!"; }
        else if (percentage < 95) { statusLabel = "Very Good"; statusColor = "#008F39"; pctColor = "#008F39"; metricNote = "Great work!"; }

        // AI insight
        let aiInsight = "";
        if (percentage >= 95) aiInsight = `Outstanding discipline! You have attended ${attended} out of ${sessions} sessions. Your consistency places you in the top tier. Keep maintaining this level to ensure zero academic risk.`;
        else if (percentage >= 85) aiInsight = `Good performance with ${attended}/${sessions} sessions attended. You have missed ${absentDays} sessions. With ${maxConsec} max consecutive absences, you are on track — ensure no further drops.`;
        else if (percentage >= 75) aiInsight = `Your attendance at ${percentage.toFixed(1)}% is just above the minimum threshold. You have missed ${absentDays} sessions. Avoid any further absences to stay safe from academic debarment.`;
        else aiInsight = `⚠️ Critical: At ${percentage.toFixed(1)}%, you are BELOW the 75% minimum required. You have missed ${absentDays} out of ${sessions} sessions. Immediate improvement is required to avoid being debarred from exams.`;

        // ── PAGE ─────────────────────────────────────────────
        const page = document.createElement("div");
        page.style.cssText = "display:flex;min-height:100vh;font-family:'Segoe UI',Poppins,sans-serif;background:#F0F2F5;margin:0;padding:0;";

        // ── SIDEBAR ──────────────────────────────────────────
        const sidebar = document.createElement("div");
        sidebar.style.cssText = "width:230px;min-width:230px;background:linear-gradient(180deg,#005C23 0%,#007A30 60%,#009140 100%);display:flex;flex-direction:column;box-shadow:4px 0 15px rgba(0,0,0,0.15);";

        const logo = document.createElement("div");
        logo.style.cssText = "padding:28px 20px 24px;border-bottom:1px solid rgba(255,255,255,0.15);";
        logo.innerHTML = `<div style="color:#fff;font-size:18px;font-weight:900;letter-spacing:1px;line-height:1.2;">TECHNICAL HUB</div><div style="color:rgba(255,255,255,0.6);font-size:11px;margin-top:4px;">AttendInsights Portal</div>`;

        // Student mini-profile in sidebar
        const sideProfile = document.createElement("div");
        sideProfile.style.cssText = "margin:20px 16px;background:rgba(255,255,255,0.1);border-radius:12px;padding:14px;text-align:center;";
        sideProfile.innerHTML = `
            <div style="width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,0.2);margin:0 auto 10px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:#fff;">${rollNumber.slice(-2)}</div>
            <div style="color:#fff;font-size:13px;font-weight:600;">${rollNumber}</div>
            <div style="color:rgba(255,255,255,0.65);font-size:11px;margin-top:3px;">${technology}</div>
            <div style="margin-top:10px;background:rgba(255,255,255,0.15);border-radius:20px;height:6px;overflow:hidden;">
                <div style="height:100%;width:${Math.min(percentage,100)}%;background:${pctColor};border-radius:20px;"></div>
            </div>
            <div style="color:rgba(255,255,255,0.8);font-size:12px;margin-top:5px;font-weight:700;">${percentage.toFixed(1)}%</div>
        `;

        const navItems = [
            { label: "📊 Dashboard",    id: "overview", active: true },
            { label: "📅 Attendance",   id: "calendar", active: false },
            { label: "📈 Trends",       id: "trends",   active: false },
            { label: "🤖 AI Insights",  id: "ai",       active: false },
            { label: "⚙️ Settings",     id: "settings", active: false },
            { label: "🚪 Logout",       id: "logout",   active: false },
        ];

        const navList = document.createElement("div");
        navList.style.cssText = "display:flex;flex-direction:column;gap:2px;padding:8px 12px;flex:1;";
        navItems.forEach(item => {
            const nav = document.createElement("div");
            nav.style.cssText = `padding:12px 16px;border-radius:10px;color:${item.active ? "#fff" : "rgba(255,255,255,0.75)"};font-size:14px;font-weight:${item.active ? "600" : "400"};background:${item.active ? "rgba(255,255,255,0.2)" : "transparent"};cursor:pointer;transition:all 0.2s;`;
            nav.innerText = item.label;
            navList.appendChild(nav);
        });

        const sideFooter = document.createElement("div");
        sideFooter.style.cssText = "padding:16px;border-top:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.4);font-size:10px;text-align:center;";
        sideFooter.innerText = "© 2026 Technical Hub";

        sidebar.appendChild(logo);
        sidebar.appendChild(sideProfile);
        sidebar.appendChild(navList);
        sidebar.appendChild(sideFooter);

        // ── MAIN ─────────────────────────────────────────────
        const main = document.createElement("div");
        main.style.cssText = "flex:1;overflow-y:auto;padding:28px 32px;display:flex;flex-direction:column;gap:24px;";

        // Top header bar
        const topBar = document.createElement("div");
        topBar.style.cssText = "display:flex;justify-content:space-between;align-items:center;";
        topBar.innerHTML = `
            <div>
                <div style="font-size:13px;color:#888;font-weight:500;">Welcome back,</div>
                <div style="font-size:28px;font-weight:800;color:#1A1A2E;line-height:1.2;">${rollNumber}</div>
                <div style="font-size:13px;color:#666;margin-top:3px;">Here's your complete attendance overview · ${technology}</div>
            </div>
            <div style="display:flex;align-items:center;gap:12px;">
                <div style="background:#fff;border-radius:10px;padding:8px 16px;font-size:12px;color:#555;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                    📅 Data Range: May 2025 – Mar 2026
                </div>
                <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#008F39,#005C23);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;">
                    ${rollNumber.slice(-2)}
                </div>
            </div>
        `;

        // ── METRIC CARDS ─────────────────────────────────────
        const metricsRow = document.createElement("div");
        metricsRow.style.cssText = "display:grid;grid-template-columns:repeat(4,1fr);gap:18px;";

        const mkCard = (icon: string, title: string, value: string, color: string, sub: string, extra?: string) => {
            const c = document.createElement("div");
            c.style.cssText = "background:#fff;border-radius:16px;padding:22px 20px;box-shadow:0 2px 12px rgba(0,0,0,0.06);position:relative;overflow:hidden;";
            c.innerHTML = `
                <div style="position:absolute;top:-10px;right:-10px;font-size:60px;opacity:0.06;">${icon}</div>
                <div style="font-size:12px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:0.5px;">${title}</div>
                <div style="font-size:34px;font-weight:800;color:${color};margin:8px 0 4px;line-height:1;">${value}</div>
                <div style="font-size:12px;color:#777;">${sub}</div>
                ${extra ? `<div style="font-size:11px;color:${color};font-weight:600;margin-top:6px;">${extra}</div>` : ""}
            `;
            return c;
        };

        metricsRow.appendChild(mkCard("📊", "Attendance %", percentage.toFixed(1)+"%", pctColor, metricNote, statusLabel+" Performance"));
        metricsRow.appendChild(mkCard("✅", "Present Days", attended.toString(), "#008F39", "Sessions attended", `${sessions} total sessions`));
        metricsRow.appendChild(mkCard("❌", "Absent Days", absentDays.toString(), absentDays > 30 ? "#DC3545" : absentDays > 15 ? "#F4A100" : "#555", "Sessions missed", `Max streak: ${maxConsec} days`));
        metricsRow.appendChild(mkCard("🎯", "Status", statusLabel, statusColor, "Performance level", `${Math.max(0, Math.ceil(sessions * 0.75) - attended)} sessions needed`));

        // ── MID ROW: Trend Chart + AI Card ───────────────────
        const midRow = document.createElement("div");
        midRow.style.cssText = "display:grid;grid-template-columns:1.4fr 1fr;gap:18px;";

        // Trend chart card
        const trendCard = document.createElement("div");
        trendCard.style.cssText = "background:#fff;border-radius:16px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,0.06);";
        const trendHeader = document.createElement("div");
        trendHeader.style.cssText = "display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;";
        trendHeader.innerHTML = `
            <div>
                <div style="font-size:15px;font-weight:700;color:#1A1A2E;">Monthly Attendance Trend</div>
                <div style="font-size:12px;color:#999;margin-top:2px;">May 2025 → March 2026</div>
            </div>
            <div style="display:flex;gap:10px;font-size:11px;">
                <span style="display:flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;border-radius:2px;background:#008F39;display:inline-block;"></span>≥90%</span>
                <span style="display:flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;border-radius:2px;background:#F4A100;display:inline-block;"></span>75-90%</span>
                <span style="display:flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;border-radius:2px;background:#DC3545;display:inline-block;"></span>&lt;75%</span>
            </div>
        `;
        trendCard.appendChild(trendHeader);
        trendCard.appendChild(this.renderTrendChart(trends));

        // AI insight card
        const aiCard = document.createElement("div");
        const aiGrad = percentage >= 90 ? "linear-gradient(135deg,#005C23,#008F39)" : percentage >= 75 ? "linear-gradient(135deg,#7A5200,#F4A100)" : "linear-gradient(135deg,#8B0000,#DC3545)";
        aiCard.style.cssText = `background:${aiGrad};border-radius:16px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,0.12);display:flex;flex-direction:column;gap:12px;`;
        aiCard.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;">
                <div style="font-size:24px;">🤖</div>
                <div style="color:#fff;font-size:15px;font-weight:700;">AI Insight Engine</div>
            </div>
            <div style="color:rgba(255,255,255,0.9);font-size:13px;line-height:1.6;">${aiInsight}</div>
            <div style="margin-top:auto;background:rgba(255,255,255,0.15);border-radius:8px;padding:10px;font-size:12px;color:rgba(255,255,255,0.85);">
                <strong>Recommendation:</strong> ${percentage >= 90 ? "Maintain this streak — you're leading your batch!" : percentage >= 75 ? "Attend all upcoming sessions. No more than " + Math.floor(sessions * 0.25 - absentDays) + " absences remaining." : "You need to attend ALL remaining sessions immediately."}
            </div>
        `;

        midRow.appendChild(trendCard);
        midRow.appendChild(aiCard);

        // ── BOTTOM ROW: Calendar Heatmap + Recent Absences ───
        const bottomRow = document.createElement("div");
        bottomRow.style.cssText = "display:grid;grid-template-columns:1fr 320px;gap:18px;";

        // Recent absences list
        const absCard = document.createElement("div");
        absCard.style.cssText = "background:#fff;border-radius:16px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,0.06);";

        const recentAbsList = recentAbs.slice(0, 8);
        const absListHTML = recentAbsList.length > 0
            ? recentAbsList.map(d => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#FFF5F5;border-radius:8px;margin-bottom:6px;">
                    <span style="font-size:13px;color:#333;">📅 ${d}</span>
                    <span style="font-size:11px;color:#DC3545;font-weight:600;background:#FFE5E5;padding:2px 8px;border-radius:10px;">Absent</span>
                </div>`).join("")
            : `<div style="text-align:center;color:#999;font-size:13px;padding:20px;">🎉 No recent absences!</div>`;

        absCard.innerHTML = `
            <div style="font-size:15px;font-weight:700;color:#1A1A2E;margin-bottom:14px;">Recent Absences <span style="font-size:12px;color:#999;font-weight:400;">(last 60 days)</span></div>
            ${absListHTML}
            ${recentAbs.length > 8 ? `<div style="text-align:center;font-size:12px;color:#888;margin-top:8px;">+${recentAbs.length - 8} more absences</div>` : ""}
        `;

        // Attendance summary stats
        const statsCard = document.createElement("div");
        statsCard.style.cssText = "background:#fff;border-radius:16px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,0.06);display:flex;flex-direction:column;gap:12px;";
        statsCard.innerHTML = `
            <div style="font-size:15px;font-weight:700;color:#1A1A2E;margin-bottom:4px;">Attendance Summary</div>
            ${[
                { label: "Overall Percentage", val: percentage.toFixed(2)+"%", color: pctColor },
                { label: "Best Month", val: trends.length > 0 ? trends.reduce((a,b)=>a.pct>b.pct?a:b).month+" ("+trends.reduce((a,b)=>a.pct>b.pct?a:b).pct+"%)" : "N/A", color: "#008F39" },
                { label: "Worst Month", val: trends.length > 0 ? trends.reduce((a,b)=>a.pct<b.pct?a:b).month+" ("+trends.reduce((a,b)=>a.pct<b.pct?a:b).pct+"%)" : "N/A", color: "#DC3545" },
                { label: "Max Consec. Absent", val: maxConsec+" days", color: maxConsec > 5 ? "#DC3545" : "#555" },
                { label: "Sessions Remaining Safe", val: Math.max(0, sessions - Math.ceil(sessions * 0.25) - absentDays)+" sessions", color: "#008F39" },
                { label: "Technology", val: technology, color: "#008F39" },
            ].map(s => `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #F5F5F5;">
                    <span style="font-size:12px;color:#777;">${s.label}</span>
                    <span style="font-size:13px;font-weight:700;color:${s.color};">${s.val}</span>
                </div>
            `).join("")}
            <div style="background:${aiGrad};border-radius:10px;padding:12px;text-align:center;margin-top:4px;">
                <div style="color:#fff;font-size:20px;font-weight:900;">${percentage.toFixed(1)}%</div>
                <div style="color:rgba(255,255,255,0.8);font-size:11px;">${statusLabel} Performance</div>
            </div>
        `;

        bottomRow.appendChild(absCard);
        bottomRow.appendChild(statsCard);

        // ── ASSEMBLE ─────────────────────────────────────────
        main.appendChild(topBar);
        main.appendChild(metricsRow);
        main.appendChild(midRow);
        main.appendChild(bottomRow);

        // Footer
        const footer = document.createElement("div");
        footer.style.cssText = "text-align:center;font-size:11px;color:#AAA;padding:8px 0;";
        footer.innerText = "© 2026 Technical Hub · AttendInsights Portal · All rights reserved.";
        main.appendChild(footer);

        page.appendChild(sidebar);
        page.appendChild(main);
        this.container.appendChild(page);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.renderDashboard(context);
    }
    public getOutputs(): IOutputs { return {}; }
    public destroy(): void {}
}