const TCRPartyPoints = artifacts.require('./TCRPartyPoints.sol');

module.exports = function (deployer) {
  return deployer.deploy(TCRPartyPoints);
};
