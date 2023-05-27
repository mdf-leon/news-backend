import { start as MagicWebserver, shutdown } from './webserver/index'

async function main() {
  const webserver = MagicWebserver() // starts your magic webserver  

  // await shutdown(webserver) 
}

main()