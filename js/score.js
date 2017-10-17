class score{
	constructor(t){
		this.totalStatements = t;
		this.correct = 0;
	}

	GetScore(){
		return this.correct / this.totalStatements;
	}

	AddScore(){
		this.correct++;
	}
};