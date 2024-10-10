# OneUptime

[OneUptime](https://oneuptime.com/) is a complete uptime monitoring platform that we are using to monitor the uptime of Care, Care Dashboard, and the TeleICU Middlewares from every state.

## Deployment

OneUptime is deployed to a c6g.xlarge EC2 Instance. The `config.env` file has to be populated with all the variables specified, and we can deploy the service via npm or using docker-compose directly.

To install OneUptime using npm:

```
# Clone this repo and cd into it.
git clone https://github.com/OneUptime/oneuptime.git
cd oneuptime

# Please make sure you're on release branch.
git checkout release

# Copy config.example.env to config.env
cp config.example.env config.env

npm start
```

To use docker-compose directly:

```
# Read env vars from config.env file and run docker-compose up.
export $(grep -v '^#' config.env | xargs) && docker compose up --remove-orphans -d
```

The Care Deployments can be categorized into separate projects fields. Each project can have their hub admins and coordinators as admin users to manage monitors and status pages. 🛠️

## Migration from Uptime Kuma.

The migration from uptime kuma to oneuptime was carried out via these steps.

1. Uptime Kuma uses Sqlite. The db dump was converted into a CSV file with all the monitors, names, and URLs and many other fields in the table.
2. The CSV file was cleaned up by removing unnecessary fields, and using grep, multiple CSV files, one for each state (deployment), was created.
3. To bulk add the monitor, a puppeteer script was used. The script reads the monitor name, Description, and URL and performs the automated monitor adding procedure for the selected project.
4. After bulk adding all the monitors to the specified project, a POST request with an active API key is sent to fetch the monitor names and their subsequent monitor IDs.
5. The raw JSON response containing all the monitor id and monitor names are sorted and separated based on their hubs and stored as CSV files.
6. Status pages for the state are created, and groups are set up based on their hubs.
7. Status page ID and group page ID are copied and saved to `.env` and `.envHubname` as environment variables.
8. The bulk add script is run with the `hubname.csv` and `.envHubname` files as arguments, which will send post requests to add monitors to the specified status pages in the specified group named as the hub they belong to. 🔄

Feel free to adjust any details or add more emojis to enhance the readability and engagement!

Also checkout [oneuptime-automation](./oneuptime-automation) which is a collection of scripts to bulk add monitors, status pages groups and monitors to status page.
