pragma solidity 0.4.24;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract TCRPartyPoints is MintableToken {
    string public name = "Party Points";
    string public symbol = "TCRP";
    uint8 public decimals = 15;
}
