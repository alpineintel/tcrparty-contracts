const TCRPartyPoints = artifacts.require('./TCRPartyPoints.sol');
const Registry = artifacts.require('./Registry.sol');
const Parameterizer = artifacts.require('./Parameterizer.sol');
const PLCR = artifacts.require('plcr-revival/PLCRVoting.sol');

const DLL = artifacts.require('dll/DLL.sol');
const AttributeStore = artifacts.require('attrstore/AttributeStore.sol');

module.exports = function (deployer, network, accounts) {
  deployer.link(DLL, PLCR);
  deployer.link(AttributeStore, PLCR);

	let registry, parameterizer, plcr;
  deployer.deploy(Registry)
		.then((contract) => {
			registry = contract;
			return deployer.deploy(Parameterizer);
		})
		.then((contract) => {
			parameterizer = contract;
			return deployer.deploy(PLCR);
		})
    .then((contract) => {
      plcr = contract;

			console.log("  Initializing PLCR contract")
      return plcr.init(TCRPartyPoints.address);
    })
    .then(() => {
			console.log("  Initializing parameterizer contract")
      return parameterizer.init(
        TCRPartyPoints.address,
        plcr.address,
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
      );
    })
    .then(() => {
      console.log(`  Initializing registry contract`);
      return registry.init(
        TCRPartyPoints.address,
        plcr.address,
        parameterizer.address,
        "TCR Party",
      );
    }).then(() => {
      console.log(`  TCR has been deployed to ${registry.address}`);
    });
};
