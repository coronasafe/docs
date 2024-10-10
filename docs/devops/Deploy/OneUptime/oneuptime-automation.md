# OneUptime Automation

**[oneuptime-automation](https://github.com/ohcnetwork/oneuptime-automation)** provides a set of scripts for automating uptime monitoring tasks using the OneUptime platform. It includes scripts for adding monitors, updating status pages, and fetching monitor data etc.

## Project Structure 📂

```
.
├── .env                     # Environment variables file
├── .envGroupname            # Environment variables file for group-specific settings
├── add-monitor.csv          # Example CSV file for monitor data
├── add-monitor.js           # Puppeteer Script for adding monitors
├── add-to-statuspage.sh     # Script for adding monitors to the status pages
├── create-groups.sh         # Script for creating groups to status page
├── create-status-pages.sh   # Script for creating status pages
├── created-groups.csv       # CSV file to store created group IDs
├── get-monitors.sh          # Script for fetching monitor name and ID
├── groups.csv               # CSV file for specifying group names to be created
├── package.json             # Package information
└── status-pages.csv         # CSV file to store status page IDs
```

## Usage 🛠️

1. **Setup Environment Variables**:
   - Edit `.env` file and set the required environment variables like `API_KEY`, `PROJECT_ID`, and `DOMAIN`.

2. **Adding Monitors**:
   - Use the `add-monitor.js` script to add monitors. Provide monitor data in CSV format and run the script.

3. **Fetching Monitor Data**:
   - Use the `get-monitors.sh` script to fetch monitor data. The data will be saved in CSV format.

4. **Creating Status Pages**:
   - Run `create-status-pages.sh` to create status pages based on the data in `status-pages.csv`.

5. **Creating Status Page Groups**:
   - Run `create-groups.sh` to create status page groups based on the data in `groups.csv`. This script will return the group IDs which are necessary to add the monitors to the specified status page.
   - Edit `.envGroupname` file for group-specific settings.

6. **Updating Status Pages**:
   - Use the `add-to-statuspage.sh` script to add groups to the specified status page.

## Dependencies 🛠️

- `curl`: Command-line tool for transferring data with URLs.
- `jq`: Command-line JSON processor for parsing JSON responses.
- `csv-parser`: Node.js library for parsing CSV files 📊
- `puppeteer` : Node.js library for controlling headless Chrome or Chromium browsers 🖥 ️
- `dotenv` : Node.js library to use .env variables.
