import { ItemsService } from './items.service';

describe('ItemsService', () => {
    let service: ItemsService;

    beforeEach(() => {
        service = new ItemsService();
    });

    it('create and find one', () => {
        const item = service.create({ name: 'A', description: 'b' });
        expect(item.id).toBeDefined();
        expect(service.findOne(item.id)).toEqual(item);
    });

    it('remove item', () => {
        const item = service.create({ name: 'X' });
        service.remove(item.id);
        expect(() => service.findOne(item.id)).toThrow();
    });
});
