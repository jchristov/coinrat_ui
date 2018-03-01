[![CircleCI](https://circleci.com/gh/Achse/coinrat_ui.svg?style=svg&circle-token=9fe64fcd447bc71baf0a465a3f6c14ccebb858ca)](https://circleci.com/gh/Achse/coinrat_ui)
[![Latest Stable Version](https://poser.pugx.org/achse/coinrat_ui/v/stable)](https://github.com/achse/coinrat_ui/releases)

> :bangbang: **Important**: This project is still in alpha!

> **Note**: This project started as a Thesis project at ČVUT FIT. [Assignment of diploma thesis here](https://github.com/Achse/coinrat/blob/master/docs/cvut.md).

# Frontend App for Coinrat auto-trading platform

Coinrat is modular auto-trading platform focused on crypto-currencies. This repository is contains Frontend App for
visualizations of the trading. Coinrat itself can be found [here](https://github.com/achse/coinrat).

## Security 
> :squirrel: **DISCLAIMER**: The software is provided "as is", without warranty of any kind. For more see: [LICENSE](LICENSE)

* :bangbang: **Never connect Frontend APP directly to you production backend server.** 
    * If you need running socket server in production, **ALWAYS** run UI-App locally and use [ssh tunnel](https://blog.trackets.com/2014/05/17/ssh-tunnel-local-and-remote-port-forwarding-explained-with-examples.html). 
    * Make sure that socket server is **NEVER** accessible from the internet.

## Install
Dependencies and flow-type
```bash
yarn isntall
sudo yarn global upgrade flow-typed
flow-typed install
```

Configuration .env
```bash
cp .env.example .env
```
You can configure host and port where Coinrat backend is running.

## Run:
* `yarn start`
* App is ready and running at http://localhost:3000
