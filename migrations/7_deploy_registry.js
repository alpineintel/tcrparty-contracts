const TCRPartyPoints = artifacts.require('./TCRPartyPoints.sol');
const Registry = artifacts.require('./Registry.sol');
const Parameterizer = artifacts.require('./Parameterizer.sol');
const PLCR = artifacts.require('plcr-revival/PLCRVoting.sol');

const DLL = artifacts.require('dll/DLL.sol');
const AttributeStore = artifacts.require('attrstore/AttributeStore.sol');

const PERCENT = 1;
const TCRP = 10 ** 15;
const MIN = 60;
const HOUR = MIN * 60
const DAY = HOUR * 24;

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
          // minDeposit
          500 * TCRP,
          // pMinDeposit
          15000000 * TCRP,
          // applyStageLen (2 days)
          2 * MIN,
          // pApplyStageLen
          15000000 * TCRP,
          // commitStageLen
          2 * MIN,
          // pCommitStageLen
          15000000 * TCRP,
          // revealStageLen
          2 * MIN,
          // pRevealStageLen
          15000000 * TCRP,
          // dispensationPct
          75 * PERCENT,
          // pDispensationPct
          15000000 * TCRP,
          // voteQuorum
          50 * PERCENT,
          // pVoteQuorum
          15000000 * TCRP,
          // exitTimeDelay
          5 * MIN,
          // exitPeriodLen
          5 * MIN,
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
