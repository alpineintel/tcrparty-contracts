const TCRPartyPoints = artifacts.require('./TCRPartyPoints.sol');
const RegistryFactory = artifacts.require('./RegistryFactory.sol');

module.exports = function (deployer, network, accounts) {
  return RegistryFactory.deployed((instance) => {
    return instance.newRegistryBYOToken(
      TCRPartyPoints.address,
      [
        500 * (10 ** 15),       // minDeposit
        15000000 * (10 ** 15),  // pMinDeposit
        172800,                 // applyStageLen
        15000000 * (10 ** 15),  // pApplyStageLen
        172800,                 // commitStageLen
        15000000 * (10 ** 15),  // pCommitStageLen
        64800,                  // revealStageLen
        15000000 * (10 ** 15),  // pRevealStageLen
        75,                     // dispensationPct
        15000000 * (10 ** 15),  // pDispensationPct
        50,                     // voteQuorum
        15000000 * (10 ** 15),  // pVoteQuorum
        172800,                 // exitTimeDelay
        172800,                 // exitPeriodLen
      ],
      'TCR Party',
    );
  }).then((registry) => {
    console.log(`TCR has been deployed to ${registry.address}`);
  });
};
