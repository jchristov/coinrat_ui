Build: [![CircleCI](https://circleci.com/gh/Achse/coinrat_ui.svg?style=svg&circle-token=9fe64fcd447bc71baf0a465a3f6c14ccebb858ca)](https://circleci.com/gh/Achse/coinrat_ui)

> **Note**: This project started as a Thesis project at ČVUT FIT. [Assignment of diploma thesis here](https://github.com/Achse/coinrat/blob/master/docs/cvut.md).

# Frontend App for Coinrat auto-trading platform

Coinrat is modular auto-trading platform focused on crypto-currencies. This repository is contains Frontend App for
visualizations of the trading. Coinrat itself can be found at https://github.com/achse/coinrat.

## Install
Yarn & Flow
```bash
yarn isntall
sudo yarn global upgrade flow-typed
flow-typed install
```

.env
```bash
cp .env.example .env
```
Change socket port in `.env` if needed.

## Run:
* `yarn start`
* App is ready and running at http://localhost:3000
