module.exports = class BaseModel {
	constructor(type) {
		this.type = type;
	}

	async getAll() {
		return [];
	}
}

