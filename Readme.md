# Cowin vaccine availability tracker

This is a small program to subscribe to vaccine availability as it becomes available in the government's database. The user is notified via email. Email credentials need to be filled in by the user

## Installation

Use the node package manager [npm](https://nodejs.org) to install the dependencies.

```bash
npm install
```

## Configure subscription details

```text
Create a `.env` file in the root
Set below listed values

SMTP_SERVER
USER_EMAIL
USER_PASSWORD
CITY
AGE_GROUP

A properly filled .env file will look something like

SMTP_SERVER=smtpout.secureserver.net
USER_EMAIL=user@gmail.com
USER_PASSWORD=letuscallitchinesevirus
CITY=Gwalior
AGE_GROUP=18

```

## Start the subscription service

```bash
npm start
```

## To generate binaries (executables) for MacOs, Windows and Linux

```bash
# if pkg is not installed globally, install using npm and if already installed ignore command below
npm i -g pkg

# to generate executables
npm run package
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit)
