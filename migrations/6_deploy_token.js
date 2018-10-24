const TCRPartyPoints = artifacts.require('./TCRPartyPoints.sol');

module.exports = function (deployer, network, accounts) {
  return deployer.deploy(TCRPartyPoints)
};
