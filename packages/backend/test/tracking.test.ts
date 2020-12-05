import 'jest';
import request from 'supertest';
import { Tracking } from '../src/entity/Tracking';
import { Helper } from './helper';

describe('tracking', () => {
	const helper = new Helper();

	beforeAll(async () => {
		await helper.init();
	});

	afterAll(async () => {
		await helper.shutdown();
	});

	it('should be able to create a new tracking', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		request(helper.app)
			.post('/api/tracking')
			.send({
				description: 'test',
				taskId: '1',
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end((err, res) => {
				if (err) throw err;
				expect(res.body.data.description).toBe('test');
				done();
			});
	});

	it('should not be able to create a new tracking', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		request(helper.app)
			.post('/api/tracking')
			.send({
				description: 'test desc',
				taskId: '',
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(400)
			.end((err, res) => {
				if (err) throw err;
				expect(res.body.status).toBe('Invalid Syntax');
				done();
			});
	});

	it('should not be able to create a new tracking task not found', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		request(helper.app)
			.post('/api/tracking')
			.send({
				description: 'test desc',
				taskId: '400',
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404)
			.end((err, res) => {
				if (err) throw err;
				expect(res.body.status).toBe('not_found');
				done();
			});
	});

	it('should show all trackings', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		request(helper.app)
			.get('/api/tracking')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end((err, res) => {
				if (err) throw err;
				expect(res.body.data.length).toBe(3);
				expect(res.body.data[0].description).toBe('Tracking2');
				done();
			});
	});

	it('get tracking by id', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		const tracking = new Tracking();
		tracking.description = 'Testwert';
		const savedtracking = await helper.getRepo(Tracking).save(tracking);
		request(helper.app)
			.get(`/api/tracking/${savedtracking.trackingid}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200)
			.end((err, res) => {
				if (err) throw err;
				expect(res.body.data.trackingid).toBe(savedtracking.trackingid);
				expect(res.body.data.description).toBe(savedtracking.description);
				done();
			});
	});

	it('should not be able to get a tracking by id', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		request(helper.app)
			.get('/api/tracking/100')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404)
			.end((err, res) => {
				if (err) throw err;
				expect(res.body.status).toBe('not_found');
				done();
			});
	});

	it('should be able to update a tracking', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		let tracking = new Tracking();
		tracking = await helper.getRepo(Tracking).findOneOrFail({ trackingid: 2 });
		request(helper.app)
			.patch(`/api/tracking/${tracking.trackingid}`)
			.send({
				description: 'Edited Name',
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.end(async (err, res) => {
				if (err) throw err;
				expect(res.body.data.description).toBe('Edited Name');
				done();
			});
	});

	it('should not be able to update a tracking', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		request(helper.app)
			.patch(`/api/tracking/100`)
			.send({
				description: 'Edited Name',
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404)
			.end((err, res) => {
				if (err) throw err;
				expect(res.body.status).toBe('not_found');
				done();
			});
	});

	it('should be able to delete a tracking', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		let tracking = new Tracking();
		tracking = await helper.getRepo(Tracking).findOneOrFail({ trackingid: 1 });
		request(helper.app)
			.delete(`/api/tracking/${tracking.trackingid}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.end(async (err) => {
				if (err) throw err;
				const [, trackingCount] = await helper.getRepo(Tracking).findAndCount();
				expect(trackingCount).toBe(2);
				done();
			});
	});

	it('should not be able to delete a tracking by id', async (done) => {
		await helper.resetDatabase();
		await helper.loadFixtures();
		request(helper.app)
			.delete('/api/tracking/100')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404)
			.end((err, res) => {
				if (err) throw err;
				expect(res.body.status).toBe('not_found');
				done();
			});
	});
});
