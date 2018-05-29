const SHA256 = require('crypto-js/sha256');
const SHA512 = require('crypto-js/sha512');

class Block{
	constructor(index, timestamp, data, previousHash = ''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data; 
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}

	calculateHash(){
		return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();

	}

}

class Blockchain{

	constructor(){
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock(){
		return new Block(0, '01/01/2017', 'Genesis block', '0');
	}

	getLatestBlock() {
		return this.chain[this.chain.length-1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	isChainValid(){ //verify list 
		for (var i = 1;i<this.chain.length; i++){
			const current = this.chain[i];
			const prev = this.chain[i - 1]; 

			if(current.hash != current.calculateHash()){
				console.log('current hash not matched');
				return false;
			}

			if(current.previousHash != prev.hash) {
				console.log('previous hash not matched');
				return false;
			}
		}

		return true;
	}


}

let hannieCoin = new Blockchain();
hannieCoin.addBlock(new Block(1, "10/07/2017", {amount: 4}));
hannieCoin.addBlock(new Block(2, "12/07/2017", {amount: 5}));
hannieCoin.addBlock(new Block(3, "13/07/2017", {amount: 6}));
hannieCoin.addBlock(new Block(4, "14/07/2017", {amount: 7}));


// console.log(JSON.stringify(hannieCoin, null, 4));
console.log('is blockchain valid? ' + hannieCoin.isChainValid());
hannieCoin.chain[1].data = {amount: 1000};
console.log('is blockchain valid? ' + hannieCoin.isChainValid());

//any case it'll still be invalid as the relationship between prev and current blocks