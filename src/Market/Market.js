class Market {
  name: string
  title: string
  configurationStructure: Object

  constructor(name: string, title: string, configurationStructure: Object) {
    this.name = name
    this.title = title
    this.configurationStructure = configurationStructure
  }
}

export {
  Market
}
