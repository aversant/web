export class TimeProvider{
	now():number{
		return Math.floor(Date.now() / 1000);
	}
}