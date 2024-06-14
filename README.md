## Pre-requirements / Versions

First of all, make sure you've setup and running the [API](https://github.com/tkaing/eversun-test-api)

- NODE version ^18.16
- NPM version ^9.5
- YARN version ^1.22
- NEXT version ^13.4
- REACT version ^18.2

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Webapp.

## Next steps to follow

- Register and keep your pseudo / code then Login
- Select a device to subscribe to a topic
- Publish JSON messages to the topic `tkgtest/<pseudo>-plug/set` or `tkgtest/<pseudo>-camera/set`
    - choose a tool to publish messages (for example : "VSMqtt" a VSCode extension)
    - replace `<pseudo>` with yours
    - the JSON message must have this format :
```json 
{
   "deviceName": "plug",
   "currentPower": "180W",
   "totalPowerConsumption": "7.4kWh",
   "state": "ON"
}
```
-  See device information and history