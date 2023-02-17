// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IToken{
    function approve(address spender, uint256 amount) external returns (bool);
}