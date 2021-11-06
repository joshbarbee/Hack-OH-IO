async function main() {
    const nfticket = await ethers.getContractFactory("NFTicket")
    
    // Start deployment, returning a promise that resolves to a contract object
    const ticket = await nfticket.deploy()
    console.log("Contract deployed to address:", ticket.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  