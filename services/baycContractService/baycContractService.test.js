jest.mock('ethers', () => ({
    ethers: {
        JsonRpcProvider: jest.fn(),
        Contract: jest.fn(() => ({
            name: jest.fn().mockResolvedValue('BAYC'),
            symbol: jest.fn().mockResolvedValue('BAYC'),
            MAX_APES: jest.fn().mockResolvedValue(10000n),
            ownerOf: jest.fn().mockResolvedValue('0x1234567890abcdef1234567890abcdef12345678')
        }))
    }
}))
const baycContractService = require('./baycContractService')

describe('baycContractService', () => {
  it('should initialize and fetch contract data', async () => {
    baycContractService.initializeContractService('http://localhost:8545')
    const data = await baycContractService.getBAYCContractData()
    expect(data).toEqual({
      contractName: 'BAYC',
      contractSymbol: 'BAYC',
      contractAddress: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      MAX_APES: '10000',
      ownerOf6145: '0x1234567890abcdef1234567890abcdef12345678'
    })
  })

  it('should throw if not initialized', async () => {
    jest.resetModules()
    const baycContractService = require('./baycContractService') // reset internal vars
    await expect(baycContractService.getBAYCContractData()).rejects.toThrow('Contract service not initialized')
    })
})